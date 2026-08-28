import { getProjects, addProject, removeProject, findProjectById, createProjectForPeriod } from "./modules/app-state.js";
import Project from "./modules/project.js";
import { renderProjectNav, renderProject, renderTaskDetails } from "./modules/render.js";
import Task from "./modules/task.js";
import { getEndOfMonth } from "./utils/date-utils.js";

let activeProjectId = "";
let scheduleProjectId = "";
let activeNavButton = "";

export default function init() {
    addListeners();

    const defaultProject = new Project("Main")

    const task1 = new Task("Go to the gym", "Exercise is good", getEndOfMonth(), "Medium", ["health", "workout", "test"]);
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
    activeProjectId = defaultProject.id;
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
        if (scheduleProjectId !== "") {
            removeProject(scheduleProjectId);
        }

        if (activeNavButton !== "") {
            activeNavButton.classList.remove("nav-list__item--active")
        }
        activeNavButton = event.target.parentNode;
        activeNavButton.classList.add("nav-list__item--active")

        const projectId = event.target.dataset.id;
        if (projectId) {
            renderProject(findProjectById(projectId));
            activeProjectId = projectId;
            addTaskButton.style.display = "block";
        }
    })

    const projectDiv = document.getElementById("project");
    projectDiv.addEventListener("click", (event) => {
        const targetElement = event.target;
        const taskId = targetElement.parentNode.parentNode.parentNode.dataset.id;
        if (targetElement.classList.contains("js-task-details-button")) {
            renderTaskDetails(findProjectById(activeProjectId).findTaskById(taskId));
        }
    })

    const scheduleNavList = document.getElementById("nav-list-schedule");
    scheduleNavList.addEventListener("click", (event) => {
        if (scheduleProjectId !== "") {
            removeProject(scheduleProjectId);
        }

        const targetElement = event.target;
        if (targetElement.hasAttribute("data-period")) {
            if (activeNavButton !== "") {
                activeNavButton.classList.remove("nav-list__item--active")
            }
            activeNavButton = targetElement.parentNode;

            const scheduleProject = createProjectForPeriod(targetElement.dataset.period);
            addProject(scheduleProject);
            renderProject(scheduleProject);

            activeProjectId = scheduleProject.id;
            scheduleProjectId = scheduleProject.id;

            activeNavButton.classList.add("nav-list__item--active")
            addTaskButton.style.display = "none";
        }
    })
}
