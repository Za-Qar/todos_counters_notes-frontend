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
const parent = document.querySelector(".parent");
const closeImage = document.querySelector(".closeImage");

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

//Counter backend
let createCounter = (msg, count) => {
  console.log("counter Input recieved", msg);
  fetch(`http://localhost:5000/createCounter`, {
    method: "POST",
    body: JSON.stringify({ counter: msg, zero: count }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => console.log(data, "here's the counter data buddy boy"))
    .catch((error) => console.log(error, "counter error"));
};

//Increment Counter backend
let incrementCounter = (id) => {
  console.log(id);
  fetch(`http://localhost:5000/${id}`, {
    method: "PATCH",
  })
    .then((res) => res.json())
    .then((data) => console.log(data, "this is the id buddy boy"))
    .catch((error) => console.log(error, "incrementCounter error"));
};

//Decrmenet Counter backend
let decrementCounter = (id) => {
  console.log("decremented counter", id);
  fetch(`http://localhost:5000/decremet/${id}`, {
    method: "PATCH",
  })
    .then((res) => res.json())
    .then((data) => console.log(data, "this is the decrement id buddy boy"))
    .catch((error) => console.log(error, "this is the decerment error"));
};

//Get counter id
async function counterId() {
  let res = await fetch("http://localhost:5000/maxId");
  // console.log("res id", res);
  let data = await res.json();
  // console.log("res id json", data);
  // console.log(data.payload.payload);
  let id = data.payload.payload;
  // newCounterId = id;
  console.log("lastest countner id", id);
  return id;
}

//Get todo id
async function todoMaxId() {
  let res = await fetch("http://localhost:5000/todo/maxId");
  let data = await res.json();
  let id = data.payload[0].id;
  console.log(id);
  return id;
}

//Delete todo
let deleteTodo = (id) => {
  fetch(`http://localhost:5000/${id}`, {
    method: "delete",
  })
    .then((res) => res.json())
    .then((data) => console.log(data, "Todo has been delete buddy boy"))
    .catch((error) => console.log(error, "this is the delete todo error"));
};

//Retrieve All
async function retrieveAll() {
  let res = await fetch("http://localhost:5000/");
  let data = await res.json();
  return data.payload;
}

// function retieval() {
//   console.log("Retrieval function");
//   todoMaxId();
// }
// retrieve.addEventListener("click", retieval);

//add todo list
// [object%20Object] : explain
async function add(e) {
  e.preventDefault(); //An event the browser is expecting. Expecting with addevent - event will be passed up until it stops either by my code or browser. This stops the event and overrides the default browser behavious
  if (input.value === "") {
    alert("You must add a todo");
    return;
  }

  //Get todo id
  let todoId = await todoMaxId();
  console.log(todoId);

  console.log("inside add");
  createTodo(input.value);
  //add li
  let newLi = document.createElement("li");
  newLi.innerText = input.value;
  if (inp2.checked) {
    newLi.classList.add("yellowgreen");
    newLi.classList.add("listStyle");
  } else if (inp3.checked) {
    newLi.classList.add("red");
    newLi.classList.add("listStyle");
  } else if (inp4.checked) {
    newLi.classList.add("pink");
    newLi.classList.add("listStyle");
  } else if (inp5.checked) {
    newLi.classList.add("burlywood");
    newLi.classList.add("listStyle");
  } else if (inp6.checked) {
    newLi.classList.add("white");
    newLi.classList.add("listStyle");
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

  // span.addEventListener("click", removeList);
  span.addEventListener("click", function () {
    let confRes = confirm("are you sure you want to delete?");
    if (confRes === true) {
      console.log(todoId + 1);
      deleteTodo(todoId + 1);
      removeList();
    }
  });

  console.log(todoId + 1);
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

  //changing icon
  const weatherImage = document.querySelector("#weatherImage");

  // /b /b => regex
  if (currentSituation === "fog") {
    weatherImage.src =
      "https://www.flaticon.com/svg/static/icons/svg/2076/2076792.svg";
  } else if (currentSituation === "clear sky") {
    weatherImage.src =
      "https://www.flaticon.com/svg/static/icons/svg/2698/2698194.svg";
  } else if (currentSituation === "few clouds") {
    weatherImage.src =
      "https://www.flaticon.com/svg/static/icons/svg/1146/1146869.svg";
  } else if (currentSituation === "scattered clouds") {
    weatherImage.src =
      "https://www.flaticon.com/svg/static/icons/svg/2151/2151266.svg";
  } else if (currentSituation === "broken clouds") {
    weatherImage.src =
      "https://www.flaticon.com/svg/static/icons/svg/616/616682.svg";
  } else if (currentSituation === "shower rain") {
    weatherImage.src =
      "https://www.flaticon.com/premium-icon/icons/svg/1959/1959338.svg";
  } else if (currentSituation === "rain") {
    weatherImage.src =
      "https://www.flaticon.com/svg/static/icons/svg/2948/2948217.svg";
  } else if (currentSituation === "thunderstorm") {
    weatherImage.src =
      "https://www.flaticon.com/svg/static/icons/svg/1779/1779963.svg";
  } else if (currentSituation === "snow") {
    weatherImage.src =
      "https://www.flaticon.com/svg/static/icons/svg/2942/2942909.svg";
  } else if (currentSituation === "mist") {
    weatherImage.src =
      "https://www.flaticon.com/svg/static/icons/svg/990/990469.svg";
  } else {
    weatherImage.src =
      "https://www.flaticon.com/svg/static/icons/svg/616/616450.svg";
  }
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
async function addCounter() {
  if (input.value === "") {
    return alert("Please add text");
  }
  let jamesIdIdea = await counterId();
  console.log(jamesIdIdea);

  let counterValue = 0;

  createCounter(input.value, counterValue);

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
    decrementCounter(jamesIdIdea + 1);
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
    incrementCounter(jamesIdIdea + 1);
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
let sort1 = new Sortable(ulTodos, {
  handle: ".listStyle",
  animation: 200,
});

// let sort2 = new Sortable(counterUl, {
//   handle: "span",
//   animation: 200,
// });

//Make image enlarge
banner2.addEventListener("click", function () {
  parent.classList.toggle("hidden");
});

closeImage.addEventListener("click", function () {
  parent.classList.toggle("hidden");
});

//Display all retrieved items
async function displayAll() {
  let ret = await retrieveAll();
  console.log(ret);

  ret.map((e) => {
    console.log(e.todo);

    //add li
    let newLi = document.createElement("li");
    newLi.innerText = e.todo;

    ul.appendChild(newLi);

    //add x button
    let span = document.createElement("span");
    span.innerText = "\u00D7";
    span.classList.add("xButton");
    newLi.appendChild(span);

    newLi.addEventListener("click", throughText);

    //Delete list when xButton is clicked
    function removeList() {
      newLi.classList.add("hide");
    }

    span.addEventListener("click", removeList);

    //Mark as completed
    function throughText(newLi) {
      newLi.target.classList.toggle("through");
    }
  });
}

displayAll();
