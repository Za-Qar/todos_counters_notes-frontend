import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { TODO_BACKEND_URLS } from "../../configs/configs.js";

import uuid from "react-uuid";

import Todo from "../todo";

function Todos() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const [getTodos, setGetTodos] = useState([]);
  const [localGetTodos, setLocalGetTodos] = useState([]);

  const [newTodoId, setNewTodoId] = useState(0);

  const [colour, setColour] = useState("white");

  /*---------------Todo backend----------------*/

  /*---------------Add todo----------------*/
  let createTodo = (msg, colour) => {
    console.log("todo fnc", msg);
    fetch(`${TODO_BACKEND_URLS.TODOS}`, {
      method: "post",
      body: JSON.stringify({ todo: msg, colour: colour }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setNewTodoId(data[0].id))
      .catch((error) => console.log(error, "my error"));
  };

  /*---------------Retrieve all todos----------------*/
  //Retrieve All
  async function retrieveAllTodos() {
    let res = await fetch(TODO_BACKEND_URLS.TODOS); //process.env.REACT_APP_HOST_URL - for react
    let data = await res.json();
    console.log(data.payload);
    setGetTodos(data.payload);
  }
  useEffect(() => {
    retrieveAllTodos();
  }, []);

  /*---------------Delete todo----------------*/
  let deleteTodoBackend = (id) => {
    fetch(`${TODO_BACKEND_URLS.TODOS}/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "Todo has been delete buddy boy"))
      .catch((error) => console.log(error, "this is the delete todo error"));
  };
  async function addTodo() {
    const newTodos = [...todos, { todo: inputValue, colour: colour }];
    setTodos(newTodos);
    setInputValue("");
    createTodo(inputValue, colour);
    console.log("new Todos: ", newTodos);
  }

  /*---------------Strike through Todo----------------*/
  let strikeTodo = (id, value) => {
    console.log("this is id: ", id);
    console.log("this is value: ", value);
    fetch(`${TODO_BACKEND_URLS.TODOS}`, {
      method: "PATCH",
      body: JSON.stringify({ id: id, status: value }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "this is the id buddy boy"))
      .catch((error) => console.log(error, "incrementCounter error"));
  };

  /*---------------Todo backend end----------------*/

  async function deleteTodo(id, todoId) {
    //linting rule which is why confirm doesn't work.
    //I can still window.confirm
    confirmAlert({
      title: "Are you sure you want to delete this todo?",
      message: "This action is irreversible",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const newTodo = [...todos.slice(0, id), ...todos.slice(id + 1)];
            setTodos(newTodo);
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

  async function deleteTodoGet(id, todoId) {
    //linting rule which is why confirm doesn't work.
    //I can still window.confirm
    confirmAlert({
      title: "Are you sure you want to delete this todo?",
      message: "This action is irreversible",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log("this is the array id: ", id);
            console.log("this is todo id: ", todoId);
            console.log("to delete");

            const newTodo = [
              ...getTodos.slice(0, id),
              ...getTodos.slice(id + 1),
            ];
            setGetTodos(newTodo);

            deleteTodoBackend(todoId);

            // retrieveAllTodos();
            console.log(getTodos);
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

  function debugging() {
    console.log("todos get: ", getTodos);
    console.log("todos Local: ", todos);
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
        <div class="colour">
          <h4>Choose a colour</h4>
          <span class="column in1">
            <input
              class="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("white")}
            />
          </span>
          <span class="column in2">
            <input
              class="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("green")}
            />
          </span>
          <span class="column in3">
            <input
              class="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("red")}
            />
          </span>
          <span class="column in4">
            <input
              class="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("purple")}
            />
          </span>
          <span class="column in5">
            <input
              class="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("peach")}
            />
          </span>

          <span class="column in6">
            <input
              class="allColumns"
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
              return (
                <Todo
                  key={uuid()}
                  todoItem={item.todo}
                  todoId={item.id}
                  index={index}
                  deleteTodo={deleteTodoGet}
                  colour={item.color}
                  strikeTodo={strikeTodo}
                  currentStatus={item.status}
                />
              );
            })}
            {todos.map((item, index, array) => {
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
