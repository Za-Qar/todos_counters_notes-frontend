import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";

import uuid from "react-uuid";

import Todo from "../todo";

function Todos() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const [getTodos, setGetTodos] = useState([]);
  const [localGetTodos, setLocalGetTodos] = useState([]);

  const [getTodoMaxId, setGetTodosMaxId] = useState(0);

  /*---------------Add todo----------------*/
  let createTodo = (msg) => {
    console.log("todo fnc", msg);
    fetch(`http://localhost:5000/createTodo`, {
      method: "post",
      body: JSON.stringify({ todo: msg }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "here's the data, buddy boy"))
      .catch((error) => console.log(error, "my error"));
  };

  /*---------------Retrieve all todos----------------*/
  //Retrieve All
  async function retrieveAllTodos() {
    let res = await fetch("http://localhost:5000/"); //process.env.REACT_APP_HOST_URL - for react
    let data = await res.json();
    console.log(data.payload);
    setGetTodos(data.payload);
  }
  useEffect(() => {
    retrieveAllTodos();
  }, []);

  /*---------------Get max todo id----------------*/
  async function todoMaxId() {
    let res = await fetch("http://localhost:5000/todo/maxId");
    let data = await res.json();
    let id = data.payload[0].id;
    console.log(id);
    return id;
  }

  /*---------------Delete todo----------------*/
  let deleteTodoBackend = (id) => {
    fetch(`http://localhost:5000/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "Todo has been delete buddy boy"))
      .catch((error) => console.log(error, "this is the delete todo error"));
  };
  async function addTodo() {
    const newTodos = [...todos, { todo: inputValue }];
    setTodos(newTodos);
    setInputValue("");
    createTodo(inputValue);
    let todoIdBackend = await todoMaxId();
    setGetTodosMaxId(todoIdBackend);
  }

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
            console.log(id);
            console.log("to delete");

            const newTodo = [...todos.slice(0, id), ...todos.slice(id + 1)];
            setTodos(newTodo);

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
                />
              );
            })}
            {todos.map((item, index, array) => {
              return (
                <Todo
                  key={uuid()}
                  todoItem={item.todo}
                  todoId={getTodoMaxId}
                  index={index}
                  deleteTodo={deleteTodo}
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
