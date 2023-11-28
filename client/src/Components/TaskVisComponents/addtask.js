import React from 'react';

const Addtask = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>+</button>
    </div>
  );
};

export default Addtask;