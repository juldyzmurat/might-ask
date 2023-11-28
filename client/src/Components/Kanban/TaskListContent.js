import { DragDropContext } from "@hello-pangea/dnd";
import { Box } from "@mui/material";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useDataProvider, useListContext } from "react-admin";
import { useMutation } from "react-query";

import { getTasksByStatus, statuses } from ".";
import { TaskColumn } from "./TaskColumn";

export const TaskListContent = () => {
  const { data: unorderedTasks, isLoading, refetch } = useListContext();
  const dataProvider = useDataProvider();

  const [tasksByStatus, setTasksByStatus] = useState(getTasksByStatus([]));

  useEffect(() => {
    if (unorderedTasks) {
      const newTasksByStatus = getTasksByStatus(unorderedTasks);
      if (!isEqual(newTasksByStatus, tasksByStatus)) {
        setTasksByStatus(newTasksByStatus);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unorderedTasks]);

  const mutation = useMutation(
    ({ source, destination }) =>
      dataProvider.updateTaskStatus(source, destination),
    { onSettled: () => refetch() },
  );

  if (isLoading) return null;

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;
    const sourceTask = tasksByStatus[sourceStatus][source.index];
    const destinationTask = tasksByStatus[destinationStatus][
      destination.index
    ] ?? {
      status: destinationStatus,
      index: undefined, // undefined if dropped after the last item
    };

    // compute local state change synchronously
    setTasksByStatus(
      updateTaskStatusLocal(
        sourceTask,
        { status: sourceStatus, index: source.index },
        { status: destinationStatus, index: destination.index },
        tasksByStatus,
      ),
    );

    // trigger the mutation to persist the changes
    mutation.mutateAsync({
      source: sourceTask,
      destination: destinationTask,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex">
        {statuses.map((status) => (
          <TaskColumn
            status={status}
            tasks={tasksByStatus[status]}
            key={status}
          />
        ))}
      </Box>
    </DragDropContext>
  );
};

const updateTaskStatusLocal = (
  sourceTask,
  source,
  destination,
  tasksByStatus,
) => {
  if (source.status === destination.status) {
    // moving deal inside the same column
    const column = tasksByStatus[source.status];
    column.splice(source.index, 1);
    column.splice(destination.index ?? column.length + 1, 0, sourceTask);
    return {
      ...tasksByStatus,
      [destination.status]: column,
    };
  } else {
    // moving deal across columns
    const sourceColumn = tasksByStatus[source.status];
    const destinationColumn = tasksByStatus[destination.status];
    sourceColumn.splice(source.index, 1);
    destinationColumn.splice(
      destination.index ?? destinationColumn.length + 1,
      0,
      sourceTask,
    );
    return {
      ...tasksByStatus,
      [source.status]: sourceColumn,
      [destination.status]: destinationColumn,
    };
  }
};
