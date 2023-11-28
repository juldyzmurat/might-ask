import { List } from "react-admin";
import { useMediaQuery, Typography } from "@mui/material";

import { TaskListContent } from "./Task";

export const TaskList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List
      perPage={100}
      sort={{ field: "index", order: "ASC" }}
      pagination={false}
      component="div"
    >
      {isSmall ? <FallbackForMobile /> : <TaskListContent />}
    </List>
  );
};

const FallbackForMobile = () => (
  <Typography mt={3} align="center">
    The Kanban board demo is not available on mobile
  </Typography>
);
