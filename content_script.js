console.log('content script loaded');
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.type === 'button') {
    console.log("i have been clicked");
  }
});
