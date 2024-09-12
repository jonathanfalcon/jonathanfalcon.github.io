import eslint from '@eslint/js'
import tslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import astro from 'eslint-plugin-astro'

export default [
    eslint.configs.recommended,
    ...tslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
            ],
        },
    },
    ...astro.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
        ...react.configs.flat.recommended,
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        ignores: ['dist', 'node_modules', 'project_assets', '**/.*', '*/env.d.ts'],
    },
]
