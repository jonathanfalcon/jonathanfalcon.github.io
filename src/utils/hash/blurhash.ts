import type { RgbaToDataUrl } from '@/utils/hash/processImage'

import { decode, encode } from 'blurhash'
import { processImage, rgbaToDataUrl } from '@/utils/hash/processImage'

/**
 * Gets a blurhash data URL from a source image.
 *
 * @param src - Source image URL
 * @param adjustedDimension - Adjusted dimension for the image
 * @param saturation - Saturation of the image
 * @param format - Sharp output format
 * @param outputOptions - Sharp output options
 * @returns Blurhash data URL or undefined if an error occurred
 */
export const getBlurHashDataUrl = async (
    src: string,
    adjustedDimension: number = 20,
    saturation: number = 1.5,
    format: RgbaToDataUrl['format'] = 'webp',
    outputOptions: RgbaToDataUrl['outputOptions'] = { quality: 100 },
): Promise<string | undefined> => {
    try {
        const processedImage = await processImage(src, adjustedDimension, saturation)

        if (!processedImage) {
            return
        }

        const data = decode(
            encode(processedImage.data, processedImage.width, processedImage.height, 4, 4),
            processedImage.width,
            processedImage.height,
        )

        return await rgbaToDataUrl({
            data,
            width: processedImage.width,
            height: processedImage.height,
            format,
            outputOptions,
        })
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error getting blurhash:', { src, error: error.message })
        }
        return
    }
}
