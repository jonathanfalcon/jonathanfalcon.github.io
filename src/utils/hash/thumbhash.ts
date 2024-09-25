import type {HashMethods} from '@/types/util/hash/processImage'
import type {DataUrlFormats} from '@/types/util/hash/rgbaToDataUrl'
import type {HashOptions} from '@/types/util/hash/hash'

import { rgbaToThumbHash, thumbHashToRGBA } from 'thumbhash'
import { processImage, rgbaToDataUrl } from './processImage'

/**
 * Gets a thumbhash data URL from a source image.
 *
 * @param src - Source image path
 * @param adjustedDimension - Adjusted dimension for the image
 * @param saturation - Saturation of the image
 * @param method - Hash method
 * @param format - Sharp output format
 * @param outputOptions - Sharp output options
 */
export const getThumbHashDataUrl =async <
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
        if (adjustedDimension > 100) {
            console.error(
                'Adjusted dimension must be less than or equal to 100. Will use 100 instead.',
            )
            adjustedDimension = 100
        }

        const processedImage = await processImage(src, adjustedDimension, saturation)

        if (!processedImage) {
            return
        }

        const data = thumbHashToRGBA(
            rgbaToThumbHash(processedImage.width, processedImage.height, processedImage.data),
        )

        return await rgbaToDataUrl({
            data: new Uint8ClampedArray(data.rgba),
            width: data.w,
            height: data.h,
            format,
            outputOptions,
        })
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error getting thumbhash:', { src, error: error.message })
        }
        return
    }
}
