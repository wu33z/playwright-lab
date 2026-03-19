import { Page } from "playwright";
import { BasePage } from "./base-page";

export class DashBoardPage extends BasePage{
    
    constructor(page: Page) {
        super(page);
    }

    get successMessage() {
        return this.page.locator('.post-title');
    }

    get logoutButton() {
        return this.page.getByRole('link', {name: 'Log out'});
    }

    async getSuccessMessage() {
        return await this.successMessage.textContent();
    }
}