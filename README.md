ToolShopAutomation
A UI test automation framework built with Playwright and JavaScript for testing the Practice Software Testing web application.

The project follows the Page Object Model (POM) design pattern to keep page locators and actions separate from test scenarios, making the tests easier to maintain and extend.
Tech Stack
- JavaScript (Node.js)
- Playwright Test
- Page Object Model (POM)
- JSON for test data
- Allure Playwright for test reporting
Project Structure
ToolShopAutomation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── data/
│   ├── products.json
│   └── users.json
├── pages/
│   ├── RegisterPage.js
│   ├── LoginPage.js
│   ├── HomePage.js
│   ├── ProductPage.js
│   └── CheckoutPage.js
├── tests/
│   ├── ui/
│   │   ├── registration.spec.js
│   │   ├── login.spec.js
│   │   ├── search.spec.js
│   │   ├── cart.spec.js
│   │   └── checkout.spec.js
│   └── e2e/
│       └── purchase-journey.spec.js
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js
Automated Test Scenarios
The framework currently covers the following scenarios:
Test Area	Coverage
Registration	Register a new customer and verify the resulting logged-in state
Login	Verify that a customer can log in successfully
Search	Search for products and interact with the product listing
Cart	Add products to the shopping cart and verify cart details
Checkout	Complete the checkout flow and verify the result
End-to-End Purchase	Execute the complete purchase journey and verify the generated invoice


Framework Design
- Page Object Model: Page-specific locators and actions are organized into reusable page classes.
- Test data separation: User and product data are stored in JSON files under data/.
- Reusable methods: Common UI interactions are encapsulated in page objects.
- Playwright Test: Test execution, assertions, and browser automation are handled by Playwright Test.
- Allure integration: The Allure Playwright reporter is configured to collect test execution results.
Getting Started
Prerequisites
Make sure you have installed:
- Node.js (LTS recommended)
- npm (included with Node.js)
- Git
Installation
1. Clone the repository:
   git clone https://github.com/MohanedFarg/ToolShopAutomation.git
2. Open the project directory:
   cd ToolShopAutomation
3. Install dependencies:
   npm install
4. Install Playwright browsers:
   npx playwright install
Running Tests
Run the complete test suite:
npx playwright test
Run tests using one worker:
npx playwright test --workers=1
Run tests in headed mode (show the browser):
npx playwright test --headed
Run a specific test file:
npx playwright test tests/ui/login.spec.js
Run the end-to-end purchase journey:
npx playwright test tests/e2e/purchase-journey.spec.js
Test Reports
The project is configured with the Allure Playwright reporter, which writes test result files to the allure-results directory.

After a test run, if the Allure command-line tool is available, generate an HTML report with:
npx allure generate allure-results --clean
Open the generated report with:
npx allure open allure-report
Note: Allure report generation and opening are separate from test execution. If you are using a different Allure CLI version, check its command syntax.

Continuous Integration
A GitHub Actions workflow is included under .github/workflows/ for running the Playwright project in CI.
Target Application
Tests are written for:

Practice Software Testing
Author
Mohaned Farg
