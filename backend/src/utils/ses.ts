import { SESClient,CreateTemplateCommand,UpdateTemplateCommand,SendTemplatedEmailCommand } from "@aws-sdk/client-ses"
import MailQueue from "../models/mailQueue.model";

let queueRunning = false;

const { SES_SENDER_ADDRESS, SES_SENDER_NAME } = process.env;
interface Recepient {
    email: string;
}

const client = new SESClient({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_ACCESS_SECRET,
    },
});

export const sendMail = (
    template: string,
    fromName:string,
    fromEmail: string,
    toEmail: string,
    variableData: object
) => {
    const sendCommand=new SendTemplatedEmailCommand({
        Source:`${fromName} <${fromEmail}>`,
        Template:template,
        Destination:{
            ToAddresses:[toEmail]
        },
        TemplateData:JSON.stringify(variableData)
    })
    
    return client.send(sendCommand)

};

export const syncTemplate = (createNew:boolean, tempName: string,subject:string, htmlContent?: string, plainContent?:string) => {

    const templateData={
            TemplateName:tempName,
            SubjectPart:subject,
            HtmlPart:htmlContent,
            TextPart:plainContent
        }
    const command=createNew?new CreateTemplateCommand({
        Template:templateData
    }):new UpdateTemplateCommand({
        Template:templateData
    })

    return client.send(command)
};

export const triggerNextMail = async () => {
    if (queueRunning) return;
    // console.log("Triggered");
    const mailData = await MailQueue.findOne({
        "status.queue": true,
    })
        .populate<{ recepient: Recepient }>("recepient")
        .catch((err) => console.log(err));

    //base case - return if no more pending in queue
    if (!mailData) {
        queueRunning = false;
        // console.log("Nothing in queue")
        return;
    }

    console.log(mailData.recepient?.email);
    const mailRes = await sendMail(
        mailData.template,
        SES_SENDER_NAME,
        SES_SENDER_ADDRESS,
        mailData.recepient?.email,
        mailData.variableData
    ).catch(async (err) => {
        // console.log("mail fail");
        await mailData.updateOne({
            status: {
                ...mailData.status,
                queue: false,
                success: false,
            },
        });
    });
    if (mailRes) {
        // console.log("mail success");
        let tryCount =
            (mailData.status &&
                typeof mailData.status.tryCount &&
                mailData.status.tryCount++) ||
            1;
        let updateRes=await mailData
            .updateOne({
                status: {
                    ...mailData.status,
                    queue: false,
                    success: true,
                    tryCount,
                    send: new Date(),
                },
            })
            .catch((err) => console.log("status update error", err));
        if(!updateRes){
            queueRunning=false;
            return
        }
    }
    //update run status and recursively call
    queueRunning = false;
    triggerNextMail();
};