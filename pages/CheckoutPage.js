const { expect } = require("@playwright/test");

class CheckoutPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;

        this.proceedButton1 = page.getByTestId("proceed-1");
        this.proceedButton2 = page.getByTestId("proceed-2");
        this.proceedButton3 = page.getByTestId("proceed-3");
        this.loggedInMessage = page.locator("p").filter({hasText: "you are already logged in"});

        //cart
        this.cartRows = page.locator("table.table-hover tbody tr");
        this.cartProductTitle = page.getByTestId("product-title");
        this.cartQuantity = page.getByTestId("product-quantity");
        this.cartUnitPrice = page.getByTestId("product-price");
        this.cartLinePrice = page.getByTestId("line-price");
        this.cartTotal = page.getByTestId("cart-total");

        //billing address
        this.countryInput = page.getByTestId("country");
        this.postalCodeInput = page.getByTestId("postal_code");
        this.houseNumberInput = page.getByTestId("house_number");
        this.streetInput = page.getByTestId("street");
        this.cityInput = page.getByTestId("city");
        this.stateInput = page.getByTestId("state");

        //payment
        this.paymentMethodDropdown = page.getByTestId("payment-method");
        this.finishButton = page.getByTestId("finish");
        this.paymentSuccessMessage = page.getByTestId("payment-success-message");
        this.confirmButton = page.getByRole("button", {name: "Confirm",exact: true});

        //order Confirmation
        this.orderConfirmation = page.locator("#order-confirmation");
        this.invoiceNumber = this.orderConfirmation.locator("span");
    }

    async open() {
        await this.page.goto("/checkout");
    }

    async proceedToCheckoutStep1() {
        await this.proceedButton1.click();
    }

    async proceedToCheckoutStep2() {
        await this.proceedButton2.click();
    }

    async proceedToCheckoutStep3() {
        await this.proceedButton3.click();
    }

    async fillHouseNumber(houseNumber) {
        await this.houseNumberInput.fill(String(houseNumber));
    }

    async expectBillingAddress(customer) {
        await expect(this.postalCodeInput).toHaveValue(customer.postalCode);
        await expect(this.streetInput).toHaveValue(customer.street);
        await expect(this.cityInput).toHaveValue(customer.city);
        await expect(this.stateInput).toHaveValue(customer.state);
    }

    async expectLoggedInMessage(expectedName) {
        await expect(this.loggedInMessage).toContainText(`Hello ${expectedName}, you are already logged in.`);
    }

    async expectCartProduct(productName) {
        await expect(this.cartRows).toHaveCount(1);
        await expect(this.cartProductTitle).toHaveText(productName);
    }

    async expectCartQuantity(expectedQuantity) {
        await expect(this.cartQuantity).toHaveValue(String(expectedQuantity));
    }

    async expectCartUnitPrice(expectedPrice) {
        await expect(this.cartUnitPrice).toHaveText(`$${expectedPrice.toFixed(2)}`);
    }

    async expectCartPriceCalculations() {
        const quantity = Number(await this.cartQuantity.inputValue());
        const unitPrice = Number((await this.cartUnitPrice.textContent()).replace(/[^\d.]/g, ""));
        const linePrice = Number((await this.cartLinePrice.textContent()).replace(/[^\d.]/g, ""));
        const total = Number((await this.cartTotal.textContent()).replace(/[^\d.]/g, ""));
        expect(linePrice).toBeCloseTo(unitPrice * quantity, 2);
        expect(total).toBeCloseTo(linePrice, 2);
    }

    async selectCashOnDelivery() {
        await this.paymentMethodDropdown.selectOption("cash-on-delivery");
    }

    async checkPayment() {
        await this.finishButton.click();
    }

    async expectPaymentSuccess() {
        await expect(this.paymentSuccessMessage).toHaveText("Payment was successful");
    }

    async confirmOrder() {
        await this.confirmButton.click();
    }

    async expectOrderConfirmation() {
        await expect(this.orderConfirmation).toContainText("Thanks for your order!");
    }

    async expectInvoiceNumber() {
        await expect(this.invoiceNumber).toHaveText(/^INV-\d+$/);
    }

    async getInvoiceNumber() {
        return (await this.invoiceNumber.textContent()).trim();
    }
}
module.exports = { CheckoutPage };