console.log('content script loaded');

chrome.runtime.onMessage.addListener(function(request, sender) {
  vanishEverything = new VanishEverything;
  switch (request.type) {
    case "ZapEverything":
      vanishEverything.run();
      break;
    case "ZapElement":
      vanish.toggleVanish();
      break;
    default:
      break;
  }
});
