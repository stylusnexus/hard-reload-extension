function isRestrictedUrl(url) {
  return !url || url.startsWith("chrome://") || url.startsWith("chrome-extension://") ||
    url.startsWith("about:") || url.startsWith("chrome-search://");
}

function hardReload(tab, sendResponse) {
  chrome.tabs.reload(tab.id, { bypassCache: true });
  if (sendResponse) sendResponse({ success: true });
}

function hardReloadClearCache(tab, clearLocalStorage, sendResponse) {
  let origin;
  try {
    origin = new URL(tab.url).origin;
  } catch {
    hardReload(tab, sendResponse);
    return;
  }

  chrome.browsingData.removeCache({ origins: [origin] }, () => {
    if (clearLocalStorage) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () => { localStorage.clear(); sessionStorage.clear(); },
        },
        () => {
          hardReload(tab, sendResponse);
        }
      );
    } else {
      hardReload(tab, sendResponse);
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0] || isRestrictedUrl(tabs[0].url)) {
      sendResponse({ success: false, error: "Cannot reload this page" });
      return;
    }

    const tab = tabs[0];

    if (message.action === "hardReload") {
      hardReload(tab, sendResponse);
    } else if (message.action === "hardReloadClearCache") {
      hardReloadClearCache(tab, message.clearLocalStorage, sendResponse);
    }
  });
  return true;
});

// Keyboard shortcut support
chrome.commands.onCommand.addListener((command) => {
  if (command === "hard-reload") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && !isRestrictedUrl(tabs[0].url)) {
        hardReload(tabs[0]);
      }
    });
  }
});
