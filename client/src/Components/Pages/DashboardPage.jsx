import React from "react";
import CategoryDashboard from "../Dashboard/CategoryDashboard";
import AchievementDashboard from "../Dashboard/AchievementDashboard";
import "../../Styles/DashboardPage.css";
const DashboardPage = () => {
  return (
    <div className="container">
      <div className="box">
        <h2>Category Dashboard</h2>
        <CategoryDashboard />
      </div>
      <div className="box">
        <h2>Achievement Dashboard</h2>
        <AchievementDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
