import React, { useState, useEffect } from "react";
import "./counter.css";

function Counter({
  counterItem,
  deleteCounter,
  counterId,
  index,
  incrementCounter,
  decrementCounter,
  counterValue,
  colour,
}) {
  const [counterLocalValue, setCounterLocalValue] = useState(0);
  const [complete, setComplete] = useState("");
  const [opacity, setOpacity] = useState("");

  function setDbCounterValueToLocal() {
    setCounterLocalValue(counterValue);
  }

  useEffect(() => {
    setDbCounterValueToLocal();
  }, []);

  function changeCounter(val) {
    setCounterLocalValue(counterLocalValue + val);
  }

  function strikeThrough() {
    !complete ? setComplete("complete") : setComplete("");
    !complete ? setOpacity("opacity") : setOpacity("");
  }

  return (
    <div className={`todo ${colour} ${opacity}`}>
      <div className="container">
        <div className="todoDiv">
          <div className="counterText">
            <p
              className={`counterInnerText ${complete}`}
              onClick={strikeThrough}
            >
              {counterItem}
            </p>
            <br />
            <p className="counterValue">{counterLocalValue}</p>
          </div>
          <div className="counterItems">
            <button
              onClick={() => {
                changeCounter(1);
                incrementCounter(counterId);
              }}
              className="add"
            >
              +
            </button>
            {/* <p className="counterValue">{counterValue}</p> */}
            <button
              onClick={() => {
                changeCounter(-1);
                decrementCounter(counterId);
              }}
              className="minus"
            >
              -
            </button>
          </div>
          <img
            className="todoDelete"
            onClick={() => deleteCounter(index, counterId)}
            src="https://i.imgur.com/z4KpjzC.png"
            alt="delete"
          />
        </div>
      </div>
    </div>
  );
}

export default Counter;
