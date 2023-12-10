import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import path from 'path'
import rehypeShiftHeading from 'rehype-shift-heading'
import wrap from 'rehype-wrap-all'
import react from '@astrojs/react'
import compress from 'astro-compress'
import partytown from '@astrojs/partytown'
import githubCustomTheme from './github-custom.json'

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
        shikiConfig: { theme: githubCustomTheme },
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
        partytown({
            config: { forward: ['dataLayer.push'] },
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
