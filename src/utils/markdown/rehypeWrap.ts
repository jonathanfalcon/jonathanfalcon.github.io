import { visit } from 'unist-util-visit'
import { selectAll } from 'hast-util-select'
import { parseSelector } from 'hast-util-parse-selector'

import { RehypePlugin } from '@astrojs/markdown-remark'
import { Root } from 'hast'

type Option = {
    selector: string
    wrapper: string
}

type Options = Option | Option[]

const wrapElement = (tree: Root, { selector, wrapper }: Option) => {
    for (const match of selectAll(selector, tree)) {
        visit(tree, match, (elementToWrap, index, parentElement) => {
            const elementWrapper = parseSelector(wrapper)
            elementWrapper.children = [elementToWrap]

            if (parentElement && index) {
                parentElement.children[index] = elementWrapper
            }
        })
    }
}

export const rehypeWrap: RehypePlugin = (options: Options) => {
    return (tree) => {
        if (Array.isArray(options)) {
            for (const option of options) {
                wrapElement(tree, option)
            }
        } else {
            wrapElement(tree, options)
        }
    }
}
