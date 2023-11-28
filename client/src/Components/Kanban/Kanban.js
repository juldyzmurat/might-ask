import Stack from "@mui/material/Stack";
import TaskCard from "../Tasks/TaskCard";

const Kanban = ({ categories }) => {
  const tasks = [
    { name: "Presentation", dueDate: "2022-11-30", category: "School" },
    { name: "Meeting", dueDate: "2022-11-27", category: "Work" },
    {
      name: "a task with a much longer name for testing purposes",
      dueDate: "2024-01-01",
      category: "Personal",
    },
  ];

  return (
    <div className="Kanban">
      <Stack spacing={2}>
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} categories={categories} />
        ))}
      </Stack>
    </div>
  );
};

export default Kanban;
