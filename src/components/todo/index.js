import React, { useState } from "react";
import "./todo.css";

function Todo({
  todoItem,
  deleteTodo,
  todoId,
  index,
  colour,
  strikeTodo,
  currentStatus,
}) {
  const [complete, setComplete] = useState(`${currentStatus}`);
  const [opacity, setOpacity] = useState("");
  const [opacityGarbage, setOpacityGarbage] = useState("");

  function strikeThrough() {
    complete !== "complete" ? setComplete("complete") : setComplete("active");
    complete !== "complete" ? setOpacity("opacity") : setOpacity("");
    complete !== "complete"
      ? setOpacityGarbage("opacityGarbage")
      : setOpacityGarbage("");
    strikeTodo(todoId, complete);
  }

  return (
    <div className={`todo ${colour} ${opacity} ` /*${todoClass}*/}>
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
