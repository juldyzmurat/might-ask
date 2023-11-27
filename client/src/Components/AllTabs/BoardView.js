import TaskCard from "../Tasks/TaskCard";

const BoardView = () => {
  return (
    <div className="BoardView">
      <TaskCard task={{ name: "sample task name" }} />
    </div>
  );
};

export default BoardView;
