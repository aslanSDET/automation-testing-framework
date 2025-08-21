import projectConstants from '../../data/constants.js'
import ToDoItem from '../components/ToDoItem.js';

export class ToDoPage{

    constructor(page){
        this.page = page;
    
        // Locators
        this.newTodoInput = page.locator(`input[class='new-todo']`);
        this.newEntry = page.getByTestId(`todo-title`);
        this.clearCompleted = page.locator(`button[class='clear-completed']`)
        this.toggleAll= page.locator(`input[type='checkbox'][class='toggle-all']`)
        this.toDoCount = page.getByTestId(`todo-count`);
    }

    //Functions
    // Get todo item component
    getTodoItem(title) {
        return new ToDoItem(this.page, title);
    }

    async navigate(){
            this.page.goto(projectConstants.ROUTES.TODO);
            this.newTodoInput.waitFor();
    }

    async navigateToTab({tab = {}}){
        switch (tab) {
            case 'Completed':
                this.page.goto(`${projectConstants.ROUTES.TODO}#/completed`);
                break;
            case 'Active':
                this.page.goto(`${projectConstants.ROUTES.TODO}#/active`);
                break;
            default:
                this.page.goto(projectConstants.ROUTES.TODO);
                this.newTodoInput.waitFor();
                break;
        }
    }
    /**
     * Adds todo items to the list
     * @param {string[]} titles - Array of todo titles
     * @returns {Promise<void>} Promise that resolves when all todos are added
     */
    async addTodo(titles) {
        for (const title of titles){
            await this.newTodoInput.fill(title);
            await this.newTodoInput.press('Enter');
        }
    }

    async deleteTodos(titles){
        for (const title of titles){
            const toDoItem = this.getTodoItem(title);
            await toDoItem.delete();
        }
    }

    async toggleToDos(titles){
        for (const title of titles){
            const toDoItem = this.getTodoItem(title);
            await toDoItem.toggleComplete();
        }
    }
}