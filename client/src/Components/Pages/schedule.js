import React from "react";
import OptimizedSchedule from "./optimizedschedule";
//import CalendarEvents from "./checkCalendarevents";

const Schedule = () => {
  return (
    <div className="Schedule">
      <div
        style={{
          border: "0",
          width: "800px",
          height: "600px",
          frameborder: "0",
          overflow: "hidden",
        }}
      >
        <OptimizedSchedule />
      </div>
    </div>
  );
};

export default Schedule;
