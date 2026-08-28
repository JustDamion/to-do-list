import { getCurrentDateIso, getEndOfMonth, getEndOfWeek } from "../utils/date-utils.js";
import Project from "./project.js";

let projects = [];

function getProjects() {
    return [...projects];
}

function addProject(project) {
    projects.push(project);
}

function removeProject(projectId) {
    const index = projects.findIndex(project => project.id === projectId);
    if (index !== -1) {
        projects.splice(index, 1);
    }
}

function getFirstProject() {
    if (projects[0]) {
        return projects[0];
    }
}

function findProjectById(id) {
    return projects.find(project => project.id === id);
}

function getAllTasks() {
    let allTasks = [];
    for (const project of projects) {
        for (const task of project.tasks) {
            allTasks.push(task);
        }
    }

    return allTasks;
}

function getAllTasksBeforeDate(endDateIso) {
    const allTasks = getAllTasks();
    const tasksForPeriod = allTasks.filter(task => task.dueDate <= endDateIso);

    return tasksForPeriod;
}

function createProjectForPeriod(timePeriod) {
    let tasks = [];
    let scheduleProject = new Project("Schedule");

    switch (timePeriod) {
        case "today":
            tasks = getAllTasksBeforeDate(getCurrentDateIso());
            scheduleProject.updateTitle("Todays Tasks");
            break;
        case "week":
            tasks = getAllTasksBeforeDate(getEndOfWeek());
            scheduleProject.updateTitle("This Weeks Tasks");
            break;
        case "month":
            tasks = getAllTasksBeforeDate(getEndOfMonth());
            scheduleProject.updateTitle("This Months Tasks");
            break;
        default:
            return "No known time period found";
    }

    scheduleProject.addTasks(tasks);
    return scheduleProject;
}

export { getProjects, addProject, removeProject, findProjectById, getAllTasks, getFirstProject, getAllTasksBeforeDate, createProjectForPeriod }