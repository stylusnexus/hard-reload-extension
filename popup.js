function showFeedback(text) {
  const el = document.getElementById("feedback");
  el.textContent = text;
  el.classList.add("show");
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => window.close(), 300);
  }, 800);
}

const checkbox = document.getElementById("includeLocalStorage");

// Restore saved checkbox state
checkbox.checked = localStorage.getItem("includeLocalStorage") === "true";

// Persist checkbox state on change
checkbox.addEventListener("change", () => {
  localStorage.setItem("includeLocalStorage", checkbox.checked);
});

document.getElementById("hardReload").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "hardReload" }, (response) => {
    if (response && response.error) {
      showFeedback(response.error);
    } else {
      showFeedback("Hard reload complete");
    }
  });
});

document.getElementById("clearCacheReload").addEventListener("click", () => {
  chrome.runtime.sendMessage(
    { action: "hardReloadClearCache", clearLocalStorage: checkbox.checked },
    (response) => {
      if (response && response.error) {
        showFeedback(response.error);
      } else {
        showFeedback("Cache cleared & reloaded");
      }
    }
  );
});
