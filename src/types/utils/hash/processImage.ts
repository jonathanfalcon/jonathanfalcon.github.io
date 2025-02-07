/**
 * Type for map of processed image data formats.
 */
export type ProcessedImageDataFormatMap = {
    blurhash: Uint8ClampedArray
    thumbhash: Uint8Array
}

/**
 * Type for processed image data formats.
 */
export type HashMethods = keyof ProcessedImageDataFormatMap

/**
 * Type for base processed image data.
 *
 * @property width - Image width
 * @property height - Image height
 */
type ProcessedImage_Base = {
    width: number
    height: number
}

/**
 * Type for processed image data.
 *
 * @property data - Image data
 * @property width - Image width
 * @property height - Image height
 */
export type ProcessedImage = ProcessedImage_Base & {
    data: Uint8Array
    dataClamped: Uint8ClampedArray
}

/**
 * Type for inclusive processed image data.
 *
 * @property data - Image data
 * @property width - Image width
 * @property height - Image height
 */
export type ProcessedImageInclusive = ProcessedImage_Base & {
    data: Uint8Array | Uint8ClampedArray
}

/**
 * Type for specific processed image data.
 *
 * @property data - Image data
 * @property width - Image width
 * @property height - Image height
 */
export type ProcessedImageSpecific<Method extends HashMethods> = ProcessedImage_Base & {
    data: ProcessedImageDataFormatMap[Method]
}
