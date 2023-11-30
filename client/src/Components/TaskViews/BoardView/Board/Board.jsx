import React from "react";
import "./Board.css";
import { Droppable } from "react-beautiful-dnd";

export default function Board(props) {
  const { name } = props;

  // Check if the board's id is within the range [1, 3]
  if (props.id < 1 || props.id > 3) {
    return null; // Do not render the board if outside the range
  }

  return (
    <div className="board">
      <Droppable droppableId={props.id.toString()}>
        {(provided) => (
          <div
            className="board__cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="board__top">
              <div>
                <p className="board__title">{name || "Name of Board"}</p>
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
