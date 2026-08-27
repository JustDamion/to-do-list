import "./styles.css";
import Task from "./modules/task.js";
import Project from "./modules/project.js";
import { getProjects, addProject } from "./modules/app-state.js";
import { renderProjectNav, renderProject } from "./modules/render.js";
import { getEndOfMonth } from "./utils/date-utils.js";

const defaultProject = new Project("Default")

const task1 = new Task("Go to the gym", null, getEndOfMonth(), "Medium", ["health", "workout", "test"]);
const task2 = new Task("Walk 1 mile", null, new Date().toISOString(), "High", ["health", "workout", "test"]);
const task3 = new Task("Go to the gym", null, getEndOfMonth(), "Medium", ["health", "workout", "test"]);
const task4 = new Task("Walk 1 mile", null, new Date().toISOString(), "High", ["health", "workout", "test"]);
const task5 = new Task("Go to the gym", null, getEndOfMonth(), "Medium", ["health", "workout", "test"]);
const task6 = new Task("Walk 1 mile", null, new Date().toISOString(), "High", ["health", "workout", "test"]);

defaultProject.addTask(task1);
defaultProject.addTask(task2);
defaultProject.addTask(task3);
defaultProject.addTask(task4);
defaultProject.addTask(task5);
defaultProject.addTask(task6);

addProject(defaultProject);

renderProjectNav(getProjects());
renderProject(defaultProject);
