# Hard Reload

A Chrome extension (Manifest V3) that provides one-click hard reload for the active tab, with an optional full cache wipe before reloading.

## Features

- **Hard Reload** — bypass the cache and reload the current page
- **Clear Cache + Reload** — wipe the entire browser cache, then hard reload

## Install

1. Clone or download this repo
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the project folder

## How it works

Click the extension icon to open the popup. Choose one of two actions:

| Button | What it does |
|---|---|
| Hard Reload | Calls `chrome.tabs.reload` with `bypassCache: true` |
| Clear Cache + Reload | Calls `chrome.browsingData.removeCache`, then hard reloads |

The popup shows brief feedback and closes automatically.

## Permissions

| Permission | Reason |
|---|---|
| `tabs` | Reload the active tab |
| `browsingData` | Clear the browser cache |

## License

MIT
