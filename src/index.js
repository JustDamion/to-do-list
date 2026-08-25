import Project from "./Project.js";
import Schedule from "./Schedule.js";
import ScreenController from "./ScreenController.js";
import "./styles.css";
import Task from "./Task.js";
import User from "./User.js";

const user = new User();
const defaultProject = new Project("Default")

const task1 = new Task("Go to the gym", null, Schedule.getEndOfMonth(new Date().toISOString()), "Medium", ["health", "workout", "test"]);
const task2 = new Task("Walk 1 mile", null, new Date().toISOString(), "High", ["health", "workout", "test"]);

defaultProject.addTask(task1);
defaultProject.addTask(task2);

console.log(defaultProject);

user.addProject(defaultProject);

ScreenController.renderProjectNav(user.projects);
ScreenController.renderProject(defaultProject);

// console.log(item.createdAt);
// console.log(new Date(item.createdAt));