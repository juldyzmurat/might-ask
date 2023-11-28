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

  const [data, setData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5200/tasks");

        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        // Parse the response body as JSON
        const jsonData = await response.json();

        // Update the state with the fetched data
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

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
