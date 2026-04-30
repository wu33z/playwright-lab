import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class DashBoardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get loginSuccessMessage() {
    return this.page.getByText("you're logged in!");
  }
}
