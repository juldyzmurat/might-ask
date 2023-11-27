
import React, { useState } from "react";
import ListView from "../AllTabs/ListView";
import BoardView from "../AllTabs/BoardView";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("ListView");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("BoardView");
  };
  return (
    <div className="Tabs">
      <ul className="nav">
        <li className={activeTab === "ListView" ? "active" : ""} onClick={handleTab1}>ListView</li>
        <li className={activeTab === "BoardView" ? "active" : ""} onClick={handleTab2}>BoardView</li>
      </ul>
      <div className="outlet">
        {activeTab === "ListView" ? <ListView /> : <BoardView />}
      </div>
    </div>
  );
};


export default Tabs;

