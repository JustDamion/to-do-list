export default class Task {
    constructor(title, description = null, dueDate = null, priority = "High", tags = []) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.tags = tags
        this.isComplete = false;
    }
}