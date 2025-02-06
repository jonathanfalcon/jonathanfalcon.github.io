import { shiftHeading } from 'hast-util-shift-heading'
import type { RehypePlugin } from '@astrojs/markdown-remark'

export const rehypeDemoteHeading: RehypePlugin = (demoteBy: number = 1) => {
    return (tree) => {
        shiftHeading(tree, demoteBy)
    }
}
