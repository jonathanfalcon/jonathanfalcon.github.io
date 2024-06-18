declare module 'rehype-wrap-all' {
    import { RehypePlugin } from 'astro'

    type RehypeWrapAllOptions = {
        selector: string
        wrapper: string
    }

    export default function rehypeWrapAll(options: RehypeWrapAllOptions): RehypePlugin
}
