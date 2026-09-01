import { addProject, getProjects } from "./app-state.js";
import Project from "./project.js";
import Task from "./task.js";

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function loadProjects() {
  if (storageAvailable("localStorage")) {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));

    if (storedProjects) {
      for (let project of storedProjects) {
        addProject(Object.assign(new Project(), project));
      }

      const projects = getProjects();

      for (let i = 0; i < projects.length; i++) {
        for (let j = 0; j < projects[i].tasks.length; j++) {
          projects[i].tasks[j] = Object.assign(
            new Task(),
            projects[i].tasks[j],
          );
        }
      }
    } else {
      console.log("No stored projects");
      return [];
    }

    return getProjects();
  } else {
    console.error("Local storage unavailable");
    return false;
  }
}

function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export { loadProjects, saveProjects };
