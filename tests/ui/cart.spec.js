const { test } = require("@playwright/test");
const users = require("../../data/users.json");
const products = require("../../data/products.json");
const { RegisterPage } = require("../../pages/RegisterPage");
const { LoginPage } = require("../../pages/LoginPage");
const { HomePage } = require("../../pages/HomePage");
const { ProductPage } = require("../../pages/ProductPage");
const { CheckoutPage } = require("../../pages/CheckoutPage");


test.describe("Cart", () => {
    test("customer can add a product to cart and verify cart details", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const checkoutPage = new CheckoutPage(page);

        const customer = users.validCustomer;
        const product = products.product1;

        //register 
        await registerPage.open(); 
        const uniqueEmail = await registerPage.register(customer);
        await registerPage.expectRegistered();
        
        //login
        await loginPage.open();
        await loginPage.login(uniqueEmail, customer.password);
        await loginPage.expectLoggedIn();

        //search
        await homePage.open();
        await homePage.searchProduct(product.name);
        await homePage.expectSearchResultsCount(1);
        await homePage.expectProductVisible(product.name);

        //open product 
        await homePage.clickProduct(product.name);

        //verify product details
        await productPage.expectProductName(product.name);
        await productPage.expectProductPrice(product.price.toFixed(2));

        //add product to cart
        await productPage.clickAddToCart();
        await productPage.expectAddToCartToast();
        await productPage.expectCartCount(1);

        //open cart
        await productPage.openCart();

        //verify cart details
        await checkoutPage.expectCartProduct(product.name);
        await checkoutPage.expectCartQuantity(1);
        await checkoutPage.expectCartUnitPrice(product.price);
        await checkoutPage.expectCartPriceCalculations();
    });
});