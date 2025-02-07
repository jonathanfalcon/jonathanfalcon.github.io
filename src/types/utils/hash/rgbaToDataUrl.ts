import type {
    AvifOptions,
    GifOptions,
    HeifOptions,
    Jp2Options,
    JpegOptions,
    JxlOptions,
    PngOptions,
    TiffOptions,
    WebpOptions,
} from 'sharp'

/**
 * Type for map of `sharp` format options.
 */
type FormatOptionsMap = {
    jpeg: JpegOptions
    png: PngOptions
    webp: WebpOptions
    avif: AvifOptions
    heif: HeifOptions
    jxl: JxlOptions
    gif: GifOptions
    jp2: Jp2Options
    tiff: TiffOptions
}

/**
 * Type for data URL formats. Based on `sharp` formats.
 */
export type DataUrlFormats = keyof FormatOptionsMap

/**
 * Type for rgba to data URL options. Based on `sharp` formats and output options.
 *
 * @property format - Data URL format
 * @property outputOptions - Data URL output options
 */
export type RgbaToDataUrlOptions = {
    format: DataUrlFormats
    outputOptions?: FormatOptionsMap[DataUrlFormats]
}
