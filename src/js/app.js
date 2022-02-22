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

const guessListArray = document.querySelectorAll('li');

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
  startArea.appendChild(player1Piece);
  startArea.appendChild(player2Piece);
  player1BoardLocation = 0;
  player2BoardLocation = 0;
  player1Win = false;
  player2Win = false;
  playerTurn = player1Turn;
  textInfo.innerHTML = "Player 1 will start the game.";
  player1Name.innerHTML = "Player 1's Turn";
  player1Name.style.color = "yellow";
  player2Name.style.color = "red";
  startGameBtn.style.display = "none";
  Swal.fire({
    icon: "question",
    title: "How to play!",
    text: "Guess a number 1 to 5. First player to guess 15 times wins! Answer questions as you go along.",
    width: 600,
    padding: "3em",
  });
}

async function guessSubmit() {
  validateGuess();
  if (playerTurn === player1Turn) {
    player1Guess = parseInt(guessTextBox.value);
    guessTextBox.value = "";
    await render();
  } else if (playerTurn === player2Turn) {
    player2Guess = parseInt(guessTextBox.value);
    guessTextBox.value = "";
    await render();
  }
}

async function render() {
  checkPlayerGuess();
  updatePlayerPieceLocation();
  await checkForEventLocation();
  updatePlayerPieceLocation();
  checkWin();
  newSecretNum();
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
  if (player1BoardLocation === 1) {
    player1Win = true;
    player1Name.innerHTML = "Player 1 Wins!";
    player2Name.innerHTML = ""
    Swal.fire({
      title: `Congratulations! Player 1 has won the game!`,
      icon: "success",
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
    rgba(0,0,123,0.4)
    url("https://media1.giphy.com/media/n8Ax3aMOsBX32/giphy.gif?cid=ecf05e47zsggje036lreosassflt88zcs8ob7pkaj1p4jetg&rid=giphy.gif&ct=s")
    left top
    no-repeat
  `,
    });
    confettiStart();
    setTimeout(function () {
      confettiStop();
    }, 5000);
  } else if (player2BoardLocation === 15) {
    player2Win = true;
    player2Name.innerHtml = "Player 2 Wins!";
    Swal.fire({
      title: `Congratulations! Player 2 has won the game!`,
      icon: "success",
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
    rgba(0,0,123,0.4)
    url("https://media1.giphy.com/media/n8Ax3aMOsBX32/giphy.gif?cid=ecf05e47zsggje036lreosassflt88zcs8ob7pkaj1p4jetg&rid=giphy.gif&ct=s")
    left top
    no-repeat
  `,
    });
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
}

function checkPlayerGuess() {
  if (playerTurn === player1Turn) {
    player1GuessAmount += 1;
    let player1GuessBullet = document.createElement("li");
    player1GuessBullet.className = "list-group-item";
    player1GuessBullet.innerHTML = player1Guess;
    player1GuessList.appendChild(player1GuessBullet);
    if (guessListArray.length === 5) {
      player1GuessList.removeChild(player1GuessList.firstChild);
    }
    player1Name.innerHTML = "Player 1's Turn:";
    player1Name.style.color = "yellow";
    player2Name.innerHTML = "Player 2:";
    player2Name.style.color = "red";

    if (player1Guess === secretNum) {
      let player1HTMLScore = parseInt(player1ScoreBoard.textContent);
      player1HTMLScore += 1;
      player1HTMLScore.textContent = player1HTMLScore.toString();
      player1ScoreBoard.textContent = player1HTMLScore;
      player1BoardLocation += 1;
      textInfo.innerHTML = `Player 1 has guessed the secret number ${secretNum} and moves on to the next spot!`;
      player1GuessBullet.className = "list-group-item list-group-item-success"
      player1GuessBullet.style = "color: green";
      player1Name.innerHTML = "Player 1:";
      player1Name.style.color = "yellow";
      player2Name.innerHTML = "Player 2's Turn:";
      player2Name.style.color = "red";

    } else {
      textInfo.innerHTML = "Player 1 have guessed the wrong number!";
      player1GuessBullet.className = "list-group-item list-group-item-danger";
      player2Name.innerHTML = "Player 2's Turn:";
      player2Name.style.color = "red";
      player1Name.innerHTML = "Player 1:";
      player1Name.style.color = "yellow";
    }

  } else if (playerTurn === player2Turn) {
    player1Name.innerHTML = "Player 1:";
    player1Name.style.color = "red";
    player2Name.innerHTML = "Player 2's Turn:";
    player2Name.style.color = "yellow";
    player2GuessAmount += 1;
    let player2GuessBullet = document.createElement("li");
    player2GuessBullet.className = "list-group-item";
    player2GuessBullet.innerHTML = player2Guess;
    player2GuessList.appendChild(player2GuessBullet);
    if (guessListArray === 5) {
      player2GuessList.removeChild(player2GuessList.firstChild);
    }

    if (player2Guess === secretNum) {
      let player2HTMLScore = parseInt(player2ScoreBoard.textContent);
      player2HTMLScore += 1;
      player2HTMLScore.textContent = player2HTMLScore.toString();
      player2ScoreBoard.textContent = player2HTMLScore;
      player2BoardLocation += 1;
      textInfo.innerHTML = `Player 2 has guessed the secret number ${secretNum} and moves on to the next spot!`;
      player2GuessBullet.className = "list-group-item list-group-item-success"
      player2GuessBullet.style = "color: green"
      player2Name.innerHTML = "Player 2:";
      player2Name.style.color = "red";
      player1Name.innerHTML = "Player 1's Turn:";
      player1Name.style.color = "yellow";
    } else {
      textInfo.innerHTML = "Player 2 have guessed the wrong number!"
      player1Name.innerHTML = "Player 1's Turn:";
      player2Name.innerHTML = "Player 2:";
      player2GuessBullet.className = "list-group-item list-group-item-danger";
    }
  }
}

async function checkForEventLocation() {
  if (player2BoardLocation === 4 || player2BoardLocation === 8 || player2BoardLocation === 12) {
    trueBtn.style.display = "block";
    falseBtn.style.display = "block";
    activeEvent = true;
    activeEvent = await questionEvent();
  } else if (player1BoardLocation === 4 || player1BoardLocation === 8 || player1BoardLocation === 12) {
    trueBtn.style.display = "block";
    falseBtn.style.display = "block";
    activeEvent = true;
    activeEvent = await questionEvent();
  }
}

function validateGuess() {
  if (guessTextBox.value > 5 || guessTextBox.value < 1 || !Number.isInteger(parseInt(guessTextBox.value))) {
    alert("Please enter a number between 1 and 5! Turn Skipped.");
  }
}

async function questionEvent() {
  const randomQuestion =
    randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
  correctAnswer = randomQuestion.correctAnswer;

  await Swal.fire({
    title: `${randomQuestion.question}`,
    showDenyButton: true,
    confirmButtonText: "True",
    denyButtonText: "False",
  }).then((result) => {
    if (result.isConfirmed) {
      if (playerTurn === player1Turn) {
        if (correctAnswer) {
          Swal.fire(`The correct answer is ${correctAnswer}.`, "", "success");
          player1BoardLocation += 1;
        } else {
          Swal.fire(`The correct answer was ${correctAnswer}.`, "", "error");
          player1BoardLocation -= 1;
        }
      } else if (playerTurn === player2Turn) {
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
        if (!correctAnswer) {
          Swal.fire(`The correct answer is ${correctAnswer}.`, "", "success");
          player1BoardLocation += 1;
        } else {
          Swal.fire(`The correct answer was ${correctAnswer}.`, "", "error");
          player1BoardLocation -= 1;
        }
      } else if (playerTurn === player2Turn) {
        if (!correctAnswer) {
          Swal.fire(`The correct answer is ${correctAnswer}.`, "", "success");
          player2BoardLocation += 1;
        } else {
          Swal.fire(`The correct answer was ${correctAnswer}.`, "", "error");
          player1BoardLocation -= 1;
        }
      }
    }
  });
  return new Promise((resolve) => {
    resolve((activeEvent = false));
  });
};

//==========================
// Events & Challenges
// =========================


const randomQuestions = [
  {
    question: `JavaScript is a compiled language used to make the website interactive`,
    correctAnswer: false,
  },
  {
    question: `A promise is a special JavaScript function.`,
    correctAnswer: false,
  },
  {
    question: "`//This is a comment`",
    correctAnswer: true,
  },
  {
    question: "`/*This is a comment*/`",
    correctAnswer: true,
  },
  {
    question: "To remove elements from the array use splice.",
    correctAnswer: false,
  },
  {
    question: "We use flexbox to create un-responsive designs.",
    correctAnswer: false,
  },
  {
    question:
      "An element is considered a descendant if it is nested anywhere within its ancestor.`",
    correctAnswer: true,
  },
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