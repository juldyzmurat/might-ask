import React, { useState, useEffect } from "react";
import TaskComponent from "../TaskVisComponents/taskcomponent";
import PinnedSubheaderList from "../TaskVisComponents/listscroller";
import { GoogleData } from "../Login/LoginAPI";

const OptimizedSchedule = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchAndSortData = async () => {
      try {
        const request = "http://localhost:5200/tasks/".concat(GoogleData.profileObj.email);
        const response = await fetch(request);

        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        // Parse the response body as JSON
        const sortedData = await response.json();
        // console.log(sortedData);

        // Sorting function
        function compareByDeadline(a, b) {
          const dateOne = Date.parse(a.due);
          const dateTwo = Date.parse(b.due);
          return dateOne - dateTwo;
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
