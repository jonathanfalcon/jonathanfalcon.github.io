import { visit } from 'unist-util-visit'
import { selectAll } from 'hast-util-select'

import { RehypePlugin } from '@astrojs/markdown-remark'
import { Properties, Root, Element } from 'hast'

type Option = {
    selector: string
    wrapper: keyof HTMLElementTagNameMap
    attributes?: Properties
}

type Options = Option | Option[]

const wrapElement = (tree: Root, { selector, wrapper, attributes }: Option) => {
    for (const match of selectAll(selector, tree)) {
        visit(tree, match, (elementToWrap, index, parentElement) => {
            const wrapperElement: Element = {
                type: 'element',
                tagName: wrapper,
                properties: attributes || {},
                children: [elementToWrap],
            }

            if (parentElement && index) parentElement.children[index] = wrapperElement
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
