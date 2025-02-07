import type { HashOptions } from '@/types/utils/hash/hash'

import { blurhashRgba, thumbhashRgba } from './methods'
import { processImage, rgbaToDataUrl } from './processImage'

/**
 * Gets a hash data URL from a source image using either thumbhash or blurhash.
 * @param src - Source image path
 * @param adjustedDimension - Adjusted dimension for the image
 * @param saturation - Saturation of the image
 * @param method - Hash method
 * @param format - Sharp output format
 * @param outputOptions - Sharp output options
 * @param methodOptions - Method-specific options
 */
export const getHashDataUrl = async ({
    src,
    adjustedDimension = 10,
    saturation = 1.5,
    method = 'thumbhash',
    format = 'webp',
    outputOptions,
    methodOptions,
}: HashOptions): Promise<string | undefined> => {
    try {
        if (method === 'thumbhash' && adjustedDimension > 100) {
            console.error(
                'Adjusted dimension must be less than or equal to 100. Will use 100 instead.',
            )
            adjustedDimension = 100
        }

        if (!outputOptions && format === 'webp') {
            outputOptions = { lossless: true }
        }

        const processedImage = await processImage({
            src,
            adjustedDimension,
            saturation,
        })

        if (!processedImage) {
            return
        }

        let hashData
        let data
        let width
        let height

        switch (method) {
            case 'thumbhash':
                hashData = thumbhashRgba({
                    data: processedImage.data,
                    width: processedImage.width,
                    height: processedImage.height,
                })

                data = hashData.data
                width = hashData.width
                height = hashData.height
                break
            case 'blurhash':
                hashData = blurhashRgba({
                    data: processedImage.dataClamped,
                    width: processedImage.width,
                    height: processedImage.height,
                    blurhash: methodOptions?.blurhash,
                })

                data = hashData.data
                width = hashData.width
                height = hashData.height
                break
            default:
                console.error(`Invalid method: ${method}`)
                return undefined
        }

        return await rgbaToDataUrl({
            data,
            width,
            height,
            format: format,
            outputOptions,
        })
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error getting ${method}:`, error.message)
        }
        return undefined
    }
}
