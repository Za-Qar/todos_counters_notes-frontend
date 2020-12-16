import React, { useState } from "react";
import "./todo.css";

function Todo({ todoItem, deleteTodo, todoId, index, todoClass }) {
  const [color, setColor] = useState("todo white");
  const [complete, setComplete] = useState("");
  const [opacity, setOpacity] = useState("");
  const [opacityGarbage, setOpacityGarbage] = useState("");

  function strikeThrough() {
    console.log(complete);
    !complete ? setComplete("complete") : setComplete("");
    !complete ? setOpacity("opacity") : setOpacity("");
    !complete ? setOpacityGarbage("opacityGarbage") : setOpacityGarbage("");
    // if (!complete) {
    //   setComplete("complete");
    // } else {
    //   setComplete("");
    // }
  }

  return (
    <div className={`${color} ${opacity} ` /*${todoClass}*/}>
      {" "}
      <div className="container">
        <div className="todoDiv">
          <div className="todoInnerText">
            <p className={`todoText ${complete}`} onClick={strikeThrough}>
              {todoItem}
            </p>
          </div>
          <img
            className={`todoDelete ${opacityGarbage}`}
            onClick={() => deleteTodo(index, todoId)}
            src="https://i.imgur.com/z4KpjzC.png"
            alt="delete"
          />
        </div>
      </div>
    </div>
  );
}

export default Todo;
