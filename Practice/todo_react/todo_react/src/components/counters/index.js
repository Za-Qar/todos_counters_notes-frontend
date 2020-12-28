import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
import "./counter.css";

import uuid from "react-uuid";

import Todo from "../todo";
import Counter from "../counter";

import Todos from "../todos";

function Counters() {
  const [inputValue, setInputValue] = useState("");

  const [counter, setCounter] = useState([]);

  const [getCounters, setGetCounters] = useState([]);
  const [getCounterMaxId, setGetCounterMaxId] = useState(0);

  const [deleteTodoClass, SetDeleteTodoClass] = useState("");

  const [colour, setColour] = useState("white");

  /*---------------Counter backend----------------*/

  /*---------------Add Counter----------------*/
  let createCounter = (msg, count, colour) => {
    console.log("counter Input recieved", msg);
    fetch(`http://localhost:5000/counter`, {
      method: "POST",
      body: JSON.stringify({ counter: msg, zero: count, colour: colour }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "here's the counter data buddy boy"))
      .catch((error) => console.log(error, "counter error"));
  };

  /*---------------Get all Counters----------------*/
  async function retrieveAllCounters() {
    let res = await fetch("http://localhost:5000/counter");
    let data = await res.json();
    setGetCounters(data.payload);
    console.log("these are the counters from the db: ", data.payload);
  }
  useEffect(() => {
    retrieveAllCounters();
  }, []);

  /*---------------Delete Counter----------------*/
  let deleteCounterBackend = (id) => {
    fetch(`http://localhost:5000/counter/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "Counter has been delete buddy boy"))
      .catch((error) => console.log(error, "this is the delete Counter error"));
  };

  /*---------------Get all Max Counter ID----------------*/
  async function retrieveMaxCounterId() {
    let res = await fetch("http://localhost:5000/counter/maxIdCounters");
    let data = await res.json();
    let id = data.payload[0].id;
    console.log("his is the counter id in the counterMaxId function:  ", id);
    return id;
  }

  /*---------------Increment Counter backend----------------*/
  let incrementCounter = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/counter/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "this is the id buddy boy"))
      .catch((error) => console.log(error, "incrementCounter error"));
  };

  /*---------------Decrement Counter backend----------------*/
  let decrementCounter = (id) => {
    console.log("decremented counter", id);
    fetch(`http://localhost:5000/counter/decremet/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "this is the decrement id buddy boy"))
      .catch((error) => console.log(error, "this is the decerment error"));
  };

  async function addCounter() {
    const newCounter = [...counter, { counter: inputValue, colour: colour }];
    setCounter(newCounter);
    createCounter(inputValue, 0, colour);
    setInputValue("");
    let maxId = await retrieveMaxCounterId();
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

            console.log(
              "this is the counterID, line 113 react input.js: ",
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

  async function deleteCounterGet(id, counterId) {
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
            console.log("this is counter id: ", counterId);
            console.log("to delete");

            const newCounter = [
              ...getCounters.slice(0, id),
              ...getCounters.slice(id + 1),
            ];
            setGetCounters(newCounter);
            deleteCounterBackend(counterId);

            console.log("this is the get all counters: ", getCounters);
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
    console.log("counters get: ", getCounters);
    console.log("counters Local: ", counter);
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
          <button onClick={addCounter}>Add Counter</button>
        </div>
        <div className="appSec">
          <div className="counterSection">
            {getCounters.map((item, index) => {
              return (
                <Counter
                  key={uuid()}
                  counterItem={item.counter}
                  counterId={item.id}
                  index={index}
                  deleteCounter={deleteCounterGet}
                  incrementCounter={incrementCounter}
                  decrementCounter={decrementCounter}
                  counterValue={item.count}
                  colour={item.color}
                />
              );
            })}
            {counter.map((item, index) => {
              return (
                <Counter
                  key={uuid()}
                  counterItem={item.counter}
                  counterId={getCounterMaxId}
                  index={index}
                  deleteCounter={deleteCounter}
                  incrementCounter={incrementCounter}
                  decrementCounter={decrementCounter}
                  counterValue={0}
                  colour={item.colour}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counters;
