const { test } = require("@playwright/test");
const users = require("../../data/users.json");
const products = require("../../data/products.json");

const { LoginPage } = require("../../pages/LoginPage");
const { RegisterPage } = require("../../pages/RegisterPage");
const { HomePage } = require("../../pages/HomePage");
const { ProductPage } = require("../../pages/ProductPage");
const { CheckoutPage } = require("../../pages/CheckoutPage");
const { InvoicesPage } = require("../../pages/InvoicesPage");


test.describe("Checkout", () => {
    let checkoutPage;
    test.beforeEach(async ({ page }) => {

        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        checkoutPage = new CheckoutPage(page);

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

        //search for Thor Hammer
        await homePage.open();
        await homePage.searchProduct(product.name);
        await homePage.clickProduct(product.name);

        //add product to cart
        await productPage.clickAddToCart();
        await productPage.expectCartCount(1);
    });

    test("customer can complete checkout successfully", async ({ page }) => {
        const customer = users.validCustomer;

        // proceed to checkout 1
        await checkoutPage.open();
        await checkoutPage.proceedToCheckoutStep1();

        //signin skipped
        await checkoutPage.expectLoggedInMessage(customer.username);

        //proceed to checkout 2
        await checkoutPage.proceedToCheckoutStep2();

        //fill only required field
        await checkoutPage.fillHouseNumber(customer.houseNumber);

        //verify all billing fields
        await checkoutPage.expectBillingAddress(customer);

        // payment
        await checkoutPage.proceedToCheckoutStep3();
        await checkoutPage.selectCashOnDelivery();

        await checkoutPage.checkPayment();
        await checkoutPage.expectPaymentSuccess();

        //confirm order
        await checkoutPage.confirmOrder();

        await checkoutPage.expectOrderConfirmation();
        await checkoutPage.expectInvoiceNumber();

        //generated invoice number
        const invoiceNumber = await checkoutPage.getInvoiceNumber();

        //verify invoice exist in my invoices
        const invoicesPage = new InvoicesPage(page);
        await invoicesPage.open();
        await invoicesPage.expectInvoiceListed(invoiceNumber);
    });
});