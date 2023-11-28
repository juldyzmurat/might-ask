import PinnedSubheaderList from "../Tasks/listscroller";
import React, { useState } from "react";

const TaskList = () => {
  const [data, setData] = useState([]);

  const tasks = data; //This is all of the task handle as needed

  return (
    <div className="TaskList" style={{ height: "500px" }}>
      <PinnedSubheaderList data={tasks} />
    </div>
  );
};
export default TaskList;
