# ToolShopAutomation

A UI test automation framework built with **Playwright** and **JavaScript** for testing the [Practice Software Testing](https://practicesoftwaretesting.com/) web application.

The project follows the **Page Object Model (POM)** design pattern to keep page locators and actions separate from test scenarios, making the tests easier to maintain and extend.

## Tech Stack

- JavaScript (Node.js)
- Playwright Test
- Page Object Model (POM)
- JSON for test data
- Allure Playwright for test reporting

## Project Structure

```text
ToolShopAutomation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── data/
│   ├── products.json
│   └── users.json
├── pages/
├── tests/
│   ├── ui/
│   └── e2e/
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js
```

## Automated Test Scenarios

| Test Area | Coverage |
|---|---|
| Registration | Register a new customer and verify the logged-in state |
| Login | Verify successful customer login |
| Search | Search for products and interact with product listings |
| Cart | Add products to the shopping cart and verify cart details |
| Checkout | Complete the checkout flow |
| End-to-End Purchase | Execute the complete purchase journey and verify the generated invoice |

## Framework Design

- **Page Object Model:** Organizes page-specific locators and actions into reusable classes.
- **Test Data Separation:** Stores user and product data in JSON files.
- **Reusable Methods:** Encapsulates common UI interactions in page objects.
- **Playwright Test:** Handles test execution, browser automation, and assertions.
- **Allure Integration:** Collects test execution results for reporting.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/MohanedFarg/ToolShopAutomation.git
```

Navigate to the project:

```bash
cd ToolShopAutomation
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests using one worker:

```bash
npx playwright test --workers=1
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/ui/login.spec.js
```

Run the end-to-end purchase journey:

```bash
npx playwright test tests/e2e/purchase-journey.spec.js
```

## Test Reports

The project uses the Allure Playwright reporter to generate test result files in the `allure-results` directory.

Generate the HTML report:

```bash
npx allure generate allure-results --clean
```

Open the report:

```bash
npx allure open allure-report
```

## Continuous Integration

A GitHub Actions workflow is included under `.github/workflows/` for running the Playwright project in CI.

## Target Application

[Practice Software Testing](https://practicesoftwaretesting.com/)

## Author

**Mohaned Farg**

- GitHub: [MohanedFarg](https://github.com/MohanedFarg)
- Repository: [ToolShopAutomation](https://github.com/MohanedFarg/ToolShopAutomation)
