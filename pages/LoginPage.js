const { expect } = require("@playwright/test");

class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder("Your email");
    this.passwordInput = page.getByPlaceholder("Your password");
    this.loginButton = page.getByTestId("login-submit");
    this.pageTitle = page.getByTestId("page-title");
    this.userMenu = page.locator('[data-test="nav-menu"]');
  }

  async open() {
    await this.page.goto("/auth/login");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedIn() {
    await expect(this.page).toHaveURL(/\/account$/);
  }
  async expectPageTitle(expectedTitle) {
    await expect(this.pageTitle).toHaveText(expectedTitle);
  }
  async expectUserName(expectedName) {
    await expect(this.userMenu).toContainText(expectedName);
  }
}
module.exports = { LoginPage };