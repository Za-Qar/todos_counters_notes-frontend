import React, { useState, useEffect } from "react";

import "./time.css";

function TimeDate() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function makeDate() {
    let currentdate = new Date();
    // var dateOnly =
    //   currentdate.getDate() +
    //   "/" +
    //   (currentdate.getMonth() + 1) +
    //   "/" +
    //   currentdate.getFullYear();
    // console.log(dateOnly);
    setDate(currentdate.toLocaleDateString());
    // setDate(date);
  }

  useEffect(() => {
    const dateInterval = setInterval(makeDate, 1000);
    return () => clearInterval(dateInterval);
  }, []);

  function makeTime() {
    let currentdate = new Date();
    // currentdate.toLocaleString();
    // currentdate.toLocaleTimeString();
    // currentdate.toLocaleDateString();

    // let hours = currentdate.getHours();
    // let minutes = currentdate.getMinutes();
    // let seconds = currentdate.getSeconds();

    // if (hours < 1) {
    //   hours = "0" + currentdate.getHours();
    // }

    // if (minutes <= 9) {
    //   minutes = "0" + currentdate.getMinutes();
    // }

    // if (seconds <= 9) {
    //   seconds = "0" + currentdate.getSeconds();
    // }

    // var timeOnly = hours + ":" + minutes + ":" + seconds;
    setTime(currentdate.toLocaleTimeString());
  }

  useEffect(() => {
    const timeInterval = setInterval(makeTime, 1000);
    return () => clearInterval(timeInterval); //change page, time will stop
  }, []);

  return (
    <div className="container">
      {/* <button onClick={() => con}>click me</button> */}
      <div className="sideBox dateTimeSec">
        <p className="date">{date}</p>
        <p className="time">{time}</p>
      </div>
    </div>
  );
}

export default TimeDate;
