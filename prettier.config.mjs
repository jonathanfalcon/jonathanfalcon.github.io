/** @type {import('prettier').Config} */
export default {
    printWidth: 100,
    semi: false,
    singleQuote: true,
    jsxSingleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
    overrides: [
        {
            files: '*.astro',
            options: { parser: 'astro' },
        },
    ],
}
