// @ts-nocheck
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginNode from 'eslint-plugin-node';
import eslintPluginPromise from 'eslint-plugin-promise';

import { commonRules, languageOptions } from './_common.js';

export default {
  languageOptions: {
    ...languageOptions,
  },
  files: ['**/*.{js,mjs,cjs}'],
  plugins: {
    import: eslintPluginImport,
    node: eslintPluginNode,
    promise: eslintPluginPromise,
  },
  rules: {
    ...commonRules,
    'no-console': 'off',
    'import/order': ['warn', { 'newlines-between': 'always' }],
    'node/no-unsupported-features/es-syntax': 'off',
  },
};
