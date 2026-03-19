import { Page } from "@playwright/test";

export abstract class BasePage {

    constructor(protected readonly page: Page) { }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }
}