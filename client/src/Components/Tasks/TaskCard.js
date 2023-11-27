import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <Card
        sx={{ minWidth: 100, minHeight: 50, maxWidth: 250, maxHeight: 300 }}
      >
        <CardContent>
          <Typography variant="body1">{task.name}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
