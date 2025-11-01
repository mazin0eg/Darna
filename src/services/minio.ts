import { Client } from "minio";
let num = 1;

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: Number(process.env.MINIO_PORT) || 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
  secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
});

export const uploadImage = async (
  filePath: string,
  bucketName: string,
  objectName: string
): Promise<boolean> => {
  try {
    console.log(`test: ${num++}`);
    await minioClient.fPutObject(bucketName, objectName, filePath);
    return true;
  } catch (error) {
    throw new Error(`Minio error: ${error}`);
  }
};

export const getPresignedUrl = async (
  bucketName: string,
  objectName: string,
  expiry = 24 * 60 * 60
): Promise<string> => {
  console.log(`test: ${num++}`);
  try {
    const url = await minioClient.presignedGetObject(
      bucketName,
      objectName,
      expiry
    );
    return url;
  } catch (error) {
    throw new Error(`Minio error: ${error}`);
  }
};

export const checkBucketExists = async (
  bucketName: string
): Promise<boolean> => {
  console.log(`test: ${num++}`);
  try {
    return await minioClient.bucketExists(bucketName);
  } catch (error) {
    throw new Error(`MinIO bucket check error: ${error}`);
  }
};

export const createBucket = async (bucketName: string): Promise<void> => {
  console.log(`test: ${num++}`);
  try {
    const exists = await checkBucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName);
    }
  } catch (error) {
    throw new Error(`MinIO bucket creation error: ${error}`);
  }
};

// Example usage
const main = async () => {
  try {
    // Ensure bucket exists
    await createBucket("images");

    // Upload image
    await uploadImage("./my-image.jpg", "images", "photos/my-image.jpg");

    // Get presigned URL
    const url = await getPresignedUrl("images", "photos/my-image.jpg");
    console.log("Presigned URL:", url);
  } catch (error) {
    console.error("Error:", error);
  }
};

main();
