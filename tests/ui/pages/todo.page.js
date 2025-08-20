export class ToDoPage{

    constructor(page){
        this.page = page;
    
        // Locators
        this.newTodoInput = page.locator(`input[class='new-todo']`);
        this.newEntry = page.getByTestId(`todo-title`)
    }

    //Functions
      // Add todo itmes to the list
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
}