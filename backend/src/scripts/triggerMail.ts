import * as dotenv from "dotenv";
dotenv.config();

import db from "../db.config";

import { triggerNextMail } from "../utils/ses";
import User from "../models/user.model";

(async () => {
    await db.init();
    await User.findOne()
    await triggerNextMail()
    console.log("Completed. Exiting in 5 sec...")
    setTimeout(()=>{
        process.exit(0)
    },5000)
})();
