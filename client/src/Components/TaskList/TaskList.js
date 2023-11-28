import PinnedSubheaderList from "../Tasks/listscroller";
import React from "react";

const TaskList = ({ tasks }) => {
  return (
    <div className="TaskList" style={{ height: "500px" }}>
      <PinnedSubheaderList tasks={tasks} />
    </div>
  );
};
export default TaskList;
