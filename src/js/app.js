//============================================
// Texts
//============================================

const title = document.getElementById("title");
const board = document.getElementById("board");
const eventArea = document.getElementById("event-area");
const scoreArea = document.getElementById("score-area");
const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");
let player1ScoreBoard = document.getElementById("player1score");
let player2ScoreBoard = document.getElementById("player2score");
let player1GuessList = document.getElementById("gUL1");
let player2GuessList = document.getElementById("gUL2");
let textInfo = document.getElementById("info-text");
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
const falseBtn = document.getElementById("false-button");
const trueBtn = document.getElementById("true-button")

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

let player1Guess, player2Guess, secretNum, playerTurn, correctAnswer;

let activeEvent = false;

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
  startArea.appendChild(player2Piece);
  player1BoardLocation = 0;
  player2BoardLocation = 0;
  player1Win = false;
  player2Win = false;
  playerTurn = player1Turn;
  textInfo.innerHTML = "Player 1 will start the game.";
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
  console.log('check player guess')
  checkPlayerGuess();
  console.log('update player piece location')
  updatePlayerPieceLocation();
  console.log('check for event location')
  checkForEventLocation();
  console.log('update player piece location')
  updatePlayerPieceLocation();
  console.log('check for win')
  checkWin();
  console.log('new secret num')
  newSecretNum();
  console.log('change player turn')
  changePlayerTurn();
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
    player1Name.innerHTML = "Player 1 Wins!";
    confettiStart();
    setTimeout(function () {
      confettiStop();
    }, 5000);
  }
  if (player2BoardLocation === 15) {
    player2Win = true;
    player2Name.innerHtml = "Player 2 Wins!";
    confettiStart();
    setTimeout(function () {
      confettiStop();
    }, 5000);
  }
}

function changePlayerTurn() {
  if (playerTurn === player1Turn) {
    playerTurn = player2Turn;
  } else if (playerTurn === player2Turn) {
    playerTurn = player1Turn;
  }
}



function newSecretNum() {
  player1GuessAmount = 0;
  player2GuessAmount = 0;
  secretNum = Math.floor(Math.random() * 5) + 1;
  console.log("SN2" + secretNum);
}

function checkPlayerGuess() {
  if (playerTurn === player1Turn) {
    console.log("Player 1's Turn")
    player1GuessAmount += 1;
    let player1GuessBullet = document.createElement("li");
    player1GuessBullet.innerHTML = player1Guess;
    player1GuessList.appendChild(player1GuessBullet);
    player1Name.innerHTML = "Player 1's Turn";
    player1Name.style.color = "red";
    player2Name.innerHTML = "Player 2:";
    player2Name.style.color = "black";

    if (player1Guess === secretNum) {
      let player1HTMLScore = parseInt(player1ScoreBoard.textContent);
      player1HTMLScore += 1;
      player1HTMLScore.textContent = player1HTMLScore.toString();
      player1ScoreBoard.textContent = player1HTMLScore;
      player1BoardLocation += 1;
      textInfo.innerHTML = `Player 1 has guessed the secret number ${secretNum} and moves on to the next spot!`;
      player1GuessBullet.style = "color: green";
      player1Name.innerHTML = "Player 1:";
      player1Name.style.color = "black";
      player2Name.innerHTML = "Player 2's Turn";
      player2Name.style.color = "red";

    } else {
      textInfo.innerHTML = "Player 1 have guessed the wrong number!";
    }

  } else if (playerTurn === player2Turn) {
    player1Name.innerHTML = "Player 1:";
    player1Name.style.color = "black";
    player2Name.innerHTML = "Player 2's Turn";
    player2Name.style.color = "red";
    console.log("Player 2's Turn")
    player2GuessAmount += 1;
    player2Name.innerHTML = "Player 2's Turn";
    let player2GuessBullet = document.createElement("li");
    player2GuessBullet.innerHTML = player2Guess;
    player2GuessList.appendChild(player2GuessBullet);

    if (player2Guess === secretNum) {
      let player2HTMLScore = parseInt(player2ScoreBoard.textContent);
      player2HTMLScore += 1;
      player2HTMLScore.textContent = player2HTMLScore.toString();
      player2ScoreBoard.textContent = player2HTMLScore;
      player2BoardLocation += 1;
      textInfo.innerHTML = `Player 2 has guessed the secret number ${secretNum} and moves on to the next spot!`;
      player2GuessBullet.style = "color: green"
      player2Name.innerHTML = "Player 2:";
      player2Name.style.color = "black";
      player1Name.innerHTML = "Player 1's Turn";
      player1Name.style.color = "red";
    } else {
      textInfo.innerHTML = "Player 2 have guessed the wrong number!"
      player1Name.innerHTML = "Player 1's Turn:";

    }
  }
}



function checkForEventLocation() {
  if (player2BoardLocation === 1 || player2BoardLocation === 8 || player2BoardLocation === 12) {
    trueBtn.style.display = "block";
    falseBtn.style.display = "block";
    questionEvent();
  } else if (player1BoardLocation === 1 || player1BoardLocation === 8 || player1BoardLocation === 12) {
    trueBtn.style.display = "block";
    falseBtn.style.display = "block";
    questionEvent();
  }
}

function validateGuess() {
  if (guessTextBox.value > 5 || guessTextBox.value < 1 || !Number.isInteger(parseInt(guessTextBox.value))) {
    alert("Please enter a number between 1 and 5! Turn Skipped.");
  }
  console.log(guessTextBox.value);
}

function questionEvent() {
  const randomQuestion =
    randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
  // textInfo.innerHTML = randomQuestion.question;
  correctAnswer = randomQuestion.correctAnswer;
  activeEvent = true;

  Swal.fire({
    title: `${randomQuestion.question}`,
    showDenyButton: true,
    confirmButtonText: "True",
    denyButtonText: "False",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      if (playerTurn === player1Turn) {
        console.log(playerTurn);
        if (correctAnswer) {
          Swal.fire(`The correct answer is ${correctAnswer}.`, "", "success");
          player1BoardLocation += 1;
        } else {
          Swal.fire(`The correct answer was ${correctAnswer}.`, "", "error");
          player1BoardLocation -= 1;
        }
      } else if (playerTurn === player2Turn) {
        console.log(playerTurn);
        if (correctAnswer) {
          Swal.fire(`The correct answer is ${correctAnswer}.`, "", "success");
          player2BoardLocation += 1;
        } else {
          Swal.fire(`The correct answer was ${correctAnswer}.`, "", "error");
          player2BoardLocation -= 1;
        }
      }
      activeEvent = false;
    } else if (result.isDenied) {
      if (playerTurn === player1Turn) {
        console.log(playerTurn);
        if (!correctAnswer) {
          Swal.fire(`The correct answer is ${correctAnswer}.`, "", "success");
          player1BoardLocation += 1;
        } else {
          Swal.fire(`The correct answer was ${correctAnswer}.`, "", "error");
          player1BoardLocation -= 1;
        }
      } else if (playerTurn === player2Turn) {
        console.log(playerTurn);
        if (!correctAnswer) {
          Swal.fire(`The correct answer is ${correctAnswer}.`, "", "success");
          player2BoardLocation += 1;
        } else {
          Swal.fire(`The correct answer was ${correctAnswer}.`, "", "error");
          player1BoardLocation -= 1;
        }
      }
    }
    updatePlayerPieceLocation();
  });
};


// trueBtn.addEventListener("click", function () {
//   console.log("True");
//   if (playerTurn === player1Turn) {
//     console.log(playerTurn);
//     if (correctAnswer) {
//       console.log(correctAnswer);
//       player1BoardLocation += 1;
//     } else {
//       console.log(correctAnswer);
//       player1BoardLocation -= 1;
//     }
//   } else if (playerTurn === player2Turn) {
//     console.log(playerTurn);
//     if (correctAnswer) {
//       console.log(correctAnswer);
//       player2BoardLocation += 1;
//     } else {
//       console.log(correctAnswer);
//       player2BoardLocation -= 1;
//     }
//   }
//   updatePlayerPieceLocation();
//   activeEvent = false;
// });

//   falseBtn.addEventListener("click", function () {
//     console.log("False");
//     if (playerTurn === player1Turn) {
//       console.log(playerTurn);
//       if (!correctAnswer) {
//         console.log(correctAnswer);
//         player1BoardLocation += 1;
//       } else {
//         console.log(correctAnswer);
//         player1BoardLocation -= 1;
//       }
//     } else if (playerTurn === player2Turn) {
//       console.log(playerTurn);
//       if (!correctAnswer) {
//         console.log(correctAnswer);
//         player2BoardLocation += 1;
//       } else {
//         console.log(correctAnswer);
//         player1BoardLocation -= 1;
//       }
//     }
//     updatePlayerPieceLocation();
//     activeEvent = false;
//   });
//   // while (activeEvent) {
//   //   // waiting

//   // }

// }






//==========================
// Events & Challenges
// =========================


const randomQuestions = [{
    question: `JavaScript is a compiled language used to make the website interactive`,
    correctAnswer: false
  },
  {
    question: `\<script file=\"xxx.js\"\>`,
    correctAnswer: false
  },
  {
    question: "`//This is a comment`",
    correctAnswer: true
  },
  {
    question: "`/*This is a comment*/`",
    correctAnswer: true
  }
];

//=========================
// Confetti
//=========================

function confettiStart() {
  setTimeout(function () {
    confetti.start(true, 5000);
  }, 3000);
}

function confettiStop() {
  setTimeout(function () {
    confetti.stop();
  }, 3000);
}


//=========================
// Test Area
//=========================