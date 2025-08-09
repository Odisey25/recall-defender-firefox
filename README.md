# Recall Defender for Firefox  

🛡️ **Block Microsoft Recall and Its Telemetry in Firefox** | [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) | [![Firefox Add-on](https://img.shields.io/amo/v/recall-defender?color=orange)](https://addons.mozilla.org/firefox/addon/recall-defender/)  

A privacy-focused Firefox extension that blocks Microsoft Recall's data collection by:  
✅ **Blocking telemetry domains**  
🚫 **Disabling screen capture APIs**  
🔒 **Isolating Microsoft sites in containers**  

![Popup Demo](screenshots/popup-en.png)  
*(Screenshot: Protection stats in English)*  

---

## 🌟 Features  
- Blocks `*.telemetry.microsoft.com`, `recall.windows.com`, etc.  
- Disables `getDisplayMedia()`, `Canvas`, and `WebRTC` on Microsoft domains  
- Auto-purges cookies/storage after sessions  
- Real-time protection indicators  
- Supports 6 languages:  
  ![Languages](https://img.shields.io/badge/Languages-6-blue?style=flat&logo=google-translate)  

---

## ⚡ Quick Start  

### Load Unpacked (Development)  
1. Clone repo:  
   ```bash
   git clone https://github.com/odisk777/recall-defender-firefox.git
   cd recall-defender-firefox

    In Firefox:

        Navigate to about:debugging#/runtime/this-firefox

        Click "Load Temporary Add-on"

        Select manifest.json

Install from AMO

https://img.shields.io/badge/Download-AMO-orange?logo=firefox
🏗️ Project Structure
plaintext

/recall-defender-firefox
├── _locales/               # i18n (en/es/pt_BR/de/it/fr)
│   └── [lang]/messages.json
├── src/
│   ├── popup/              # Popup UI
│   ├── options/            # Settings page
│   ├── background.js       # Domain blocking
│   └── content.js         # API disabling
├── icons/                  # Extension icons
├── manifest.json           # Core config
└── README.md               # This file

🌍 Add New Language

    Create _locales/[code]/messages.json (e.g., ja for Japanese)

    Follow existing JSON structure:
    json

    {
      "extensionName": { "message": "リコールディフェンダー" },
      "extensionDescription": { "message": "Microsoft Recallをブロックします" }
    }

    Submit a PR!

🛠️ Developer Commands
Command	Description
web-ext run	Live-reload for testing
web-ext build	Create .xpi package
web-ext lint	Validate extension

Requires web-ext:
bash

npm install -g web-ext

🤝 How to Contribute

    Fork the repository

    Create a feature branch (git checkout -b feat/new-thing)

    Commit changes (git commit -am 'Add cool feature')

    Push to branch (git push origin feat/new-thing)

    Open a Pull Request

📜 License

MIT © odisk777
<p align="center"> <img src="https://img.shields.io/badge/Privacy%20Matters-✓-green?style=for-the-badge" alt="Privacy Matters"> </p> ```
