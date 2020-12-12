import React, { useState } from "react";
import "./counter.css";

function Counter({ counterItem, counterValue, deleteCounter, changeCounter }) {
  const [color, setColor] = useState("todo white");

  return (
    <div className={color}>
      <div className="container">
        <div className="todoDiv">
          <p>{counterItem}</p>
          <button onClick={() => changeCounter(1)}>+</button>
          <p>{counterValue}</p>
          <button onClick={() => changeCounter(-1)}>-</button>
          <div
            className="todoDelete"
            onClick={deleteCounter}
            src="imgs/delete.png"
            alt="delete"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
