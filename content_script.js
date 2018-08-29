console.log('content script loaded');

chrome.runtime.onMessage.addListener(function(request, sender) {
  // vanish = new VanishEverything;
  if (request.type === 'button') {
    vanish.toggleVanish();
  }
});
