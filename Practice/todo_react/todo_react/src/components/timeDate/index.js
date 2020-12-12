import React, { useState, useEffect } from "react";

import "./time.css";

function TimeDate() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function makeDate() {
    var currentdate = new Date();
    var dateOnly =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear();
    console.log(dateOnly);
    setDate(dateOnly);
    // setDate(date);
  }

  useEffect(() => {
    const dateInterval = setInterval(makeDate, 1000);
    return () => clearInterval(dateInterval);
  }, []);

  function makeTime() {
    // currentdate.toLocaleString()
    // currentdate.toLocaleTimeString()
    // currentdate.toLocaleDateString()
    let currentdate = new Date();
    let hours = currentdate.getHours();
    let minutes = currentdate.getMinutes();
    let seconds = currentdate.getSeconds();

    if (hours < 1) {
      hours = "0" + currentdate.getHours();
    }

    if (minutes <= 9) {
      minutes = "0" + currentdate.getMinutes();
    }

    if (seconds <= 9) {
      seconds = "0" + currentdate.getSeconds();
    }

    var timeOnly = hours + ":" + minutes + ":" + seconds;
    setTime(timeOnly);
  }

  useEffect(() => {
    const timeInterval = setInterval(makeTime, 1000);
    return () => clearInterval(timeInterval); //change page, time will stop
  }, []);

  return (
    <div className="container">
      {/* <button onClick={() => con}>click me</button> */}
      <div className="sideBox dateTimeSec">
        <p>{date}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}

export default TimeDate;
