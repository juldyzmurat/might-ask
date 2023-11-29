import React, { useState } from "react";
import PinnedSubheaderList from "../TaskVisComponents/listscroller";
import AddTask from "../TaskVisComponents/addtask";
import TaskForm from "../TaskVisComponents/popupaddtask";
import "../../Styles/popupaddtask.css";

const ListView = ({ data }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const tasks = data;

  const handleAddTaskClick = () => {
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
  };

  return (
    <div className="ListView">
      <div style={{ height: "500px" }}>
        {!showTaskForm && <PinnedSubheaderList data={tasks} />}
      </div>
      <div>
        <AddTask onClick={handleAddTaskClick} />
        {showTaskForm && (
          <div className="task-form-overlay">
            <TaskForm onClose={handleCloseTaskForm} editoradd="Add" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListView;
