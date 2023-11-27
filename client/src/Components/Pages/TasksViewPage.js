import { useState } from "react";
import Tabs from "../TabComponent/Tabs";

function TaskView() {
  const categories = ["Work", "School", "Personal"]; // TODO get categories from database

  return (
    <div className="TaskView">
      <Tabs categories={categories} />
    </div>
  );
}

export default TaskView;
