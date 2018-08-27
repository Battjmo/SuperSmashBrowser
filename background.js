chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
});


//functions used to actually store the value?
// chrome.storage.sync.set({key: value}, function() {
//   console.log('Value is set to ' + value);
// });
//
// chrome.storage.sync.get(['key'], function(result) {
//   console.log('Value currently is ' + result.key);
// });
