import React from "react";
import MapAutocomplete from "../GoogleMapContainer/AddressFill";
import Board from "./BoardView/Board/Board";

const BoardView = ({ data }) => {
  const tasks = data;

  return (
    <div className="BoardView">
      <Board />
    </div>
  );
};

export default BoardView;
//<MapAutocomplete />