import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    get usernameInput() {
        return this.page.getByRole('textbox', { name: 'Username' });
    }
    get passwordInput() {
        return this.page.getByRole('textbox', { name: 'Password' })
    }
    get submitButton() {
        return this.page.getByRole('button', { name: 'Submit' });
    }
    get errorMessage() {
        return this.page.getByText('Your username is invalid!');
    }

    async open(url: string): Promise<void> {
        await this.navigate(url);
    }

    async login(userName: string, password: string): Promise<void> {
        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async isErrorMessageVisible(): Promise<boolean> {
        return this.errorMessage.isVisible();
    }

    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? '';
    }
}