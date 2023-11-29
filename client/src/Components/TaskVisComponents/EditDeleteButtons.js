import React from "react";
import IconButton from "@mui/material/IconButton";
import penIcon from "./pen.png";
import recycleBinIcon from "./recycle-bin.png";

function EditDeleteButtons({ onEditClick, onDeleteClick}) {
  return (
    <div>
      <IconButton onClick={onEditClick} color="primary">
        <img
          src={penIcon}
          alt="Edit"
          style={{ width: "24px", height: "24px" }}
        />
      </IconButton>
      <IconButton onClick={onDeleteClick} color="secondary">
        <img
          src={recycleBinIcon}
          alt="Delete"
          style={{ width: "24px", height: "24px" }}
        />
      </IconButton>
    </div>
  );
}

export default EditDeleteButtons;
