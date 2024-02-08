chrome.runtime.onMessage.addListener(async function (
  msg,
  sender,
  sendResponse
) {
  if (msg.text == "hammertime") {
    const insertPromise = await chrome.scripting.insertCSS({
      css: `*, *:hover { cursor: url(${chrome.runtime.getURL(
        "images/hammer.png"
      )}), auto !important} *:active { cursor: url(${chrome.runtime.getURL(
        "images/hammerSideways.png"
      )}), auto !important}`,
      target: { tabId: sender.tab.id, allFrames: true },
      origin: "USER",
    });
    sendResponse({ text: insertPromise });
  }
});
// files: ["cursors/hammer.css"],
