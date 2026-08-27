import Project from "./modules/project.js";
import Schedule from "./modules/schedule.js";
import Screen from "./modules/screen.js";
import "./styles.css";
import Task from "./modules/task.js";
import User from "./modules/user.js";

const defaultProject = new Project("Default")

const task1 = new Task("Go to the gym", null, Schedule.getEndOfMonth(new Date().toISOString()), "Medium", ["health", "workout", "test"]);
const task2 = new Task("Walk 1 mile", null, new Date().toISOString(), "High", ["health", "workout", "test"]);
const task3 = new Task("Go to the gym", null, Schedule.getEndOfMonth(new Date().toISOString()), "Medium", ["health", "workout", "test"]);
const task4 = new Task("Walk 1 mile", null, new Date().toISOString(), "High", ["health", "workout", "test"]);
const task5 = new Task("Go to the gym", null, Schedule.getEndOfMonth(new Date().toISOString()), "Medium", ["health", "workout", "test"]);
const task6 = new Task("Walk 1 mile", null, new Date().toISOString(), "High", ["health", "workout", "test"]);

defaultProject.addTasks(task1);
defaultProject.addTasks(task2);
defaultProject.addTasks(task3);
defaultProject.addTasks(task4);
defaultProject.addTasks(task5);
defaultProject.addTasks(task6);

User.addProject(defaultProject);

Screen.addListeners();
Screen.renderProjectNav(User.projects);
Screen.renderProject(defaultProject);
