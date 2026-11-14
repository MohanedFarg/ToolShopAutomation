const { test } = require("@playwright/test");
const { RegisterPage } = require("../../pages/RegisterPage");
const { LoginPage } = require("../../pages/LoginPage");
const users = require("../../data/users.json");

test.describe("Register", () => {
  /** @type {RegisterPage} */

  test("new customer can Register", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    await registerPage.open();
    const uniqueEmail = await registerPage.register(users.validCustomer);
        //console.log(uniqueEmail);
    await registerPage.expectRegistered(); 

    // Log in with the newly registered user
    await loginPage.login(uniqueEmail, users.validCustomer.password);
    await loginPage.expectLoggedIn();
    await loginPage.expectPageTitle(users.pageTitles.account);
    await loginPage.expectUserName(users.validCustomer.username);
  });
});