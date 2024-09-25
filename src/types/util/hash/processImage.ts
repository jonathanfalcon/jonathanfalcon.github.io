/**
 * Type for map of processed image data formats.
 */
export type ProcessedImageDataFormatMap = {
    blurhash: Uint8Array
    thumbhash: Uint8ClampedArray
}

/**
 * Type for processed image data formats.
 */
export type HashMethods = keyof ProcessedImageDataFormatMap


/**
 * Type for processed image data.
 *
 * @property data - Image data
 * @property width - Image width
 * @property height - Image height
 */
export type ProcessedImage<Method extends HashMethods> = {
    data: ProcessedImageDataFormatMap[Method]
    width: number
    height: number
}
