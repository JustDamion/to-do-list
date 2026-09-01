import { getAllTasks } from "./app-state.js";
import Project from "./project.js";
import {
  getCurrentDateIso,
  getEndOfWeek,
  getEndOfMonth,
} from "../utils/date-utils.js";

const TIME_PERIODS = {
  today: { period: getCurrentDateIso, title: "Todays Tasks" },
  week: { period: getEndOfWeek, title: "This Weeks Tasks" },
  month: { period: getEndOfMonth, title: "This Months Tasks" },
};

function getAllTasksBeforeDate(endDateIso) {
  const allTasks = getAllTasks();
  const tasksForPeriod = allTasks.filter((task) => task.dueDate <= endDateIso);

  return tasksForPeriod;
}

function createProjectForPeriod(timePeriod) {
  const scheduleProject = new Project(TIME_PERIODS[timePeriod].title);
  const tasks = getAllTasksBeforeDate(TIME_PERIODS[timePeriod].period());

  scheduleProject.addTasks(tasks);
  return scheduleProject;
}

export { getAllTasksBeforeDate, createProjectForPeriod };
