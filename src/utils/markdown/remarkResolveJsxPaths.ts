import type { RemarkPlugin } from '@astrojs/markdown-remark'
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'

import { visit } from 'unist-util-visit'

/**
 * Resolves a path based on the current markdown file. Handles paths starting with: `@/`, and `./`. If a path starts with `/src`, it will be returned as is.
 *
 * @param path - Path to resolve
 * @param markdownPath - Path of the markdown file
 * @returns Resolved path
 */
const resolvePath = (path: string, markdownPath: string) => {
    if (path.startsWith('/src')) {
        return path
    }

    if (path.startsWith('@/')) {
        return path.replace('@', '/src')
    }

    if (path.startsWith('./')) {
        return path.replace(
            '.',
            markdownPath.slice(markdownPath.indexOf('/src'), markdownPath.lastIndexOf('/')),
        )
    }

    return path
}

/**
 * Type for the options of the `remarkResolveJsxPaths` plugin.
 *
 * @property attributeNames - Array of attribute names to resolve paths for.
 */
interface Options {
    attributeNames?: string[]
}

/**
 * Resolves paths in JSX attributes. Handles paths starting with: `@/` and `./`. If a path starts with `/src`, it will be returned as is.
 *
 * @param options - Options for the plugin. See {@link Options}
 */
export const remarkResolveJsxPaths: RemarkPlugin = ({ attributeNames }: Options) => {
    return (tree, { history }) => {
        const markdownPath = history[0]

        visit(tree, 'mdxJsxFlowElement', (node: MdxJsxFlowElement) => {
            node.attributes.forEach((attribute) => {
                if (
                    attribute.type === 'mdxJsxExpressionAttribute' ||
                    typeof attribute.value !== 'string'
                ) {
                    return
                }

                if (attributeNames) {
                    if (attributeNames.includes(attribute.name)) {
                        attribute.value = resolvePath(attribute.value, markdownPath)
                    }
                    return
                }

                attribute.value = resolvePath(attribute.value, markdownPath)
            })
        })
    }
}
