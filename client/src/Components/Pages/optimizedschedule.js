import React, { useState, useEffect } from "react";
import TaskComponent from "../TaskVisComponents/taskcomponent";
import PinnedSubheaderList from "../TaskVisComponents/listscroller";
import { GoogleData } from "../Login/LoginAPI";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const OptimizedSchedule = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAndSortData = async () => {
      try {
        const request = "http://localhost:5200/tasks/".concat(
          GoogleData.profileObj.email,
        );
        const response = await fetch(request);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const sortedData = await response.json();

        // Sorting function
        function compareByDeadline(a, b) {
          const dateOne = a.due;
          const dateTwo = b.due;
          return dateOne - dateTwo;
        }
        sortedData.sort(compareByDeadline);

        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchAndSortData();
  }, []);

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
    >
      {
        <ul>
          {console.log(data)}
          {data.map((item, index) => (
            <ListItem
              key={`item-${index}-${item._id}`}
              style={{ color: "blue" }}
            >
              <ListItemText primary={item.name} />
              <ListItemText primary={new Date(item.due).toString()} />
            </ListItem>
          ))}
        </ul>
      }
    </List>
  );
};

export default OptimizedSchedule;
