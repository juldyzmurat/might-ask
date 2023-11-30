import React from "react";
import MapAutocomplete from "../../GoogleMapContainer/AddressFill";

const BoardView = ({ data }) => {
  const tasks = data;

  return (
    <div className="BoardView">
      <MapAutocomplete />
    </div>
  );
};

export default BoardView;
