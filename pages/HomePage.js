const { expect } = require("@playwright/test");
class HomePage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.sortDropdown = page.getByTestId("sort");
        this.minPriceSlider = page.getByRole("slider", { name: "ngx-slider" });
        this.maxPriceSlider = page.getByRole("slider", { name: "ngx-slider-max" });
        this.searchInput = page.getByTestId("search-query");
        this.searchButton = page.getByTestId("search-submit");
        this.searchResetButton = page.getByTestId("search-reset");
        this.searchCaption = page.getByTestId("search-caption");
        this.searchTerm = page.getByTestId("search-term");
        this.searchResultCount = page.getByTestId("search-result-count");
    }

    async open() {
        await this.page.goto("/");
    }

    async searchProduct(name) {
        await this.searchInput.fill(name);
        await this.searchButton.click();
    }

    async clickProduct(name) {
        await this.page.getByAltText(name).click();
    }

    async resetSearch() {
        await this.searchResetButton.click();
    }

    async selectSortOption(option) {
        await this.sortDropdown.selectOption(option);
    }

    async moveMaxPriceSlider(targetValue) {
        const slider = this.maxPriceSlider;
        const box = await slider.boundingBox();
        const min = Number(await slider.getAttribute("aria-valuemin"));
        const max = Number(await slider.getAttribute("aria-valuemax"));
        const targetX = box.x + ((targetValue - min) / (max - min)) * box.width;
        const centerY = box.y + box.height / 2;

        await this.page.mouse.move(box.x + box.width / 2, centerY);
        await this.page.mouse.down();
        await this.page.mouse.move(targetX, centerY, { steps: 10 });
        await this.page.mouse.up();
    }

    async expectMaxPriceToBe(expectedValue) {
        await expect(this.maxPriceSlider).toHaveAttribute("aria-valuenow",String(expectedValue));
    }

    async expectProductVisible(name) {
        await expect(this.page.getByAltText(name)).toBeVisible();
    }
    async expectSearchCaption(expectedCaption) {
    await expect(this.searchCaption).toContainText(expectedCaption);
    }

    async expectSearchTerm(expectedTerm) {
        await expect(this.searchTerm).toHaveText(expectedTerm);
    }

    async expectSearchResultsCount(expectedCount) {
        await expect(this.searchResultCount).toHaveText(new RegExp(`^\\s*${expectedCount} product found`));
    }
    async expectProductVisible(name) {
        await expect(this.page.getByAltText(name)).toBeVisible();
    }
}
module.exports = { HomePage };