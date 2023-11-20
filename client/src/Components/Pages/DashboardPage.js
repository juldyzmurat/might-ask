import React from "react";
import { PieChart, Pie } from 'recharts';
 
const Dashboard = () => {




    const data = [
        { name: 'Geeksforgeeks', students: 400 },
        { name: 'Technical scripter', students: 700 },
        { name: 'Geek-i-knack', students: 200 },
        { name: 'Geek-o-mania', students: 1000 }
    ];
 
 
    return (
        <PieChart width={700} height={700}>
            <Pie data={data} dataKey="students" outerRadius={250} fill="green" />
        </PieChart>
    );
};
 
export default Dashboard;