import { test, expect } from '@playwright/test';
import { ToDoPage } from './pages/todo.page.js';
import testData from '../data/test-data.js';
import { setupPageWithData } from '../../utils/helpers.js';

test.describe('ToDo App Functionality',
    {
        tag: ['@todo-client']
    },
    () => {

    const addTodotestScenarios = [
        { input: ['Car Maintenance'], data: [], description: 'Add a single TODO to Empty list', expectedLength: 1},
        { input: [testData.todos.single[0].title], data: testData.todos.single, description: 'Add duplicate TODO to existing list', expectedLength: 2},
        { input: ['ASCII: 1234567890-=~!@#$%^&*'], data: testData.todos.mixed, description: 'Add ASCII chars to list with multiple entries', expectedLength: (testData.todos.mixed.length+1)}
    ];

    addTodotestScenarios.forEach(({ input, data, description, expectedLength }) => {
        test.describe(`Add Todos with scenario: ${description}`,
            {
                tag: ['@add-todo', '@regression']
            },
            () => {
            let todoPage;

            test.beforeEach(async({ page }) => {
                todoPage = new ToDoPage(page);
                
                // Navigate to app and inject test data
                await setupPageWithData({ page, localStorageData: data})
            })

            test('Adds to the bottom', async () => {
                await todoPage.navigate();

                await todoPage.addTodo(input)
                await expect(todoPage.newEntry.last()).toHaveText(input);
                await expect(todoPage.newEntry).toHaveCount(expectedLength);
            });
        });
    });

    
    test.describe(`Adds multiple entries`,
        {
            tag: ['@add-todo', '@regression', '@smoke']
        },
        () => {
        let todoPage;

        const testData =
            { input: ['First','Second','Third'], data: [], description: 'Adds multiple entries', expectedLength: 3}

        test.beforeEach(async({ page }) => {
            todoPage = new ToDoPage(page);
            
            // Navigate to app and inject test data: Clear storage
            await setupPageWithData({ page, localStorageData: testData.data })
        })
    
        test('Adds new entries', async ({ page }) => {
            await todoPage.navigate();
    
            await todoPage.addTodo(testData.input);
            await expect(todoPage.newEntry).toHaveText([
                testData.input[0],
                testData.input[1],
                testData.input[2]
                ]);
            await expect(todoPage.newEntry).toHaveCount(testData.expectedLength);
        });
    });
    
    const deleteTestScenarios = [
        {
            data: testData.todos.fiveCompleteFiveIncomplete,
            description: 'Delete single todo from mixed list. No change on remaining items',
            action: 'delete',
            targetTodos: ['Complete task 1'],
            expectedLength: 9,
            remainingCompletedItems: `5`
        },
        {
            data: testData.todos.mixed, // 3 items
            description: 'Delete multiple from small list, leave one incomplete',
            action: 'delete',
            targetTodos: ['Buy groceries', 'Walk the dog'],
            expectedLength: 1,
            remainingCompletedItems: `1`
        },
        {
            data: testData.todos.mixed, // 3 items
            description: 'Delete multiple from small list, leave one complete',
            action: 'delete',
            targetTodos: ['Buy groceries', 'Write tests'],
            expectedLength: 1,
            remainingCompletedItems: `0`
        },
        {
            data: testData.todos.allCompleted, // 2 completed
            description: 'Clear completed from all-completed list',
            action: 'clearCompleted',
            expectedLength: 0,
        }
    ];

    deleteTestScenarios.forEach(({ data, description, action, targetTodos, expectedLength, remainingCompletedItems }) => {
    test.describe(`Delete Todos: ${description}`,
        {
            tag: ['@delete-todo', '@regression']
        },
        () => {
        let todoPage

        test.beforeEach(async({ page }) => {
            todoPage = new ToDoPage(page);
            
            // Navigate to app and inject test data
            await setupPageWithData({ page, localStorageData: data })
        })

        test(`Action: ${action} should expect remaining items: ${remainingCompletedItems || 'none'}`, async ({ page }) => {
            await todoPage.navigate();

            switch (action) {
                case 'delete':
                    await todoPage.deleteTodos(targetTodos);
                    await expect(todoPage.newEntry).toHaveCount(expectedLength);
                    await expect(todoPage.toDoCount).toContainText(remainingCompletedItems)
                    break;
                
                case 'clearCompleted':
                    await expect(todoPage.clearCompleted).toBeVisible();
                    await todoPage.clearCompleted.click();
                    await expect(todoPage.newEntry).toHaveCount(expectedLength);
                    await expect(todoPage.toDoCount).not.toBeAttached();
                    break;

                default:
                    throw new Error(`Unknown action: ${action}`);
            }
        });
    });
});

    test.describe('Mark Complete',
        {
            tag: ['@mark-complete', '@regression']
        },
        () => {
        let todoPage

        test.beforeEach(async({ page }) => {
            todoPage = new ToDoPage(page);
        })

        test(`Checks a single todo-item`, async ({ page }) => {

            // Navigate to app and inject test data
            await setupPageWithData({ page, localStorageData: testData.todos.single })
            await todoPage.navigate();

            await todoPage.toggleToDos([testData.todos.single[0].title]);
            await expect(todoPage.toDoCount).toContainText(`0`);
        });

        test(`Checks multiple todo Items and confirm completed items`, async ({ page }) => {

            // Navigate to app and inject test data
            await setupPageWithData({ page, localStorageData: testData.todos.fiveCompleteFiveIncomplete })
            await todoPage.navigate();

            await todoPage.toggleToDos([`Incomplete task 1`,`Incomplete task 2`]);
            await expect(todoPage.toDoCount).toContainText(`3`);

            // Navigate to completed tab
            await todoPage.navigateToTab({ tab: "Completed"});
            await expect(todoPage.newEntry).toHaveCount(7);
        });

        test(`Checks all todo items and confirm no remaining active item is left`,
            {
                tag: ['@flaky']
            },
            async ({ page }) => {
            // Navigate to app and inject test data
            await setupPageWithData({ page, localStorageData: testData.todos.mixed })
            await todoPage.navigate();

            await todoPage.toggleAll.check();
            await expect(todoPage.toDoCount).toContainText(`0`);

            // Navigate to Active tab
            await todoPage.navigateToTab({ tab: "Active"});
            await expect(todoPage.newEntry).not.toBeAttached();
        });
    })
});