import { v2 as cloudinary } from 'cloudinary';

// Validate environment variables
if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.warn('  CLOUDINARY_CLOUD_NAME is not set in environment variables');
}
if (!process.env.CLOUDINARY_API_KEY) {
    console.warn('  CLOUDINARY_API_KEY is not set in environment variables');
}
if (!process.env.CLOUDINARY_API_SECRET) {
    console.warn('CLOUDINARY_API_SECRET is not set in environment variables');
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload an image to Cloudinary
 * @param fileBuffer - The file as a base64 data URI string (e.g., "data:image/jpeg;base64,...")
 * @param folder - The Cloudinary folder to store in (default: "careercanvas")
 * @returns The uploaded image's secure URL and public ID
 */
export async function uploadImage(
    fileBuffer: string,
    folder: string = 'careercanvas'
): Promise<{ url: string; publicId: string }> {
    try {
        const result = await cloudinary.uploader.upload(fileBuffer, {
            folder,
            resource_type: 'image',
            transformation: [
                { width: 500, height: 500, crop: 'limit' }, // Resize to max 500x500
                { quality: 'auto' },                         // Auto-optimize quality
                { fetch_format: 'auto' },                    // Auto-select best format
            ],
        });

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
}

/**
 * Delete an image from Cloudinary by its public ID
 * @param publicId - The Cloudinary public ID of the image
 */
export async function deleteImage(publicId: string): Promise<void> {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('Failed to delete image from Cloudinary');
    }
}

export default cloudinary;
