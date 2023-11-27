import React from "react";
import MapAutocomplete from "../GoogleMapContainer/AddressFill";

const BoardView = () => {
  return (
    <div className="SecondTab">
      <MapAutocomplete />
      {/* Adding task cards here */}
    </div>
  );
};

export default BoardView;
