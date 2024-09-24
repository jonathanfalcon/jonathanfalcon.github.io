import path from 'node:path'
import sharp from 'sharp'

/**
 * Type for processed image data.
 *
 * @property {Uint8ClampedArray} data - Image data
 * @property {number} width - Image width
 * @property {number} height - Image height
 */
interface ProcessedImage {
    data: Uint8ClampedArray
    width: number
    height: number
}

/**
 * Resolves the absolute path of an image file using the provided path from an image metadata object's `src` property.
 *
 * The function will resolve the path depending on the environment:
 * - Development: base directory is `.` (`/src` is already included in `pathToResolve`)
 * - Production: base directory is `/dist`
 *
 * @param pathToResolve Path to resolve
 * @returns Resolved absolute path
 */
const resolveAbsolutePath = (pathToResolve: string) => {
    const baseDirectory = import.meta.env.PROD ? './dist' : '.'

    const relevantPath = pathToResolve.substring(pathToResolve.indexOf('/src'))

    const joinedPath = path.join(baseDirectory, relevantPath)

    return path.resolve(joinedPath).split('?')[0]
}

/**
 * Processes an image by resizing and saturating it.
 *
 * @param src - Image source
 * @param adjustedDimension - Adjusted dimension of the image
 * @param saturation - Saturation of the image
 * @returns Processed image data or undefined if an error occurred
 */
export const processImage = async (
    src: string,
    adjustedDimension: number = 20,
    saturation: number = 1.5,
): Promise<ProcessedImage | undefined> => {
    try {
        const absolutePath = resolveAbsolutePath(src)

        const baseImage = sharp(absolutePath)

        const { height: baseHeight, width: baseWidth } = await baseImage.metadata()

        if (!baseHeight || !baseWidth) {
            console.error('Image height or width is undefined')
            return
        }

        const resizeOptions =
            baseHeight >= baseWidth ? { height: adjustedDimension } : { width: adjustedDimension }

        const image = sharp(
            await baseImage.resize(resizeOptions).modulate({ saturation }).toBuffer(),
        )

        const [imageBuffer, { height, width }] = await Promise.all([
            image.raw().ensureAlpha().toBuffer(),
            image.metadata(),
        ])

        if (!height || !width) {
            console.error('Image height or width is undefined')
            return
        }

        return {
            data: new Uint8ClampedArray(imageBuffer),
            width: width,
            height: height,
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error processing image:', { src, error: error })
        }
        return
    }
}

/**
 * Converts a base64 PNG data url to a base64 WebP data url.
 *
 * @param base64Png - Base64 PNG data url
 * @returns Base64 WebP data url or undefined if an error occurred
 */
export const convertBase64PngToWebp = async (base64Png: string): Promise<string | undefined> => {
    try {
        const base64Image = base64Png.split(',')[1]

        const buffer = Buffer.from(base64Image, 'base64')

        const webpBuffer = await sharp(buffer).webp({ lossless: true }).toBuffer()

        return `data:image/webp;base64,${webpBuffer.toString('base64')}`
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error converting PNG to WebP:', error.message)
        }
        return
    }
}
