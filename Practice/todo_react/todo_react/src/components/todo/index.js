import React, { useState } from "react";
import "./todo.css";

function Todo({
  todoItem,
  deleteTodo,
  todoId,
  index,
  todoClass,
  colour,
  strikeTodo,
  currentStatus,
}) {
  const [complete, setComplete] = useState(`${currentStatus}`);
  const [opacity, setOpacity] = useState("");
  const [opacityGarbage, setOpacityGarbage] = useState("");

  function strikeThrough() {
    console.log(complete);
    complete != "complete" ? setComplete("complete") : setComplete("active");
    complete != "complete" ? setOpacity("opacity") : setOpacity("");
    complete != "complete"
      ? setOpacityGarbage("opacityGarbage")
      : setOpacityGarbage("");
    // if (!complete) {
    //   setComplete("complete");
    // } else {
    //   setComplete("active");
    // }
    console.log(todoId, complete);
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
