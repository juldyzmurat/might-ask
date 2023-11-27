import { useState } from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <p>{task}</p>
    </div>
  );
};

export default TaskCard;
