// eslint.config.mjs
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  // 🔹 TypeScript recommended rules
  tseslint.configs.recommended,

  // 🔹 Playwright recommended rules
  playwright.configs['flat/recommended'],

  // 🔹 Custom globals & rules (using ONLY valid rule names)
  {
    languageOptions: {
      globals: {
        test: 'readonly',
        expect: 'readonly',
        page: 'readonly',
        context: 'readonly',
        browser: 'readonly',
      },
    },
    rules: {
      // ✅ All these rules exist in eslint-plugin-playwright@^2.0.0
      'playwright/no-focused-test': 'error',           // Ban .only()
      'playwright/missing-playwright-await': 'error',   // Catch missing await
      'playwright/valid-expect': 'error',               // Enforce correct expect()
      'playwright/valid-title': 'warn',                 // Require non-empty test titles
      'playwright/no-skipped-test': 'warn',             // Warn on .skip()
      'playwright/no-wait-for-timeout': 'warn',         // Discourage hard waits
    },
  },

  // 🔹 Ignore generated directories
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'allure-results/**',
      'allure-report/**',
    ],
  }
);