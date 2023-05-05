import { SESClient,CreateTemplateCommand,UpdateTemplateCommand,SendTemplatedEmailCommand } from "@aws-sdk/client-ses"
import MailQueue from "../models/mailQueue.model";
import jwt from "./jwt";

let queueRunning = false;
let mailDisabled = process.env.MAIL_DISABLE === "true";

const { SES_SENDER_ADDRESS, SES_SENDER_NAME, FRONTEND_URL } = process.env;
interface Recepient {
    id:string;
    email: string;
    mailUnsub:boolean;
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
    toEmail: string,
    variableData: object,
    fromName?: string,
    fromEmail?: string
) => {

    if (mailDisabled) return Promise.reject(new Error("Mailer Disabled"));

    const sendCommand = new SendTemplatedEmailCommand({
        Source: `${fromName||SES_SENDER_NAME} <${fromEmail||SES_SENDER_ADDRESS}>`,
        Template: template,
        Destination: {
            ToAddresses: [toEmail],
        },
        TemplateData: JSON.stringify(variableData),
    });

    return client.send(sendCommand);
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
    const mailData = await MailQueue.findOne({
        "status.queue": true,
    })
        .populate<{ recepient: Recepient }>("recepient")
        .catch((err) => console.log(err));

    //base case - return if no more pending in queue
    if (!mailData) {
        // nothing pending in queue
        queueRunning = false;
        return;
    }

    //handle unsubscribed reciepient
    if(mailData.recepient.mailUnsub){
        let updateRes=await mailData
            .updateOne({
                status: {
                    ...mailData.status,
                    queue: false,
                    success: false
                },
            })
            .catch((err) => console.log("status update error", err));
        if (!updateRes) {
            queueRunning = false;
            return
        }
        triggerNextMail();
        return;
    }

    //generate unsub secret and url
    mailData.variableData.unsubUrl=`${FRONTEND_URL}/mail/unsubscribe?secret=${await jwt.generateToken(mailData.recepient.id,"mail_unsub","28 days")}`
    let tryCount =
        (mailData.status &&
            typeof mailData.status.tryCount &&
            mailData.status.tryCount++) ||
        1;
    const mailRes = await sendMail(
        mailData.template,
        mailData.recepient?.email,
        mailData.variableData
    ).catch(async (err) => {
        // mail fail
        await mailData.updateOne({
            status: {
                ...mailData.status,
                queue: false,
                success: false,
                tryCount
            },
        });
    });
    if (mailRes) {
        //mail success
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