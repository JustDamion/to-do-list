export default class Project {
    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.tasks = [];
    }

    addTasks(tasks) {
        if (typeof tasks === Array) {
            for (const task of tasks) {
                this.tasks.push(task);
            }
        } else {
            this.tasks.push(tasks);
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
}