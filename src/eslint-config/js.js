// @ts-nocheck
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginNode from 'eslint-plugin-node';
import eslintPluginPromise from 'eslint-plugin-promise';

import { commonRules } from './common-rules.js';

export default {
  files: ['**/*.{js,mjs,cjs}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
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
