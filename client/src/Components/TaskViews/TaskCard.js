import { Draggable } from "@hello-pangea/dnd";
import { Box, Card, CardContent, Typography } from "@mui/material";

export const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <Box
          sx={{ marginBottom: 1 }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card
            style={{
              opacity: snapshot.isDragging ? 0.9 : 1,
              transform: snapshot.isDragging ? "rotate(-2deg)" : "",
            }}
            elevation={snapshot.isDragging ? 3 : 1}
          >
            <CardContent align="left">
              <Typography variant="body1" component="div">
                {task.name}
              </Typography>
              <Typography variant="body2">{task.dueDate}</Typography>
              <Typography sx={{ fontSize: 10 }} color="text.secondary">
                {`Index: ${task.index}`}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Draggable>
  );
};
