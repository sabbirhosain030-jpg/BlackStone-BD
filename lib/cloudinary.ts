// lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

const hasCloudinaryEnv = process.env.CLOUDINARY_URL || (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

if (process.env.CLOUDINARY_URL) {
    cloudinary.config({
        cloudinary_url: process.env.CLOUDINARY_URL
    });
} else if (hasCloudinaryEnv) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

/**
 * Uploads a local file to Cloudinary.
 * @param filePath Absolute path to the file to upload.
 * @param folder Optional folder name inside Cloudinary.
 * @returns The URL of the uploaded image.
 */
export async function uploadImage(filePath: string, folder?: string): Promise<string> {
    if (!hasCloudinaryEnv) {
        throw new Error("Cloudinary environment variables not set (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)");
    }
    const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        resource_type: "image",
    });
    return result.secure_url;
}
