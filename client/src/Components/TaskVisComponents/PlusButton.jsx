import React from "react";

const PlusButton = ({ onClick }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-500">
      <button
        type="button"
        className="btn btn-primary"
        style={{
          backgroundColor: '#fc00ff',
          color: '#ffffff',
          border: '1px solid #fc00ff',
        }}
        onClick={onClick}
      >
        +
      </button>
    </div>
  );
};

export default PlusButton;


