import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";

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
  const getColorForItem = (item) => {
    return item.priority === "high" ? "red" : "blue";
  };

  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
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
                <ListItemText primary={item.name} />
                {hoveredItemId === item._id && (
                  <Button variant="contained" color="primary">
                    :
                  </Button>
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

