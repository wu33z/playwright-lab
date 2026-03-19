import { expect, test } from '../fixtures/custom-fixture';
import users from '../test-data/users.json';

test.describe('User Authentication', () => {

    test('successful-login',
        { tag: ['@smoke', '@login'] },
        async ({ loginPage, dashBoardPage }) => {

            await test.step('GIVEN user is on login page', async () => {
                await loginPage.open('/practice-test-login/');
            });

            await test.step('WHEN user enters valid credentials', async () => {
                await loginPage.login(users.valid.username, users.valid.password);
            });

            await test.step('THEN user is redirected to dashboard URL', async () => {
                await expect(await loginPage.getCurrentUrl())
                    .toContain('logged-in-successfully');

                await expect(dashBoardPage.getSuccessMessage())
                .resolves.toContain('Logged In Successfully');
                await expect(dashBoardPage.logoutButton).toBeVisible();
            });
        });

    test('unsuccessful-login',
        { tag: ['@smoke', '@login'] },
        async ({ loginPage }) => {

            await test.step('GIVEN user is on login page', async () => {
                await loginPage.open('/practice-test-login/');
            });

            await test.step('WHEN user enters invalid credentials', async () => {
                await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);
            });

            await test.step('THEN user sees error message', async () => {
                await expect(loginPage.getErrorMessage())
                    .resolves.toContain('invalid');
            });
        });
});