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
const StartGame = document.getElementById('startGameBtn')
const guessEntryArea = document.getElementById('guessEntryForm')
const resetBtn = document.getElementById('resetBtn')
const guessNumber = document.getElementById('guessNumber')

//=========================



//=========================
function clickButton() {
  startbtn.addEventListener("click", boardLocation);
}

function boardLocation() {
  window.location.href = "/board.html";
}

function guessTheNumber() {
  let randomNumber = Math.floor(Math.random() * 100) + 1;
  let guess = guessNumber.value;
  if (randomNumber == guess)
  {
    alert ("you won")
  }
  else if (guess > randomNumber)
  {
    guess++;
    alert('small number')
  }
  else
  {
    guess++;
    alert('greater number')
  }
}
// function guessTheNumber() {
//   var randomNumber = Math.floor(Math.random() * 100) + 1;
//   var guess = document.getElementById("guess").value;
//   var guessNumber = parseInt(guess);
//   var guessCount = 0;
//   var guessList = document.getElementById("guessList");
//   var guessListItem = document.createElement("li");
//   var guessListText = document.createTextNode(guess);
//   guessListItem.appendChild(guessListText);
//   guessList.appendChild(guessListItem);
//   guessCount++;
//   if (guessNumber === randomNumber) {
//     alert("You Win!");
//   }
//   else if (guessCount === 5) {
//     alert("You Lose!");
//   }
//   else {
//     guessTheNumber();
//   }
// }