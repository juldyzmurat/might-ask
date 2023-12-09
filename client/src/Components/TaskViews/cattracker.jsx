import { GoogleData } from "../Login/LoginAPI";
import React, { useState, useEffect } from "react";
//import cat20 from "./20cat.gif";
import CatGif from "./catgifs";

const CatTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [completePercentage, setCompletePercentage] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Fetch all tasks for the user
        const request = `http://localhost:5200/tasks/${GoogleData.profileObj.email}`;
        const response = await fetch(request);

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const jsonData = await response.json();
        setTasks(jsonData);

        // Calculate the percentage of tasks with "complete" status
        const completeTasks = jsonData.filter((task) => task.status === "done");
        const percentage = (completeTasks.length / jsonData.length) * 100;
        setCompletePercentage(percentage.toFixed(2));
      } catch (error) {
        console.error("Error fetching tasks: ", error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center mt-4">
      <h2 style={{ color: '#ffffff' }}>Task Statistics</h2>
      <h3 className="lead" style={{ color: '#000000', fontWeight: 'bold' }}>Total Tasks: {tasks.length}</h3>
      <h3 className="lead" style={{ color: '#000000', fontWeight: 'bold' }}>Completed Tasks: {Math.round(completePercentage)}%</h3>

      <CatGif completionPercentage={Math.round(completePercentage)} />
    </div>
  );
  
};

export default CatTracker;
