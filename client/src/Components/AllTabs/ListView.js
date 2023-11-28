import React from "react";

import PinnedSubheaderList from "../TaskVisComponents/listscroller";
// import TaskComponent from "../TaskVisComponents/taskcomponent";

const ListView = ({ data }) => {

  const tasks = data; //This is all of the task handle as needed

  return (
    <div className="ListView">
      {/* First tab content will go here */}
      <div style={{ height: "500px" }}>
        <PinnedSubheaderList data={tasks} />
      </div>
    </div>
  );
};
export default ListView;
