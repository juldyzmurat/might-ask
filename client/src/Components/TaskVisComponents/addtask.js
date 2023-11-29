import React from "react";

const AddTask = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>+</button>
    </div>
  );
};

export default AddTask;
