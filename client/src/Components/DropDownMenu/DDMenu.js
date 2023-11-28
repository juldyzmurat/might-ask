// DropdownMenu.js
import React from 'react';
import "../../Styles/DropDownMenu.css";

const DropdownMenu = ({ items, onItemClick }) => {
  return (
    <div className="dropDownMenu">
      {items.map((item, index) => (
        <div key={index} onClick={() => onItemClick(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
