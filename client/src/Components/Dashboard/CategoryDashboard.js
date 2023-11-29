import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { GoogleData } from "../Login/LoginAPI";

const CategoryDashboard = () => {
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

  const categoryCount = {};
  taskData.forEach((item) => {
    const categoryId = item.categoryid;
    console.log(item.categoryid);
    categoryCount[categoryId] = (categoryCount[categoryId] || 0) + 1;
  });

  const newJson = Object.entries(categoryCount).map(([categoryId, count]) => ({
    categoryId,
    categoryName:
      categoryData.find((categoryItem) => categoryItem._id === categoryId)
        ?.name || "Unkown",
    count,
    color: categoryData.find((categoryItem) => categoryItem._id === categoryId)
      ?.color,
  }));

  const transformedJson = newJson.map((item) => ({
    name: `Category ${item.categoryName}`,
    count: item.count,
    color: item.color,
  }));
  console.log(transformedJson);

  return (
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
      </Pie>
      <Tooltip formatter={(value) => `${value} tasks`} />
      <Legend />
    </PieChart>
  );
};

export default CategoryDashboard;
