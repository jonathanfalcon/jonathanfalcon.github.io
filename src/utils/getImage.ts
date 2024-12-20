import type { ImageMetadata } from 'astro'

/**
 * Gets image metadata using the image path. Handles both `@/assets/images` and `/src/assets/images` paths.
 *
 * @param imagePath Path to the image
 * @returns Image metadata
 * @throws Error if image is not found
 */
export const getImage = async (imagePath: string): Promise<ImageMetadata> => {
    try {
        if (imagePath.startsWith('@/assets/images')) {
            imagePath = imagePath.replace('@/assets/images', '/src/assets/images')
        }

        const assetsImages = import.meta.glob<{ default: ImageMetadata }>('@/assets/images/**/*')
        const workImages = import.meta.glob<{ default: ImageMetadata }>('/work/*/images/**/*')

        const images = { ...assetsImages, ...workImages }

        const src = await images[imagePath]()

        return src.default
    } catch {
        throw new Error(`Image not found: ${imagePath}`)
    }
}
