import Project from "./project.js";
import User from "./user.js";

export default class Schedule {
    static monthProject = new Project("This Months Tasks");
    static weekProject = new Project("This Weeks Tasks");
    static dayProject = new Project("Todays Tasks")

    static getNewestMonthProject() {
        this.updateTasksForMonth();
        return this.monthProject;
    }

    static getNewestWeekProject() {
        this.updateTasksForWeek();
        return this.weekProject;
    }

    static getNewestDayProject() {
        this.updateTasksForToday();
        return this.dayProject;
    }

    static getEndOfMonth() {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
    }

    static getEndOfWeek() {
        const date = new Date();
        const lastDay = date.getDate() - (date.getDay() - 1) + 6;
        return new Date(date.setDate(lastDay)).toISOString();
    }

    static getDifferenceInDays(isoStringOne, isoStringTwo) {
        const date1 = new Date(isoStringOne);
        const date2 = new Date(isoStringTwo);

        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    static getCurrentDateIso() {
        return new Date().toISOString();
    }

    static resetScheduleProjects() {
        this.monthProject.resetTasks();
        this.weekProject.resetTasks();
        this.dayProject.resetTasks()
    }

    static updateTasksForWeek() {
        this.resetScheduleProjects();
        const allTasks = User.getAllTasks();
        const endOfWeek = this.getEndOfWeek();
        const weeklyTasks = allTasks.filter(task => task.dueDate <= endOfWeek);

        for (let task of weeklyTasks) {
            this.weekProject.addTasks(task);
        }
    }

    static updateTasksForMonth() {
        this.resetScheduleProjects();
        const allTasks = User.getAllTasks();
        const endOfMonth = this.getEndOfMonth();
        const monthlyTasks = allTasks.filter(task => task.dueDate <= endOfMonth);

        for (let task of monthlyTasks) {
            this.monthProject.addTasks(task);
        }
    }

    static updateTasksForToday() {
        this.resetScheduleProjects();
        const allTasks = User.getAllTasks();
        const today = this.getCurrentDateIso();
        const todaysTasks = allTasks.filter(task => task.dueDate <= today);

        for (let task of todaysTasks) {
            this.dayProject.addTasks(task);
        }
    }
}