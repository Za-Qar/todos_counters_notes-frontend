import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { TODO_BACKEND_URLS } from "../../configs/configs.js";

import uuid from "react-uuid";

import Todo from "../todo";

// Encryption
import CryptoJS from "react-native-crypto-js";

// userContext
import { useAuthContext } from "../../context/authContext.js";

function Todos() {
  //auth
  const [userData] = useAuthContext();

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const [getTodos, setGetTodos] = useState([]);

  const [newTodoId, setNewTodoId] = useState(0);

  const [colour, setColour] = useState("white");

  /*---------------Todo backend----------------*/

  /*---------------Add todo----------------*/
  // let createTodo = (msg, colour) => {
  //   console.log("should add a todo: ");
  //   localStorage.setItem("TodosLocalStorage", {
  //     todo: msg,
  //     colour: colour,
  //     status: "active",
  //   });
  // };

  /*---------------Retrieve all todos----------------*/
  //Retrieve All
  async function retrieveAllTodos() {
    let localTodos = JSON.parse(localStorage.getItem("TodosLocalStorage"));
    setGetTodos(localTodos);

    console.log("Local storage todos: ", localTodos);
  }
  useEffect(() => {
    retrieveAllTodos();
  }, [userData]);

  /*---------------Delete todo----------------*/
  let deleteTodoBackend = (id) => {
    console.log("should remove todo: ", id);
  };

  /*---------------Add todo----------------*/
  async function addTodo() {
    const newTodos = [...getTodos, { todo: inputValue, colour: colour }];
    setGetTodos(newTodos);
    setInputValue("");

    localStorage.setItem("TodosLocalStorage", JSON.stringify(newTodos));
  }

  /*---------------Strike through Todo----------------*/
  let strikeTodo = (id, value) => {
    console.log("should strike todo: ", id);
  };

  /*---------------Todo frontend----------------*/

  async function deleteTodo(id, todoId) {
    confirmAlert({
      title: "Are you sure you want to delete this todo?",
      message: "This action is irreversible",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const newTodo = [...todos.slice(0, id), ...todos.slice(id + 1)];
            setTodos(newTodo);
            localStorage.setItem("TodosLocalStorage", JSON.stringify(newTodo));
            deleteTodoBackend(todoId);
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

  return (
    <div className="container">
      <div className="inputSec">
        {/* <button onClick={debugging}>Debugging</button> */}
        <input
          className="inputField"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <div className="colour">
          <h4>Choose a colour</h4>

          <span className="column in1">
            <input
              className="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("white")}
            />
          </span>
          <span className="column in2">
            <input
              className="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("green")}
            />
          </span>
          <span className="column in3">
            <input
              className="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("red")}
            />
          </span>
          <span className="column in4">
            <input
              className="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("purple")}
            />
          </span>
          <span className="column in5">
            <input
              className="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("peach")}
            />
          </span>
          <span className="column in6">
            <input
              className="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("blue")}
            />
          </span>
        </div>

        <div className="inputButtons">
          <button onClick={addTodo}>Add Todo</button>
        </div>
        <div className="appSec">
          <div className="todoSection">
            {getTodos.map((item, index) => {
              console.log("this is item: ", item.colour);
              return (
                <Todo
                  key={uuid()}
                  todoItem={item.todo}
                  todoId={item.id}
                  index={index}
                  deleteTodo={deleteTodo}
                  colour={item.colour}
                  strikeTodo={strikeTodo}
                  currentStatus={item.status}
                />
              );
            })}
            {todos.map((item, index) => {
              return (
                <Todo
                  key={uuid()}
                  todoItem={item.todo}
                  todoId={newTodoId}
                  index={index}
                  deleteTodo={deleteTodo}
                  colour={item.colour}
                  strikeTodo={strikeTodo}
                  currentStatus={"active"}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todos;
