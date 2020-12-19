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
  const [getTodoMaxId, setGetTodosMaxId] = useState(0);

  const [getCounters, setGetCounters] = useState([]);
  const [getCounterMaxId, setGetCounterMaxId] = useState(0);

  const [deleteTodoClass, SetDeleteTodoClass] = useState("");

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

  /*---------------Get all Counters----------------*/
  async function retrieveAllCounters() {
    let res = await fetch("http://localhost:5000/allCounters");
    let data = await res.json();
    setGetCounters(data.payload);
  }
  useEffect(() => {
    retrieveAllCounters();
  }, []);

  /*---------------Delete Counter----------------*/
  let deleteCounterBackend = (id) => {
    fetch(`http://localhost:5000/counterDelete/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "Counter has been delete buddy boy"))
      .catch((error) => console.log(error, "this is the delete Counter error"));
  };

  /*---------------Get all Max Counter ID----------------*/
  async function retrieveMaxCounterId() {
    let res = await fetch("http://localhost:5000/maxIdCounters");
    let data = await res.json();
    let id = data.payload[0].id;
    console.log("his is the counter id in the counterMaxId function:  ", id);
    return id;
  }

  /*---------------Increment Counter backend----------------*/
  let incrementCounter = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "this is the id buddy boy"))
      .catch((error) => console.log(error, "incrementCounter error"));
  };

  /*---------------Decrement Counter backend----------------*/
  let decrementCounter = (id) => {
    console.log("decremented counter", id);
    fetch(`http://localhost:5000/decremet/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "this is the decrement id buddy boy"))
      .catch((error) => console.log(error, "this is the decerment error"));
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
            console.log(newTodo);
            setTodos(newTodo);
            deleteTodoBackend(todoId);
            SetDeleteTodoClass("hidden");
            retrieveAllTodos();
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

  async function addCounter() {
    let newCounter = [...counter, { counter: inputValue }];
    setCounter(newCounter);
    createCounter(inputValue, 0);
    setInputValue("");
    let maxId = retrieveMaxCounterId();
    console.log("add counter max id retrieval", maxId);
    setGetCounterMaxId(maxId);
  }

  async function deleteCounter(id, counterId) {
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
            deleteCounterBackend(counterId);
            SetDeleteTodoClass("hidden");
            setGetCounters(newCounter);
            console.log(
              "this is the counterID, line 193 react input.js: ",
              counterId
            );
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
                  todoId={getTodoMaxId}
                  index={index}
                  deleteTodo={deleteTodo}
                  todoClass={deleteTodoClass}
                />
              );
            })}
            {getTodos.map((item, index) => {
              return (
                <Todo
                  key={index}
                  todoItem={item.todo}
                  todoId={item.id}
                  index={index}
                  deleteTodo={deleteTodo}
                  todoClass={deleteTodoClass}
                />
              );
            })}
          </div>
          <div className="counterSection">
            {counter.map((item, index) => {
              return (
                <Counter
                  //uuid
                  // key={index}
                  // counterItem={item.counter}
                  // counterId={getCounterMaxId}
                  // index={index}
                  // deleteCounter={deleteCounter}

                  key={index}
                  counterItem={item.counter}
                  counterId={getCounterMaxId}
                  index={index}
                  deleteCounter={deleteCounter}
                  incrementCounter={incrementCounter}
                  decrementCounter={decrementCounter}
                  counterValue={item.count}
                />
              );
            })}
            {getCounters.map((item, index) => {
              return (
                <Counter
                  key={index}
                  counterItem={item.counter}
                  counterId={item.id}
                  index={index}
                  deleteCounter={deleteCounter}
                  incrementCounter={incrementCounter}
                  decrementCounter={decrementCounter}
                  counterValue={item.count}
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
