import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // This tells ESLint which files to check
    files: ['**/*.ts'],
    plugins: {
      playwright,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      ...playwright.configs['recommended'].rules,
      // Custom overrides
      'playwright/no-skipped-test': 'error',
      'playwright/no-wait-for-timeout': 'warn',
    },
  }
);