import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
    override: {
        classGroups: {
            'font-family': ['heading', 'body', 'mono'],
        },
    },
})

/**
 * Combines `tailwindcss` class names with `clsx` and resolves conflicts using `twMerge`.
 *
 * @param inputs Class names or expressions (strings, objects, arrays)
 * @returns Merged class name string
 */
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}
