import * as dotenv from "dotenv";
dotenv.config();

import { syncTemplate } from "../utils/ses";
import { readFile } from "fs";
import { promisify } from "util";

(async () => {
    console.log("=====Starting Template Migration=====")
    console.log("=====================================\n");
    const fileRead = promisify(readFile);
    const htmlData = await fileRead(
        "./src/assets/mailTemplate/assertionNotify.html"
    ).catch((err) => console.log("file read error:", err));
    if (!htmlData) return;
    const htmlString = htmlData.toString();
    console.log("HTML to migrate-->\n", htmlString,"\n\n");
    let sesResponse;
    let existStatus = false;
    sesResponse = await syncTemplate(
        true,
        "assertionNotify",
        "Congrats, You have recieved a badge from {{orgName}}",
        htmlString
    ).catch((err) => {
        if (err.Error.Code === "AlreadyExists") existStatus = true;
        else console.log(err);
    });
    if (sesResponse) console.log("Create Successful");
    else if (existStatus) {
        sesResponse = await syncTemplate(
            false,
            "assertionNotify",
            "Congrats, You have recieved a badge from {{orgName}}",
            htmlString
        ).catch((err) => {
            console.log(err);
        });
        if (sesResponse) console.log("Update Successful");
    }
    console.log(sesResponse,"\n");

    console.log("=====================================");
    console.log("=====Template Migration Finished=====");
})();
