import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashBoardPage } from '../pages/dash-board-page';

type myFixtures =  {
    loginPage: LoginPage,
    dashBoardPage: DashBoardPage
}


export const test = base.extend<myFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    dashBoardPage: async ({ page }, use) => {
        const dashBoardPage = new DashBoardPage(page);
        await use(dashBoardPage);
    }
});

export { expect } from '@playwright/test'