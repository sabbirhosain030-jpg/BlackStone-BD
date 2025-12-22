'use client';

import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface ImageUploaderProps {
    images: string[];
    onChange: (images: string[]) => void;
    maxImages?: number;
}

export default function ImageUploader({ images, onChange, maxImages = 5 }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const remainingSlots = maxImages - images.length;
        const filesToUpload = files.slice(0, remainingSlots);

        setUploading(true);
        setUploadProgress(0);

        try {
            const uploadedUrls: string[] = [];

            for (let i = 0; i < filesToUpload.length; i++) {
                const url = await uploadToCloudinary(filesToUpload[i]);
                uploadedUrls.push(url);
                setUploadProgress(((i + 1) / filesToUpload.length) * 100);
            }

            onChange([...images, ...uploadedUrls]);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload images. Please try again.');
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((url, index) => (
                    <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden relative">
                            <Image
                                src={url}
                                alt={`Product image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            type="button"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        {index === 0 && (
                            <div className="absolute bottom-2 left-2 bg-premium-gold text-premium-black text-xs px-2 py-1 rounded">
                                Primary
                            </div>
                        )}
                    </div>
                ))}

                {images.length < maxImages && (
                    <label className="aspect-square bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-premium-gold transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                            disabled={uploading}
                        />
                        {uploading ? (
                            <div className="text-center">
                                <div className="animate-spin mb-2">
                                    <Upload className="h-8 w-8 text-premium-gold" />
                                </div>
                                <p className="text-sm text-gray-400">{Math.round(uploadProgress)}%</p>
                            </div>
                        ) : (
                            <>
                                <ImageIcon className="h-8 w-8 text-gray-500 mb-2" />
                                <p className="text-sm text-gray-400">Upload Image</p>
                                <p className="text-xs text-gray-500 mt-1">{images.length}/{maxImages}</p>
                            </>
                        )}
                    </label>
                )}
            </div>

            <p className="text-xs text-gray-500">
                First image will be the primary product image. Maximum {maxImages} images allowed.
            </p>
        </div>
    );
}
