import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import EditDeleteButtons from "./editdelete";
import TaskForm from "./popupaddtask";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function PinnedSubheaderList({ data }) {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [isEditClicked, setIsEditClicked] = useState(false); // New state for tracking edit button click

  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    if (!isEditClicked) {
      setHoveredItemId(null);
    }
  };

  const getColorForItem = (item) => {
    return item.priority === "high" ? "red" : "blue";
  };

  const handleDelete = (itemId) => {
    // Add logic to delete the task from the database
    // For example, you might want to call an API endpoint to delete the task
    console.log(`Deleting task with ID ${itemId}`);
  };

  const handleEdit = (itemId) => {
    setIsEditClicked(true); // Set the state to true when edit is clicked
    setHoveredItemId(itemId); // Optionally, you can set hoveredItemId for styling
  };

  const handleCloseTaskForm = () => {
    setIsEditClicked(false); // Set the state back to false when the TaskForm is closed
  };

  return (
    <>
      <List
        sx={{
          width: "100%",
          maxHeight: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {daysOfWeek.map((day, index) => (
          <li key={`section-${index}`}>
            <ul>
              <ListSubheader>{`${day}`}</ListSubheader>
              {data.map((item) => (
                <ListItem
                  key={`item-${index}-${item._id}`}
                  style={{ color: getColorForItem(item) }}
                  onMouseEnter={() => handleMouseEnter(item._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Pass the hover state and delete function to EditDeleteButtons */}
                  <ListItemText primary={item.name} />
                  {hoveredItemId === item._id && (
                    <EditDeleteButtons
                      onEditClick={() => handleEdit(item._id)} // Add edit functionality if needed
                      onDeleteClick={() => handleDelete(item._id)}
                    />
                  )}
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>

      {isEditClicked && (
        <div
          className="task-form-overlay"
          style={{
            position: "absolute",
            zIndex: 1000,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {console.log("Hovered Item ID:", hoveredItemId)}
          <TaskForm
            onClose={handleCloseTaskForm}
            editoradd="Edit"
            taskId={hoveredItemId}
          />
        </div>
      )}
    </>
  );
}

export default PinnedSubheaderList;
