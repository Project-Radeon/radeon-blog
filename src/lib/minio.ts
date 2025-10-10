import S3 from "aws-sdk/clients/s3.js";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3({
    endpoint: import.meta.env.MINIO_SERVER,
    accessKeyId: import.meta.env.MINIO_ACCESS_KEY,
    secretAccessKey: import.meta.env.MINIO_SECRET_KEY,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
});

export async function uploadProfilePicture(image: File, fileName?: string | null): Promise<string> {

    console.log(import.meta.env.MINIO_SERVER);

    const buffer = await image.arrayBuffer();
    const resizedImage = await sharp(Buffer.from(buffer))
        .resize(152, 152)
        .png()
        .toBuffer();

    const key = fileName ? `${fileName}.png` : `${uuidv4()}.png`;

    const params = {
        Bucket: import.meta.env.MINIO_BUCKET_NAME,
        Key: `img/${key}`,
        Body: resizedImage,
        ContentType: "image/png",
    };

    await s3.upload(params).promise();

    return key;
}

export async function deleteProfilePicture(fileName: string): Promise<void> {
    const params = {
        Bucket: import.meta.env.MINIO_BUCKET_NAME,
        Key: `img/${fileName}`,
    };

    await s3.deleteObject(params).promise();
}

export async function uploadAttachment(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();

    const fileName = uuidv4();

    const params = {
        Bucket: import.meta.env.MINIO_BUCKET_NAME,
        Key: `img/${fileName}`,
        Body: Buffer.from(buffer),
        ContentType: file.type,
    };

    await s3.upload(params).promise();

    return fileName;
}