const testData = {
    todos: {
        empty: [],
        single: [
            {
                id: "d091ef19-74b3-4468-85cc-6e50b770de8f",
                title: "Learn Playwright",
                completed: false
            }
        ],
        mixed: [
            {
                id: "6ee25103-c6c8-49d0-bb68-92f6ed225fb4",
                title: "Buy groceries",
                completed: false
            },
            {
                id: "7e17b193-6746-415f-900e-9fa9c27f38f0",
                title: "Walk the dog",
                completed: true
            },
            {
                id: "58f91eca-752c-4cef-a645-15a27828041a",
                title: "Write tests",
                completed: false
            }
        ],
        allCompleted: [
            {
                id: "b04b76ea-0aff-4991-89e5-74cb1098c7dd",
                title: "Completed task 1",
                completed: true
            },
            {
                id: "7433e07e-9570-413f-81a1-f2cd67e6f3b8",
                title: "Completed task 2",
                completed: true
            }
        ]
    }
};

export default testData;