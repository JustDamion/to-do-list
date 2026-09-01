import { getProjects, addProject, removeProject, findProjectById, getFirstProject } from "./modules/app-state.js";
import { createProjectForPeriod } from "./modules/schedule.js";
import Project from "./modules/project.js";
import { renderProjectNav, renderProject, renderTaskDetails } from "./modules/render.js";
import Task from "./modules/task.js";
import { getProjectsFromStorage, storeProjects } from "./modules/storage.js";

let activeProjectId = "";
let activeTaskId = "";
let scheduleProjectId = "";
let activeNavButton = "";

export default function init() {
    addProjectListeners();
    addTaskListeners();
    addNavListeners();

    const projectsFromStorage = getProjectsFromStorage();
    console.log(projectsFromStorage);

    if (!projectsFromStorage) {
        const defaultProject = new Project("Main")
        addProject(defaultProject);
    }

    activeProjectId = getFirstProject().id;
    renderProjectNav(getProjects());
    renderProject(getFirstProject());
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
            addTaskButton.style.display = "inline-block";
        }
    })
}

function addTaskListeners() {
    const addTaskButton = document.getElementById("add-task-button");
    const addTaskDialog = document.getElementById("add-task-dialog");
    const addTaskDueDate = document.getElementById("add-task-due-date");
    addTaskButton.addEventListener("click", () => {
        addTaskDueDate.valueAsDate = new Date();
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
        addTaskForm.reset();
        renderProject(findProjectById(activeProjectId));
        storeProjects(getProjects());
    })

    const addTaskCloseButton = document.getElementById("add-task-close");
    addTaskCloseButton.addEventListener("click", () => {
        addTaskDialog.close();
        addTaskForm.reset();
    })

    const addTaskCancelButton = document.getElementById("add-task-cancel");
    addTaskCancelButton.addEventListener("click", () => {
        addTaskDialog.close();
        addTaskForm.reset();
    })

    const detailsSaveButton = document.getElementById("task-details-save");
    const detailsCancelButton = document.getElementById("task-details-cancel");
    const detailsEditButton = document.getElementById("task-details-edit");
    detailsEditButton.addEventListener("click", () => {
        const inputs = document.getElementsByClassName("js-details-input__input");
        for (let input of inputs) {
            input.removeAttribute("disabled");
        }

        detailsEditButton.style.display = "none";
        detailsSaveButton.style.display = "inline";
        detailsCancelButton.style.display = "inline";
    })

    const detailsModal = document.getElementById("task-details-dialog");
    detailsModal.addEventListener("close", () => {
        const inputs = document.getElementsByClassName("js-details-input__input");
        for (let input of inputs) {
            input.setAttribute("disabled", "");
        }

        detailsEditButton.style.display = "inline";
        detailsSaveButton.style.display = "none";
        detailsCancelButton.style.display = "none";
    })

    const detailsCloseButton = document.getElementById("task-details-close");
    detailsCloseButton.addEventListener("click", () => {
        detailsModal.close();
    })

    detailsCancelButton.addEventListener("click", () => {
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
        const [year, month, day] = formData.get("due-date").split("-").map(Number);
        task.dueDate = new Date(year, month - 1, day).toISOString();
        task.priority = formData.get("priority");

        const tags = formData.get("tags");
        task.tags = tags.split(",");

        renderProject(project);
        storeProjects(getProjects());
    })
}

function addProjectListeners() {
    const addProjectButton = document.getElementById("add-project-button");
    const addProjectModal = document.getElementById("add-project-modal");
    const addProjectForm = document.getElementById("add-project-form");

    addProjectButton.addEventListener("click", () => {
        addProjectModal.showModal();
        addProjectForm.reset();
    });

    const addProjectClose = document.getElementById("add-project-close");
    addProjectClose.addEventListener("click", () => {
        addProjectModal.close();
        addProjectForm.reset();
    })

    const addProjectCancel = document.getElementById("add-project-cancel");
    addProjectCancel.addEventListener("click", () => {
        addProjectModal.close();
    })

    addProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(addProjectForm);
        const project = new Project(formData.get("title"));
        addProject(project);

        addProjectForm.reset();
        renderProjectNav(getProjects());
        storeProjects(getProjects());
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
            storeProjects(getProjects());
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
            storeProjects(getProjects());
        }
    })
}
