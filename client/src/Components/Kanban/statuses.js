export const statuses = ["to_do", "in_progress", "done"];

export const statusNames = {
  to_do: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

export const getTasksByStatus = (unorderedTasks) => {
  const tasksByStatus = unorderedTasks.reduce(
    (acc, task) => {
      acc[task.status].push(task);
      return acc;
    },
    statuses.reduce((obj, status) => ({ ...obj, [status]: [] }), {}),
  );
  // order each column by index
  statuses.forEach((status) => {
    tasksByStatus[status] = tasksByStatus[status].sort(
      (recordA, recordB) => recordA.index - recordB.index,
    );
  });
  return tasksByStatus;
};
