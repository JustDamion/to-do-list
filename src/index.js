import Project from "./modules/project.js";
import Schedule from "./modules/schedule.js";
import Screen from "./modules/screen.js";
import "./styles.css";
import Task from "./modules/task.js";
import User from "./modules/user.js";

const defaultProject = new Project("Default")

const task1 = new Task("Go to the gym", null, Schedule.getEndOfMonth(new Date().toISOString()), "Medium", ["health", "workout", "test"]);
const task2 = new Task("Walk 1 mile", null, new Date().toISOString(), "High", ["health", "workout", "test"]);

defaultProject.addTask(task1);
defaultProject.addTask(task2);

// console.log(defaultProject);

User.addProject(defaultProject);

Screen.addListeners();
Screen.renderProjectNav(User.projects);
Screen.renderProject(defaultProject);
