chrome.runtime.onMessage.addListener(function (request, sender) {
  vanishEverything = new VanishEverything();
  switch (request.type) {
    case "ZapEverything":
      vanishEverything.run();
      break;
    case "ZapElement":
      if (hammer.activated) {
        hammer.toggleHammer();
      }
      vanish.toggleVanish();
      break;
    case "SmashElement":
      if (vanish.activated) {
        vanish.toggleVanish();
      }
      hammer.toggleHammer();
      break;
    default:
      break;
  }
});
