const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            minHeight: {
                'small-screen': ['100vh /* fallback */', '100svh'],
                'small-screen-1/2': ['50vh /* fallback */', '50svh'],
                'dynamic-screen': ['100vh /* fallback */', '100dvh'],
            },
            height: {
                'small-screen': ['100vh /* fallback */', '100svh'],
                'small-screen-1/2': ['50vh /* fallback */', '50svh'],
                'dynamic-screen': ['100vh /* fallback */', '100dvh'],
            },
            fontFamily: {
                heading: ['quincy-cf', ...defaultTheme.fontFamily.serif],
                body: ['Inter var', ...defaultTheme.fontFamily.sans],
                mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        function ({ addComponents, theme }) {
            addComponents({
                '.bg-hero': {
                    background:
                        'right/cover url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 xml:space=%22preserve%22 fill-rule=%22evenodd%22 stroke-linejoin=%22round%22 stroke-miterlimit=%222%22 clip-rule=%22evenodd%22 viewBox=%220 0 900 600%22%3E%3Cpath fill=%22%23FFFFFF%22 d=%22M0 0h900v600H0z%22/%3E%3Cpath fill=%22%23F2F4F7%22 fill-rule=%22nonzero%22 d=%22M359 600c58-49 117-97 134-169 16-71-8-166 25-213 33-48 123-48 196-66 74-19 130-56 186-93v541H359ZM541 0c-44 57-88 113-111 178-22 65-23 138-56 196s-99 100-167 126c-68 25-137 33-207 41V0h541Z%22/%3E%3Cpath fill=%22%23E5E8F0%22 fill-rule=%22nonzero%22 d=%22M630 600c29-24 58-49 66-84 9-36-4-84 13-107 16-24 62-24 98-33 37-9 65-28 93-46v270H630ZM270 0c-22 28-44 57-55 89-11 33-11 69-28 98s-50 50-83 63c-34 13-69 16-104 20V0h270Z%22/%3E%3C/svg%3E")',
                },
                '.bg-hero-dark': {
                    background:
                        'right/cover url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 xml:space=%22preserve%22 fill-rule=%22evenodd%22 stroke-linejoin=%22round%22 stroke-miterlimit=%222%22 clip-rule=%22evenodd%22 viewBox=%220 0 900 600%22%3E%3Cpath fill=%22%232e364d%22 d=%22M0 0h900v600H0z%22/%3E%3Cpath fill=%22%23172436%22 fill-rule=%22nonzero%22 d=%22M359 600c58-49 117-97 134-169 16-71-8-166 25-213 33-48 123-48 196-66 74-19 130-56 186-93v541H359ZM541 0c-44 57-88 113-111 178-22 65-23 138-56 196s-99 100-167 126c-68 25-137 33-207 41V0h541Z%22/%3E%3Cpath fill=%22%23001220%22 fill-rule=%22nonzero%22 d=%22M630 600c29-24 58-49 66-84 9-36-4-84 13-107 16-24 62-24 98-33 37-9 65-28 93-46v270H630ZM270 0c-22 28-44 57-55 89-11 33-11 69-28 98s-50 50-83 63c-34 13-69 16-104 20V0h270Z%22/%3E%3C/svg%3E")',
                },
            })
        },
    ],
    darkMode: 'class',
}
