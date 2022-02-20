//============================================
// Texts
//============================================

const title = document.getElementById("title");
const board = document.getElementById("board");
const eventArea = document.getElementById("event-area");
const scoreArea = document.getElementById("score-area");
const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");
let player1Score = document.getElementById("player1score");
let player2Score = document.getElementById("player2score");
let player1GuessList = document.getElementById("gUL1");
let player2GuessList = document.getElementById("gUL2");
const eventCard = document.getElementById("event-card");
const card = document.getElementById("card");
const infoArea = document.getElementById("info-area");

//=========================================
// Move Spots
//=========================================

const startArea = document.getElementById("start-spot");
const m1 = document.getElementById("m1");
const m2 = document.getElementById("m2");
const m3 = document.getElementById("m3");
const jailSpot = document.getElementById("jail");
const m4 = document.getElementById("m4");
const m5 = document.getElementById("m5");
const m6 = document.getElementById("m6");
const eventSpot = document.getElementById("event");
const m7 = document.getElementById("m7");
const m8 = document.getElementById("m8");
const m9 = document.getElementById("m9");
const questionSpot = document.getElementById("question");
const m10 = document.getElementById("m10");
const m11 = document.getElementById("m11");
const m12 = document.getElementById("m12");

//=========================================
// Buttons
//=========================================

const startGameBtn = document.getElementById("startGameBtn");
const guessSubmitBtn = document.getElementById("guessSubmit");
const resetBtn = document.getElementById("resetBtn");
const questionButton = document.getElementById("questionButton");

//=========================================
// Pieces
//=========================================
let player1Piece = document.createElement("img");
let player2Piece = document.createElement("img");

player1Piece.src = "/src/images/piece1.png";
player1Piece.className = "piece1";
player2Piece.src = "/src/images/piece2.png";
player2Piece.className = "piece2";

//=========================================
// Inputs
//=========================================

const guessTextBox = document.getElementById("guessInput");
const questionTextBox = document.getElementById("questionInput");
const winScreen = document.getElementById("winScreen");

//=========================================
// Variables
//=========================================

let player1GuessAmount = 0; // The amount of times player 1 has guessed
let player1BoardLocation = 0;
let player1Win = false;

let player2GuessAmount = 0; // The amount of times player 2 has guessed
let player2BoardLocation = 0;
let player2Win = false;

let player1Guess, player2Guess, secretNum, playerTurn;

//=========================================
// Constants
//=========================================

const player1Turn = 1;
const player2Turn = 0;

const locationArray = [
  startArea,
  m1,
  m2,
  m3,
  jailSpot, // 4 
  m4,
  m5,
  m6,
  eventSpot, // 8
  m7,
  m8,
  m9,
  questionSpot, //12
  m10,
  m11,
  m12,
];

//=========================================
// Event Listeners
//=========================================

startGameBtn.addEventListener("click", startGame);

guessSubmitBtn.addEventListener("click", guessSubmit);

//=========================================
// Functions
//=========================================

// When someone hits the start button, check who turn it is and change the info area. Update the image to the start area.

function startGame() {
  secretNum = Math.floor(Math.random() * 5) + 1;
  console.log("SN " + secretNum);
  startArea.appendChild(player1Piece);
  console.log(player1Piece);
  startArea.appendChild(player2Piece);
  player1BoardLocation = 0;
  player2BoardLocation = 0;
  player1Win = false;
  player2Win = false;
  playerTurn = player1Turn;
  infoArea.textContent = "Player 1 will start the game.";
  player1Name.innerHTML = "Player 1's Turn";
  player1Name.style.color = "red";
  startGameBtn.style.display = "none";
}

function guessSubmit() {
  validateGuess();
  if (playerTurn === player1Turn) {
    player1Guess = parseInt(guessTextBox.value);
    guessTextBox.value = "";
    render();
  } else if (playerTurn === player2Turn) {
    player2Guess = parseInt(guessTextBox.value);
    guessTextBox.value = "";
    render();
  }
}

function render() {
  checkForEventLocation();
  checkPlayerGuess();
  updatePlayerPieceLocation();
  checkWin();
  changePlayerTurn();
  console.log("P1BL " + player1BoardLocation + " P2BL " + player2BoardLocation);
}

function updatePlayerPieceLocation() {

  locationArray.forEach((square, idx) => {
    if (player1BoardLocation === idx) {
      locationArray[idx].appendChild(player1Piece);
    }
    if (player2BoardLocation === idx) {
      locationArray[idx].appendChild(player2Piece);
    }
  });
}

function checkWin() {
  if (player1BoardLocation === 15) {
    player1Win = true;
  }
  if (player2BoardLocation === 15) {
    player2Win = true;
  }
}

function changePlayerTurn() {
  if (playerTurn === player1Turn) {
    playerTurn = 0;
  } else if (playerTurn === player2Turn) {
    playerTurn = 1;
  }
}



function newSecretNum() {
    player1GuessAmount = 0;
    player2GuessAmount = 0;
    secretNum = Math.floor(Math.random() * 5) + 1;
}
function checkPlayerGuess() {
  if (playerTurn === player1Turn) {
    console.log("Player 1's Turn")
    player1GuessAmount += 1;
    let player1GuessBullet = document.createElement("li");
    player1GuessBullet.innerHTML = player1Guess;
    player1GuessList.appendChild(player1GuessBullet);
    if (player1Guess === secretNum) {
      player1Score += 1;
      player1BoardLocation += 1;
      player1Score.innerHTML = player1Score;
      infoArea.textContent = "Player 1 has guessed the right number and moves on to the next spot!";
      player1GuessBullet.style = "color: green";
      newSecretNum();
    } else {
      infoArea.textContent = "Player 1 have guessed the wrong number!";
    }

  } else if (playerTurn === player2Turn) {
    console.log("Player 2's Turn")
    player2GuessAmount += 1;
    player2Name.innerHTML = "Player 2's Turn";
    player2Name.style = "Color: red";
    player2Name.className = "player2name";
    let player2GuessBullet = document.createElement("li");
    player2GuessBullet.innerHTML = player2Guess;
    player2GuessList.appendChild(player2GuessBullet);
    if (player2Guess === secretNum) {
      player2Score += 1;
      player2BoardLocation += 1;
      player2Score.innerHTML = player2Score;
      infoArea.textContent = "Player 2 has guessed the right number and moves on to the next spot!";
      player2GuessBullet.style = "color: green"
      newSecretNum();
    } else {
      infoArea.textContent = "Player 2 have guessed the wrong number!"
      player2Name.style = "color: black;";
      player2Name.innerHTML = "Player 2:";
      player1Name.innerHTML = "Player 1's Turn:";
      player1Name.style = "color: red;";
    }
  }
}



function checkForEventLocation() {
  if (player1BoardLocation === 4 || player2BoardLocation === 4) {
    questionEvent();
  } else if (player1BoardLocation === 12 || player2BoardLocation === 12) {
    questionEvent();
  } else if (player1BoardLocation === 8 || player2BoardLocation === 8) {
    questionEvent();
  } else if (player1BoardLocation === 1 || player2BoardLocation === 1) {
    questionEvent();
  }
}

function validateGuess() {
  if (guessTextBox.value > 5 || guessTextBox.value < 1 || !Number.isInteger(parseInt(guessTextBox.value))) {
    alert("Please enter a number between 1 and 5! Turn Skipped.");
  }
  console.log(guessTextBox.value);
}

// function play() {
//   console.log("SN", secretNum);
//   startGameBtn.style.display = "none";
//   resetBtn.style.display = "none";
// }

// function guessSubmit(elm) {
//   if (playerTurn == 1) {
//     displayTurn();
//     player1Guess = guessInput.value;
//     const newGuess1 = document.createElement("li");
//     newGuess1.innerHTML = player1Guess;
//     Player1GuessList.appendChild(newGuess1);
//     guessCheck();
//     checkWinner();
//     playerWin();
//     guessInput.value = "";
//     player1Name.innerHTML = "Player 1";
//     player2Name.innerHTML = "Player 2's Turn";
//     incPlayerTurn();
//   } else if (playerTurn == 0) {
//     displayTurn();
//     player2Guess = guessInput.value;
//     const newGuess2 = document.createElement("li");
//     newGuess2.innerHTML = player2Guess;
//     Player2GuessList.appendChild(newGuess2);
//     guessCheck();
//     checkWinner();
//     playerWin();
//     guessInput.value = "";
//     player2Name.innerHTML = "Player 2";
//     player1Name.innerHTML = "Player 1's Turn";
//     incPlayerTurn();
//     jailArea();
//   }
//   render();
// }

// function render() {
//   locationArray.forEach((square, idx) => {
//     if (player1BoardLocation === idx) {
//       locationArray[idx].appendChild(img1);
//     }
//     if (player2BoardLocation === idx) {
//       locationArray[idx].appendChild(player2Piece);
//     }
//   });
// }

// function playerScore() {
//   if (player1Win == true) {
//     Score1 += 1;
//     player1BoardLocation += 1;
//     jailArea();
//     questionArea();
//     infoArea.textContent = "Player 1 Wins and move one spot on the board!";
//     infoArea.className - "player1Win";
//     render();
//     player1Score.innerText = Score1;
//     player1Win = false;
//   } else if (player2Win == true) {
//     Score2 += 1;
//     player2BoardLocation += 1;
//     infoArea.textContent = "Player 2 Wins and move one spot on the board!";
//     infoArea.className - "player2Win";
//     render();
//     player2Score.innerText = Score2;
//     player2Win = false;
//   }
// }

// let playerWin = function () {
//   if (player1Guess == secretNum) {
//     player1Win = true;
//     guessTurns();
//     playerScore();
//   } else if (player2Guess == secretNum) player2Win = true;
//   guessTurns();
//   playerScore();
// };

// function displayTurn() {
//   if (playerTurn == 1) {
//     player1Name.innerHTML = "Player 1's Turn:";
//     player1Name.className = "player1name";
//   } else if (playerTurn == 0) {
//     player2Name.innerHTML = "Player 2's Turn:";
//     player1Name.className = "player2name";
//   }
// }

// function guessCheck() {
//   if (player1Guess !== secretNum) {
//     infoArea.textContent = "Player's 1 Guess is Wrong!";
//   } else if (player2Guess !== secretNum) {
//     infoArea.textContent = "Player's 2 Guess is Wrong!";
//   } else if (player1Guess == secretNum) {
//     infoArea.textContent = "Player's 1 Guess is Correct!";
//   } else if (player2Guess == secretNum) {
//     infoArea.textContent = "Player's 2 Guess is Correct!";
//   }
// }

// function checkWinner() {
//   if (Score1 === 15) {
//     youWin();
//   } else if (Score2 === 15) {
//     youWin();
//   }
// }

// function youWin() {
//   let allElements = document.querySelectorAll("body *");
//   allElements.forEach(function (element) {
//     if (element.getElementsByClassName !== "container-fluid") {
//       element.style.display = "none";
//       winScreen.style.display = "block";
//       confetti.start();
//       const win = document.createElement("h1");
//       win.innerHTML = "You Win!";
//       win.className = "win";
//       winScreen.appendChild(win);
//     }
//   });
// }

// function jailArea() {
//   if (player1BoardLocation == 5 || player2BoardLocation == 5) {
//     questionEvent();
//   }
// }

// function questionArea() {
//   if (player1BoardLocation == 13 || player2BoardLocation == 13) {
//     questionEvent();
//   }
// }

function questionEvent() {
  const randomQuestion =
    randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
  const question = randomQuestion.question;
  const answers = randomQuestion.answers;
  const correctAnswer = randomQuestion.correctAnswer;
  infoArea.textContent = question;
  questionTextBox.style.display = "block";
  questionButton.style.display = "block";
  questionTextBox.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (playerTurn === player1Turn) {
      if (questionTextBox.value == correctAnswer) {
        infoArea.textContent = "Correct!";
        infoArea.className = "correct";
        player1BoardLocation += 1;
        render();
        questionTextBox.style.display = "none";
        questionTextBox.value = "";
        questionTextBox.style.display = "none";
        questionArea.innerHTML = "";
        infoArea.textContent = "";
        infoArea.className = "";
      } else {
        infoArea.textContent = "Wrong!";
        infoArea.className = "wrong";
        player1BoardLocation -= 1;
        render();
        questionTextBox.style.display = "none";
        questionTextBox.value = "";
        questionTextBox.style.display = "none";
        questionArea.innerHTML = "";
        infoArea.textContent = "";
        infoArea.className = "";
      }
    }
    if (playerTurn === player2Turn) {
      if (questionTextBox.value == correctAnswer) {
        infoArea.textContent = "Correct!";
        infoArea.className = "correct";
        player2BoardLocation += 1;
        render();
        questionTextBox.style.display = "none";
        questionTextBox.value = "";
        questionTextBox.style.display = "none";
        questionArea.innerHTML = "";
        infoArea.textContent = "";
        infoArea.className = "";
      } else {
        infoArea.textContent = "Wrong!";
        infoArea.className = "wrong";
        player2BoardLocation -= 1;
        render();
        questionTextBox.style.display = "none";
        questionTextBox.value = "";
        questionTextBox.style.display = "none";
        questionArea.innerHTML = "";
        infoArea.textContent = "";
        infoArea.className = "";
      }
    }
  });
}


const randomQuestions = [{
    question: "What is JavaScript?",
    answers: {
      a: `JavaScript is a scripting language used to make the website interactive.`,
      b: `JavaScript is an assembly language used to make the website interactive`,
      c: `JavaScript is a compiled language used to make the website interactive`,
      d: `None of the mentioned`,
    },
    correctAnswer: "a",
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answers: {
      a: `<script src="xxx.js">`,
      b: `<script href="xxx.js">`,
      c: `<script name="xxx.js">`,
      d: `<script file="xxx.js">`,
    },
    correctAnswer: "c",
  },
  {
    question: "What is the correct syntax for adding a comment in JavaScript?",
    answers: {
      a: `<!--This is a comment-->`,
      b: `//This is a comment`,
      c: `<!--This is a comment-->`,
      d: `//This is a comment`,
    },
    correctAnswer: "b",
  },
  {
    question: "Which of the following is not a reserved word in JavaScript?",
    answers: {
      a: `interface`,
      b: `throws`,
      c: `program`,
      d: `int`,
    },
    correctAnswer: "d",
  },
  {
    question: "Which of the following is not a valid JavaScript variable name?",
    answers: {
      a: `2names`,
      b: `first_and_last,`,
      c: `variable_1`,
      d: `variable`,
    },
    correctAnswer: "a",
  },
];

// function confettiStart() {
//   setTimeout(function () {
//     confetti.start(true, 5000);
//   }, 3000);
// }

// function confettiStop() {
//   setTimeout(function () {
//     confetti.stop();
//   }, 3000);
// }