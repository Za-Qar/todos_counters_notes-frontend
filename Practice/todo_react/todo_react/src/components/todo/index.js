import React, { useState } from "react";
import "./todo.css";

function Todo({ todoItem, deleteTodo }) {
  const [color, setColor] = useState("todo white");

  return (
    <div className={color}>
      <div className="container">
        <div className="todoDiv">
          <p>{todoItem}</p>
          <img
            className="todoDelete"
            onClick={deleteTodo}
            src="https://i.imgur.com/z4KpjzC.png"
            alt="delete"
          />
        </div>
      </div>
    </div>
  );
}

export default Todo;
