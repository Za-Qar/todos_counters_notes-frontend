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

  console.log("this is userData: ", userData?.email);

  /*---------------Todo backend----------------*/

  /*---------------Add todo----------------*/
  let createTodo = (msg, colour) => {
    // Encrypt
    const encryptedMsg = CryptoJS.AES.encrypt(
      `${msg}`,
      `${process.env.ENCRYPTION_HASH}`
    ).toString();

    // Encrypt
    const encryptedColour = CryptoJS.AES.encrypt(
      `${colour}`,
      `${process.env.ENCRYPTION_HASH}`
    ).toString();

    fetch(`${TODO_BACKEND_URLS.TODOS}`, {
      method: "post",
      body: JSON.stringify({
        todo: encryptedMsg,
        colour: encryptedColour,
        email: userData?.email,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setNewTodoId(data[0].id))
      .catch((error) => error);
  };

  /*---------------Retrieve all todos----------------*/
  //Retrieve All
  async function retrieveAllTodos() {
    let res = await fetch(TODO_BACKEND_URLS.TODOS); //process.env.REACT_APP_HOST_URL - for react
    let data = await res.json();

    const decrypting = data.payload.map((item) => {
      // Decrypt
      let decryptingColour = CryptoJS.AES.decrypt(
        `${item.color}`,
        `${process.env.ENCRYPTION_HASH}`
      );
      const decryptedColour = decryptingColour.toString(CryptoJS.enc.Utf8);

      // Decrypt
      let decryptingTodo = CryptoJS.AES.decrypt(
        `${item.todo}`,
        `${process.env.ENCRYPTION_HASH}`
      );
      const decryptedTodo = decryptingTodo.toString(CryptoJS.enc.Utf8);
      return {
        color: decryptedColour,
        id: item.id,
        status: item.status,
        todo: decryptedTodo,
      };
    });
    setGetTodos(decrypting);
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
      .then((data) => data)
      .catch((error) => error);
  };
  async function addTodo() {
    const newTodos = [...todos, { todo: inputValue, colour: colour }];
    setTodos(newTodos);
    setInputValue("");
    createTodo(inputValue, colour);
  }

  /*---------------Strike through Todo----------------*/
  let strikeTodo = (id, value) => {
    fetch(`${TODO_BACKEND_URLS.TODOS}`, {
      method: "PATCH",
      body: JSON.stringify({ id: id, status: value }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => error);
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
    confirmAlert({
      title: "Are you sure you want to delete this todo?",
      message: "This action is irreversible",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const newTodo = [
              ...getTodos.slice(0, id),
              ...getTodos.slice(id + 1),
            ];
            setGetTodos(newTodo);
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
