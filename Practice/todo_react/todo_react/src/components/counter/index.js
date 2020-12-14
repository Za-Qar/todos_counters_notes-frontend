import React, { useState } from "react";
import "./counter.css";

function Counter({ counterItem, deleteCounter }) {
  const [color, setColor] = useState("counter white");
  const [counterValue, setCounterValue] = useState(0);
  const [complete, setComplete] = useState("");
  const [opacity, setOpacity] = useState("");
  const [opacityGarbage, setOpacityGarbage] = useState("");

  function changeCounter(val) {
    setCounterValue(counterValue + val);
  }

  function strikeThrough() {
    console.log(complete);
    !complete ? setComplete("complete") : setComplete("");
    !complete ? setOpacity("opacity") : setOpacity("");
    !complete ? setOpacityGarbage("opacityGarbage") : setOpacityGarbage("");
  }

  return (
    <div className={`${color} ${opacity}`}>
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
            <p className="counterValue">{counterValue}</p>
          </div>
          <div className="counterItems">
            <button onClick={() => changeCounter(1)} className="add">
              +
            </button>
            {/* <p className="counterValue">{counterValue}</p> */}
            <button onClick={() => changeCounter(-1)} className="minus">
              -
            </button>
          </div>
          <img
            className="todoDelete"
            onClick={deleteCounter}
            src="https://i.imgur.com/z4KpjzC.png"
            alt="delete"
          />
        </div>
      </div>
    </div>
  );
}

export default Counter;
