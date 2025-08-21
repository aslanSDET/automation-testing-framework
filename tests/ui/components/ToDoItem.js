// ToDoItem component
export default class ToDoItem {
    constructor(page, title) {
        this.page = page;
        this.title = title;
        this.container = page.getByTestId('todo-item').filter({ hasText: new RegExp(`^${title}$`) });
    }

    // Component methods
    get deleteBtn() { return this.container.locator(`button[class=destroy]`); }
    get toggle() { return this.container.locator(`input[type='checkbox'][class='toggle']`); }
    get titleLabel() { return this.container.locator('[data-testid="todo-title"]'); }
    
    async delete() {
        await this.container.hover();
        await this.deleteBtn.click();
    }
    
    async toggleComplete() {
        await this.toggle.check();
    }
    
    async hover() {
        await this.container.hover();
    }
}