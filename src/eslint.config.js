// @ts-nocheck
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginNode from 'eslint-plugin-node';
import eslintPluginPromise from 'eslint-plugin-promise';
import stylistic from '@stylistic/eslint-plugin';

export default [
  // fichiers à ignorer globalement
  {
    ignores: ['node_modules/', 'dist/', 'coverage/'],
  },

  // configuration pour les fichiers JavaScript
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      import: eslintPluginImport,
      node: eslintPluginNode,
      promise: eslintPluginPromise,
      '@stylistic': stylistic,
    },
    rules: {
      'no-console': 'off',
      'import/order': ['warn', { 'newlines-between': 'always' }],
      'node/no-unsupported-features/es-syntax': 'off',

      // style général
      camelcase: ['error'],
      indent: ['error', 2],
      quotes: ['error', 'single', { 'avoidEscape': true }],
      semi: ['error', 'always'],

      // style d'espacement
      'arrow-spacing': ['error'],
      'block-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],

      // accés aux props
      'dot-notation': ['error', { allowPattern: '^[a-z]+(_[a-z]+)+$' }],
      '@stylistic/dot-location': ['error', 'property'],

      // Mise en forme des blocs
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      ],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
        catch: 'always',
      }],
      '@stylistic/object-curly-spacing': ['error', 'always', {
        arraysInObjects: false,
        objectsInObjects: false,
      }],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
    },
  },

  // configuration TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: await import('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json', // si utilisation des règles type-aware
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': await import('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      // Règles de base TypeScript
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      // On pourrat ajouter les autres plus tard
    },
  },
];
