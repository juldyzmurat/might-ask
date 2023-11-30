import React from "react";

const PlusButton = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>+</button>
    </div>
  );
};

export default PlusButton;
