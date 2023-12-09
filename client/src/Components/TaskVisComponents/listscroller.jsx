import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import EditDeleteButtons from "./EditDeleteButtons";
import TaskForm from "./TaskForm";
import { GoogleData } from "../Login/LoginAPI";


function PinnedSubheaderList({ data }) {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    if (!isEditClicked) {
      setHoveredItemId(null);
    }
  };

  const getColorForItem = (item) => {
    return item.priority === "high" ? "text-danger" : "text-primary";
  };

  const handleEdit = (itemId) => {
    setIsEditClicked(true);
    setHoveredItemId(itemId);
  };

  const handleCloseTaskForm = () => {
    setIsEditClicked(false);
  };

  const handleDelete = async (itemId) => {
    try {
      const request = `http://localhost:5200/tasks/${GoogleData.profileObj.email}/${itemId}`;

      const response = await fetch(request, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      });

      console.log("Server Response Status:", response.status);

      if (!response.ok) {
        console.log("Failed to delete data");
      } else {
        console.log("Data deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting data: ", error.message);
    }
  };

  const daysList = [];
  data.map((task, index) => {
    const dayOfWeek = new Date(task.due).toDateString();
    daysList.push(dayOfWeek);
  });

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
  const daysOfWeek = removeDuplicates(daysList);

  function sortByDate(a, b) {
    const dateOne = Date.parse(a);
    const dateTwo = Date.parse(b);
    return dateOne - dateTwo;
  }

  return (
    <>
      <List
        className="list-group"
        sx={{
          width: "100%",
          maxHeight: "100%",
          position: "relative",
          overflow: "auto",
        }}
        subheader={<li />}
      >
        {daysOfWeek.sort(sortByDate).map((day, index) => (
          <li key={`section-${index}`} className="list-group-item">
            <ul className="list-unstyled">
              <ListSubheader className="bg-light">{`${day}`}</ListSubheader>
              {data
                .filter((item) => {
                  return day === new Date(item.due).toDateString();
                })
                .map((item) => (
                  <ListItem
                    key={`item-${index}-${item._id}`}
                    className={`d-flex justify-content-between align-items-center ${getColorForItem(item)}`}
                    onMouseEnter={() => handleMouseEnter(item._id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ListItemText style={{ color: '#8200ff' }} primary={item.name} />
                    <ListItemText style={{ color: '#8200ff' }} primary={new Date(item.due).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />


                    {hoveredItemId === item._id && (
                      <EditDeleteButtons
                        onEditClick={() => handleEdit(item._id)}
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
        // <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark">
        //   {console.log("Hovered Item ID:", hoveredItemId)}
        <div className="task-form-overlay">
          <TaskForm onClose={handleCloseTaskForm} editoradd="Edit" taskId={hoveredItemId}/>
        </div>
        // </div>
      )}
    </>
  );
}

export default PinnedSubheaderList;
