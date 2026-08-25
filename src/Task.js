export default class Task {
    id = crypto.randomUUID();
    complete = false;

    constructor(title, description = null, dueDate = null, priority = "High", tags = []) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.tags = tags
    }
}