import React, { useState, useEffect } from 'react';
import { PieChart, Pie } from 'recharts';
 
const Dashboard = () => {

    const [data, setData] = useState([]);

    const data1 = [
        { name: 'Geeksforgeeks', students: 400 },
        { name: 'Technical scripter', students: 700 },
        { name: 'Geek-i-knack', students: 200 },
        { name: 'Geek-o-mania', students: 1000 }
        ];

    useEffect(() => {
      // Function to fetch data from the backend
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5200/tasks');
          
          // Check if the response is successful (status code 200)
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
  
          // Parse the response body as JSON
          const jsonData = await response.json();
  
          // Update the state with the fetched data
          setData(jsonData);
          // Count occurrences of each categoryid
            const categoryCount = {};
            jsonData.forEach(item => {
            const categoryId = item.categoryid;
            categoryCount[categoryId] = (categoryCount[categoryId] || 0) + 1;
            });

        // Create a new JSON object with Categoryid and count
        const result = Object.entries(categoryCount).map(([categoryId, count]) => ({ categoryId, count }));

        //var temp = result;
        //var arr = JSON.parse(temp);
        
        //console.log(arr);
        

        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
  
      // Call the fetchData function when the component mounts
      fetchData();
    }, []);
 
    
    return (
        <PieChart width={700} height={700}>
            <Pie data={data1} dataKey="students" outerRadius={250} fill="green" />
        </PieChart>
    );
};
 
export default Dashboard;


