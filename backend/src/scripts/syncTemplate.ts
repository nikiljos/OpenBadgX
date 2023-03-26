import * as dotenv from "dotenv";
dotenv.config();

import { syncTemplate } from "../utils/ses";
import { readFile } from "fs";
import { promisify } from "util";
const fileRead = promisify(readFile);

(async () => {

    const templateName=process.argv[2]
    if (!templateName || templateName === "" || !/^[A-Za-z0-9]*$/.test(templateName)) {
        console.log("Invalid Template Name");
        return;
    }
    console.log("Template:",templateName,"\n")

    console.log("=====================================");
    console.log("=====Starting Template Migration=====\n");
    
    const htmlData = await fileRead(
        `./src/assets/mailTemplate/${templateName}-template.html`
    ).catch((err) => console.log("Template file read error:", err.message));
    const subData = await fileRead(
        `./src/assets/mailTemplate/${templateName}-subject.txt`
    ).catch((err) => console.log("Subject file read error:", err.message));
    if (!htmlData||!subData) return;
    const htmlString = htmlData.toString();
    const subject=subData.toString()
    console.log("HTML to migrate ↓\n", htmlString, "\n");
    console.log("Subject to migrate →", subject, "\n\n");
    let sesResponse;
    let existStatus = false;
    sesResponse = await syncTemplate(
        true,
        templateName,
        subject,
        htmlString
    ).catch((err) => {
        if (err.Error.Code === "AlreadyExists"){
            existStatus = true;
            console.log("Template Already Exists! Updating...\n")
        } 
        else console.log(err);
    });
    if (sesResponse) console.log("Create Successful");
    else if (existStatus) {
        sesResponse = await syncTemplate(
            false,
            templateName,
            subject,
            htmlString
        ).catch((err) => {
            console.log(err);
        });
        if (sesResponse) console.log("Update Successful");
    }
    // console.log(sesResponse,"\n");

    console.log("\n=====Template Migration Finished=====");
    console.log("=====================================");
})();
