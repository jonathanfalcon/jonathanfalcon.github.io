import type { ImageMetadata } from 'astro'
import { getImage } from '@/utils/getImage'

/**
 * Resolves and retrieves image metadata from the provided source.
 *
 * @param {string | ImageMetadata | Promise<ImageMetadata | { default: ImageMetadata }>} rawSrc
 * The input source of the image. This can be a string representing the image source, an `ImageMetadata` object, or a promise that resolves to an `ImageMetadata` object or an object with a `default` key containing `ImageMetadata`.
 *
 * @returns {Promise<ImageMetadata>} A promise that resolves to an `ImageMetadata` object.
 */
export const resolveImageMetadata = async (
    rawSrc: string | ImageMetadata | Promise<ImageMetadata | { default: ImageMetadata }>,
): Promise<ImageMetadata> => {
    if (typeof rawSrc === 'string') {
        return getImage(rawSrc)
    }

    const resolvedSource = await rawSrc

    if (typeof resolvedSource === 'object' && 'default' in resolvedSource) {
        return resolvedSource.default
    }

    return resolvedSource
}
