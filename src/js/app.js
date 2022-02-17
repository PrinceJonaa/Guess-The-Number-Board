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
const player1Score = document.getElementById('player1score')
const player2Score = document.getElementById('player2score')
const guessSubmit = document.getElementById('guessSubmit')
const guessInput = document.getElementById('guessInput')
const gUL1 = document.getElementById('gUL1')
const gUL2 = document.getElementById('gUL2')
let player1guess, player2guess; 
let player1win = false;
let player2win = false;
let playerTurn = 1
let secretNum
let guessTurn1 = 0
let guessTurn2 = 0

let Score1 = 0
let Score2 = 0

//=========================

startGameBtn.addEventListener("click", play);

//=========================
function clickButton() {
  startbtn.addEventListener("click", boardLocation);
}

function boardLocation() {
  window.location.href = "/board.html";
}


guessSubmit.addEventListener("click", submitThis);

let playerScore = function() {
  
  if (player1win == true) {
    Score1 += 1
    player1Score.innerText = Score1;
    console.log(Score1)
    player1win = false
  } else if (player2win == true) {
    Score2 += 1
    player2Score.innerText = Score2;
    player2win = false
  }
}

let playerWin = function() {
  if (player1guess == secretNum) {
    player1win = true;
    guessTurns();
    playerScore();
  } else if (player2guess == secretNum)
    player2win = true;
    guessTurns();
    playerScore();
}

function moveSquare() {
  if (Score1 == 0) {
    const img = document.createElement('img');
    img.src = 'src/images/piece1.png';
    img.className = 'piece';
    startArea.appendChild(img);
  } else if (Score1 == 1) {
    startArea.removeChild(img);
    const img = document.createElement('img');
    img.src = 'src/images/piece1.png';
    img.className = 'piece';
    m1.appendChild(img);
  } else if (Score1 == 2) {
    img.remove();
    const img = document.createElement('img');
    img.src = 'src/images/piece1.png';
    img.className = 'piece';
    m2.appendChild(img);
  } else if (Score1 == 3) {
    img.remove();
    const img = document.createElement('img');
    img.src = 'src/images/piece1.png';
    img.className = 'piece';
    m3.appendChild(img);
  } else if (Score1 == 4) {
    img.remove();
    const img = document.createElement('img');
    img.src = 'src/images/piece1.png';
    img.className = 'piece';
    m4.appendChild(img);
  } else if (Score1 == 5) {
    img.remove();
    const img = document.createElement('img');
    img.src = 'src/images/piece1.png';
    img.className = 'piece';
    m5.appendChild(img);
  } else if (Score1 == 6) {
    img.remove();
    const img = document.createElement('img');
    img.src = 'src/images/piece1.png';
    img.className = 'piece';
    m6.appendChild(img);
  } else if (Score1 == 7) {
    img.remove();
    const img = document.createElement('img');
    img.src = 'src/images/piece1.png';
    img.className = 'piece';
    m7.appendChild(img);
  }


}


function displayTurn() {
  if (playerTurn == 1) {
    player1Name.innerHTML = "Player 1's Turn:";
  } else if (playerTurn == 0) {
    player2Name.innerHTML = "Player 2's Turn:";
  }
}

function incPlayerTurn() {
  if (playerTurn == 1) {
    playerTurn = 0;
    guessTurn1 += 1
  } else if (playerTurn == 0) {
    playerTurn = 1;
    guessTurn2 += 1
  }
}

function guessTurns() {
  if (guessTurn1 == 5 || player2win == true) {
  secretNum = Math.floor(Math.random() * 20) + 1;
  console.log("SN1", secretNum);
  } else if (guessTurn2 == 5 || player1win == true) {
  secretNum = Math.floor(Math.random() * 20) + 1;
  console.log("SN2", secretNum);
  }
}

function submitThis(elm) {
  if (playerTurn == 1) {
  displayTurn();
  moveSquare();
  player1guess = guessInput.value
  const newGuess1 = document.createElement('li'); 
  newGuess1.innerHTML = player1guess;
  gUL1.appendChild(newGuess1);
  GuessCheck();
  playerWin();
  guessInput.value = "";
  
  player1Name.innerHTML = "Player 1";
  player2Name.innerHTML = "Player 2's Turn";

  incPlayerTurn();
  } else if (playerTurn == 0) {
    displayTurn();
    player2guess = guessInput.value;
    const newGuess2 = document.createElement("li");
    newGuess2.innerHTML = player2guess;
    gUL2.appendChild(newGuess2);
    GuessCheck();
    playerWin();
    guessInput.value = "";
    player2Name.innerHTML = "Player 2";
    player1Name.innerHTML = "Player 1's Turn";
    incPlayerTurn();
  }
}

function GuessCheck() {
  if (player1guess !== secretNum) {
    infoArea.textContent = "Player's 1 Guess is Wrong!";
} else if (player2guess !== secretNum) {
  infoArea.textContent = "Player's 2 Guess is Wrong!";
} else if (player1guess == secretNum) {
  infoArea.textContent = "Player's 1 Guess is Correct!";
} else if (player2guess == secretNum) {
  infoArea.textContent = "Player's 2 Guess is Correct!";
}
}

function play() {
  displayTurn();
  secretNum = Math.floor(Math.random() * 20) + 1;
  console.log('SN', secretNum)
  startGameBtn.style.display = 'none' 
}



// let guessListIdx1 = [1];
// let guessListIdx2 = [2];
// const p1lastGuess = guessListIdx1[guessListIdx1.length - 1];
// const p2lastGuess = guessListIdx2[guessListIdx2.length - 1];
// guessList1.textContent = guessListIdx1;
// guessList2.textContent = guessListIdx2;
// secretNum = Math.floor(Math.random() * 100 + 1);
// resetBtn.setAttribute("hidden", true);