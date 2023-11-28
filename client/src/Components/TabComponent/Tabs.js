import React, { useState, useEffect } from "react";
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

  const [userTasks, setUserTasks] = useState([]);

  // Function to fetch data from the backend
  const fetchTaskData = async () => {
    try {
      const response = await fetch("http://localhost:5200/tasks");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      setUserTasks(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(
    () => {
      fetchTaskData();
    },
    [
      /* add dependencies here; if this changes, data will be fetched again*/
    ],
  );

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
          <TaskList tasks={userTasks} />
        ) : (
          <Kanban tasks={userTasks} />
        )}
      </div>
    </div>
  );
};

export default Tabs;
