import React from "react";
import "./BoardView/App.css";
import Board from "./BoardView/Board/Board";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Editable from "./BoardView/Editable/Editable";
import "./BoardView/bootstrap.css";

const BoardView = () => {
  const initialBoards = [
    {
      id: uuidv4(),
      boardName: "To-DO",
      card: [
        { id: uuidv4(), title: "Card 1", tags: [], task: [] },
        { id: uuidv4(), title: "Card 2", tags: [], task: [] },
      ],
    },
    {
      id: uuidv4(),
      boardName: "In-Progress",
      card: [
        { id: uuidv4(), title: "Card 3", tags: [], task: [] },
        { id: uuidv4(), title: "Card 4", tags: [], task: [] },
      ],
    },
    {
      id: uuidv4(),
      boardName: "Done",
      card: [
        { id: uuidv4(), title: "Card 5", tags: [], task: [] },
        { id: uuidv4(), title: "Card 6", tags: [], task: [] },
      ],
    },
  ];

  const [data, setData] = React.useState(initialBoards);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    let tempData = [...data];

    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    );

    const [draggedCard] = tempData[sourceBoardIdx].card.splice(
      source.index,
      1
    );

    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      draggedCard
    );

    setData(tempData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-view">
        <div className="app_outer">
          <div className="app_boards">
            {data.map((item) => (
              <Board
                key={item.id}
                id={item.id}
                name={item.boardName}
                card={item.card}
              />
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default BoardView;
