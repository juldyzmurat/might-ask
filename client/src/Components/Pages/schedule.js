import React from "react";
import OptimizedSchedule from "./optimizedschedule";

const Schedule = () => {
  return (
    <div className="Schedule">
      <div
        style={{
          border: "0",
          width: "800px",
          height: "600px",
          frameborder: "0",
          scrolling: "no",
        }}
      >
        <OptimizedSchedule />
      </div>
    </div>
  );
};

export default Schedule;
