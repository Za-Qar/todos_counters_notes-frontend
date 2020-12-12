import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
import "./input.css";

import Todo from "../todo";
import Counter from "../counter";

function Input() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [counter, setCounter] = useState([]);
  const [counterValue, setCounterValue] = useState(0);

  function addTodo() {
    const newTodos = [...todos, { todo: inputValue }];
    setTodos(newTodos);
    setInputValue("");
  }

  function deleteTodo(id) {
    //linting rule which is why confirm doesn't work.
    //I can still window.confirm
    confirmAlert({
      title: "Are you sure you want to delete this todo?",
      message: "This action is irreversible",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log(id);
            console.log("to delete");
            const newTodo = [...todos.slice(0, id), ...todos.slice(id + 1)];
            console.log(newTodo);
            setTodos(newTodo);
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  }

  function addCounter() {
    let newCounter = [...counter, { counter: inputValue }];
    setCounter(newCounter);
    setInputValue("");
  }

  function deleteCounter(id) {
    confirmAlert({
      title: "Are you sure you want to delete this todo?",
      message: "This action is irreversible",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            let newCounter = [
              ...counter.slice(0, id),
              ...counter.slice(id + 1),
            ];
            setCounter(newCounter);
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  }

  // function changeCounter(val) {
  //   setCounterValue(counterValue + val);
  // }

  return (
    <div className="container">
      <div className="inputSec">
        <input
          className="inputField"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <div className="inputButtons">
          <button onClick={addTodo}>Add Todo</button>
          <button onClick={addCounter}>Add Counter</button>
        </div>
        <div className="appSec">
          <div className="todoSection">
            {todos.map((item, index, array) => {
              return (
                <Todo
                  key={index}
                  todoItem={item.todo}
                  deleteTodo={() => deleteTodo(index)}
                />
              );
            })}
          </div>
          <div className="counterSection">
            {counter.map((item, index) => {
              return (
                <Counter
                  counterItem={item.counter}
                  counterValue={counterValue}
                  deleteCounter={() => deleteCounter(index)}
                  changeCounter={changeCounter}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;
