# Recall Defender for Firefox 🛡️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Firefox Add-on](https://img.shields.io/amo/v/recall-defender?color=orange)](https://addons.mozilla.org/firefox/addon/recall-defender/)
[![GitHub Stars](https://img.shields.io/github/stars/Odisey25/recall-defender-firefox)](https://github.com/Odisey25/recall-defender-firefox/stargazers)
[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/herin2019)

A privacy-focused Firefox extension that blocks Microsoft Recall telemetry and protects against unwanted data collection.

![Extension Screenshot](assets/screenshot.png) 
## ✨ Features

- 🔥 **Blocks Recall domains**: `telemetry.microsoft.com`, `recall.windows.com`, etc.
- 🚫 **Disables tracking APIs**: Screen capture, Canvas fingerprinting, WebRTC
- 🌍 **Multi-language support**: English, Spanish, Portuguese, German, Italian, French
- 🔒 **Automatic isolation**: Firefox Containers for Microsoft sites
- 📊 **Real-time monitoring**: Activity logging and statistics

## 🚀 Installation

### From Firefox Add-ons
[![Install from AMO](https://img.shields.io/badge/Install-Firefox_Add_ons-orange?logo=firefox)](https://addons.mozilla.org/firefox/addon/recall-defender/)

### Manual Installation

git clone https://github.com/Odisey25/recall-defender-firefox.git
cd recall-defender-firefox

    Open Firefox and navigate to about:debugging#/runtime/this-firefox

    Click "Load Temporary Add-on"

    Select the manifest.json file

🛠️ Development
bash

# Install web-ext tool
npm install --global web-ext

# Run in development mode
web-ext run

# Build package
web-ext build

📂 Project Structure
text

recall-defender-firefox/
├── src/
│   ├── background/    # Core blocking logic
│   ├── content/       # API protections
│   ├── options/       # Settings page
│   └── popup/         # Extension popup
├── icons/             # Extension icons
├── _locales/          # Translations
└── manifest.json      # Extension config

🤝 Contributing

We welcome contributions! Please follow these steps:

    Fork the repository

    Create a feature branch (git checkout -b feature/your-feature)

    Commit your changes (git commit -am 'Add some feature')

    Push to the branch (git push origin feature/your-feature)

    Open a Pull Request

💖 Support This Project

If you find this extension useful, consider supporting its development:

https://img.shields.io/badge/Donate-PayPal-blue.svg

Your support helps maintain and improve this privacy tool!
📜 License

MIT © Odisey25

<p align="center"> <img src="https://img.shields.io/badge/Made_for-Firefox-orange?logo=firefox" alt="Made for Firefox"> </p> 

[Support] [PayPal] [Buy Me a Coffee]