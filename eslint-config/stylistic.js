import stylistic from '@stylistic/eslint-plugin';

export default {
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    '@stylistic/dot-location': ['error', 'property'],
    '@stylistic/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']},
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
};
