import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import rehypeShiftHeading from 'rehype-shift-heading'
import rehypeWrap from 'rehype-wrap-all'
import react from '@astrojs/react'
import playformCompress from '@playform/compress'
import partytown from '@astrojs/partytown'
import icon from 'astro-icon'
import githubCustomTheme from './github-custom.json'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// https://astro.build/config
export default defineConfig({
    site: 'https://jonathanfalcon.com',
    server: {
        port: 4000,
        host: true,
    },
    output: 'static',
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [
            [
                rehypeShiftHeading,
                {
                    shift: 1,
                },
            ],
            [
                rehypeWrap,
                [
                    {
                        selector: 'table',
                        wrapper: 'div.prose-table-wrapper',
                    },
                ],
            ],
            rehypeKatex,
        ],
        shikiConfig: { theme: githubCustomTheme },
    },
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        mdx(),
        sitemap(),
        // react(), Currently unused
        playformCompress({
            CSS: {
                csso: {
                    comments: false,
                },
                lightningcss: {
                    include: 262144, // VendorPrefixes: Prevents removal of -webkit-backdrop-filter in WorkItem.astro
                },
            },
            HTML: {
                'html-minifier-terser': {
                    removeComments: true,
                },
            },
            Image: false,
            JavaScript: {
                comments: false,
            },
            SVG: false,
            logger: 1,
        }),
        partytown({
            config: { forward: ['dataLayer.push'] },
        }),
        icon(),
    ],
})
