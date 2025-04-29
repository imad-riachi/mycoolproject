import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import nextEslint from '@next/eslint-plugin-next';
import * as mdx from 'eslint-plugin-mdx';

/** @type {import('eslint').Linter.Config[]} */

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], ignores: ['node_modules'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  ...tseslint.configs.recommended,
  { ...mdx.flat },
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin, '@next/next': nextEslint },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/prop-types': 'off',
    },
    settings: { react: { version: 'detect' } }, // Add this line
  },
];
