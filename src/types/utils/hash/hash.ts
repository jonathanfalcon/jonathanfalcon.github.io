import type { HashMethods, ProcessedImageSpecific, ProcessedImageInclusive } from './processImage'
import type { RgbaToDataUrlOptions } from './rgbaToDataUrl'

/**
 * Type for specific hash options.
 */
export type SpecificHashOptionsMap = {
    thumbhash?: never
    blurhash?: { componentY: number; componentX: number }
}

/**
 * Type for options to process an image.
 */
export type ProcessImageOptions = {
    src: string
    adjustedDimension: number
    saturation: number
}

/**
 * Type for hash options.
 *
 * @property src - Source image URL
 * @property adjustedDimension - Adjusted dimension for the image
 * @property saturation - Saturation of the image
 * @property method - Hash method
 * @property format - Sharp output format
 * @property outputOptions - Sharp output options
 */
export type HashOptions = Partial<ProcessImageOptions & RgbaToDataUrlOptions> & {
    src: string
    method?: HashMethods
    methodOptions?: SpecificHashOptionsMap
}

/**
 * Type for hash function. Based on specific hash method and corresponding options.
 */
export type HashFunction<Method extends HashMethods> = (
    options: ProcessedImageSpecific<Method> & SpecificHashOptionsMap,
) => ProcessedImageInclusive
