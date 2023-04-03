import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import { promisify } from "util";
const readFile = promisify(fs.readFile);

const client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_ACCESS_SECRET,
    },
});

const uploadFile = (sourcePath: string, sourceName: string, fileKey: string, fileType:string) =>
    new Promise(async (resolve, reject) => {
        const fileData = await readFile(`${sourcePath}/${sourceName}`).catch(
            (err) => reject(err)
        );
        if (fileData) {
            const s3Command = new PutObjectCommand({
                Bucket: process.env.S3_BUCKET,
                Key: fileKey,
                Body: fileData,
                ContentType: fileType
            });

            const s3Response = await client
                .send(s3Command)
                .catch((err) => reject(err));

            resolve(s3Response);
        } else {
            reject(new Error("SES Uplaod Error"));
        }
    });

export default {
    uploadFile,
};
