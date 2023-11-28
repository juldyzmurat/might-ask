import React, { useState } from "react";
import TaskList from "../TaskList/TaskList";
import Kanban from "../Kanban/Kanban";

const Tabs = ({ categories }) => {
  const [activeTab, setActiveTab] = useState("TaskList");
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("TaskList");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("Kanban");
  };
  return (
    <div className="Tabs">
      <ul className="nav">
        <li
          className={activeTab === "TaskList" ? "active" : ""}
          onClick={handleTab1}
        >
          Task List
        </li>
        <li
          className={activeTab === "Kanban" ? "active" : ""}
          onClick={handleTab2}
        >
          Kanban
        </li>
      </ul>
      <div className="outlet">
        {activeTab === "TaskList" ? (
          <TaskList />
        ) : (
          <Kanban categories={categories} />
        )}
      </div>
    </div>
  );
};

export default Tabs;
