import { getProjects, addProject, findProjectById, createProjectForPeriod } from "./modules/app-state.js";
import Project from "./modules/project.js";
import { renderProjectNav, renderProject } from "./modules/render.js";
import Task from "./modules/task.js";
import { getEndOfMonth } from "./utils/date-utils.js";

export default function init() {
    addListeners();

    const defaultProject = new Project("All Tasks")

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
}

function addListeners() {
    const addProjectButton = document.getElementById("add-project-button");
    const addProjectModal = document.getElementById("add-project-modal");

    addProjectButton.addEventListener("click", () => {
        addProjectModal.showModal();
    });

    const addProjectForm = document.getElementById("add-project-form");
    addProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(addProjectForm);
        const project = new Project(formData.get("title"));
        addProject(project);

        renderProjectNav(getProjects());
        addProjectModal.close();
    });

    const addTaskButton = document.getElementById("add-task-button");
    addTaskButton.addEventListener("click", () => {
        console.log("HI")
    })

    const projectNavList = document.getElementById("nav-list-projects");
    projectNavList.addEventListener("click", (event) => {
        const projectId = event.target.dataset.id;
        if (projectId) {
            renderProject(findProjectById(projectId));
            addTaskButton.style.display = "block";
        }
    })

    const scheduleNavList = document.getElementById("nav-list-schedule");
    scheduleNavList.addEventListener("click", (event) => {
        const targetElement = event.target;
        if (targetElement.hasAttribute("data-period")) {
            const scheduleProject = createProjectForPeriod(targetElement.dataset.period);
            renderProject(scheduleProject);

            addTaskButton.style.display = "none";
        }
    })
}
