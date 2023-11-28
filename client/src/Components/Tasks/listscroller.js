import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function PinnedSubheaderList({ tasks }) {
  const getColorForTask = (task) => {
    // Add your logic here to determine the color based on item properties
    // For example, you can check if the item has a specific property or value
    // and return a corresponding color.
    // This is just a placeholder, make sure to customize it based on your data.
    return task.priority === "high" ? "red" : "blue";
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
            {tasks.map((task) => (
              <ListItem
                key={`task-${index}-${task._id}`}
                style={{ color: getColorForTask(task) }}
              >
                <ListItemText primary={task.name} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}

export default PinnedSubheaderList;
