import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import "../../Styles/BoardView.css";

// import {
//   Typography,
//   Card as MuiCard,
//   CardContent as MuiCardContent,
// } from "@mui/material";

const boards = [
  { id: "to do", display: "To Do" },
  { id: "in progress", display: "In Progress" },
  { id: "done", display: "Done" },
];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const filterTasksByStatus = (tasks, status) => {
  return tasks.filter((task) => task.status === status);
};

const grid = 8;
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background color if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const BoardView = ({ tasks, setTasks }) => {
  const [tasksByStatus, setTasksByStatus] = useState(
    Object.fromEntries(
      boards.map((board) => [board.id, filterTasksByStatus(tasks, board.id)]),
    ),
  );

  console.log(tasksByStatus);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    console.log(result);

    if (!destination) {
      return;
    } // to handle dropped outside of the list
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        tasksByStatus[source.droppableId],
        source.index,
        destination.index,
      );

      setTasksByStatus({ ...tasksByStatus, [source.droppableId]: items });
    } else {
      const result = move(
        tasksByStatus[source.droppableId],
        tasksByStatus[destination.droppableId],
        source,
        destination,
      );

      setTasksByStatus({
        ...tasksByStatus,
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      });
    }
  };

  // const onDragStart = (result) => {
  //   console.log("onDragStart", result);
  // }

  return (
    <div className="board-container">
      <DragDropContext onDragEnd={onDragEnd}>
        {boards.map((board) => (
          <Droppable key={board.id} droppableId={board.id}>
            {(provided, snapshot) => (
              <div
                className="board-list"
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver
                    ? "#6821eb"
                    : "fc00ff",
                  padding: "8px",
                  marginRight: "16px",
                  width: "250px",
                  borderRadius: "8px",
                }}
              >
                {tasksByStatus[board.id].map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`board-item ${
                          snapshot.isDragging ? "board-item-dragging" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: "16px",
                          marginBottom: "8px",
                          background: "fc00ff",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {task.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default BoardView;
