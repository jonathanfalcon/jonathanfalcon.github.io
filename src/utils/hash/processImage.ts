import type { ProcessImageOptions } from '@/types/util/hash/hash'
import type { HashMethods, ProcessedImage } from '@/types/util/hash/processImage'
import type { DataUrlFormats, RgbaToDataUrlOptions } from '@/types/util/hash/rgbaToDataUrl'

import path from 'node:path'
import sharp from 'sharp'

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
 * @param method - Hash method
 * @param adjustedDimension - Adjusted dimension of the image
 * @param saturation - Saturation of the image
 * @returns Processed image data or undefined if an error occurred
 */
export const processImage = async <Method extends HashMethods = 'thumbhash'>({
    src,
    method = 'thumbhash' as Method,
    adjustedDimension = 20,
    saturation = 1.5,
}: ProcessImageOptions<Method>): Promise<ProcessedImage<Method> | undefined> => {
    try {
        const absolutePath = resolveAbsolutePath(src)

        const baseImage = sharp(absolutePath)

        const { height: baseHeight, width: baseWidth } = await baseImage.metadata()

        if (!baseHeight || !baseWidth) {
            console.error('Image height or width is undefined')
            return undefined
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
            return undefined
        }

        return {
            data:
                method === 'thumbhash'
                    ? new Uint8ClampedArray(imageBuffer)
                    : new Uint8Array(imageBuffer),
            width,
            height,
        } as ProcessedImage<Method>
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error processing image:', { src, error: error })
        }
        return undefined
    }
}

export const rgbaToDataUrl = async <
    Method extends HashMethods = 'thumbhash',
    Format extends DataUrlFormats = 'webp',
>({
    data,
    width,
    height,
    format = 'webp' as Format,
    outputOptions,
}: ProcessedImage<Method> & RgbaToDataUrlOptions<Format>): Promise<string> => {
    const buffer = Buffer.from(data)

    const formattedBuffer = await sharp(buffer, {
        raw: {
            width,
            height,
            channels: 4,
        },
    })
        .toFormat(format, outputOptions)
        .toBuffer()

    return `data:image/${format};base64,${formattedBuffer.toString('base64')}`
}
