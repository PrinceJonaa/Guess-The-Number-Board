const startbtn = document.getElementById("startbtn");
const title = document.getElementById('title');

//=========================

startbtn.addEventListener("click", boardLocation);

//=========================

function boardLocation() {
  window.location.href = "/board.html";
}

function guessTheNumber() {
  var randomNumber = Math.floor(Math.random() * 100) + 1;
  var guess = document.getElementById("guess").value;
  var guessNumber = parseInt(guess);
  var guessCount = 0;
  var guessList = document.getElementById("guessList");
  var guessListItem = document.createElement("li");
  var guessListText = document.createTextNode(guess);
  guessListItem.appendChild(guessListText);
  guessList.appendChild(guessListItem);
  guessCount++;
  if (guessNumber === randomNumber) {
    alert("You Win!");
  }
  else if (guessCount === 5) {
    alert("You Lose!");
  }
  else {
    guessTheNumber();
  }
}