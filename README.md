# **Automation Testing Framework**
Comprehensive test automation framework covering API and UI testing for simple REST endpoints and demo application

---

### 🚀 **Quick Start**

#### **Prerequisites**
- **Node.js 18+**
- **npm**

#### **Install Dependencies**
```bash
npm install
```
#### **Install Playwright and browsers**
```bash
npx playwright install
npm install -D @playwright/test
```

### **Run Your First Test**

#### Run all tests (Headless)
```bash
npm run test
```

#### Run smoke tests only
```bash
npm run test:smoke
```
#### Run tests with browser visible (headed mode)
```bash
npm run test:headed
```
#### Test Filtering by Tags
```bash
--grep @todo-client
--grep @regression
--grep @smoke
--grep @mark-complete
--grep @add-todo
--grep @delete-todo
--grep @flaky
```

### **Project Structure**
tests/
├── ui/                     # UI test files
│   ├── pages/             # Page Object Model classes
│   │   └── todo.page.js   # Main TodoMVC page object
│   ├── components/        # Reusable component objects
│   │   └── ToDoItem.js    # Individual todo item component
│   └── todo.test.js       # Main test scenarios
├── data/                  # Test data and constants
│   ├── test-data.js       # Test data sets
│   └── constants.js       # Application constants
└── utils/                 # Utility functions
    └── helpers.js         # Test setup helpers


## Design Patterns
### Page Object Model

#### ToDoPage: Main page interactions (add, navigate, bulk operations)
#### ToDoItem: Individual todo item component (delete, toggle, hover)

### Test Categories & Scenarios

1. Add Todo Tests (@add-todo, @regression)

- Single Addition: Add one todo to empty list
- Duplicate Addition: Add existing todo to populated list
- Multiple Addition: Add several todos in sequence
- Special Characters: Test ASCII characters and edge cases
- (WIP)Input Validation: Empty input, whitespace, maximum length

2. Complete Todo Tests (@mark-complete, @regression)

- Single Toggle: Mark individual todo as complete/incomplete
- Multiple Toggle: Mark several todos simultaneously
- Toggle All: Use toggle-all functionality
- (WIP)State Persistence: Verify completion state across navigation
- Counter Updates: Validate active item counter accuracy

3. Delete Todo Tests (@delete-todo, @regression)

- Single Deletion: Remove individual todos with hover + click
- Multiple Deletion: Remove several todos in sequence
- Clear Completed: Bulk removal of all completed items
- Mixed State Cleanup: Delete from lists with mixed completion states
- Empty State Handling: Behavior when all items removed

4. Navigation & Filtering Tests (@regression)

- Active Filter: Show only incomplete todos
- Completed Filter: Show only completed todos
- URL Routing: Verify correct URL fragments for each filter

###Error Handling
- Automatic retries for flaky scenarios
- Trace collection on failures for debugging