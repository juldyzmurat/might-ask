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
    <div>
      <h2>Task Statistics</h2>
      <p>Total Tasks: {tasks.length}</p>
      <p>Complete Tasks: {completePercentage}%</p>
      <CatGif completionPercentage={completePercentage} />
    </div>
  );
};

export default CatTracker;

