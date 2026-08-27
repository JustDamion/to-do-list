export default class User {
    static projects = [];

    static addProject(project) {
        this.projects.push(project);
    }

    static removeProject(projectId) {
        const index = this.projects.findIndex(project => project.id === projectId);
        if (index !== -1) {
            this.projects.splice(index, 1);
        }
    }

    static findProjectById(id) {
        return this.projects.find(project => project.id === id);
    }

    static getAllTasks() {
        let allTasks = [];
        for (const project of this.projects) {
            for (const task of project.tasks) {
                allTasks.push(task);
            }
        }

        return allTasks;
    }
}