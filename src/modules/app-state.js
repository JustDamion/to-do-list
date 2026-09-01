let projects = [];

function getProjects() {
  return [...projects];
}

function addProject(project) {
  projects.push(project);
}

function removeProject(projectId) {
  const index = projects.findIndex((project) => project.id === projectId);
  if (index !== -1) {
    projects.splice(index, 1);
  }
}

function getFirstProject() {
  if (projects[0]) {
    return projects[0];
  }
}

function findProjectById(id) {
  return projects.find((project) => project.id === id);
}

function getAllTasks() {
  let allTasks = [];
  for (const project of projects) {
    for (const task of project.tasks) {
      allTasks.push(task);
    }
  }

  return allTasks;
}

export {
  getProjects,
  addProject,
  removeProject,
  findProjectById,
  getAllTasks,
  getFirstProject,
};
