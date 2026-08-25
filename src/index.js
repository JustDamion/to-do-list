import "./styles.css";



class Project {
    id = crypto.randomUUID();
    items = [];

    constructor(name) {
        this.name = name;
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(itemId) {
        const index = this.items.findIndex(item => item.id === itemId);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
}

class Task {
    id = crypto.randomUUID();
    createdAt = new Date().toISOString();
    complete = false;

    constructor(title, description = null, dueDate = null, priority = 1, notes = null, subTasks = [], tags = ["important"]) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.subTasks = subTasks;
        this.tags = tags
    }
}

const item = new Task("Test", "Test", "February 10", 0, "Hello", "1234", "Not done", ["new"]);
const project = new Project("default");

project.addItem(item);
console.log(project);

console.log()

// console.log(item.createdAt);
// console.log(new Date(item.createdAt));