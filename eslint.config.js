import eslint from '@eslint/js';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tsPlugin from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx,vue}'],
    },
    {
        ignores: ['node_modules', '.nuxt', '.output', '.dist', 'scripts', 'public'],
    },

    eslint.configs.recommended,

    prettierPlugin,
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx,vue}'],
        rules: {
            'prettier/prettier': 'error',
        },
    },

    ...tsPlugin.configs.recommended,
    {
        files: ['**/*.{ts,mts,tsx}'],
        rules: {
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
        languageOptions: {
            parserOptions: {
                parser: tsPlugin.parser,
            },
        },
    },

    ...vuePlugin.configs['flat/essential'],
    {
        files: ['**/*.vue'],
        rules: {
            'no-undef': 'off',
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsPlugin.parser, // parse TS inside VUE
            },
        },
    },
];
