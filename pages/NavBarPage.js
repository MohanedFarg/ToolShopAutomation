const { expect } = require("@playwright/test");

class NavBarPage {
    constructor(page) {
        this.page = page;
        this.homeButton = page.getByTestId("nav-home");
        this.categoriesButton = page.getByTestId("nav-categories");
        this.contactButton = page.getByTestId("nav-contact");
        this.userMenu = page.getByTestId("nav-menu");
        this.languageSelector = page.locator('svg path[d^="M352 256c0 22.2"]');
    }

    async open() {
        await this.page.goto("/");
    }   

    async clickHome() {
        await this.homeButton.click();
    }

    async clickCategories() {
        await this.categoriesButton.click();
    }

    async clickContact() {
        await this.contactButton.click();
    }

    async clickUserMenu() {
        await this.userMenu.click();
    }

    async selectLanguage() {
        await this.languageSelector.click();
    }

    
    async expectHomeVisible() {
        await expect(this.homeButton).toBeVisible();
    }

    async expectCategoriesVisible() {
        await expect(this.categoriesButton).toBeVisible();
    }

    async expectContactVisible() {
        await expect(this.contactButton).toBeVisible();
    }

    async expectUserMenuVisible() {
        await expect(this.userMenu).toBeVisible();
    }

    async expectUserName(expectedName) {
        await expect(this.userMenu).toContainText(expectedName);
    }
}
module.exports = { NavBarPage };