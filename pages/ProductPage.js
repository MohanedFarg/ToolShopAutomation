
const { expect } = require("@playwright/test");

class ProductPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.productName = page.getByTestId("product-name");
        this.productPrice = page.getByTestId("unit-price");
        this.addToCartButton = page.getByTestId("add-to-cart");
        this.addToCartToast = page.getByRole("alert");
        this.addToFavoritesButton = page.getByTestId("add-to-favorites");
        //cart
        this.cartCount = page.getByTestId("cart-quantity");
        this.cartIcon = page.locator("a").filter({has: page.locator("svg[data-icon='cart-shopping']")});
        this.decreaseQuantityButton = page.getByTestId("decrease-quantity");
        this.increaseQuantityButton = page.getByTestId("increase-quantity");
        this.addToCompareButton = page.getByTestId("add-to-compare");
    }

    async clickAddToCart() {
        await this.addToCartButton.click();
    }

    async clickAddToFavorites() {
        await this.addToFavoritesButton.click();
    }

    async clickIncreaseQuantity() {
        await this.increaseQuantityButton.click();
    }

    async clickDecreaseQuantity() {
        await this.decreaseQuantityButton.click();
    }

    async clickAddToCompare() {
        await this.addToCompareButton.click();
    }

    async expectProductName(expectedName) {
        await expect(this.productName).toHaveText(expectedName);
    }

    async expectProductPrice(expectedPrice) {
        await expect(this.productPrice).toHaveText(expectedPrice);
    }

    async expectAddToCartVisible() {
        await expect(this.addToCartButton).toBeVisible();
    }

    async expectCartCount(expectedCount) {
        await expect(this.cartCount).toHaveText(String(expectedCount));
    }

    async expectAddToCartToast() {
        await expect(this.addToCartToast).toHaveText("Product added to shopping cart.");
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async expectAddToFavoritesVisible() {
        await expect(this.addToFavoritesButton).toBeVisible();
    }

    async expectAddToCompareVisible() {
        await expect(this.addToCompareButton).toBeVisible();
    }
}
module.exports = { ProductPage };