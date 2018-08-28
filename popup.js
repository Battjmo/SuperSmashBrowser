let button = document.getElementById('button');

button.addEventListener("click", function() {
  chrome.tabs.query({ active:true, currentWindow: true}, function(tabs) {
    console.log(`${button.id}`);
    chrome.tabs.sendMessage(tabs[0].id, {type: `${button.id}`});
  })
});

let timesClick = 0;

// function myFunction() {
//   if (timesClick === 0) {
//     console.log("i have been clicked");
//     timesClick ++;
//     console.log(timesClick);
//   } else {
//     console.log("you only need to click once, fool");
//     console.log(timesClick);
//   }
// };
