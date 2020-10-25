//DOM elements
const input = document.querySelector("#input");
const addButton = document.querySelector("#addButton");
const ul = document.querySelector("ul");
//Input buttons
const inp2 = document.querySelector("#column2");
const inp3 = document.querySelector("#column3");
const inp4 = document.querySelector("#column4");
const inp5 = document.querySelector("#column5");


//add todo list
function add() {
  if (input.value === ""){
    alert("You must add a todo")
    return;
  }

  //add li
  let newLi = document.createElement("li");
  newLi.innerText = input.value;
  if (inp2.checked){
    newLi.classList.add("yellowgreen");
  } else if (inp3.checked){
    newLi.classList.add("red")
  } else if (inp4.checked){
    newLi.classList.add("pink")
  } else if (inp5.checked){
    newLi.classList.add("burlywood")
  } else {
    newLi.classList.add("listStyle");
  }
  
  ul.appendChild(newLi);

  //add x button
  let span = document.createElement("span");
  span.innerText = "\u00D7";
  span.classList.add("xButton");
  newLi.appendChild(span);

  input.value = "";

  newLi.addEventListener("click", throughText);

  //Delete list when xButton is clicked
    function removeList(){
    newLi.classList.add("hide");
  };

  span.addEventListener("click", removeList);
};

addButton.addEventListener("click", add);
input.addEventListener("keypress", function(e){
  if (e.key === 'Enter'){
    add()
  }
})

//Mark as completed
function throughText(newLi) {
  newLi.target.classList.toggle("through");
};

// Weather API
// const axios = require('axios').default;
// const params = {
//   access_key: '11493fd1d1949604507bed259f91ba61',
//   query: 'New York'
// }

// axios.get('https://api.weatherstack.com/current', {params})
//   .then(response => {
//     const apiResponse = response.data;
//     console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
//   }).catch(error => {
//     console.log(error);
//   });

// async function weather(){
//   let response = await fetch("http://api.weatherstack.com/");
//   console.log(response)
// }

// weather();

const apiKey = "caf81d1304dba9d89805ecde571c22c4";

// GET WEATHER FROM API PROVIDER
async function getWeather(latitude, longitude){
  let api = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
  console.log(api)
  let data = await api.json();
  let results = data.main
  // console.log(results)
  let currentSituation = data.weather[0].description;
  let {
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
  } = results;
  
  temp = Math.floor(results.temp-273.15);
  feels_like = Math.floor(results.feels_like-273.15);
  temp_min = Math.floor(results.temp_min-273.15);
  temp_max = Math.floor(results.temp_max-273.15);

  const currentTemp = document.querySelector("#currentTemp");
  const situation = document.querySelector("#situation");
  const maxTemp = document.querySelector("#maxTemp");
  const minTemp = document.querySelector("#minTemp");
  const feel = document.querySelector("#feel");

  currentTemp.innerText = temp + "°C";
  situation.innerText = currentSituation;
  maxTemp.innerText = "Maximum: " + temp_max + "°C";
  minTemp.innerText = "Minimum: " + temp_min + "°C";
  feel.innerText = "Feels like: " + feels_like + "°C";
}

getWeather(52.4862, -1.8904)


//-----------------Time and Date------------------//
function dateTime(){
  let currentdate = new Date(); 

  //adding zero to hours, minutes and seconds
  let hr = currentdate.getHours()
  if (hr < 10){
    hr = "0" + hr
  }

  let min = currentdate.getMinutes()
  if (min < 10){
    min = "0" + min
  }

  let sec = currentdate.getSeconds()
  if (sec < 10){
    sec = "0" + sec
  }

  let dateValue = currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear();
  let timeValue = hr + ":"  
                  + min + ":" 
                  + sec;

  const time = document.querySelector("#time");
  const date = document.querySelector("#date");

  time.innerText = timeValue
  date.innerText = dateValue
}

setInterval(dateTime, 1000)
//-----------------End - Time and Date - END------------------//
