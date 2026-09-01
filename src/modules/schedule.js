import { getAllTasks } from "./app-state.js";
import Project from "./project.js";
import {
  getCurrentDateIso,
  getEndOfWeek,
  getEndOfMonth,
} from "../utils/date-utils.js";

const TIME_PERIODS = {
  today: { endDate: getCurrentDateIso, title: "Today's Tasks" },
  week: { endDate: getEndOfWeek, title: "This Week's Tasks" },
  month: { endDate: getEndOfMonth, title: "This Month's Tasks" },
};

function getAllTasksBeforeDate(endDateIso) {
  const allTasks = getAllTasks();
  const tasksForPeriod = allTasks.filter((task) => task.dueDate <= endDateIso);

  return tasksForPeriod;
}

function createProjectForPeriod(timePeriod) {
  const scheduleProject = new Project(TIME_PERIODS[timePeriod].title);
  const tasks = getAllTasksBeforeDate(TIME_PERIODS[timePeriod].endDate());

  scheduleProject.addTasks(tasks);
  return scheduleProject;
}

export { getAllTasksBeforeDate, createProjectForPeriod };
