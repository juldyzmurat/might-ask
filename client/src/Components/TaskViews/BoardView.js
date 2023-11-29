import React from "react";
import MapAutocomplete from "../GoogleMapContainer/AddressFill";

const BoardView = ({ data }) => {
  const tasks = data; //This is all of the task handle as needed

  return (
    <div className="BoardView">
      <MapAutocomplete />
    </div>
  );
};

export default BoardView;
