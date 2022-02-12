const startbtn = document.getElementById("startbtn");
const title = document.getElementById('title');

//=========================

startbtn.addEventListener("click", boardLocation);

//=========================

function boardLocation() {
  window.location.href = "/board.html";
}