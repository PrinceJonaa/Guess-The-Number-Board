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
const m12 = document.getElementById('m12')
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
const img1 = document.createElement('img');
const questionInput = document.getElementById('questionInput');
const questionButton = document.getElementById('questionButton');
const winScreen = document.getElementById('winScreen')
img1.src = '/src/images/piece1.png';
img1.className = 'piece';
let player1guess, player2guess; 
const img2 = document.createElement('img');
img2.src = '/src/images/piece2.png';
img2.className = 'piece2';
let player1win = false;
let player2win = false;
let playerTurn = 1
let secretNum
let guessTurn1 = 0
let guessTurn2 = 0

let Score1 = 0
let Score2 = 0
let locationArray = [startArea, m1, m2, m3, jailSpot, m4, m5, m6, eventSpot,m7, m8, m9, questionSpot, m10, m11, m12]
let player1BoardLocation = 0
let player2BoardLocation = 0

//=========================

startGameBtn.addEventListener("click", play);

function clickButton() {
  startbtn.addEventListener("click", boardLocation);
}

function boardLocation() {
  window.location.href = "/board.html";
}

guessSubmit.addEventListener("click", submitThis);

//=========================


function render() {
  locationArray.forEach((square, idx) => {
    if (player1BoardLocation === idx) {
    locationArray[idx].appendChild(img1);
  }}
  )
  locationArray.forEach((square, idx) => {
    if (player2BoardLocation === idx) {
    locationArray[idx].appendChild(img2);
  }   
  })
}

let playerScore = function() {
  if (player1win == true) {
    Score1 += 1
    player1BoardLocation += 1
    jailArea();
    questionArea();
    infoArea.textContent= "Player 1 Wins and move one spot on the board!"
    infoArea.className- "player1win"
    render();
    player1Score.innerText = Score1;
    player1win = false
  } else if (player2win == true) {
    Score2 += 1
    player2BoardLocation += 1
    infoArea.textContent= "Player 2 Wins and move one spot on the board!"
    infoArea.className- "player2win"
    render();
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


function displayTurn() {
  if (playerTurn == 1) {
    player1Name.innerHTML = "Player 1's Turn:";
    player1Name.className= "player1name"
  } else if (playerTurn == 0) {
    player2Name.innerHTML = "Player 2's Turn:";
    player1Name.className= "player2name"
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
  if (guessTurn1 == 3 || player2win == true) {
  secretNum = 0;
  secretNum = Math.floor(Math.random() * 5) + 1;
  console.log("SN1", secretNum);
  } else if (guessTurn2 == 3 || player1win == true) {
  secretNum = 0;
  secretNum = Math.floor(Math.random() * 5) + 1;
  console.log("SN2", secretNum);
  }
}

function submitThis(elm) {
  if (playerTurn == 1) {
  displayTurn();
  player1guess = guessInput.value
  const newGuess1 = document.createElement('li'); 
  newGuess1.innerHTML = player1guess;
  gUL1.appendChild(newGuess1);
  GuessCheck();
  checkWinner();
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
    checkWinner();
    playerWin();
    guessInput.value = "";
    player2Name.innerHTML = "Player 2";
    player1Name.innerHTML = "Player 1's Turn";
    incPlayerTurn();
    jailArea();
  }
  render();
}


function GuessCheck() {
  if (player1guess !== secretNum) {
    infoArea.textContent = "Player's 1 Guess is Wrong!";
} else if (player2guess !== secretNum) {
  infoArea.textContent = "Player's 2 Guess is Wrong!";
} else if (player1guess == secretNum) {
  infoArea.textContent = "Player's 1 Guess is Correct!";
}else if (player2guess == secretNum) {
  infoArea.textContent = "Player's 2 Guess is Correct!";
}
}
function guessError(){
  if (guessInput.value > 5)
  alert("Please enter a number between 1 and 5! Turn Skipped.");
  guessInput.value ="";
}

function checkWinner() {
  if (Score1 === 15) {
  youWin(); 
} else if (Score2 === 15) {
  youWin();
}
}

function youWin() {
  let allElements = document.querySelectorAll("body *");
  allElements.forEach(function (element) {
    if (element.getElementsByClassName !== "container-fluid") {
      element.style.display = "none";
      winScreen.style.display = "block";
      confetti.start();
      const win = document.createElement('h1');
      win.innerHTML = "You Win!";
      win.className = "win"
      winScreen.appendChild(win);
    }
  });
}

function play() {
  startArea.appendChild(img1);
  startArea.appendChild(img2);
  displayTurn();
  secretNum = Math.floor(Math.random() * 5) + 1;
  console.log('SN', secretNum)
  startGameBtn.style.display = 'none'
  resetBtn.style.display = 'none'
}

function confettiStart() {
  setTimeout(function() {
    confetti.start(true, 5000);
  }, 3000);
}

function confettiStop() {
  setTimeout(function() {
    confetti.stop();
  }, 3000);
}


const randomQuestions = [
  { 
  question: "What is JavaScript?",
    answers: {
    a: `JavaScript is a scripting language used to make the website interactive.`,
    b: `JavaScript is an assembly language used to make the website interactive`,
    c: `JavaScript is a compiled language used to make the website interactive`,
    d: `None of the mentioned`,
  },
  correctAnswer: "a"
},
{ 
  question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answers: {  
    a: `<script src="xxx.js">`,
    b: `<script href="xxx.js">`,
    c: `<script name="xxx.js">`,
    d: `<script file="xxx.js">`,
  },
  correctAnswer: "c"
},
{ 
  question: "What is the correct syntax for adding a comment in JavaScript?",
    answers: {
    a: `<!--This is a comment-->`,
    b: `//This is a comment`,
    c: `<!--This is a comment-->`,
    d: `//This is a comment`,
  },
  correctAnswer: "b"
},
{ 
  question: "Which of the following is not a reserved word in JavaScript?",
    answers: {
    a: `interface`,
    b: `throws`,
    c: `program`,
    d: `int`,
  },
  correctAnswer: "d"
},
{ 
  question: "Which of the following is not a valid JavaScript variable name?",
    answers: {
    a: `2names`,
    b: `first_and_last,`,
    c: `variable_1`,
    d: `variable`,
  },
  correctAnswer: "a"
},
]; 



function questionEvent() {
  const randomQuestion = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
  const question = randomQuestion.question;
  const answers = randomQuestion.answers;
  const correctAnswer = randomQuestion.correctAnswer;
  questionArea.innerHTML = question;
  questionInput.style.display = "block";
  questionInput.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (guessTurn1 == 1) {
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
    } else if (guessTurn2 == 1) {
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

function jailArea() {
  if (player1BoardLocation == 5 || player2BoardLocation == 5) {
  questionEvent();
  }
}


function questionArea() {
  if (player1BoardLocation == 13 || player2BoardLocation == 13) {
    questionEvent();
  }
}

// if (jailArea.contains(img1)) {
//     infoArea.textContent = randomQuestions[0].question
//     questionInput.style.display = "block"
//     questionInput.addEventListener("click", () => {
//       if (questionInput.value == randomQuestions[0].correctAnswer) {
//         infoArea.textContent = "Correct!"
//         img1.remove();
//         questionInput.style.display = "none"
//         questionInput.value = ""
//         img1.style.top = "0px"
//         img1.style.left = "0px"
//         img1.style.backgroundColor = "transparent"
//         img1.style.border = "none"
//         img1.style.boxShadow = "none"
//         img1.style.transition = "none"
//         img1.style.width = "100%"
//         img1.style.height = "100%"
//         img1.style.zIndex = "0"
//         img1.style.position = "absolute"
//         img1.style.transform = "translate(0px, 0px)"
//         img1.style.transform = "rotate(0deg)"
//         img1.style.transition = "all 0.5s ease"
//         jailArea.appendChild(img1)
//         questionInput.value = ""
//         infoArea.className = "infoArea"
//         infoArea.textContent = "Player 1's Turn"
//       } else if (questionInput.value != randomQuestions[0].correctAnswer) {
//         infoArea.textContent = "Wrong!"
//         img1.remove();
//         questionInput.style.display = "none"
//         questionInput.value = ""
//         img1.style.top = "0px"
//         img1.style.left = "0px"
//         img1.style.backgroundColor = "transparent"
//         img1.style.border = "none"
//         img1.style.boxShadow = "none"
//         img1.style.transition = "none"
//         img1.style.width = "100%"
//         img1.style.height = "100%"
//         img
