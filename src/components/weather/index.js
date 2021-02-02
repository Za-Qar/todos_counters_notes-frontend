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
      if (currentSituation === "fog") {
        setWethImage(
          "https://www.flaticon.com/svg/static/icons/svg/2076/2076792.svg"
        );
      } else if (currentSituation === "clear sky") {
        setWethImage(
          "https://www.flaticon.com/svg/static/icons/svg/2698/2698194.svg"
        );
      } else if (currentSituation === "few clouds") {
        setWethImage(
          "https://www.flaticon.com/svg/static/icons/svg/1146/1146869.svg"
        );
      } else if (currentSituation === "scattered clouds") {
        setWethImage(
          "https://www.flaticon.com/svg/static/icons/svg/2151/2151266.svg"
        );
      } else if (currentSituation === "broken clouds") {
        setWethImage(
          "https://www.flaticon.com/svg/static/icons/svg/616/616682.svg"
        );
      } else if (currentSituation === "shower rain") {
        setWethImage(
          "https://www.flaticon.com/premium-icon/icons/svg/1959/1959338.svg"
        );
      } else if (currentSituation === "rain") {
        setWethImage(
          "https://www.flaticon.com/svg/static/icons/svg/616/616450.svg"
        );
      } else if (currentSituation === "thunderstorm") {
        setWethImage(
          "https://www.flaticon.com/svg/static/icons/svg/1779/1779963.svg"
        );
      } else if (currentSituation === "snow") {
        setWethImage(
          "https://www.flaticon.com/svg/static/icons/svg/2942/2942909.svg"
        );
      } else if (currentSituation === "mist") {
        setWethImage(
          "https://www.flaticon.com/svg/static/icons/svg/990/990469.svg"
        );
      } else if (
        currentSituation === "moderate rain" ||
        currentSituation === "light rain"
      ) {
        setWethImage(
          "https://www.flaticon.com/svg/static/icons/svg/2948/2948217.svg"
        );
      } else {
        setWethImage(
          "https://www.flaticon.com/svg/static/icons/svg/616/616450.svg"
        );
      }
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude);
    });

    getWeather(userLat, userLong);
    setInterval(getWeather(userLat, userLong), 30000);
  }, []);

  return (
    <div className="container">
      <div className="sideBox weatherSec">
        <p className="city">{city}</p>
        <p className="temp">{temp}°C</p>

        <img alt="current weather" className="curWeathImage" src={wethImage} />
        <p className="curr">{curr}</p>

        <div className="temp">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/2041/2041670.svg"
            width="30px"
            alt="max temperature icon"
          />
          <span className="spanWeather"></span>
          <p> Max: {tempMax}°C</p>
        </div>

        <div className="temp">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/3593/3593622.svg"
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
