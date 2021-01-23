import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { COUNTERS_BACKEND_URLS } from "../../configs/configs";
// import "react-confirm-alert/src/react-confirm-alert.css";
import "./counter.css";

import uuid from "react-uuid";

import Counter from "../counter";

// Encryption
import CryptoJS from "react-native-crypto-js";

function Counters() {
  const [inputValue, setInputValue] = useState("");

  const [counter, setCounter] = useState([]);

  const [getCounters, setGetCounters] = useState([]);
  const [newCounterId, setNewCounterId] = useState(0);

  const [colour, setColour] = useState("white");

  /*---------------Counter backend----------------*/

  /*---------------Add Counter----------------*/
  let createCounter = (msg, count, colour) => {
    console.log("counter Input recieved", msg);
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

    fetch(`${COUNTERS_BACKEND_URLS.COUNTERS}`, {
      method: "POST",
      body: JSON.stringify({
        counter: encryptedMsg,
        zero: count,
        colour: encryptedColour,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setNewCounterId(data[0].id))
      .catch((error) => console.log(error, "counter error"));
  };

  /*---------------Get all Counters----------------*/
  async function retrieveAllCounters() {
    let res = await fetch(`${COUNTERS_BACKEND_URLS.COUNTERS}`);
    let data = await res.json();

    const decrypting = data.payload.map((item) => {
      console.log("this is proof of encryption: ", item.todo);
      // Decrypt
      const decryptingColour = CryptoJS.AES.decrypt(
        `${item.color}`,
        `${process.env.ENCRYPTION_HASH}`
      );
      const decryptedColour = decryptingColour.toString(CryptoJS.enc.Utf8);

      // Decrypt
      const decryptingCounter = CryptoJS.AES.decrypt(
        `${item.counter}`,
        `${process.env.ENCRYPTION_HASH}`
      );
      const decryptedCounter = decryptingCounter.toString(CryptoJS.enc.Utf8);
      return {
        color: decryptedColour,
        count: 0,
        counter: decryptedCounter,
        id: item.id,
        status: null,
      };
    });
    setGetCounters(decrypting);
    console.log("This is proof of encryption of counters: ", data.payload);
  }
  useEffect(() => {
    retrieveAllCounters();
  }, []);

  /*---------------Delete Counter----------------*/
  let deleteCounterBackend = (id) => {
    fetch(`${COUNTERS_BACKEND_URLS.COUNTERS}/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "Counter has been delete buddy boy"))
      .catch((error) => console.log(error, "this is the delete Counter error"));
  };

  /*---------------Increment Counter backend----------------*/
  let incrementCounter = (id) => {
    console.log(id);
    fetch(`${COUNTERS_BACKEND_URLS.COUNTERS}/increment/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "this is the id buddy boy"))
      .catch((error) => console.log(error, "incrementCounter error"));
  };

  /*---------------Decrement Counter backend----------------*/
  let decrementCounter = (id) => {
    console.log("decremented counter", id);
    fetch(`${COUNTERS_BACKEND_URLS.COUNTERS}/decremet/${id}`, {
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
                  counterId={newCounterId}
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
