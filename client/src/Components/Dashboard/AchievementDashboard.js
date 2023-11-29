import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../../Styles/AchievementDashboard.css";
import { GoogleData } from "../Login/LoginAPI";

const AchievementDashboard = () => {
  const [taskData, setData] = useState([]); //The full task data incase we need it
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskRequest = "http://localhost:5200/tasks/".concat(
          GoogleData.profileObj.email,
        );
        const taskResponse = await fetch(taskRequest);
        if (!taskResponse.ok) {
          throw new Error("Failed to fetch task data");
        }
        const taskData = await taskResponse.json();
        setData(taskData);

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

    fetchData();
  }, []);

  const categoryIdToName = {};
  categoryData.forEach((category) => {
    categoryIdToName[category._id] = category.name;
  });

  // Initialize an object to store category-wise totals
  const categoryTotals = {};

  // Iterate through the task data and accumulate totals
  taskData.forEach((task) => {
    const categoryId = task.categoryid;
    const estimatedDuration = task.estimated_duration;
    const actualDuration = task.actual_duration;

    if (!categoryTotals[categoryId]) {
      categoryTotals[categoryId] = {
        categoryId: categoryId,
        categoryName: categoryIdToName[categoryId],
        totalEstimatedDuration: 0,
        totalActualDuration: 0,
      };
    }

    categoryTotals[categoryId].totalEstimatedDuration += estimatedDuration;
    categoryTotals[categoryId].totalActualDuration += actualDuration;
  });

  const allCategoryTotal = Object.values(categoryTotals).reduce(
    (acc, category) => {
      acc.totalEstimatedDuration += category.totalEstimatedDuration;
      acc.totalActualDuration += category.totalActualDuration;
      return acc;
    },
    {
      categoryName: "All", // Category name for "all" category
      totalEstimatedDuration: 0,
      totalActualDuration: 0,
    },
  );

  const categoryTotalsArray = [
    allCategoryTotal,
    ...Object.values(categoryTotals),
  ];

  return (
    <div className="container">
      <div className="chart-container">
        <BarChart width={600} height={600} data={categoryTotalsArray} style={{ backgroundColor: "#f1b6dc" }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="categoryName"
            label={{ value: "Category", position: "insideBottom" }}
            domain={[0, "dataMax"]}
          />
          <YAxis
            label={{
              value: "Time (seconds)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="totalEstimatedDuration"
            fill="lightred"
            name="Estimated Duration"
          />
          <Bar
            dataKey="totalActualDuration"
            fill="lightblue"
            name="Actual Duration"
            stackId="a"
            animationDuration={300}
            animationBegin={0}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default AchievementDashboard;
