import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import EditDeleteButtons from "./editdelete";

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

  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  // const getColorForItem = (item) => {
  //   return item.priority === "high" ? "red" : "blue";
  // };

  const handleDelete = (itemId) => {
    // Add logic to delete the task from the database
    // For example, you might want to call an API endpoint to delete the task
    console.log(`Deleting task with ID ${itemId}`);
  };

  const handleEdit = (itemId) => {
    // Add logic to delete the task from the database
    // For example, you might want to call an API endpoint to delete the task
    console.log(`Editing task with ID ${itemId}`);
  };



  return (
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
                    onEditClick={() => handleEdit(item._id)}  // Add edit functionality if needed
                    onDeleteClick={() => handleDelete(item._id)}
                  />
                )}
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}

export default PinnedSubheaderList;





