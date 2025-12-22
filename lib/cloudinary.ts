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

/**
 * Client-side upload to Cloudinary (for browser use)
 * @param file File object from input
 * @returns The secure URL of the uploaded image
 */
export async function uploadToCloudinary(file: File): Promise<string> {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
        throw new Error('Cloudinary cloud name not configured');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'blackstone_products'); // You'll need to create this in Cloudinary dashboard
    formData.append('cloud_name', cloudName);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: 'POST',
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
}
