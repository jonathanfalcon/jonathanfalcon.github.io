import { defineConfig } from 'astro/config'
import tailwind from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
// import react from '@astrojs/react'
import playformCompress from '@playform/compress'
import partytown from '@astrojs/partytown'
import icon from 'astro-icon'
import githubCustomTheme from './github-custom.json'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
// noinspection ES6PreferShortImport
import { rehypeDemoteHeading } from './src/utils/markdown/rehypeDemoteHeading'
// noinspection ES6PreferShortImport
import { rehypeWrap } from './src/utils/markdown/rehypeWrap'
// noinspection ES6PreferShortImport
import { remarkResolveJsxPaths } from './src/utils/markdown/remarkResolveJsxPaths'

// https://astro.build/config
export default defineConfig({
    site: 'https://jonathanfalcon.com',
    server: {
        port: 4000,
        host: true,
    },
    output: 'static',
    markdown: {
        remarkPlugins: [remarkMath, [remarkResolveJsxPaths, { attributeNames: ['src'] }]],
        rehypePlugins: [
            rehypeDemoteHeading,
            [
                rehypeWrap,
                [
                    {
                        selector: 'table',
                        wrapper: 'div',
                        attributes: {
                            className: 'relative overflow-x-auto rounded-lg',
                            tabIndex: 0,
                        },
                    },
                ],
            ],
            rehypeKatex,
        ],
        shikiConfig: { theme: githubCustomTheme },
    },
    integrations: [
        mdx(),
        sitemap(),
        // react(), Currently unused
        partytown({
            config: { forward: ['dataLayer.push'] },
        }),
        icon(),
        playformCompress({
            CSS: false,
            HTML: {
                'html-minifier-terser': {
                    removeComments: true,
                },
            },
            Image: false,
            JavaScript: {
                terser: {
                    format: {
                        comments: false,
                    },
                },
            },
            SVG: false,
            Logger: 1,
        }),
    ],
    vite: {
        plugins: [tailwind()],
    },
})
