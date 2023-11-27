import React from "react";
import MapAutocomplete from "../GoogleMapContainer/AddressFill";

const BoardView = () => {
  return (
    <div className="BoardView">
      <MapAutocomplete />
      {/* Adding task cards here */}
    </div>
  );
};

export default BoardView;
