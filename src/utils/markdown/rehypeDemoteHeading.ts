import { shiftHeading } from 'hast-util-shift-heading'
import { RehypePlugin } from '@astrojs/markdown-remark'

type Options = {
    demote: number
}

const defaultOptions: Options = {
    demote: 1,
}

export const rehypeDemoteHeading: RehypePlugin = (options: Options = defaultOptions) => {
    options = { ...defaultOptions, ...options }

    return (tree) => {
        shiftHeading(tree, options.demote)
    }
}
