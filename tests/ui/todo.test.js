import { test, expect } from '@playwright/test';
import { ToDoPage } from './pages/todo.page.js';
import testData from '../data/test-data.js';
import projectConstants from '../data/constants.js'
import { setupPageWithData } from '../../utils/helpers.js';

test.describe('ToDo App Functionality', () => {

    const addTodotestScenarios = [
        { input: ['Car Maintenance'], data: [], description: 'Add a single TODO to Empty list', expectedLength: 1},
        { input: [testData.todos.single[0].title], data: testData.todos.single, description: 'Add duplicate TODO to existing list', expectedLength: 2},
        { input: ['ASCII: 1234567890-=~!@#$%^&*'], data: testData.todos.mixed, description: 'Add ASCII chars to list with multiple entries', expectedLength: (testData.todos.mixed.length+1)}
    ];

    addTodotestScenarios.forEach(({ input, data, description, expectedLength }) => {
        test.describe(`Add Todos with scenario: ${description}`, () => {
            let todoPage;

            test.beforeEach(async({ page }) => {
                todoPage = new ToDoPage(page);
                
                // Navigate to app and inject test data
                await setupPageWithData({ page, localStorageData: data })
            })

            test('Adds to the bottom', async ({ page }) => {
                await page.goto(projectConstants.ROUTES.TODO)
                await todoPage.newTodoInput.waitFor();

                await todoPage.addTodo(input)
                await expect(todoPage.newEntry.last()).toHaveText(input);
                await expect(todoPage.newEntry).toHaveCount(expectedLength);
            });
        });
    });

    
    test.describe(`Adds multiple entries`, () => {
        let todoPage;

        const testData =
            { input: ['First','Second','Third'], data: [], description: 'Adds multiple entries', expectedLength: 3}

        test.beforeEach(async({ page }) => {
            todoPage = new ToDoPage(page);
            
            // Navigate to app and inject test data: Clear storage
            await setupPageWithData({ page, localStorageData: testData.data })
        })
    
        test('Adds new entries', async ({ page }) => {
            await page.goto(projectConstants.ROUTES.TODO)
            await todoPage.newTodoInput.waitFor();
    
            await todoPage.addTodo(testData.input);
            await expect(todoPage.newEntry).toHaveText([
                testData.input[0],
                testData.input[1],
                testData.input[2]
                ]);
            await expect(todoPage.newEntry).toHaveCount(testData.expectedLength);
        });
    });
    
    test.describe('Delete Todos', () => {
    
    })

    test.describe('Mark Complete', () => {
    
    })
});