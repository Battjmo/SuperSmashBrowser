let button = document.getElementById('button');

button.addEventListener("click", myFunction);

let timesClick = 0;

function myFunction() {
  if (timesClick === 0) {
    console.log("i have been clicked");
    timesClick ++;
  } else {
    console.log("you only need to click once, fool");
  }
};
