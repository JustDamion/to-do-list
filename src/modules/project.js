export default class Project {
    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    addTasks(tasks) {
        for (let task of tasks) {
            this.addTask(task);
        }
    }

    removeTask(taskId) {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }

    resetTasks() {
        this.tasks = [];
    }

    updateTitle(title) {
        this.title = title;
    }

    findTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }
}