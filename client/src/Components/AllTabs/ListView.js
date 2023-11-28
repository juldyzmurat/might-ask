import React, { useState, useEffect } from "react";

import PinnedSubheaderList from "../TaskVisComponents/listscroller";
// import TaskComponent from "../TaskVisComponents/taskcomponent";

const ListView = ({ data }) => {

  return (
    <div className="ListView">
      {/* First tab content will go here */}
      <div style={{ height: "500px" }}>
        <PinnedSubheaderList data={data} />
      </div>
    </div>
  );
};
export default ListView;
