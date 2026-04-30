import { BasePage } from "./base-page";
import { Page } from "@playwright/test";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get userNameInput() {
    return this.page.getByRole("textbox", { name: "Your name" });
  }

  get passwordInput() {
    return this.page.getByRole("textbox", { name: "Your password" });
  }

  get loginButton() {
    return this.page.getByRole("button", { name: "Login" });
  }

  async login(username: string, password: string): Promise<void> {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
