import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
import "./input.css";

import Todo from "../todo";
import Counter from "../counter";

function Input() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [counter, setCounter] = useState([]);

  const [getTodos, setGetTodos] = useState([]);

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

  /*---------------Add Counter----------------*/
  let createCounter = (msg, count) => {
    console.log("counter Input recieved", msg);
    fetch(`http://localhost:5000/createCounter`, {
      method: "POST",
      body: JSON.stringify({ counter: msg, zero: count }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "here's the counter data buddy boy"))
      .catch((error) => console.log(error, "counter error"));
  };

  /*---------------Retrieve all todos----------------*/
  //Retrieve All
  async function retrieveAll() {
    let res = await fetch("http://localhost:5000/"); //process.env.REACT_APP_HOST_URL - for react
    let data = await res.json();
    console.log(data.payload);
    setGetTodos(data.payload);
  }

  /*---------------Delete todo id----------------*/
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
  useEffect(() => {
    retrieveAll();
  }, []);

  function addTodo() {
    const newTodos = [...todos, { todo: inputValue }];
    setTodos(newTodos);
    setInputValue("");
    createTodo(inputValue);
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
    let todoId = todoMaxId();
    console.log(todoId);
    // deleteTodoBackend(todoId + 1);
  }

  function addCounter() {
    let newCounter = [...counter, { counter: inputValue }];
    setCounter(newCounter);
    createCounter(inputValue);
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
            {getTodos.map((item, index, array) => {
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
                  deleteCounter={() => deleteCounter(index)}
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
