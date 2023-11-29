import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { GoogleData } from "../Login/LoginAPI";

const CategoryDashboard = () => {
  const [taskData, setData] = useState([]); //The full task data incase we need it
  const [categoryData, setCategoryData] = useState([]);
  //const [result, setNewData] = useState([]); //Holds the data for the pie chart

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const taskRequest = "http://localhost:5200/tasks/".concat(
          GoogleData.profileObj.email,
        );
        const taskResponse = await fetch(taskRequest);

        // Check if the response is successful (status code 200)
        if (!taskResponse.ok) {
          throw new Error("Failed to fetch task data");
        }

        // Parse the response body as JSON
        const taskData = await taskResponse.json();

        // Update the state with the fetched data
        setData(taskData);

        // Fetch category data
        const categoryRequest = "http://localhost:5200/categories/".concat(
          GoogleData.profileObj.email,
        );
        const categoryResponse = await fetch(categoryRequest);
        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch category data");
        }
        const categoryJsonData = await categoryResponse.json();
        setCategoryData(categoryJsonData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // Count occurrences of each categoryid
  const categoryCount = {};
  taskData.forEach((item) => {
    const categoryId = item.categoryid;
    console.log(item.categoryid);
    categoryCount[categoryId] = (categoryCount[categoryId] || 0) + 1;
  });

  // Create a new JSON object with Categoryid and count
  //const newJson = Object.entries(categoryCount).map(([categoryId, count]) => ({ categoryId, count }));
  // Create a new JSON object with Categoryid, CategoryName, color, and count
  const newJson = Object.entries(categoryCount).map(([categoryId, count]) => ({
    categoryId,
    categoryName:
      categoryData.find((categoryItem) => categoryItem._id === categoryId)
        ?.name || "Unkown",
    count,
    color: categoryData.find((categoryItem) => categoryItem._id === categoryId)
      ?.color,
  }));

  // Convert the structure
  const transformedJson = newJson.map((item) => ({
    name: `Category ${item.categoryName}`, // Can be customized
    count: item.count,
    color: item.color,
  }));
  console.log(transformedJson);
  //console.log(transformedJson);

  return (
    //<PieChart width={700} height={700}>
    //    <Pie data={result} dataKey="students" outerRadius={250} fill="pink" />
    //</PieChart>

    <PieChart width={700} height={700}>
      <Pie
        data={transformedJson}
        dataKey="count"
        outerRadius={250}
        fill="pink"
        label
      >
        {transformedJson.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
        {/*
                <Label
                    value={(entry) => `${entry.name}: ${entry.count}`}
                    position="center"
                    fill="white"
                />
                */}
      </Pie>
      <Tooltip formatter={(value) => `${value} tasks`} />
      <Legend />
    </PieChart>
  );
};

export default CategoryDashboard;
