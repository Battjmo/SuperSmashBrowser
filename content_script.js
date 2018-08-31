console.log('content script loaded');

chrome.runtime.onMessage.addListener(function(request, sender) {
  vanishEverything = new VanishEverything;
  switch (request.type) {
    case "ZapEverything":
      console.log("zap everything");
      vanishEverything.run();
      break;
    case "ZapElement":
      console.log("zap");
      vanish.toggleVanish();
      break;
    case "SmashElement":
      console.log("hammertime");
      hammer.toggleHammer();
      break;
    default:
      break;
  }
});
