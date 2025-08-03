// @ts-nocheck
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginNode from 'eslint-plugin-node';
import eslintPluginPromise from 'eslint-plugin-promise';

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
    'no-console': 'off',
    'import/order': ['warn', { 'newlines-between': 'always' }],
    'node/no-unsupported-features/es-syntax': 'off',
    camelcase: ['error'],
    indent: ['error', 2],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'arrow-spacing': ['error'],
    'block-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'dot-notation': ['error', { allowPattern: '^[a-z]+(_[a-z]+)+$' }],
  },
};
