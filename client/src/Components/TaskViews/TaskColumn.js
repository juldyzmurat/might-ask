import { Droppable } from "@hello-pangea/dnd";
import { Box, Typography } from "@mui/material";

import { statusNames } from ".";
import { TaskCard } from "./TaskCard";

export const TaskColumn = ({ status, tasks }) => (
  <Box
    sx={{
      flex: 1,
      paddingTop: "8px",
      paddingBottom: "16px",
      bgcolor: "#eaeaee",
      "&:first-child": {
        paddingLeft: "5px",
        borderTopLeftRadius: 5,
      },
      "&:last-child": {
        paddingRight: "5px",
        borderTopRightRadius: 5,
      },
    }}
  >
    <Typography align="center" variant="subtitle1">
      {statusNames[status]}
    </Typography>
    <Droppable droppableId={status}>
      {(droppableProvided, snapshot) => (
        <Box
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={snapshot.isDraggingOver ? " isDraggingOver" : ""}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 5,
            padding: "5px",
            "&.isDraggingOver": {
              bgcolor: "#dadadf",
            },
          }}
        >
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
          {droppableProvided.placeholder}
        </Box>
      )}
    </Droppable>
  </Box>
);
