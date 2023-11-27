import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

const TaskCard = ({ task, categories }) => {
  const [taskCategory, setTaskCategory] = useState(task.category);

  const handleSetTaskCategory = (event) => {
    setTaskCategory(event.target.value);
    task.category = taskCategory;
  };

  return (
    <div className="task-card">
      <Card
        sx={{ minWidth: 100, minHeight: 50, maxWidth: 250, maxHeight: 300 }}
      >
        <CardContent>
          <Stack>
            <Typography variant="body1" align="left">
              {task.name}
            </Typography>
            <Typography variant="body2" align="left">
              {task.dueDate}
            </Typography>
            <select value={taskCategory} onChange={handleSetTaskCategory}>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
