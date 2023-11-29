import React, { useState } from "react";
import PinnedSubheaderList from "../TaskVisComponents/listscroller";
import PlusButton from "../TaskVisComponents/PlusButton";
import TaskForm from "../TaskVisComponents/TaskForm";
import "../../Styles/TaskForm.css";

const ListView = ({ data }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const tasks = data; //This is all of the task handle as needed

  const handleAddTaskClick = () => {
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
  };

  return (
    <div className="ListView">
      {/* First tab content will go here */}
      <div style={{ height: "500px" }}>
        {!showTaskForm && <PinnedSubheaderList data={tasks} />}
      </div>
      <div>
        <PlusButton onClick={handleAddTaskClick} />
        {showTaskForm && (
          <div className="task-form-overlay">
            <TaskForm onClose={handleCloseTaskForm} editordelete="Delete" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListView;
