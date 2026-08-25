import Schedule from "./Schedule.js";

export default class ScreenController {
    static contentDiv = document.querySelector("#content");

    static createDomElement(tag, classAttribute, textContent = null) {
        const element = document.createElement(tag);
        element.setAttribute("class", classAttribute);

        if (textContent !== null) {
            element.textContent = textContent;
        }

        return element;
    }

    static resetContent() {
        this.contentDiv.textContent = "";
    }

    static renderProjectNav(projects) {
        const projectNav = document.querySelector("#project-nav")

        for (const project of projects) {
            const navItem = this.createDomElement("li", "project-nav__item")
            navItem.appendChild(this.createDomElement("button", "project-nav__button", project.title))
            projectNav.appendChild(navItem);
        }
    }

    static renderProject(project) {
        this.resetContent();
        const tasks = project.tasks;

        const projectDiv = this.createDomElement("div", "project");
        projectDiv.appendChild(this.createDomElement("h1", "project__title", project.title));

        for (const task of tasks) {
            const daysRemaining = Schedule.getDifferenceInDays(Schedule.getCurrentDateIso(), task.dueDate);

            const taskDiv = this.createDomElement("div", "task");
            const taskHeading = this.createDomElement("div", "task__heading")

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
            taskDiv.appendChild(taskHeading);

            const taskActions = this.createDomElement("div", "task__actions");
            taskActions.appendChild(this.createDomElement("button", "task__edit-button", "Edit"));
            taskActions.appendChild(this.createDomElement("button", "task__delete-button", "X"));

            taskHeading.appendChild(taskActions);
            taskDiv.appendChild(taskHeading);

            const taskSubHeading = this.createDomElement("div", "task__sub-heading");

            let remainingDaysText = `${daysRemaining} days left`;
            if (daysRemaining === 0) {
                remainingDaysText = "Today"
            } else if (daysRemaining < 0) {
                remainingDaysText = `Overdue by ${daysRemaining} days`
            }

            taskSubHeading.appendChild(this.createDomElement("p", "task__due-date", remainingDaysText));

            const tags = task.tags;
            const taskTags = this.createDomElement("div", "task__tags");
            for (let i = 0; i < tags.length || i < 5; i++) {
                taskTags.appendChild(this.createDomElement("p", "tag", tags[i]));
            }

            taskSubHeading.appendChild(taskTags);
            taskDiv.appendChild(taskSubHeading);
            projectDiv.appendChild(taskDiv);
        }
        projectDiv.appendChild(this.createDomElement("button", "project__ad-task-button", "Add Task +"));
        this.contentDiv.appendChild(projectDiv);
    }
}