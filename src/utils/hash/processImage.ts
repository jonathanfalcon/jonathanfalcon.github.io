import type { ProcessImageOptions } from '@/types/utils/hash/hash'
import type { ProcessedImage, ProcessedImageInclusive } from '@/types/utils/hash/processImage'
import type { RgbaToDataUrlOptions } from '@/types/utils/hash/rgbaToDataUrl'

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
    const cwd = process.cwd()

    const baseDirectory = path.resolve(cwd, import.meta.env.PROD ? './dist' : '.')

    const relevantPath = import.meta.env.PROD
        ? pathToResolve
        : pathToResolve.slice(pathToResolve.indexOf(cwd) + cwd.length).split('?')[0]

    return path.join(baseDirectory, relevantPath)
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
export const processImage = async ({
    src,
    adjustedDimension,
    saturation,
}: ProcessImageOptions): Promise<ProcessedImage | undefined> => {
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
            data: new Uint8Array(imageBuffer),
            dataClamped: new Uint8ClampedArray(imageBuffer),
            width,
            height,
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error processing image:', { src, error: error })
        }
        return undefined
    }
}

export const rgbaToDataUrl = async ({
    data,
    width,
    height,
    format,
    outputOptions,
}: ProcessedImageInclusive & RgbaToDataUrlOptions): Promise<string> => {
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
