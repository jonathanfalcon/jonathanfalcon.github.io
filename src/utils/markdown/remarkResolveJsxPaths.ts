import type { RemarkPlugin } from '@astrojs/markdown-remark'
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'

import { visit } from 'unist-util-visit'

/**
 * Resolves a path based on the current markdown file. Handles paths starting with: `@/`, and `./`. If a path starts with `/src`, it will be returned as is.
 *
 * @param path - Path to resolve
 * @param relativePath - Path of the markdown file relative to the project root
 * @returns Resolved path
 */
const resolvePath = (path: string, relativePath: string) => {
    if (path.startsWith('/src')) {
        return path
    }

    if (path.startsWith('@/')) {
        return path.replace('@', '/src')
    }

    if (path.startsWith('./')) {
        return path.replace('.', relativePath)
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
    return (tree, { dirname, cwd }) => {
        const relativePath = dirname?.replace(cwd, '')

        if (!relativePath) {
            console.error('Could not resolve relative path for markdown file')
            return
        }

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
                        attribute.value = resolvePath(attribute.value, relativePath)
                    }
                    return
                }

                attribute.value = resolvePath(attribute.value, relativePath)
            })
        })
    }
}
