const { test } = require("@playwright/test");

const users = require("../../data/users.json");
const products = require("../../data/products.json");
const { RegisterPage } = require("../../pages/RegisterPage");
const { LoginPage } = require("../../pages/LoginPage");
const { HomePage } = require("../../pages/HomePage");
const { ProductPage } = require("../../pages/ProductPage");
const { CheckoutPage } = require("../../pages/CheckoutPage");

test.describe("Purchase Journey", () => {

    test("TC-07: customer can complete the full purchase journey", async ({ page }) => {

        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const checkoutPage = new CheckoutPage(page);
        const customer = users.validCustomer;
        const product = products.product1;

        let uniqueEmail;

        await test.step("1. Register a new customer", async () => {
            await registerPage.open();
            uniqueEmail = await registerPage.register(customer);
            await registerPage.expectRegistered();
        });

        await test.step("2. Login with the registered account", async () => {
            await loginPage.open();
            await loginPage.login(uniqueEmail, customer.password);
            await loginPage.expectLoggedIn();
            await loginPage.expectUserName(customer.username);
        });

        await test.step("3. Search and select a product", async () => {
            await homePage.open();
            await homePage.searchProduct(product.name);
            await homePage.expectSearchResultsCount(1);
            await homePage.expectProductVisible(product.name);
            await homePage.clickProduct(product.name);
            await productPage.expectProductName(product.name);
            await productPage.expectProductPrice(product.price.toFixed(2));
        });

        await test.step("4. Add product to cart and verify cart details", async () => {
            await productPage.clickAddToCart();
            await productPage.expectAddToCartToast();
            await productPage.expectCartCount(1);
            await productPage.openCart();
            await checkoutPage.expectCartProduct(product.name);
            await checkoutPage.expectCartQuantity(1);
            await checkoutPage.expectCartUnitPrice(product.price);
            await checkoutPage.expectCartPriceCalculations();
        });

        await test.step("5. Proceed with checkout and verify billing address", async () => {
            await checkoutPage.proceedToCheckoutStep1();
            await checkoutPage.proceedToCheckoutStep2();
            await checkoutPage.fillHouseNumber(customer.houseNumber);
            await checkoutPage.expectBillingAddress(customer);
            await checkoutPage.proceedToCheckoutStep3();
        });

        await test.step("6. Complete payment", async () => {
            await checkoutPage.selectCashOnDelivery();
            await checkoutPage.checkPayment();
            await checkoutPage.expectPaymentSuccess();
        });

        await test.step("7. Confirm checkout and verify invoice", async () => {
            await checkoutPage.confirmOrder();
            await checkoutPage.expectOrderConfirmation();
            await checkoutPage.expectInvoiceNumber();
            const invoiceNumber = await checkoutPage.getInvoiceNumber();
            console.log(`Order Invoice Number: ${invoiceNumber}`);
        });
    });
});