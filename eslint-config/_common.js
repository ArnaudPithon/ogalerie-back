import globals from 'globals';

export const languageOptions = {
  ecmaVersion: 'latest',
  sourceType: 'module',
  globals: {
    ...globals.es2022,
    ...globals.node,
  },
};

export const settings = {
  'import/resolver': {
    node: {
      extensions: ['.js', '.mjs', '.cjs', 'jsx', '.ts', '.tsx'],
    },
    typescript: {
      project: './tsconfig.eslint.json',
    },
  },
};

export const commonRules = {
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
  'no-undef': 'error',
  'import/no-unresolved': 'error',
  'import/named': 'error',
};
