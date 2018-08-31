let button1 = document.getElementById('ZapEverything');

button1.addEventListener("click", function() {
  chrome.tabs.query({ active:true, currentWindow: true}, function(tabs) {
    console.log("click regiestered in popup");

    chrome.tabs.sendMessage(tabs[0].id, {type: `${button1.id}`});
  })
});

let button2 = document.getElementById('ZapElement');

button2.addEventListener("click", function() {
  chrome.tabs.query({ active:true, currentWindow: true}, function(tabs) {
    console.log("click regiestered in popup");

    chrome.tabs.sendMessage(tabs[0].id, {type: `${button2.id}`});
  })
});

let button3 = document.getElementById('SmashElement');

button3.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("click regiestered in popup");

    chrome.tabs.sendMessage(tabs[0].id, { type: `${button3.id}` });
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
