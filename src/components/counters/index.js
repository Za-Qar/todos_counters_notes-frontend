import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { COUNTERS_BACKEND_URLS } from "../../configs/configs";
// import "react-confirm-alert/src/react-confirm-alert.css";
import "./counter.css";

import uuid from "react-uuid";

import Counter from "../counter";

// Encryption
import CryptoJS from "react-native-crypto-js";

// userContext
import { useAuthContext } from "../../context/authContext.js";

function Counters() {
  //auth
  const [userData] = useAuthContext();

  const [inputValue, setInputValue] = useState("");

  const [counter, setCounter] = useState([]);

  const [getCounters, setGetCounters] = useState([]);
  const [newCounterId, setNewCounterId] = useState(0);

  const [colour, setColour] = useState("white");

  /*---------------Counter backend----------------*/

  /*---------------Add Counter----------------*/
  let createCounter = (msg, count, colour) => {
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
        email: userData?.email,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setNewCounterId(data[0].id))
      .catch((error) => error);
  };

  /*---------------Strike through Counter----------------*/
  let strikeCounter = (id, value) => {
    fetch(`${COUNTERS_BACKEND_URLS.COUNTERS}`, {
      method: "PATCH",
      body: JSON.stringify({ id: id, status: value }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => error);
  };

  /*---------------Get all Counters----------------*/
  async function retrieveAllCounters() {
    let res;
    if (userData) {
      res = await fetch(
        `${COUNTERS_BACKEND_URLS.COUNTERS}/?email=${userData?.email}`
      );
    } else {
      res = await fetch(`${COUNTERS_BACKEND_URLS.COUNTERS}`);
    }

    let data = await res.json();

    const decrypting = data.payload.map((item) => {
      // Decrypt
      const decryptingColour = CryptoJS.AES.decrypt(
        `${item.colour}`,
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
        colour: decryptedColour,
        count: item.count,
        counter: decryptedCounter,
        id: item.id,
        status: item.status,
      };
    });
    setGetCounters(decrypting);
  }
  useEffect(() => {
    retrieveAllCounters();
  }, [userData]);

  /*---------------Delete Counter----------------*/
  let deleteCounterBackend = (id) => {
    fetch(`${COUNTERS_BACKEND_URLS.COUNTERS}/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => error);
  };

  /*---------------Increment Counter backend----------------*/
  let incrementCounter = (id) => {
    fetch(`${COUNTERS_BACKEND_URLS.COUNTERS}/increment/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => error);
  };

  /*---------------Decrement Counter backend----------------*/
  let decrementCounter = (id) => {
    fetch(`${COUNTERS_BACKEND_URLS.COUNTERS}/decremet/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => error);
  };

  /*---------------Counters frontend----------------*/

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
      title: "Are you sure you want to delete this counter?",
      message: "This action is irreversible",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const newCounter = [
              ...getCounters.slice(0, id),
              ...getCounters.slice(id + 1),
            ];
            setGetCounters(newCounter);
            deleteCounterBackend(counterId);
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
                  colour={item.colour}
                  strikeCounter={strikeCounter}
                  currentStatus={item.status}
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
                  strikeCounter={strikeCounter}
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

export default Counters;
