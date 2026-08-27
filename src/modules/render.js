import { getCurrentDateIso, getDifferenceInDays } from "../utils/date-utils.js";
import { createDomElement } from "../utils/dom-utils.js";

const contentDiv = document.querySelector("#content");

function renderProjectNav(projects) {
    const projectNav = document.querySelector("#project-nav__list");
    projectNav.textContent = "";

    for (const project of projects) {
        const navItem = createDomElement("li", "project-nav__item");
        const navButton = createDomElement("button", "project-nav__button", project.title);
        navButton.setAttribute("data-projectid", project.id);
        navItem.appendChild(navButton);
        projectNav.appendChild(navItem);
    }
}

function renderProject(project) {
    contentDiv.textContent = "";
    const tasks = project.tasks;

    const projectDiv = createDomElement("div", "project");
    projectDiv.appendChild(createDomElement("h1", "project__title", project.title));

    for (const task of tasks) {
        const daysUntilDue = getDifferenceInDays(getCurrentDateIso(), task.dueDate);

        const taskDiv = createDomElement("div", "task");
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
        taskActions.appendChild(createDomElement("button", "task__edit-button", "Edit"));
        taskActions.appendChild(createDomElement("button", "task__delete-button", "X"));

        taskHeading.appendChild(taskActions);
        taskDiv.appendChild(taskHeading);

        const taskSubHeading = createDomElement("div", "task__sub-heading");

        let remainingDaysText = `${daysUntilDue} days left`;
        if (daysUntilDue === 0) {
            remainingDaysText = "Today"
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

    const addTaskButton = createDomElement("button", "project__add-task-button", "Add Task +");
    addTaskButton.setAttribute("id", "add-task-button");
    addTaskButton.setAttribute("data-projectid", `task-button-${project.id}`);
    projectDiv.appendChild(addTaskButton);
    contentDiv.appendChild(projectDiv);
}

export { renderProjectNav, renderProject }