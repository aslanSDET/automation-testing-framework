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
        ],
        fiveCompleteFiveIncomplete: [
            // Completed todos
            {
                id: "30556d41-26d8-44eb-ab97-355706d25b0b",
                title: "Complete task 1",
                completed: true
            },
            {
                id: "e8529880-a4b5-4327-abba-7f57c3dba1d6",
                title: "Complete task 2",
                completed: true
            },
            {
                id: "d354deb1-ee53-4fef-a6c0-4a65a48692da",
                title: "Complete task 3",
                completed: true
            },
            {
                id: "c6bbc089-ec7e-4d13-a179-26b140e445e6",
                title: "Complete task 4",
                completed: true
            },
            {
                id: "7f55610b-ec6b-4b68-ab97-65d60af90b4a",
                title: "Complete task 5",
                completed: true
            },
            // Incomplete todos
            {
                id: "ea1dba96-5e50-4dbb-ac52-0006f57df2a3",
                title: "Incomplete task 1",
                completed: false
            },
            {
                id: "d6634355-e445-4e95-9237-00185c7f2033",
                title: "Incomplete task 2",
                completed: false
            },
            {
                id: "92444958-f625-4c5f-845a-e91cdaf62ba8",
                title: "Incomplete task 3",
                completed: false
            },
            {
                id: "15473798-c8a9-4252-9db7-a321bf61859f",
                title: "Incomplete task 4",
                completed: false
            },
            {
                id: "9b6acc7e-a732-4881-9702-00403891839e",
                title: "Incomplete task 5",
                completed: false
            }
        ]
    }
};

export default testData;