
/**
 * Client-side image optimization and file renaming utility.
 * 
 * Features:
 * - Renames files to kebab-case based on brand and title.
 * - Resizes images to max 1920px width/height (maintaining aspect ratio).
 * - Compresses images to JPEG/WebP (quality 0.8).
 * - Preserves videos as-is (only renaming).
 */

const MAX_DIMENSION = 1024;
const COMPRESSION_QUALITY = 0.6;

const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple hyphens with single hyphen
        .replace(/^-+/, '')             // Trim hyphens from start
        .replace(/-+$/, '');            // Trim hyphens from end
};

/**
 * Generate specific filename based on nomenclature:
 * - Slug_logo
 * - Slug_imagen_principal
 * - slug_imagen01, slug_imagen02...
 * - slug_video01, slug_video02...
 */
const generateFilename = (
    slug: string, 
    type: 'logo' | 'main' | 'gallery_image' | 'gallery_video', 
    index: number = 1,
    extension: string
): string => {
    const cleanSlug = slugify(slug);
    
    switch (type) {
        case 'logo':
            return `${cleanSlug}_logo.${extension}`;
        case 'main':
            return `${cleanSlug}_imagen_principal.${extension}`;
        case 'gallery_image':
            return `${cleanSlug}_imagen${index.toString().padStart(2, '0')}.${extension}`;
        case 'gallery_video':
            return `${cleanSlug}_video${index.toString().padStart(2, '0')}.${extension}`;
        default:
            return `${cleanSlug}_${Date.now()}.${extension}`;
    }
};

export const processFileForUpload = async (
    file: File, 
    slug: string, // Changed from brand/title to pre-calculated slug
    type: 'logo' | 'main' | 'gallery_image' | 'gallery_video',
    index: number = 1
): Promise<File> => {
    
    // Default extension from original file
    let extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    
    // If it's an image we are converting to JPEG/WEBP, update extension
    const isImage = file.type.startsWith('image/');
    if (isImage && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        extension = 'webp';
    }

    const newName = generateFilename(slug, type, index, extension);

    // 2. Process Image
    if (isImage) {
        return await optimizeImage(file, newName);
    }

    // 3. Process Video (Renaming only)
    return new File([file], newName, { type: file.type });
};

const optimizeImage = (file: File, newName: string): Promise<File> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions
            if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
                if (width > height) {
                    height = Math.round((height * MAX_DIMENSION) / width);
                    width = MAX_DIMENSION;
                } else {
                    width = Math.round((width * MAX_DIMENSION) / height);
                    height = MAX_DIMENSION;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                URL.revokeObjectURL(url);
                resolve(new File([file], newName, { type: file.type }));
                return;
            }

            try {
                ctx.drawImage(img, 0, 0, width, height);
            } catch (drawErr) {
                console.error("Error drawing image to canvas:", drawErr);
                URL.revokeObjectURL(url);
                resolve(new File([file], newName, { type: file.type }));
                return;
            }

            // Determine output format
            // Prefer WebP for web optimization
            const mimeType = 'image/webp';

            try {
                canvas.toBlob((blob) => {
                    URL.revokeObjectURL(url);
                    if (blob) {
                        resolve(new File([blob], newName, { type: mimeType }));
                    } else {
                        // Fallback to original if blob creation fails
                        resolve(new File([file], newName, { type: file.type }));
                    }
                }, mimeType, COMPRESSION_QUALITY);
            } catch (blobErr) {
                 console.error("Error converting canvas to blob:", blobErr);
                 URL.revokeObjectURL(url);
                 resolve(new File([file], newName, { type: file.type }));
            }
        };

        img.onerror = (err) => {
            console.error("Image optimization failed, using original", err);
            URL.revokeObjectURL(url);
            resolve(new File([file], newName, { type: file.type }));
        };

        img.src = url;
    });
};
