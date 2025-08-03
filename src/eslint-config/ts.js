export default {
  files: ['**/*.ts'],
  languageOptions: {
    parser: await import('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      tsconfigRootDir: process.cwd(),
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': await import('@typescript-eslint/eslint-plugin'),
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
  },
};
