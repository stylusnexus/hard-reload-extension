# hard-reload-extension

<!-- AUTO-MANAGED: project-description -->
## Project Description

Chrome Manifest V3 browser extension that provides one-click hard reload for the active tab, with an optional full cache wipe before reloading. No build step or npm dependencies — pure Chrome Extension APIs.
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: architecture -->
## Architecture

```
hard-reload-extension/
├── manifest.json       # Extension manifest (MV3)
├── background.js       # Service worker — handles reload messages
├── popup.html          # Popup UI (260px, dark theme, inline CSS)
├── popup.js            # Popup button event handlers
└── icons/              # Extension icons (16/32/48/128px PNGs)
```

- **popup.html/popup.js**: UI layer — sends messages via `chrome.runtime.sendMessage`
- **background.js**: Logic layer — receives messages, performs tab reload / cache clear
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: conventions -->
## Conventions

- No build tools, bundlers, or npm packages — load files directly in the extension
- Inline CSS in `popup.html`; no external stylesheets
- Service worker in `background.js`; must return `true` from `onMessage` listener when using async `sendResponse`
- Permissions declared in `manifest.json`: `tabs` (reload), `browsingData` (cache wipe)
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: patterns -->
## Patterns

- **Message passing**: popup sends named `action` strings (`"hardReload"`, `"hardReloadClearCache"`); background switches on `message.action`
- **Async sendResponse**: listener returns `true` to keep the message channel open for async callbacks
- **Post-action close**: popup shows transient feedback text for 1500ms, then closes itself after 600ms via `setTimeout(() => window.close(), 600)`
- **Cache wipe before reload**: `chrome.browsingData.removeCache({})` called first, reload triggered in its callback
<!-- END AUTO-MANAGED -->
