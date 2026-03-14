chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "hardReload") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id, { bypassCache: true });
        sendResponse({ success: true });
      }
    });
    return true;
  }

  if (message.action === "hardReloadClearCache") {
    chrome.browsingData.removeCache({}, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.reload(tabs[0].id, { bypassCache: true });
          sendResponse({ success: true });
        }
      });
    });
    return true;
  }
});
