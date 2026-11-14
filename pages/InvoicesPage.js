const { expect } = require("@playwright/test");

class InvoicesPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.invoiceRows = page.locator("table tbody tr");
        this.invoiceNumber = page.getByTestId("invoice-number");
        this.street = page.getByTestId("street");
        this.postalCode = page.getByTestId("postal_code");
        this.city = page.getByTestId("city");
        this.state = page.getByTestId("state");
        this.country = page.getByTestId("country");
        this.invoiceProductsTable = page.locator("table.table-hover");
    }

    async open() {
        await this.page.goto("/account/invoices");
    }

    async openInvoiceDetails(invoiceNumber) {
        const invoiceRow = this.invoiceRows.filter({hasText: invoiceNumber});
        await invoiceRow.getByRole("link", { name: "Details" }).click();
    }

    async expectInvoiceListed(invoiceNumber) {
        const invoiceRow = this.invoiceRows.filter({hasText: invoiceNumber});
        await expect(invoiceRow).toBeVisible();
        await expect(invoiceRow).toContainText(invoiceNumber);
    }

    async expectInvoiceNumber(invoiceNumber) {
        await expect(this.invoiceNumber).toHaveValue(invoiceNumber);
    }

    async expectBillingAddress(customer) {
        await expect(this.street).toHaveValue(customer.street);
        await expect(this.postalCode).toHaveValue(customer.postalCode);
        await expect(this.city).toHaveValue(customer.city);
        await expect(this.state).toHaveValue(customer.state);
        await expect(this.country).toHaveValue(customer.country);
    }

    async expectInvoiceProduct(product) {
        const productRow = this.invoiceProductsTable.locator("tbody tr").filter({hasText: product.name});
        await expect(productRow).toBeVisible();
        await expect(productRow).toContainText(product.name);
        await expect(productRow).toContainText(`$${Number(product.price).toFixed(2)}`);
    }
}
module.exports = { InvoicesPage };