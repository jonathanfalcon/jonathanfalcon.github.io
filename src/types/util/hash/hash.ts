import type { HashMethods } from './processImage'
import type { DataUrlFormats, RgbaToDataUrlOptions } from './rgbaToDataUrl'

/**
 * Type for options to process an image.
 */
export type ProcessImageOptions<Method extends HashMethods> = {
    src: string
    adjustedDimension?: number
    saturation?: number
    method?: Method
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
export type HashOptions<
    Method extends HashMethods,
    Format extends DataUrlFormats,
> = ProcessImageOptions<Method> & RgbaToDataUrlOptions<Format>