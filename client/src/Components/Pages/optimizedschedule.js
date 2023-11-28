import React, { useState, useEffect } from "react";
import TaskComponent from "../TaskVisComponents/taskcomponent";
import PinnedSubheaderList from "../TaskVisComponents/listscroller";
//import Google from "../Login/LoginAPI";
//import { GoogleOAuthProvider } from '@react-oauth/google';
//import gif from '../../80cat.gif';
//import CalendarComponent from '../GoogleCalenderComponents/Calender';

const OptimizedSchedule = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchAndSortData = async () => {
      try {
        const response = await fetch("http://localhost:5200/tasks");

        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        // Parse the response body as JSON
        const sortedData = await response.json();
        console.log(sortedData);

        // Sorting function
        function compareByDeadline(a, b) {
          return a.due - b.due;
        }

        // Sort data
        sortedData.sort(compareByDeadline);
        console.log(sortedData);

        // Update the state with the fetched data
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchAndSortData();
  }, []);

  return (
    <div className="OptimizedSchedule">
      {/* First tab content will go here */}
      <div style={{ height: "500px" }}>
        <PinnedSubheaderList data={data} />
      </div>
    </div>
  );
};

export default OptimizedSchedule;
