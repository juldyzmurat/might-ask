import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import "../../Styles/BoardView.css";
import { GoogleData } from "../Login/LoginAPI";


const boards = [
  { id: "to do", display: "To Do" },
  { id: "in progress", display: "In Progress" },
  { id: "done", display: "Done" },
];

const boardColors = {
  "to do": "#6a23f1",
  "in progress": "#5d01ba",
  "done": "#4b0195",
};



const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = async (
  source,
  destination,
  droppableSource,
  droppableDestination,
  updateTaskStatus,
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const taskId = removed._id;
  const newStatus = droppableDestination.droppableId;

  // Call updateTaskStatus to update the task status in the database
  await updateTaskStatus(taskId, newStatus,GoogleData.profileObj.email);



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
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const BoardView = ({ tasks, setTasks }) => {
  const [tasksByStatus, setTasksByStatus] = useState(
    Object.fromEntries(
      boards.map((board) => [board.id, filterTasksByStatus(tasks, board.id)]),
    ),
  );

  const updateTaskStatus = async (taskId, newStatus, userEmail) => {

    const taskDetailsResponse = await fetch(
      `http://localhost:5200/tasks/${userEmail}/${taskId}`
    );
    
    const taskDetailsData = await taskDetailsResponse.json();


    const taskFormData = {};

    // Add non-null fields to the taskFormData object
    taskFormData.name = taskDetailsData.name;
    taskFormData.due = taskDetailsData.due;
    taskFormData.estDur = taskDetailsData.estDur;
    taskFormData.actDur = taskDetailsData.actDur;
    taskFormData.location = taskDetailsData.location;
    taskFormData.description = taskDetailsData.description;
    taskFormData.categoryid =taskDetailsData.categoryid;
    taskFormData.status = newStatus;
    taskFormData.userid = GoogleData.profileObj.email;
    

    // Update the task status in the database
    try {
      const response = await fetch(
        `http://localhost:5200/tasks/${userEmail}/${taskId}`,
        
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskFormData),
        },
      );
  
      if (!response.ok) {
        console.error("Failed to update task status in the database");
      }
    } catch (error) {
      console.error("Error updating task status:", error.message);
    }
  };


  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        tasksByStatus[source.droppableId],
        source.index,
        destination.index,
      );

      setTasksByStatus({ ...tasksByStatus, [source.droppableId]: items });
    } else {
      const result = await move(
        tasksByStatus[source.droppableId],
        tasksByStatus[destination.droppableId],
        source,
        destination,
        updateTaskStatus,
      );

      setTasksByStatus({
        ...tasksByStatus,
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      });
    }
  };

  return (
    
    <div className="board-container d-flex justify-content-center align-items-center">  
      <DragDropContext onDragEnd={onDragEnd}>
        {boards.map((board) => (
          <div key={board.id}>
            <h6 style={{ textAlign: "center", color: "#yourHexCode" }}>
              {board.display}
            </h6>
            <Droppable key={board.id} droppableId={board.id}>
              {(provided, snapshot) => (
                <div
                  className="board-list"
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver ? "#6821eb" : boardColors[board.id],
                    padding: "8px",
                    marginRight: "16px",
                    width: "250px",
                    borderRadius: "8px",
                    minHeight: "250px",
                    overflowY: "auto",
                    maxHeight: "250px",
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
                          className={`board-item ${snapshot.isDragging ? "board-item-dragging" : ""}`}
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
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default BoardView;

