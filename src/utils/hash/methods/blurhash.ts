import { decode, encode } from 'blurhash'
import { HashFunction } from '@/types/utils/hash/hash'

/**
 * Gets the RGBA data after encoding and decoding a Blurhash.
 * @param data - Image data
 * @param width - Image width
 * @param height - Image height
 * @param blurhash - Blurhash options
 */
export const blurhashRgba: HashFunction<'blurhash'> = ({ data, width, height, blurhash }) => {
    let componentX
    let componentY

    if (blurhash && 'componentX' in blurhash && 'componentY' in blurhash) {
        componentX = blurhash.componentX
        componentY = blurhash.componentY
    } else {
        componentX = 4
        componentY = 4
    }

    return {
        data: decode(encode(data, width, height, componentX, componentY), width, height),
        width,
        height,
    }
}
