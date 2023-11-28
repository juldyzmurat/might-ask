import PinnedSubheaderList from "../Tasks/listscroller";
import React, { useState, useEffect } from "react";

const TaskList = () => {
  const [data, setData] = useState([]);

  const tasks = data; //This is all of the task handle as needed

  return (
    <div className="TaskList">
      {/* First tab content will go here */}
      <div style={{ height: "500px" }}>
        <PinnedSubheaderList data={tasks} />
      </div>
    </div>
  );
};
export default TaskList;
