// DOM Elements
const categoryElement = document.querySelector(".category");
const currentQuestion = document.querySelector(".currentQuestion");
const difficultyElement = document.querySelector(".difficulty");
const ul = document.querySelector("ul");
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
const mainElement = document.querySelector("#main");
const startGame = document.querySelector("#start");
const endScore = document.querySelector("#yourScore");

let scoreElement = 0;
let round = 1;

function toggle() {
  startGame.classList.toggle("hide");
  mainElement.classList.toggle("hide");
  trivia();
}


startGame.addEventListener("click", toggle);

// Fetch
async function trivia() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=1&type=multiple"
  );
  const data = await response.json();
  const results = data.results[0];
  const {
    category,
    correct_answer,
    incorrect_answers,
    difficulty,
    question,
  } = results;

  console.log(category);
  console.log(correct_answer);
  console.log(incorrect_answers[0]);
  console.log(difficulty);
  console.log(question);

  triviaText(category, correct_answer, incorrect_answers, difficulty, question);
  for (let i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[Math.random() * i | 0]);
  }
}

// Embed DOM Functions
function triviaText(
  category,
  correct_answer,
  incorrect_answers,
  difficulty,
  question
) {
  categoryElement.innerText = `Category: ${category}`;
  currentQuestion.innerHTML = question;
  btn1.innerHTML = correct_answer;
  btn2.innerHTML = incorrect_answers[0];
  btn3.innerHTML = incorrect_answers[1];
  btn4.innerHTML = incorrect_answers[2];
  difficultyElement.innerText = `Difficulty: ${difficulty}`;
}

// Score
function incrementScore() {
  scoreElement = scoreElement + 10;
  document.querySelector(".score").innerHTML = `Score: ${scoreElement}`;
  setTimeout(trivia, 1000);
  correctAnswer();
  setTimeout(btnWhite1, 1000);
  endGame();
  incrementRound();
}

function decrementScore() {
  scoreElement = scoreElement - 5;
  document.querySelector(".score").innerHTML = `Score: ${scoreElement}`;
  setTimeout(trivia, 1000);
  correctAnswer();
  setTimeout(btnWhite1, 1000);
  endGame();
  incrementRound();
}

function incrementRound() {
  round++;
  document.querySelector(".round").innerHTML = `Round: ${round}/5`;
}

function correctAnswer() {
  btn1.style.backgroundColor = "green";
}

function btnWhite1() {
  btn1.style.backgroundColor = "white";
}

function incorrectAnswer() {
  btn2.style.backgroundColor = "red";
}

function btnWhite2() {
  btn2.style.backgroundColor = "white";
}



  
btn1.addEventListener("click", incrementScore);
btn2.addEventListener("click", decrementScore);
btn3.addEventListener("click", decrementScore);
btn4.addEventListener("click", decrementScore);
/*
- add eventlister to buttons
- the function of the event listers will be:
    - if current answer increment score 
    - if asnwer is incorrect, decrement score
    - if answer is corrent, button turns green
    - if answer is incorrect, button turns red
- Return after 5 rounds and display score
- When game starts, input username
- Store score in username variable and display after 5 rounds
- When 5 rounds are over, allow user to input a new username
- Show all user scores at the end
- 
*/

// End of game
// Store score variable
// Reset score and round variables

function endGame() {
  if (round === 5) {
    mainElement.classList.toggle("hide");
    let yourScore = document.createElement("h3");
    yourScore.innerText = `Your score is ${scoreElement}`;
    endScore.appendChild(yourScore);
  }
}
