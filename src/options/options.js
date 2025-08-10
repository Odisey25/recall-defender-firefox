/**
 * Recall Defender Options Page
 * Handles user settings configuration
 */

// DOM Elements
const elements = {
  saveBtn: document.getElementById('saveBtn'),
  blockedDomains: document.getElementById('blockedDomains'),
  disableScreenCapture: document.getElementById('disableScreenCapture'),
  disableCanvas: document.getElementById('disableCanvas'),
  disableWebRTC: document.getElementById('disableWebRTC'),
  statusMessage: document.getElementById('statusMessage')
};

/**
 * Load saved settings from chrome.storage
 */
const loadSettings = () => {
  chrome.storage.sync.get(
    ['blockedDomains', 'disabledAPIs'],
    (data) => {
      if (chrome.runtime.lastError) {
        showStatus('Error loading settings', 'error');
        return;
      }

      // Set blocked domains
      if (data.blockedDomains) {
        elements.blockedDomains.value = data.blockedDomains.join('\n');
      }

      // Set API toggles
      if (data.disabledAPIs) {
        elements.disableScreenCapture.checked = data.disabledAPIs.includes('getDisplayMedia');
        elements.disableCanvas.checked = data.disabledAPIs.includes('Canvas');
        elements.disableWebRTC.checked = data.disabledAPIs.includes('WebRTC');
      }
    }
  );
};

/**
 * Save current settings to chrome.storage
 */
const saveSettings = () => {
  // Process blocked domains
  const blockedDomains = elements.blockedDomains.value
    .split('\n')
    .map(domain => domain.trim())
    .filter(domain => domain.length > 0);

  // Process disabled APIs
  const disabledAPIs = [];
  if (elements.disableScreenCapture.checked) disabledAPIs.push('getDisplayMedia');
  if (elements.disableCanvas.checked) disabledAPIs.push('Canvas');
  if (elements.disableWebRTC.checked) disabledAPIs.push('WebRTC');

  // Save to storage
  chrome.storage.sync.set(
    { blockedDomains, disabledAPIs },
    () => {
      if (chrome.runtime.lastError) {
        showStatus('Failed to save settings', 'error');
      } else {
        showStatus('Settings saved successfully!', 'success');
        // Notify background script about changes
        chrome.runtime.sendMessage({ 
          action: 'updateSettings',
          blockedDomains,
          disabledAPIs
        });
      }
    }
  );
};

/**
 * Show status message to user
 * @param {string} message - Text to display
 * @param {string} type - 'success' or 'error'
 */
const showStatus = (message, type) => {
  elements.statusMessage.textContent = message;
  elements.statusMessage.className = `status-message ${type}`;
  elements.statusMessage.style.display = 'block';
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    elements.statusMessage.style.display = 'none';
  }, 3000);
};

// Initialize the options page
document.addEventListener('DOMContentLoaded', () => {
  // Load saved settings
  loadSettings();

  // Set up save button handler
  elements.saveBtn.addEventListener('click', saveSettings);
});