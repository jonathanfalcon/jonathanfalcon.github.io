import type { ImageOutputFormat } from 'astro'
import type { HTMLAttributes } from 'astro/types'
import type { HashOptions } from '@/types/utils/hash/hash'

/**
 * Type for properties of the `<Image />` component. This type extends standard HTML attributes for the `<img>` element.
 *
 * @property src - The source of the image, which can be a string URL, an `ImageMetadata` object, or a promise resolving to `ImageMetadata` or an object containing a default export of `ImageMetadata`.
 * @property hashOptions - Options for `getHashDataUrl()`.
 * @property width - The width of the image in pixels.
 * @property height - The height of the image in pixels.
 * @property widths - A list of widths to generate for the image.
 * @property sizes A string specifying the sizes of the image for different viewport configurations.
 * @property alt A description of the image for accessibility purposes.
 */
export type ImageProps = {
    src: string | ImageMetadata | Promise<ImageMetadata | { default: ImageMetadata }>
    hashOptions?: Omit<HashOptions, 'src'>
    format?: ImageOutputFormat
    width?: number
    height?: number
    widths?: number[]
    sizes?: string
    alt: string
} & Omit<HTMLAttributes<'img'>, 'src'>

/**
 * Type for properties of the `<Picture />` component. Extends the ImageProps type.
 *
 * @property formats - An optional array of supported image input formats.
 * @property fallbackFormat - An optional single image input format to be used as a fallback.
 * @property pictureAttributes - Optional HTML attributes to be applied to the picture element.
 *
 * @see ImageProps
 */
export type PictureProps = ImageProps & {
    formats?: ImageOutputFormat[]
    fallbackFormat?: ImageOutputFormat
    pictureAttributes?: HTMLAttributes<'picture'>
}
