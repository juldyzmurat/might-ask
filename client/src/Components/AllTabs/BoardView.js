import React from "react";
import MapAutocomplete from "../GoogleMapContainer/AddressFill";

const BoardView = () => {
  return (
    <div className="SecondTab">
      <MapAutocomplete />
      {/* Second  tab content will go here */}
    </div>
  );
};

export default BoardView;
