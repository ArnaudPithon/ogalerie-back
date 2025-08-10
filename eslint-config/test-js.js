import vitestPlugin from 'eslint-plugin-vitest';

import jsConfig from './javascript.js';

export default {
  files: ['./src/**/*.test.js', './src/__tests__/**/*.js'],
  languageOptions: {
    ...jsConfig.languageOptions,
    globals: {
      ...jsConfig.languageOptions.globals,
      // ...vitestPlugin.environments.env.globals,
    },
  },
  plugins: {
    ...jsConfig.plugins,
    vitest: vitestPlugin,
  },
  rules: {
    ...jsConfig.rules,
    ...vitestPlugin.configs.recommended.rules,
    // 🌟 Bonnes pratiques avec vitest
    'vitest/no-focused-tests': 'error',        // interdit `test.only`
    'vitest/no-disabled-tests': 'warn',         // avertit sur `test.skip`
    'vitest/no-identical-title': 'error',       // pas de doublons de noms de test
    'vitest/expect-expect': 'warn',             // oblige à utiliser `expect` dans les tests

    // 🧹 Style et clarté
    'no-console': 'off',                        // console.log utile pour le débogage
    'max-lines-per-function': 'off',            // parfois on veut du verbiage

    // ⚠️ Moins strict sur les types/structure
    'no-unused-expressions': 'off',             // autorise `expect(foo).toBe(true)` sans assignation
  },
};
