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
// import { GoogleData } from "../Login/LoginAPI";

const AchievementDashboard = () => {
  const [taskData, setData] = useState([]); //The full task data incase we need it
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userEmail = localStorage.getItem("email");
        const taskRequest = "http://localhost:5200/tasks/".concat(userEmail);
        const taskResponse = await fetch(taskRequest);
        if (!taskResponse.ok) {
          throw new Error("Failed to fetch task data");
        }
        const taskData = await taskResponse.json();
        setData(taskData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // const categoryIdToName = {};
  // categoryData.forEach((category) => {
  //   categoryIdToName[category._id] = category.name;
  // });

  // // Initialize an object to store category-wise totals
  const categoryTotals = {};

  const categoryCount = {};
  taskData.forEach((item) => {
    const categoryId = item.categoryid;
    categoryCount[categoryId] = (categoryCount[categoryId] || 0) + 1;
  });

  const newJson = Object.entries(categoryCount).map(([categoryId, count]) => ({
    categoryId,
    count,
  }));
  // Iterate through the task data and accumulate totals
  taskData.forEach((task) => {
    const categoryId = task.categoryid;
    if (task.actDur) {
      const estimatedDuration = task.estDur;
      const actualDuration = task.actDur;

      if (!categoryTotals[categoryId]) {
        categoryTotals[categoryId] = {
          categoryName: categoryId,
          totalEstimatedDuration: 0,
          totalActualDuration: 0,
          doneCount: 0,
          averageEstimatedDuration: 0,
          averageActualDuration: 0,
        };
      }

      categoryTotals[categoryId].doneCount += 1;
      categoryTotals[categoryId].totalEstimatedDuration += estimatedDuration;
      categoryTotals[categoryId].totalActualDuration += actualDuration;
      categoryTotals[categoryId].averageEstimatedDuration =
        categoryTotals[categoryId].totalEstimatedDuration /
        categoryTotals[categoryId].doneCount;
      categoryTotals[categoryId].averageActualDuration =
        categoryTotals[categoryId].totalActualDuration /
        categoryTotals[categoryId].doneCount;
    }
  });

  const allCategoryTotal = Object.values(categoryTotals).reduce(
    (acc, category) => {
      acc.totalEstimatedDuration += category.totalEstimatedDuration;
      acc.totalActualDuration += category.totalActualDuration;
      acc.doneCount += category.doneCount;
      acc.averageEstimatedDuration = acc.totalEstimatedDuration / acc.doneCount;
      acc.averageActualDuration = acc.totalActualDuration / acc.doneCount;
      return acc;
    },
    {
      categoryName: "All", // Category name for "all" category
      totalEstimatedDuration: 0,
      totalActualDuration: 0,
      doneCount: 0,
      averageEstimatedDuration: 0,
      averageEstimatedDuration: 0,
    },
  );

  const categoryTotalsArray = [
    allCategoryTotal,
    ...Object.values(categoryTotals),
  ];
  console.log(categoryTotalsArray);

  return (
    <div className="container">
      <div className="chart-container">
        <BarChart
          width={500}
          height={500}
          data={categoryTotalsArray}
          style={{ backgroundColor: "#ffffff" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="categoryName"
            label={{
              value: "Category",
              position: "insideBottom",
              fill: "black",
            }}
            domain={[0, "dataMax"]}
          />
          <YAxis
            label={{
              value: "Average Time (seconds)",
              angle: -90,
              position: "insideLeft",
              fill: "black",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="averageEstimatedDuration"
            fill="lightpink"
            name="Estimated Duration"
          />
          <Bar
            dataKey="averageActualDuration"
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
