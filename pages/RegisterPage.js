const { expect } = require("@playwright/test");

class RegisterPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.getByPlaceholder("First name *");
    this.lastNameInput = page.getByPlaceholder("Your last name *");
    this.birthDateInput = page.getByPlaceholder("YYYY-MM-DD");
    this.countrySelect = page.getByTestId("country");
    this.postalCodeInput = page.getByPlaceholder("Your Postcode *");
    this.houseNumberInput = page.getByTestId("house_number");
    this.streetInput = page.getByPlaceholder("Your Street *");
    this.cityInput = page.getByPlaceholder("Your City *");
    this.stateInput = page.getByPlaceholder("Your State *");
    this.phoneInput = page.getByPlaceholder("Your phone *");
    this.emailInput = page.getByPlaceholder("Your email *");
    this.passwordInput = page.getByPlaceholder("Your password");
    this.registerButton = page.getByTestId("register-submit");
  }

  async open() {
    await this.page.goto("/auth/register");
  }

  async register(user) {
    const uniqueEmail = `${user.emailPrefix}${Date.now()}@gmail.com`;

    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.birthDateInput.fill(user.dateOfBirth);
    await this.countrySelect.selectOption(user.country);
    await this.postalCodeInput.fill(user.postalCode);
    await this.houseNumberInput.fill(user.houseNumber);
    await this.streetInput.fill(user.street);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.phoneInput.fill(user.phoneNumber);
    await this.emailInput.fill(uniqueEmail);
    await this.passwordInput.fill(user.password);

    await this.registerButton.click();

    return uniqueEmail;
  }

  async expectRegistered() {
    await expect(this.page).toHaveURL(/\/auth\/login$/);
  }
}
module.exports = { RegisterPage };
