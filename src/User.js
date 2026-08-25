export default class User {
    constructor() {
        this.projects = []
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(projectId) {
        const index = this.projects.findIndex(project => project.id === projectId);
        if (index !== -1) {
            this.projects.splice(index, 1);
        }
    }
}