# **Automation Testing Framework**
Comprehensive test automation framework covering API and UI testing for simple REST endpoints and demo application

---

## **Quick Start**

### **Prerequisites**
- **Node.js 18+**
- **npm**

### **Install Dependencies**
```bash
npm install
```

### **Install Playwright and browsers**
```bash
npx playwright install
npm install -D @playwright/test
```

### **Environment Setup**
Create a `.env` file in the project root:
```bash
# API Configuration
API_BASE_URL=https://reqres.in/api
REQRES_API_KEY=your_api_key_here

# UI Configuration  
UI_BASE_URL=https://demo.playwright.dev/
```

---

## 🧪 **Running Tests**

### **Run All Tests**
```bash
npm run test
```

### **Run Specific Test Types**

#### **API Tests Only**
```bash
npm run test:api
# or
npx playwright test tests/api/ --project=api-tests
```

#### **UI Tests Only**
```bash
npx playwright test tests/ui/ --project=ui-tests
```

#### **Smoke Tests Only**
```bash
npm run test:smoke
```

#### **Tests with Browser Visible (Headed Mode)**
```bash
npm run test:headed
```

### **Test Filtering by Tags**

#### **API Test Tags**
```bash
# Run specific API functionality
npx playwright test --grep="@getUser" --project=api-tests
npx playwright test --grep="@postUser" --project=api-tests
npx playwright test --grep="@login" --project=api-tests
npx playwright test --grep="@deleteUser" --project=api-tests

# Run smoke api tests
npx playwright test --grep="@smoke" --project=api-tests

# Run all API tests
npx playwright test --grep="@api" --project=api-tests
```

#### **UI Test Tags**
```bash
# Run specific UI functionality
npx playwright test --grep="@todo-client" --project=ui-tests
npx playwright test --grep="@regression" --project=ui-tests
npx playwright test --grep="@smoke" --project=ui-tests
npx playwright test --grep="@mark-complete" --project=ui-tests
npx playwright test --grep="@add-todo" --project=ui-tests
npx playwright test --grep="@delete-todo" --project=ui-tests
npx playwright test --grep="@flaky" --project=ui-tests
```

---

## 📋 **Test Categories & Scenarios**

### **API Testing (@api)**

#### **1. Get User Tests (@getUser)**
- **Get All Users**: Retrieve paginated list of users with schema validation
- **Get Single User**: Fetch user by ID with validation
- **Pagination Testing**: Test various page sizes and numbers
- **Error Scenarios**: Invalid IDs, malformed parameters, authentication

#### **2. Create User Tests (@postUser)**
- **Valid User Creation**: Create user with proper data structure
- **Invalid Input Handling**: Missing fields, malformed data
- **Authentication**: API key requirement validation
- **Response Validation**: Schema validation for created user response

#### **3. Login Tests (@login)**
- **Successful Authentication**: Valid credentials return token
- **Invalid Credentials**: Wrong email/password combinations
- **Authentication**: API key requirement for access

#### **4. Delete User Tests (@deleteUser)**
- **User Deletion**: Remove existing users successfully
- **Invalid ID Handling**: Non-existent or malformed user IDs
- **Authentication**: API key requirement validation

### **UI Testing (@todo-client)**

#### **1. Add Todo Tests (@add-todo, @regression)**
- **Single Addition**: Add one todo to empty list
- **Duplicate Addition**: Add existing todo to populated list
- **Multiple Addition**: Add several todos in sequence
- **Special Characters**: Test ASCII characters and edge cases
- **Input Validation**: Whitespace(Trimming Feature)

#### **2. Complete Todo Tests (@mark-complete, @regression)**
- **Single Toggle**: Mark individual todo as complete/incomplete
- **Multiple Toggle**: Mark several todos simultaneously
- **Toggle All**: Use toggle-all functionality
- **State Persistence**: Verify completion state across navigation
- **Counter Updates**: Validate active item counter accuracy

#### **3. Delete Todo Tests (@delete-todo, @regression)**
- **Single Deletion**: Remove individual todos with hover + click
- **Multiple Deletion**: Remove several todos in sequence
- **Clear Completed**: Bulk removal of all completed items
- **Mixed State Cleanup**: Delete from lists with mixed completion states
- **Empty State Handling**: Behavior when all items removed

#### **4. Navigation & Filtering Tests (@regression)**
- **Active Filter**: Show only incomplete todos
- **Completed Filter**: Show only completed todos
- **URL Routing**: Verify correct URL fragments for each filter

---

## **Design Patterns & Architecture**

### **Page Object Model (UI Tests)**
- **ToDoPage**: Main page interactions (add, navigate, bulk operations)
- **ToDoItem**: Individual todo item component (delete, toggle, hover)

### **API Test Structure**
- **Schema Validation**: JSON schema validation using `jsonschema`
- **Helper Functions**: Centralized API utilities in `utils/helpers.js`
- **Test Data**: Constants and test data in `tests/data/`
- **Tagged Organization**: Functional grouping with Playwright tags

### **Configuration Management**
- **Environment Variables**: `.env` file for configuration
- **Multi-Project Setup**: Separate configurations for UI and API tests
- **Base URLs**: Configurable endpoints for different environments

---

## 📁 **Project Structure**
```
tests/
├── api/                     # API test files
│   ├── getusers.test.js    # Get user functionality tests
│   ├── postUser.test.js    # Create user functionality tests
│   ├── postLogin.test.js   # Authentication tests
│   ├── deleteUser.test.js  # Delete user functionality tests
│   └── schemas/            # JSON schema definitions
│       └── user.schema.js  # User data validation schemas
├── ui/                     # UI test files
│   ├── pages/              # Page Object Model classes
│   │   └── todo.page.js    # Main TodoMVC page object
│   ├── components/         # Reusable component objects
│   │   └── ToDoItem.js     # Individual todo item component
│   └── todo.test.js        # Main test scenarios
├── data/                   # Test data and constants
│   ├── test-data.js        # Test data sets
│   └── constants.js        # Application constants
└── utils/                  # Utility functions
    └── helpers.js          # Test setup helpers

playwright.config.js         # Playwright configuration
package.json                 # Dependencies and scripts
.env                        # Environment configuration
```

---

## ⚙️ **Configuration**

### **Playwright Configuration**
- **Multi-Project Setup**: Separate configurations for UI and API tests
- **Environment Variables**: Dynamic configuration via `.env` file
- **Test Matching**: Organized test discovery by directory structure
- **Reporting**: HTML reporter with trace collection on failures

### **Environment Variables**
```bash
# Required for API tests
API_BASE_URL=https://reqres.in/api
REQRES_API_KEY=your_api_key_here

# Required for UI tests
UI_BASE_URL=https://demo.playwright.dev/
```

---

## **Error Handling & Debugging**

### **Automatic Retries**
- **Flaky Test Handling**: Automatic retries for unstable scenarios
- **Trace Collection**: Detailed traces on test failures

### **Debugging Commands**
```bash
# Run tests in debug mode
npx playwright test --debug

# Show test traces
npx playwright show-trace

# Generate HTML report
npx playwright show-report
```

---

## **Test Reports**

### **HTML Reports**
```bash
# Generate and view HTML report
npx playwright show-report
```

### **Trace Files**
```bash
# View trace files for failed tests
npx playwright show-trace test-results/
```

---

## **Maintenance & Updates**

### **Dependencies**
```bash
# Update Playwright
npx playwright install

# Update npm packages
npm update
```

### **Key Dependencies**
- **@playwright/test**: Core testing framework for both API and UI test automation
- **dotenv**: Loads environment variables from `.env` file at runtime for configuration management
- **jsonschema**: Provides JSON schema validation for API contract testing and response validation

### **Test Data**
- **Constants**: Update `tests/data/constants.js` for API endpoints
- **Schemas**: Modify `tests/api/schemas/` for API contract changes
- **Test Data**: Update `tests/data/test-data.js` for UI test scenarios

---

## 📝 **Design Decisions & Assumptions**

### **API Testing**
- **Mock API Usage**: Using ReqRes.in for consistent test data
- **Schema Validation**: JSON schema validation for API contract testing
- **Authentication**: API key-based authentication for secure endpoints
- **Error Handling**: Comprehensive error scenario coverage

### **UI Testing**
- **Page Object Model**: Maintainable test structure with reusable components
- **Data Injection**: LocalStorage-based test data setup for isolated testing
- **Tagged Organization**: Functional grouping for flexible test execution

### **Framework Choices**
- **Playwright**: Modern, reliable test automation framework
- **JavaScript**: Consistent with application technology stack
- **Environment Configuration**: Flexible configuration for different environments

### **API Application Under Test Choice**
- **Initial Choice**: [DummyAPI.io](https://dummyapi.io/) - Comprehensive fake data API with REST and GraphQL endpoints, but couldn't generate authentication tokens
- **Alternative**: [GoRest.co.in](https://gorest.co.in/) - User management API, but website went down mid-development
- **Final Choice**: [ReqRes.in](https://reqres.in/api) - Reliable fake data CRUD API with authentication support, upgraded to premium for advanced auth features

**Note**: Please request API key from the Repository maintainer for accessing the ReqRes API endpoints.
