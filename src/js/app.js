//============================================
// Texts
//============================================

const title = document.getElementById("title");
const board = document.getElementById("board");
const eventArea = document.getElementById("event-area");
const scoreArea = document.getElementById("score-area");
const player1Name = document.getElementById("player1name");
const player2Name = document.getElementById("player2name");
const player1Score = document.getElementById("player1score");
const player2Score = document.getElementById("player2score");
const player1GuessList = document.getElementById("gUL1");
const player2GuessList = document.getElementById("gUL2");
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
const player1Piece = document.createElement("player1Piece");
const player2Piece = document.createElement("player2Piece");

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
  startArea, m1, m2, m3, jailSpot, m4, m5, m6, eventSpot, m7, m8, m9, questionSpot, m10, m11, m12,
];


//=========================================
// Event Listeners
//=========================================

startGameBtn.addEventListener("click", startGame);

guessSubmitBtn.addEventListener("click", guessSubmit);

//=========================================
// Functions
//=========================================

function startGame() {
  render();
  startGameBtn.style.display = "none";
}

function guessSubmit() {
  if (playerTurn === player1Turn) {
    player1Guess = guessTextBox.value;
    let player1GuessBullet = document.createElement("li");
    player1GuessBullet.innerHTML = player1Guess;
    if (player2Guess === secretNum) {
      player2GuessBullet.style = "color: green";
    }
    player1GuessList.appendChild(player1GuessBullet);
    guessTextBox.value = "";
    changePlayerTurn();
    render();
  }
  if (playerTurn === player2Turn) {
    player2Guess = guessTextBox.value;
    let player2GuessBullet = document.createElement("li");
    player2GuessBullet.innerHTML = player2Guess;
    if (player2Guess === secretNum) {
      player2GuessBullet.style = "color: green";
    }
    player2GuessList.appendChild(player2GuessBullet);
    guessTextBox.value = "";
    changePlayerTurn();
    render();
  }
}

function render() {
  if (player1GuessAmount === 0 && player2GuessAmount === 0) {
    secretNum = Math.floor(Math.random() * 5) + 1;
    startArea.appendChild(player1Piece);
    startArea.appendChild(player2Piece);
    player1BoardLocation = 0;
    player2BoardLocation = 0;
    player1Win = false;
    player2Win = false;
    playerTurn = player1Turn;
    displayTurn();
  }
  displayTurn();
  events();
  newSecretNum();
  updatePlayerLocation();
  updateInfoArea();
  guessError();
  checkWin();
}

function updatePlayerLocation() {
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
  if (playerTurn == 1) {
    playerTurn = 0;
    guessTurn1 += 1;
  } else if (playerTurn == 0) {
    playerTurn = 1;
    guessTurn2 += 1;
  }
}

function displayTurn() {
  if (playerTurn === player1Turn) {
    player1Name.textContent = "Player 1 Turn:";
    player1Name.style = "color: red;";
    player1Name.className = "player1name"
    player2Name.textContent = "Player 2:";

  }
  if (playerTurn === player2Turn) {
    player2Name.textContent = "Player 2 Turn:";
    player2Name.style = "color: red;";
    player2Name.className = "player2name"
    player1Name.textContent = "Player 1:";

  }
}

function updateInfoArea() {
  if (player1Guess !== secretNum) {
    infoArea.textContent = "Player 1 have guessed the wrong number! Try again!";
  }
  if (player2Guess !== secretNum) {
    infoArea.textContent = "Player 2 have guessed the wrong number! Try again!";
  }
  if (player1Guess === secretNum) {
    infoArea.textContent = "Player 1 has guessed the right number and moves on to the next spot!";
  }
  if (player2Guess === secretNum) {
    infoArea.textContent = "Player 2 has guessed the right number and moves on to the next spot!";
  }
}

function newSecretNum() {
  if (player1GuessAmount === 5) {
    secretNum = 0;
    secretNum = Math.floor(Math.random() * 5) + 1;
  }
  if (player2GuessAmount === 5) {
    secretNum = 0;
    secretNum = Math.floor(Math.random() * 5) + 1;
  }
  if (player1Guess === secretNum) {
    player1Score += 1;
    player1GuessAmount += 1;
    player1BoardLocation += 1;
    secretNum = 0;
    secretNum = Math.floor(Math.random() * 5) + 1;
  }
  if (player2Guess === secretNum) {
    player2Score += 1;
    player2GuessAmount += 1;
    player2BoardLocation += 1;
    secretNum = 0;
    secretNum = Math.floor(Math.random() * 5) + 1;
  }
}

function events() {
  if (player1BoardLocation === 5 || player2BoardLocation === 5) {
    questionEvent();
  }
  if (player1BoardLocation === 13 || player2BoardLocation === 13) {
    questionEvent();
  }
}

function guessError() {
  if (guessInput.value > 5)
    alert("Please enter a number between 1 and 5! Turn Skipped.");
  guessInput.value = "";
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
  const randomQuestion = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
  const question = randomQuestion.question;
  const answers = randomQuestion.answers;
  const correctAnswer = randomQuestion.correctAnswer;
  questionArea.innerHTML = question;
  questionInput.style.display = "block";
  questionButton.style.display = "block";
  questionInput.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (playerTurn === player1Turn) {
      if (questionInput.value == correctAnswer) {
        infoArea.textContent = "Correct!";
        infoArea.className = "correct";
        player1BoardLocation += 1;
        render();
        questionInput.style.display = "none";
        questionInput.value = "";
        questionInput.style.display = "none";
        questionArea.innerHTML = "";
        infoArea.textContent = "";
        infoArea.className = "";
      } else {
        infoArea.textContent = "Wrong!";
        infoArea.className = "wrong";
        player1BoardLocation -= 1;
        render();
        questionInput.style.display = "none";
        questionInput.value = "";
        questionInput.style.display = "none";
        questionArea.innerHTML = "";
        infoArea.textContent = "";
        infoArea.className = "";
      }
    }
    if (playerTurn === player2Turn) {
      if (questionInput.value == correctAnswer) {
        infoArea.textContent = "Correct!";
        infoArea.className = "correct";
        player2BoardLocation += 1;
        render();
        questionInput.style.display = "none";
        questionInput.value = "";
        questionInput.style.display = "none";
        questionArea.innerHTML = "";
        infoArea.textContent = "";
        infoArea.className = "";
      } else {
        infoArea.textContent = "Wrong!";
        infoArea.className = "wrong";
        player2BoardLocation -= 1;
        render();
        questionInput.style.display = "none";
        questionInput.value = "";
        questionInput.style.display = "none";
        questionArea.innerHTML = "";
        infoArea.textContent = "";
        infoArea.className = "";
      }
    }
  });
}
// //=======

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