import React, { useEffect, useState } from "react";

import "./Board.css";

import { Droppable } from "react-beautiful-dnd";
// ... (existing imports)

export default function Board(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.code === "Enter") setShow(false);
    });
    return () => {
      document.removeEventListener("keypress", (e) => {
        if (e.code === "Enter") setShow(false);
      });
    };
  });

  // Define names for the three static boards
  const boardNames = {
    1: "Board One",
    2: "Board Two",
    3: "Board Three",
  };

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
              {show ? (
                <div>
                  <input
                    className="title__input"
                    type={"text"}
                    defaultValue={boardNames[props.id]}
                    onChange={(e) => {
                      props.setName(e.target.value, props.id);
                    }}
                  />
                </div>
              ) : (
                <div>
                  <p
                    onClick={() => {
                      setShow(true);
                    }}
                    className="board__title"
                  >
                    {boardNames[props.id] || "Name of Board"}
                  </p>
                </div>
              )}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
