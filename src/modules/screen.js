import Schedule from "./schedule.js";
import User from "./user.js";
import Project from "./project.js";

export default class Screen {
    static contentDiv = document.querySelector("#content");

    static createDomElement(tag, classAttribute, textContent = null) {
        const element = document.createElement(tag);
        element.setAttribute("class", classAttribute);

        if (textContent !== null) {
            element.textContent = textContent;
        }

        return element;
    }

    static renderProjectNav(projects) {
        const projectNav = document.querySelector("#project-nav");
        projectNav.textContent = "";

        for (const project of projects) {
            const navItem = this.createDomElement("li", "project-nav__item");
            const navButton = this.createDomElement("button", "project-nav__button", project.title);
            navButton.setAttribute("data-projectid", project.id);
            navItem.appendChild(navButton);
            projectNav.appendChild(navItem);
        }
    }

    static renderProject(project) {
        this.contentDiv.textContent = "";
        const tasks = project.tasks;
        console.log(project.tasks);

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

        const addTaskButton = this.createDomElement("button", "project__ad-task-button", "Add Task +");
        addTaskButton.setAttribute("id", "add-task-button");
        addTaskButton.setAttribute("data-projectid", project.id);
        projectDiv.appendChild(addTaskButton);
        this.contentDiv.appendChild(projectDiv);
    }

    static addListeners() {
        const addProjectButton = document.querySelector("#add-project-button");
        const addProjectModal = document.querySelector("#add-project-modal");

        addProjectButton.addEventListener("click", () => {
            addProjectModal.showModal();
        });

        const addProjectForm = document.querySelector("#add-project-form");
        addProjectForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(addProjectForm);
            const project = new Project(formData.get("title"));
            User.addProject(project);

            this.renderProjectNav(User.projects);
            console.log(User.projects);
            addProjectModal.close();
        });

        const projectNav = document.querySelector("#project-nav");
        projectNav.addEventListener("click", (event) => {
            const projectId = event.target.dataset.projectid;
            if (projectId) {
                this.renderProject(User.findProjectById(projectId));
            }
        })
    }
}