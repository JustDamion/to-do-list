import { getCurrentDateIso, getDifferenceInDays } from "../utils/date-utils.js";
import { createDomElement } from "../utils/dom-utils.js";

function renderProjectNav(projects) {
    const projectNav = document.getElementById("nav-list-projects");
    projectNav.textContent = "";

    for (const project of projects) {
        const navItem = createDomElement("li", "nav-list__item");
        const navButton = createDomElement("button", "nav-list__button", project.title);
        navButton.setAttribute("data-id", project.id);
        navItem.appendChild(navButton);
        projectNav.appendChild(navItem);
    }
}

function renderTaskDetails(task) {
    const taskTitle = document.getElementById("task-details-title");
    taskTitle.value = task.title;

    const taskDescription = document.getElementById("task-details-description");
    taskDescription.value = task.description;

    const taskDueDate = document.getElementById("task-details-due-date");
    taskDueDate.value = new Date(task.dueDate).toLocaleDateString();

    const taskPriority = document.getElementById("task-details-priority");
    taskPriority.value = task.priority;

    const taskTags = document.getElementById("task-details-tags");
    taskTags.value = task.tags;

    const taskDetailsDialog = document.getElementById("task-details-dialog");
    taskDetailsDialog.showModal();
}

function renderProject(project) {
    const projectDiv = document.getElementById("project");
    const tasks = project.tasks;

    projectDiv.textContent = "";
    projectDiv.appendChild(createDomElement("h1", "project__title", project.title));

    for (const task of tasks) {
        const daysUntilDue = getDifferenceInDays(getCurrentDateIso(), task.dueDate);

        let taskPriorityClass = "task--low-priority";
        switch (task.priority.toLowerCase()) {
            case "low":
                taskPriorityClass = "task--low-priority";
                break;
            case "medium":
                taskPriorityClass = "task--medium-priority";
                break;
            case "high":
                taskPriorityClass = "task--high-priority";
                break;
        }

        const taskDiv = createDomElement("div", `task ${taskPriorityClass}`);
        taskDiv.setAttribute("data-id", task.id)

        const taskHeading = createDomElement("div", "task__heading")

        const taskCheckbox = document.createElement("input");
        taskCheckbox.setAttribute("class", "task__checkbox");
        taskCheckbox.setAttribute("type", "checkbox");
        taskCheckbox.setAttribute("id", task.id);

        const taskLabel = document.createElement("label");
        taskLabel.setAttribute("class", "task__title")
        taskLabel.setAttribute("for", task.id);
        taskLabel.textContent = task.title;

        taskHeading.appendChild(taskCheckbox)
        taskHeading.appendChild(taskLabel);

        const taskActions = createDomElement("div", "task__actions");
        taskActions.appendChild(createDomElement("button", "task__details-button js-task-details-button", "Details"));
        taskActions.appendChild(createDomElement("button", "task__delete-button js-task-delete-button", "X"));

        taskHeading.appendChild(taskActions);
        taskDiv.appendChild(taskHeading);

        const taskSubHeading = createDomElement("div", "task__sub-heading");

        let remainingDaysText = `${daysUntilDue} days left`;
        if (daysUntilDue === 0) {
            remainingDaysText = "today"
        } else if (daysUntilDue < 0) {
            remainingDaysText = `Overdue by ${daysUntilDue} days`
        }

        taskSubHeading.appendChild(createDomElement("p", "task__due-date", remainingDaysText));

        const tags = task.tags;
        const taskTags = createDomElement("div", "task__tags");
        for (let i = 0; i < Math.min(tags.length, 5); i++) {
            taskTags.appendChild(createDomElement("p", "tag", tags[i]));
        }

        taskSubHeading.appendChild(taskTags);
        taskDiv.appendChild(taskSubHeading);
        projectDiv.appendChild(taskDiv);
    }

    const addTaskButton = document.getElementById("add-task-button");
    addTaskButton.setAttribute("data-id", project.id);
}

export { renderProjectNav, renderProject, renderTaskDetails }