import { rgbaToThumbHash, thumbHashToDataURL } from 'thumbhash'
import { processImage, convertBase64PngToWebp } from './processImage'

/**
 * Gets a thumb hash data URL from a source image. Format is base64 WebP.
 *
 * @param src - Source image URL
 * @param adjustedDimension - Adjusted dimension for the image
 * @param saturation - Saturation of the image
 * @returns Thumb hash data URL or undefined if an error occurred
 */
export const getThumbHashDataUrl = async (
    src: string,
    adjustedDimension: number = 10,
    saturation: number = 1.75,
): Promise<string | undefined> => {
    try {
        const processedImage = await processImage(src, adjustedDimension, saturation)

        if (!processedImage) {
            return
        }

        const thumbHash = rgbaToThumbHash(
            processedImage.width,
            processedImage.height,
            processedImage.data,
        )

        const base64Png = thumbHashToDataURL(thumbHash)

        return await convertBase64PngToWebp(base64Png)
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error getting thumb hash:', { src, error: error.message })
        }
        return
    }
}
