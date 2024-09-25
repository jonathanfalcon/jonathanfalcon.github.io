import type { HashOptions } from '@/types/util/hash/hash'
import type { HashMethods, ProcessedImage } from '@/types/util/hash/processImage'
import type { DataUrlFormats } from '@/types/util/hash/rgbaToDataUrl'

import { processImage, rgbaToDataUrl } from './processImage'
import { decode, encode } from 'blurhash'
import { rgbaToThumbHash, thumbHashToRGBA } from 'thumbhash'

/**
 * Gets a hash data URL from a source image using either thumbhash or blurhash.
 * @param src - Source image path
 * @param adjustedDimension - Adjusted dimension for the image
 * @param saturation - Saturation of the image
 * @param method - Hash method
 * @param format - Sharp output format
 * @param outputOptions - Sharp output options
 */
export const getHashDataUrl = async <
    Method extends HashMethods = 'thumbhash',
    Format extends DataUrlFormats = 'webp',
>({
    src,
    adjustedDimension = 20,
    saturation = 1.5,
    method = 'thumbhash' as Method,
    format = 'webp' as Format,
    outputOptions,
}: HashOptions<Method, Format>): Promise<string | undefined> => {
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
            method,
        })

        if (!processedImage) {
            return
        }

        if (method === 'thumbhash') {
            return await rgbaToDataUrl({
                data: new Uint8ClampedArray(
                    thumbHashToRGBA(
                        rgbaToThumbHash(
                            processedImage.width,
                            processedImage.height,
                            processedImage.data,
                        ),
                    ).rgba,
                ),
                width: processedImage.width,
                height: processedImage.height,
                format,
                outputOptions,
            })
        } else if (method === 'blurhash') {
            return await rgbaToDataUrl({
                data: decode(
                    encode(
                        processedImage.data as Uint8ClampedArray,
                        processedImage.width,
                        processedImage.height,
                        4,
                        4,
                    ),
                    processedImage.width,
                    processedImage.height,
                ),
                width: processedImage.width,
                height: processedImage.height,
                format,
                outputOptions,
            })
        }

        return undefined
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error getting ${method}:`, error.message)
        }
        return undefined
    }
}
