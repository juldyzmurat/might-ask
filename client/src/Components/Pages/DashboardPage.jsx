import React from "react";
import CategoryDashboard from "../Dashboard/CategoryDashboard";
import AchievementDashboard from "../Dashboard/AchievementDashboard";
import "../../Styles/DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-black">Category Overview</h2>
              <CategoryDashboard />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-black">Achievement Progress</h2>
              <AchievementDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
