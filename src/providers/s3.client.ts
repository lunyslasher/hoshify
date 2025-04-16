import {HeadBucketCommand, S3Client} from "@aws-sdk/client-s3";
import {config} from "dotenv";
config();

export const s3 = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!
    },
    forcePathStyle: true
});

export const checkS3Connection = async () => {
    try {
        const command = new HeadBucketCommand({Bucket: process.env.S3_BUCKET});
        await s3.send(command);
        console.log((`S3 is working on ${process.env.S3_BUCKET}`));
    } catch (error) {
        console.error(error);
        throw error;
    }
}