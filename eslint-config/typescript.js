import eslintPluginImport from 'eslint-plugin-import';

import { commonRules, languageOptions, settings } from './_common.js';

export default {
  files: ['./src/**/*.ts'],
  languageOptions: {
    ...languageOptions,
    parser: await import('@typescript-eslint/parser'),
    parserOptions: {
      tsconfigRootDir: process.cwd(),
      project: './tsconfig.eslint.json',
    },
  },
  plugins: {
    typescript: (await import('@typescript-eslint/eslint-plugin')).default,
    import: eslintPluginImport,
  },
  settings: {
    ...settings,
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
        project: './tsconfig.json',
      },
    }
  },
  rules: {
    ...commonRules,
    'typescript/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'typescript/explicit-function-return-type': 'off',
    'typescript/no-explicit-any': 'warn',
    'typescript/ban-ts-comment': 'warn',

    // Type-aware (nécessite parserOptions.project)
    'typescript/no-floating-promises': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/no-unnecessary-type-assertion': 'warn',
    'typescript/no-unnecessary-type-constraint': 'warn',
    'typescript/restrict-template-expressions': [
      'warn',
      {
        allowNumber: true,
        allowBoolean: false,
        allowAny: false,
        allowNullish: false,
      },
    ],
    'typescript/prefer-includes': 'warn',
    'typescript/prefer-nullish-coalescing': 'warn',
    'typescript/prefer-optional-chain': 'warn',
    'typescript/await-thenable': 'warn',
    'typescript/consistent-type-imports': 'warn',
    'typescript/no-confusing-void-expression': ['warn', { ignoreArrowShorthand: true }],
    'import/extensions': ['error', 'ignorePackages', {
      'js': 'always',
      'ts': 'never'
    }]
  },
};
