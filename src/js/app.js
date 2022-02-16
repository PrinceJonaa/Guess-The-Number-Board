const startbtn = document.getElementById("startbtn");
const title = document.getElementById('title');
const board = document.getElementById("board");
const eventArea = document.getElementById("event-area");
const scoreArea = document.getElementById('score-area');
const player1Name = document.getElementById("player1name");
const player2Name = document.getElementById('player2name');
const eventCard = document.getElementById("event-card");
const card = document.getElementById("card")
const infoArea = document.getElementById("info-area")
const startArea = document.getElementById("start-spot")
const m1 = document.getElementById('m1')
const m2 = document.getElementById('m2')
const m3 = document.getElementById('m3')
const jailSpot = document.getElementById('jail')
const m4 = document.getElementById('m4')
const m5 = document.getElementById('m5')
const m6 = document.getElementById('m6')
const eventSpot = document.getElementById('event')
const m7 = document.getElementById('m7')
const m8 = document.getElementById('m8')
const m9 = document.getElementById('m9')
const questionSpot = document.getElementById('question')
const m10 = document.getElementById('m10')
const m11 = document.getElementById('m11')
const m12 = document.getElementById('m2')
const guessList1 = document.getElementById('guessList1')
const guessList2 = document.getElementById('guessList2')
const startGameBtn = document.getElementById('startGameBtn')
const guessEntryArea = document.getElementById('guessEntryForm')
const resetBtn = document.getElementById('resetBtn')
const guessNumber = document.getElementById('guessNumber')
const player1score = document.getElementById('player1score')
const player2score = document.getElementById('player2score')
const guessSubmit = document.getElementById('guessSubmit')
const guessInput = document.getElementById('guessInput')
let player1guess = [];
let player2guess = [];
let player1win = false;
let player2win = false;
let playerTurn = 1

//=========================

startGameBtn.addEventListener("click", play);

//=========================
function clickButton() {
  startbtn.addEventListener("click", boardLocation);
}

function boardLocation() {
  window.location.href = "/board.html";
}


function guessSubmitMe() {
guessSubmit.addEventListener("click", submitThis);
}

let playerScore = function() {
  if (player1win == true) {
    player1score.innerHtml += 1;
  } else if (player2win == true) {
    player2score.innerHtml += 1;
  }
}

let playerWin = function() {
  if (player1guess == secretNum) {
    player1win = true;
  } else if (player2guess == secretNum)
    player2win = true;
}

let secretNum = Math.floor(Math.random() * 100) + 1;


function displayTurn() {
  if (playerTurn == 1) {
    player1Name.innerHTML = "Player 1's Turn";
  } else if (playerTurn == 0) {
    player2Name.innerHTML = "Player 2's Turn";
  }
}

function incPlayerTurn() {
  if (playerTurn == 1) {
    playerTurn = 0;
    play();
  } else if (playerTurn == 0) {
    playerTurn = 1;
    play();
  }
}

function submitThis() {
  let guess = parseInt(guessInput.value);
}

function guessPush() {
if (playerTurn == 1) {
  guessList1.push(player1guess)
} else if (playerTurn == 0) {
  guessList2.push(player2guess)
  }
}

function play() {
  displayTurn();
  submitThis();
  guessPush();
  playerWin();
  playerScore();
  incPlayerTurn();
  
}

// let guessListIdx1 = [1];
// let guessListIdx2 = [2];
// const p1lastGuess = guessListIdx1[guessListIdx1.length - 1];
// const p2lastGuess = guessListIdx2[guessListIdx2.length - 1];
// guessList1.textContent = guessListIdx1;
// guessList2.textContent = guessListIdx2;
// secretNum = Math.floor(Math.random() * 100 + 1);
// resetBtn.setAttribute("hidden", true);