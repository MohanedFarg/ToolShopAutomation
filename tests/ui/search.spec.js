const { test } = require("@playwright/test");

const users = require("../../data/users.json");
const products = require("../../data/products.json");
const { LoginPage } = require("../../pages/LoginPage");
const { RegisterPage } = require("../../pages/RegisterPage");
const { HomePage } = require("../../pages/HomePage");

test.describe("Search", () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);
        homePage = new HomePage(page);

        const customer = users.validCustomer;

        //register 
        await registerPage.open(); 
        const uniqueEmail = await registerPage.register(customer);
        await registerPage.expectRegistered();
        
        //login
        await loginPage.open();
        await loginPage.login(uniqueEmail, customer.password);
        await loginPage.expectLoggedIn();
    });

    test("customer can search for Thor Hammer successfully", async () => {
        const productName = products.product1.name;

        await homePage.open();
        await homePage.searchProduct(productName);

        await homePage.expectSearchCaption("Searched for:");
        await homePage.expectSearchTerm(productName);
        await homePage.expectSearchResultsCount(1);
        await homePage.expectProductVisible(productName);
    });
});
