const { test } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { RegisterPage } = require("../../pages/RegisterPage");
const users = require("../../data/users.json");

test.describe("Login", () => {
  test("new customer can register and log in", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    // register first
    await registerPage.open();
    const uniqueEmail = await registerPage.register(users.validCustomer);
    await registerPage.expectRegistered();

    // log in with the newly registered user
    await loginPage.login(uniqueEmail, users.validCustomer.password);

    
    await loginPage.expectLoggedIn();
    await loginPage.expectPageTitle(users.pageTitles.account);
    await loginPage.expectUserName(users.validCustomer.username);
  });
});