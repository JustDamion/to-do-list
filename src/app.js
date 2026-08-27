import { getProjects, addProject, findProjectById } from "./modules/app-state";
import Project from "./modules/project";

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
    addProject(project);

    this.renderProjectNav(getProjects());
    addProjectModal.close();
});

// const addTaskButton = document.querySelector(`[data-projectid="task-button-${activeProjectId}"]`);
// addTaskButton.addEventListener("click", () => {
//     null
// })

const projectNav = document.querySelector("#project-nav__list");
projectNav.addEventListener("click", (event) => {
    const projectId = event.target.dataset.projectid;
    if (projectId) {
        this.renderProject(findProjectById(projectId));
    }
})

const thisMonthButton = document.querySelector("#schedule-nav-month");
thisMonthButton.addEventListener("click", () => {
    this.renderProject(Schedule.getNewestMonthProject());
})

const thisWeekButton = document.querySelector("#schedule-nav-week");
thisWeekButton.addEventListener("click", () => {
    this.renderProject(Schedule.getNewestWeekProject());
})

const todayButton = document.querySelector("#schedule-nav-day");
todayButton.addEventListener("click", () => {
    this.renderProject(Schedule.getNewestDayProject());
})