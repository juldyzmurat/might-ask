import React from "react";
import CategoryDashboard from "../Dashboard/CategoryDashboard";
import AchievementDashboard from "../Dashboard/AchievementDashboard";
import "../../Styles/DashboardPage.css";
const DashboardPage = () => {
  return (
    <div className="container">
      {/* Include the CategoryDashboard component in one div */}
      <div className="box">
        <h2>Category Dashboard</h2>
        <CategoryDashboard />
      </div>

      {/* Include the AchievementDashboard component in another div */}

      <div className="box">
        <h2>Achievement Dashboard</h2>
        <AchievementDashboard />
      </div>

      {/* You can add more content or components to your dashboard page */}
    </div>
  );
};

export default DashboardPage;
