//DOM elements
const input = document.querySelector("#input");
const addButton = document.querySelector("#addButton");
const ul = document.querySelector("ul");
//Input buttons
const inp2 = document.querySelector("#column2");
const inp3 = document.querySelector("#column3");
const inp4 = document.querySelector("#column4");
const inp5 = document.querySelector("#column5");
const inp6 = document.querySelector("#column6");
//Counter
const counterUl = document.querySelector("#counterUl");
const addCounterBtn = document.querySelector("#addCounter");
//retrieve button
const retrieve = document.querySelector(".retrieve");
//Making image enlarge
const banner2 = document.querySelector("#banner2");
const banner3 = document.querySelector("#banner3");

//Todo backend
let createTodo = (msg) => {
  console.log("todo fnc", msg);
  fetch(`http://localhost:5000/createTodo`, {
    method: "post",
    body: JSON.stringify({ todo: msg }),
    headers: { "Content-Type": "application/json" },
    //Validation: ContentType
  })
    .then((res) => res.json()) //res.json() is an async function
    .then((data) => console.log(data, "here's the data, buddy boy")) //In the browser
    .catch((error) => console.log(error, "my error")); //uncaught promise rejection. The promise throws and error and I need to catch otherwise it will be thrown into the ether
};

//Retreive
// let retieveAll = () => {
//   fetch("http://localhost:5000/", {
//     method: "get",
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data, "here's the data"));
// };

async function retrieveAll() {
  let res = await fetch("http://localhost:5000/");
  let data = await res.json();
  console.log(data.payload);
}

function retieval() {
  console.log("Retrieval function");
  retrieveAll();
}
retrieve.addEventListener("click", retieval);

//add todo list
// [object%20Object] : explain
function add(e) {
  e.preventDefault(); //An event the browser is expecting. Expecting with addevent - event will be passed up until it stops either by my code or browser. This stops the event and overrides the default browser behavious
  if (input.value === "") {
    alert("You must add a todo");
    return;
  }
  console.log("inside add");
  createTodo(input.value);
  //add li
  let newLi = document.createElement("li");
  newLi.innerText = input.value;
  if (inp2.checked) {
    newLi.classList.add("yellowgreen");
  } else if (inp3.checked) {
    newLi.classList.add("red");
  } else if (inp4.checked) {
    newLi.classList.add("pink");
  } else if (inp5.checked) {
    newLi.classList.add("burlywood");
  } else if (inp6.checked) {
    newLi.classList.add("white");
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
  function removeList() {
    newLi.classList.add("hide");
  }

  span.addEventListener("click", removeList);
}

addButton.addEventListener("click", add);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    add();
  }
});

//Mark as completed
function throughText(newLi) {
  newLi.target.classList.toggle("through");
}

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
async function getWeather(latitude, longitude) {
  let api = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );
  console.log(api);
  let data = await api.json();
  let results = data.main;
  // console.log(results)
  let currentSituation = data.weather[0].description;
  let { temp, feels_like, temp_min, temp_max, pressure } = results;
  let city = data.name;

  temp = Math.floor(results.temp - 273.15);
  feels_like = Math.floor(results.feels_like - 273.15);
  temp_min = Math.floor(results.temp_min - 273.15);
  temp_max = Math.floor(results.temp_max - 273.15);

  const currentTemp = document.querySelector("#currentTemp");
  const situation = document.querySelector("#situation");
  const maxTemp = document.querySelector("#maxTemp");
  const minTemp = document.querySelector("#minTemp");
  const feel = document.querySelector("#feel");
  const cityName = document.querySelector("#cityName");

  cityName.innerText = city;
  currentTemp.innerText = temp + "°C";
  situation.innerText = currentSituation;
  maxTemp.innerText = "Maximum: " + temp_max + "°C";
  minTemp.innerText = "Minimum: " + temp_min + "°C";
  feel.innerText = "Feels like: " + feels_like + "°C";

  //Thunder: https://www.flaticon.com/svg/static/icons/svg/3026/3026385.svg
  //Snow: https://www.flaticon.com/svg/static/icons/svg/2942/2942909.svg
  //Windy: https://www.flaticon.com/svg/static/icons/svg/3380/3380848.svg
}

getWeather(52.4862, -1.8904);
setInterval(getWeather(52.4862, -1.8904), 30000);

//-----------------Time and Date------------------//
function dateTime() {
  let currentdate = new Date();

  //adding zero to hours, minutes and seconds
  let hr = currentdate.getHours();
  if (hr < 10) {
    hr = "0" + hr;
  }

  let min = currentdate.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }

  let sec = currentdate.getSeconds();
  if (sec < 10) {
    sec = "0" + sec;
  }

  let dateValue =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();
  let timeValue = hr + ":" + min + ":" + sec;

  const time = document.querySelector("#time");
  const date = document.querySelector("#date");

  time.innerText = timeValue;
  date.innerText = dateValue;
}

setInterval(dateTime, 1000);
//-----------------End - Time and Date - END------------------//

//-----------------NASA Image of the Day API------------------//
async function dailyImage() {
  let result = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=5hGXtiNISMXZjSMf7hvUqv1v67bFuqlJKoYVn6PX`
  );
  let data = await result.json();
  console.log(data);
  const { hdurl, explanation, copyright, title } = data;
  console.log(copyright, title);

  const banner = document.querySelector("#banner");
  const banner2 = document.querySelector("#banner2");
  const imgTitle = document.querySelector("#title");
  const imgExplanation = document.querySelector("#explanation");
  const imgCopyright = document.querySelector("#copyright");

  banner.src = hdurl;
  banner2.src = hdurl;
  banner3.src = hdurl;
  imgTitle.innerHTML = `<strong><span>Title:</span> ${title}</strong>`;
  imgCopyright.innerText = "Copyright: " + copyright;
  // imgExplanation.innerText = explanation;
}

dailyImage();

//Make an icon on the banner. When the icon is clicked, the description of the image appears

//-----------Create a Counter------------//
function addCounter() {
  if (input.value === "") {
    return alert("Please add text");
  }

  let counterValue = 0;

  //Creating main span
  let containerSpan = document.createElement("span");

  counterUl.appendChild(containerSpan);

  const inputValue = input.value;

  //Creating minus button in span and decrementing value
  let span1 = document.createElement("span");
  span1.innerText = "-";
  span1.classList.add("decrement");
  span1.addEventListener("click", function () {
    counterValue--;
    newCounter.innerHTML = inputValue + `<br>` + counterValue;

    //add x button when decrement is called
    let span = document.createElement("span");
    span.innerText = "\u00D7";
    span.classList.add("xButton");
    newCounter.appendChild(span);

    span.addEventListener("click", throughText);

    //Delete list when xButton is clicked
    function removeList() {
      containerSpan.classList.add("hide");
    }

    span.addEventListener("click", removeList);
  });

  containerSpan.appendChild(span1);

  //Creating a list item with input.value
  let newCounter = document.createElement("li");

  newCounter.classList.add("listStyle");
  newCounter.classList.add("liCounter");

  newCounter.innerHTML = inputValue + `<br>` + counterValue;

  //Change background colour
  if (inp2.checked) {
    newCounter.classList.add("yellowgreen");
  } else if (inp3.checked) {
    newCounter.classList.add("red");
  } else if (inp4.checked) {
    newCounter.classList.add("pink");
  } else if (inp5.checked) {
    newCounter.classList.add("burlywood");
  } else if (inp6.checked) {
    newCounter.classList.add("white");
  } else {
    newCounter.classList.add("listStyle");
  }

  containerSpan.appendChild(newCounter);

  //Creating the plus icon in span and incrementing value
  let span2 = document.createElement("span");
  span2.innerText = "+";
  span2.classList.add("increment");
  span2.addEventListener("click", function () {
    counterValue++;
    newCounter.innerHTML = inputValue + `<br>` + counterValue;

    //add x button when increment is called
    let span = document.createElement("span");
    span.innerText = "\u00D7";
    span.classList.add("xButton");
    newCounter.appendChild(span);

    span.addEventListener("click", throughText);

    //Delete list when xButton is clicked
    function removeList() {
      containerSpan.classList.add("hide");
    }

    span.addEventListener("click", removeList);
  });

  containerSpan.appendChild(span2);

  //add x button
  let span = document.createElement("span");
  span.innerText = "\u00D7";
  span.classList.add("xButton");
  newCounter.appendChild(span);

  span.addEventListener("click", throughText);

  //Delete list when xButton is clicked
  function removeList() {
    containerSpan.classList.add("hide");
  }

  span.addEventListener("click", removeList);

  input.value = "";
}

addCounterBtn.addEventListener("click", addCounter);

// Make movable items
const ulTodos = document.querySelector("#ul");
new Sortable(ulTodos, {
  handle: ".listStyle",
  animation: 200,
});

new Sortable(counterUl, {
  handle: "span",
  animation: 200,
});

//Make image enlarge
// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function () {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
