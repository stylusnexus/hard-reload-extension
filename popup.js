function showFeedback(text) {
  const el = document.getElementById("feedback");
  el.textContent = text;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1500);
}

document.getElementById("hardReload").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "hardReload" }, () => {
    showFeedback("Hard reload complete");
    setTimeout(() => window.close(), 600);
  });
});

document.getElementById("clearCacheReload").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "hardReloadClearCache" }, () => {
    showFeedback("Cache cleared & reloaded");
    setTimeout(() => window.close(), 600);
  });
});
