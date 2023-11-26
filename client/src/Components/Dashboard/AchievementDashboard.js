import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import '../../Styles/AchievementDashboard.css';

const AchievementDashboard = () => {

    const [taskData, setData] = useState([]); //The full task data incase we need it
    const [categoryData, setCategoryData] = useState([]);
    //const [result, setNewData] = useState([]); //Holds the data for the pie chart

    useEffect(() => {
      // Function to fetch data from the backend
      const fetchData = async () => {
        try {
          const taskResponse = await fetch('http://localhost:5200/tasks');
          
          // Check if the response is successful (status code 200)
          if (!taskResponse.ok) {
            throw new Error('Failed to fetch task data');
          }
  
          // Parse the response body as JSON
          const taskData = await taskResponse.json();
  
          // Update the state with the fetched data
          setData(taskData);

          // Fetch category data
          const categoryResponse = await fetch('http://localhost:5200/categories');
            if (!categoryResponse.ok) {
                throw new Error('Failed to fetch category data');
            }
            const categoryJsonData = await categoryResponse.json();
            setCategoryData(categoryJsonData);

        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
  
      // Call the fetchData function when the component mounts
      fetchData();
    }, []);


    const categoryIdToName = {};
    categoryData.forEach(category => {
      categoryIdToName[category._id] = category.name;
    });
    
    // Initialize an object to store category-wise totals
    const categoryTotals = {};
    
    // Iterate through the task data and accumulate totals
    taskData.forEach(task => {
      const categoryId = task.categoryid;
      const estimatedDuration = task.estimated_duration;
      const actualDuration = task.actual_duration;
    
      if (!categoryTotals[categoryId]) {
        categoryTotals[categoryId] = {
          categoryId: categoryId,
          categoryName: categoryIdToName[categoryId], // Get category name from mapping
          totalEstimatedDuration: 0,
          totalActualDuration: 0,
        };
      }
    
      categoryTotals[categoryId].totalEstimatedDuration += estimatedDuration;
      categoryTotals[categoryId].totalActualDuration += actualDuration;
    });
    
    // Calculate the "all" category totals by summing up all categories
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
      }
    );
    
    // Create an array of category totals including "all" category
    const categoryTotalsArray = [allCategoryTotal, ...Object.values(categoryTotals)];
    
        return (
            <div className="container">
            <div className="chart-container">
          <BarChart width={600} height={400} data={categoryTotalsArray}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoryName" label={{ value: 'Category', position: 'insideBottom' }} domain={[0, 'dataMax']} />
            <YAxis label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} />
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