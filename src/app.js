import { getProjects, addProject, removeProject, findProjectById } from "./modules/app-state.js";
import { createProjectForPeriod } from "./modules/schedule.js";
import Project from "./modules/project.js";
import { renderProjectNav, renderProject, renderTaskDetails } from "./modules/render.js";
import Task from "./modules/task.js";
import { getCurrentDateIso, getEndOfMonth, getEndOfWeek } from "./utils/date-utils.js";

let activeProjectId = "";
let activeTaskId = "";
let scheduleProjectId = "";
let activeNavButton = "";

export default function init() {
    addProjectListeners();
    addTaskListeners();
    addNavListeners();

    const defaultProject = new Project("Main")

    const task1 = new Task("Go to the gym", "Exercise is good", getEndOfMonth(), "low", ["health", "workout", "test"]);
    const task2 = new Task("Walk 1 mile", null, new Date().toISOString(), "High", ["health", "workout", "test"]);
    const task3 = new Task("Go to the gym", null, getEndOfMonth(), "Medium", ["health", "workout", "test"]);
    const task4 = new Task("Walk 1 mile", null, getEndOfWeek(), "High", ["health", "workout", "test"]);
    const task5 = new Task("Go to the gym", null, getEndOfMonth(), "Medium", ["health", "workout", "test"]);
    const task6 = new Task("Walk 1 mile", null, getCurrentDateIso(), "High", ["health", "workout", "test"]);

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

function addNavListeners() {
    const addTaskButton = document.getElementById("add-task-button");
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

    const projectNavList = document.getElementById("nav-list-projects");
    projectNavList.addEventListener("click", (event) => {
        const projectId = event.target.dataset.id;
        if (projectId) {
            if (scheduleProjectId !== "") {
                removeProject(scheduleProjectId);
            }

            if (activeNavButton !== "") {
                activeNavButton.classList.remove("nav-list__item--active")
            }
            activeNavButton = event.target.parentNode;
            activeNavButton.classList.add("nav-list__item--active")
            renderProject(findProjectById(projectId));
            activeProjectId = projectId;
            addTaskButton.style.display = "block";
        }
    })
}

function addTaskListeners() {
    const addTaskButton = document.getElementById("add-task-button");
    const addTaskDialog = document.getElementById("add-task-dialog");
    addTaskButton.addEventListener("click", () => {
        addTaskDialog.showModal();
    })

    const addTaskForm = document.getElementById("add-task-form");
    addTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(addTaskForm);
        const taskTitle = formData.get("title");
        const taskDescription = formData.get("description");
        const [year, month, day] = formData.get("due-date").split("-").map(Number);
        const taskDueDate = new Date(year, month - 1, day).toISOString();
        const taskPriority = formData.get("priority");
        const taskTags = formData.get("tags");

        const task = new Task(taskTitle, taskDescription, taskDueDate, taskPriority, taskTags);
        findProjectById(activeProjectId).addTask(task);
        addTaskDialog.close();
        renderProject(findProjectById(activeProjectId));
    })

    const saveButton = document.getElementById("task-details-save");
    const cancelButton = document.getElementById("task-details-cancel");
    const editTaskButton = document.getElementById("task-details-edit");
    editTaskButton.addEventListener("click", (event) => {
        const inputs = document.getElementsByClassName("js-details-input__input");
        for (let input of inputs) {
            input.removeAttribute("disabled");
        }

        editTaskButton.style.display = "none";
        saveButton.style.display = "inline";
        cancelButton.style.display = "inline";
    })

    const detailsModal = document.getElementById("task-details-dialog");
    detailsModal.addEventListener("close", (event) => {
        const inputs = document.getElementsByClassName("js-details-input__input");
        for (let input of inputs) {
            input.setAttribute("disabled", "");
        }

        editTaskButton.style.display = "inline";
        saveButton.style.display = "none";
        cancelButton.style.display = "none";
    })

    const detailsCloseButton = document.getElementById("task-details-close");
    detailsCloseButton.addEventListener("click", () => {
        detailsModal.close();
    })

    cancelButton.addEventListener("click", () => {
        detailsModal.close();
    })

    const detailsForm = document.getElementById("task-details-form");
    detailsForm.addEventListener("submit", (event) => {
        event.preventDefault();

        detailsModal.close();
        const project = findProjectById(activeProjectId);
        const task = project.findTaskById(activeTaskId);

        const formData = new FormData(detailsForm);
        task.title = formData.get("name");
        task.description = formData.get("description");
        task.dueDate = formData.get("due-date");
        task.priority = formData.get("priority");

        const tags = formData.get("tags");
        task.tags = tags.split(",");

        renderProject(project);
    })
}

function addProjectListeners() {
    const addProjectButton = document.getElementById("add-project-button");
    const addProjectModal = document.getElementById("add-project-modal");

    addProjectButton.addEventListener("click", () => {
        addProjectModal.showModal();
    });

    const addProjectClose = document.getElementById("add-project-close");
    addProjectClose.addEventListener("click", () => {
        addProjectModal.close();
    })

    const addProjectCancel = document.getElementById("add-project-cancel");
    addProjectCancel.addEventListener("click", () => {
        addProjectModal.close();
    })

    const addProjectForm = document.getElementById("add-project-form");
    addProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(addProjectForm);
        const project = new Project(formData.get("title"));
        addProject(project);

        renderProjectNav(getProjects());
        addProjectModal.close();
    });

    const projectDiv = document.getElementById("project");
    projectDiv.addEventListener("click", (event) => {
        const project = findProjectById(activeProjectId);
        const targetElement = event.target;
        let taskId = "";
        let task = "";

        if (targetElement.classList.contains("js-task-details-button")) {
            taskId = targetElement.parentNode.parentNode.parentNode.dataset.id;
            task = project.findTaskById(taskId);
            activeTaskId = taskId;
            renderTaskDetails(task);
        } else if (targetElement.classList.contains("js-task-delete-button")) {
            taskId = targetElement.parentNode.parentNode.parentNode.dataset.id;
            task = project.findTaskById(taskId);
            project.removeTask(taskId);
            renderProject(project);
        } else if (targetElement.classList.contains("js-task-checkbox")) {
            taskId = targetElement.parentNode.parentNode.dataset.id;
            task = project.findTaskById(taskId);
            const checkbox = document.getElementById(taskId);

            if (checkbox.checked) {
                checkbox.checked = true;
                task.isComplete = true;
            } else {
                checkbox.checked = false;
                task.isComplete = false;
            }
            renderProject(project);
        }
    })
}
