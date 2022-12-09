import React, { useEffect, useState } from "react";
import "./weather.css";

// const initialState = "";

// function reducer(state, action) {
//   switch (action.type) {
//     case "temp":
//       return "??";
//   }
// }

function Weather() {
  // const [state, dispatch] = useReducer(reducer, initialState);

  const [temp, setTemp] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [feel, setFeel] = useState("");
  const [curr, setCurr] = useState("");
  const [city, setCity] = useState("");
  const [wethImage, setWethImage] = useState("");

  const [userLat, setUserLat] = useState(52.4862);
  const [userLong, setUserLong] = useState(-1.8904);

  // GET WEATHER FROM API PROVIDER
  useEffect(() => {
    const apiKey = `${process.env.REACT_APP_WEATHER_API}`;
    async function getWeather(latitude, longitude) {
      let api = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );

      let data = await api.json();
      let results = data.main;

      let currentSituation = data?.weather[0].description;
      let { temp, feels_like, temp_min, temp_max } = results;
      let city = data.name;

      temp = Math.floor(results.temp - 273.15);
      feels_like = Math.floor(results.feels_like - 273.15);
      temp_min = Math.floor(results.temp_min - 273.15);
      temp_max = Math.floor(results.temp_max - 273.15);

      setTemp(temp);
      setTempMax(temp_max);
      setTempMin(temp_min);
      setFeel(feels_like);
      setCurr(currentSituation);
      setCity(city);

      // /b /b => regex

      // I didn't like the api's iocns so I'm using my own
      if (currentSituation === "fog") {
        setWethImage(
          "https://pics.freeicons.io/uploads/icons/png/17956487541554125860-512.png"
        );
      } else if (currentSituation === "clear sky") {
        setWethImage(
          "https://pics.freeicons.io/uploads/icons/png/3900066401606062167-512.png"
        );
      } else if (currentSituation === "few clouds") {
        setWethImage(
          "https://pics.freeicons.io/uploads/icons/png/4845584041548329956-512.png"
        );
      } else if (currentSituation === "scattered clouds") {
        setWethImage(
          "https://pics.freeicons.io/uploads/icons/png/1494720511548329949-512.png"
        );
      } else if (currentSituation === "broken clouds") {
        setWethImage(
          "https://pics.freeicons.io/uploads/icons/png/12070495781553228568-512.png"
        );
      } else if (currentSituation === "shower rain") {
        setWethImage(
          "https://pics.freeicons.io/uploads/icons/png/10573724551548329942-512.png"
        );
      } else if (currentSituation === "rain") {
        setWethImage(
          "https://pics.freeicons.io/uploads/icons/png/19370507541554125871-512.png"
        );
      } else if (currentSituation === "thunderstorm") {
        setWethImage(
          "https://pics.freeicons.io/uploads/icons/png/21259361781663251033-512.png"
        );
      } else if (currentSituation === "snow") {
        setWethImage(
          "https://pics.freeicons.io/uploads/icons/png/19933719791554125873-512.png"
        );
      } else if (currentSituation === "mist") {
        setWethImage(
          "https://pics.freeicons.io/uploads/icons/png/17007333341618135482-512.png"
        );
      } else if (
        currentSituation === "moderate rain" ||
        currentSituation === "light rain"
      ) {
        setWethImage(
          "https://pics.freeicons.io/uploads/icons/png/11977253731548329942-512.png"
        );
      } else {
        setWethImage(
          "https://pics.freeicons.io/uploads/icons/png/2010892651596027191-512.png"
        );
      }
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude);
    });

    getWeather(userLat, userLong);
    setInterval(getWeather(userLat, userLong), 30000);
  }, [userLat, userLong]);

  return (
    <div className="container">
      <div className="sideBox weatherSec">
        <p className="city">{city}</p>
        <p className="temp">{temp}°C</p>

        <img alt="current weather" className="curWeathImage" src={wethImage} />
        <p className="curr">{curr}</p>

        <div className="temp">
          <img
            src="https://pics.freeicons.io/uploads/icons/png/21374267471600621651-512.png"
            width="30px"
            alt="max temperature icon"
          />
          <span className="spanWeather"></span>
          <p> Max: {tempMax}°C</p>
        </div>

        <div className="temp">
          <img
            src="https://pics.freeicons.io/uploads/icons/png/11021436831600621496-512.png"
            width="30px"
            alt="min temperature icon"
          />
          <span className="spanWeather"></span>
          <p> Min: {tempMin}°C</p>
        </div>

        <p className="feel">Feels like {feel}°C</p>
      </div>
    </div>
  );
}

export default Weather;
