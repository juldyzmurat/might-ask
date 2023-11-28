import { Draggable } from "@hello-pangea/dnd";
import { Box, Card, CardContent, Typography } from "@mui/material";

export const PostCard = ({ post, index }) => {
  return (
    <Draggable draggableId={String(post.id)} index={index}>
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
            <CardContent>
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2">{post.content}</Typography>
              <Typography sx={{ fontSize: 10 }} color="text.secondary">
                {`Index: ${post.index}`}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Draggable>
  );
};
