import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import {
  //   Typography,
  //   Card as MuiCard,
  //   CardContent as MuiCardContent,
  // } from "@mui/material";
  
const boards = [
  { id: "to-do", display: "To Do" },
  { id: "in-progress", display: "In Progress" },
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

const BoardView = ({ data, setData }) => {
  const [tasks, setTasks] = useState(
    Object.fromEntries(
      boards.map((board) => [board.id, filterTasksByStatus(data, board.id)])
    )
  );

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    } // to handle dropped outside of the list
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        tasks[source.droppableId],
        source.index,
        destination.index
      );

      setTasks({ ...tasks, [source.droppableId]: items });
    } else {
      const result = move(
        tasks[source.droppableId],
        tasks[destination.droppableId],
        source,
        destination
      );

      setTasks({
        ...tasks,
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {boards.map((board) => (
        <Droppable droppableId={board.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {tasks[board.id].map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
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
  );
};

export default BoardView;
