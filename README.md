# Playwright Test Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.58.2-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org)

A modern, scalable, and maintainable end-to-end test automation framework built with **Playwright** and **TypeScript**, following industry best practices and the **Page Object Model (POM)** design pattern.

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 🎯 **Page Object Model** | Clean, maintainable page objects with base class inheritance |
| 🔧 **Custom Fixtures** | Dependency injection for reusable test components |
| 🌐 **Multi-Browser** | Cross-browser testing (Chromium, Firefox, WebKit) |
| 🏷️ **Test Tagging** | Selective test execution with `@smoke`, `@login` tags |
| 📊 **HTML Reports** | Interactive test reports with trace viewer |
| 🔄 **CI/CD Ready** | GitHub Actions workflow for automated testing |
| 📝 **TypeScript** | Full type safety with strict mode enabled |
| 🧩 **Test Data Management** | JSON-based test data separation |
| 🎭 **Parallel Execution** | Fast test runs with parallel processing |

---

## 📋 Prerequisites

Ensure you have the following installed:

```bash
Node.js >= 18.x    # LTS recommended
npm >= 9.x
Git
```

Verify installations:
```bash
node --version
npm --version
git --version
```

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Tr331/playwright-lab.git
cd playwright-lab

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# (Optional) Install system dependencies for Linux
npx playwright install-deps
```

---

## 📁 Project Structure

```
playwright-lab/
├── fixtures/           # Custom test fixtures & extensions
│   └── custom-fixture.ts
├── pages/              # Page Object Models
│   ├── base-page.ts    # Base page with common methods
│   └── login-page.ts   # Login page specific locators/actions
├── test-data/          # Test data files (JSON)
│   └── users.json
├── tests/              # Test specifications
│   └── user-authentication.spec.ts
├── .github/workflows/  # CI/CD pipeline configuration
│   └── playwright.yml
├── playwright.config.ts # Playwright configuration
├── package.json        # Dependencies & scripts
└── tsconfig.json       # TypeScript configuration
```

---

## 🎮 Available Commands

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests |
| `npm run test:smoke` | Run smoke tests only (`@smoke` tagged) |
| `npm run test:login` | Run login tests only (`@login` tagged) |
| `npm run test:chrome` | Run tests on Chromium only |
| `npm run test:firefox` | Run tests on Firefox only |
| `npm run test:webkit` | Run tests on WebKit only |
| `npm run test:ui` | Run tests in UI mode (interactive) |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:report` | Open HTML report viewer |

---

## 📝 Writing Tests

### Basic Test Structure

```typescript
import { expect, test } from '../fixtures/custom-fixture';
import users from '../test-data/users.json';

test.describe('User Authentication', () => {

    test('successful login', { tag: ['@smoke', '@login'] }, async ({ loginPage }) => {
        
        await test.step('GIVEN user is on login page', async () => {
            await loginPage.open('/practice-test-login/');
        });

        await test.step('WHEN user enters valid credentials', async () => {
            await loginPage.login(users.valid.username, users.valid.password);
        });

        await test.step('THEN user is redirected to dashboard', async () => {
            await expect(await loginPage.getCurrentUrl())
                .toContain('logged-in-successfully');
        });
    });
});
```

### Page Object Example

```typescript
export class LoginPage extends BasePage {

    get usernameInput() {
        return this.page.getByRole('textbox', { name: 'Username' });
    }

    get passwordInput() {
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    get submitButton() {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    async login(userName: string, password: string): Promise<void> {
        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}
```

---

## ⚙️ Configuration

### Key Settings (`playwright.config.ts`)

```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,        // Run tests in parallel
  forbidOnly: !!process.env.CI, // Fail on test.only in CI
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://practicetestautomation.com',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

---

## 🔄 CI/CD Pipeline

The framework includes a **GitHub Actions** workflow that:

- ✅ Runs on every push to `main`/`master`
- ✅ Runs on every pull request
- ✅ Tests across all configured browsers
- ✅ Uploads test reports as artifacts

**Workflow Location:** `.github/workflows/playwright.yml`

### Viewing CI Results

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select the workflow run
4. Download `playwright-report` artifact to view results

---

## 📊 Test Reporting

After running tests, view the interactive HTML report:

```bash
npm run test:report
```

This opens a browser with:
- ✅/❌ Test results overview
- 📸 Screenshots of failures
- 🎬 Trace viewer for debugging
- 📈 Execution timeline

---

## 🧪 Test Data Management

Test data is stored in `test-data/users.json`:

```json
{
    "valid": {
        "username": "student",
        "password": "Password123"
    },
    "invalidPassword": {
        "username": "student",
        "password": "helloWorld"
    }
}
```

**Best Practice:** Never hardcode credentials in test files.

---

## 🎯 Best Practices Followed

| Practice | Implementation |
|----------|----------------|
| **Accessibility-First Locators** | `getByRole()`, `getByLabel()`, `getByText()` |
| **Separation of Concerns** | Tests, Pages, Data, Fixtures separated |
| **DRY Principle** | BasePage for common methods |
| **Type Safety** | TypeScript strict mode, explicit types |
| **Descriptive Test Names** | Clear Given/When/Then structure |
| **Environment Variables** | Base URL configurable (ready for .env) |

---

## 🔮 Future Enhancements

- [ ] API testing layer
- [ ] Authentication state reuse (`storageState`)
- [ ] Visual regression testing
- [ ] Allure/ReportPortal integration
- [ ] Slack/Teams notifications
- [ ] Dynamic test data with Faker
- [ ] Mobile viewport testing
- [ ] Performance budgets
- [ ] Accessibility audits (axe-core)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👤 Author

**Tr331**

[![GitHub](https://img.shields.io/badge/GitHub-Tr331-181717?logo=github)](https://github.com/Tr331)

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

---

<div align="center">

**Made with ❤️ using Playwright & TypeScript**

⭐ Star this repo if you find it helpful!

</div>
