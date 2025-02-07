import { rgbaToThumbHash, thumbHashToRGBA } from 'thumbhash'
import { HashFunction } from '@/types/utils/hash/hash'

/**
 * Gets the RGBA data after encoding and decoding a Thumbhash.
 * @param data - Image data
 * @param width - Image width
 * @param height - Image height
 */
export const thumbhashRgba: HashFunction<'thumbhash'> = ({ data, width, height }) => {
    const { rgba, w, h } = thumbHashToRGBA(rgbaToThumbHash(width, height, data))

    return {
        data: rgba,
        width: w,
        height: h,
    }
}
