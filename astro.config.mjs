import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import path from 'path'
import rehypeShiftHeading from 'rehype-shift-heading'
import wrap from 'rehype-wrap-all'
import react from '@astrojs/react'

import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
    site: 'https://jonathanfalcon.com',
    server: {
        port: 4000,
        host: true,
    },
    output: 'static',
    markdown: {
        rehypePlugins: [
            [
                rehypeShiftHeading,
                {
                    shift: 1,
                },
            ],
            [
                wrap,
                {
                    selector: 'table',
                    wrapper: 'div.prose-table-wrapper',
                },
            ],
        ],
    },
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        mdx(),
        sitemap(),
        react(),
        compress({
            CSS: {
                comments: false,
            },
            HTML: {
                removeAttributeQuotes: false,
                removeComments: true,
            },
            Image: false,
            JavaScript: {
                comments: false,
            },
            SVG: false,

            logger: 1,
        }),
    ],
    vite: {
        resolve: {
            alias: {
                '@': path.resolve('./src'),
            },
        },
    },
})
