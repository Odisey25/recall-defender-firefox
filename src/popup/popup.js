/**
 * Recall Defender Popup Script
 * Handles UI interactions and displays protection stats
 */

// DOM Elements
const elements = {
  masterSwitch: document.getElementById('masterSwitch'),
  advancedBtn: document.getElementById('advancedBtn'),
  viewLogsBtn: document.getElementById('viewLogsBtn'),
  blockedCount: document.getElementById('blockedCount'),
  apisBlocked: document.getElementById('apisBlocked'),
  containersActive: document.getElementById('containersActive')
};

/**
 * Initialize the popup UI
 */
const initializePopup = () => {
  // Load saved toggle state
  chrome.storage.sync.get(['isActive'], (data) => {
    elements.masterSwitch.checked = (data.isActive !== false);
  });

  // Set up event listeners
  setupEventListeners();
  
  // Load current protection stats
  updateProtectionStats();
};

/**
 * Set up all UI event listeners
 */
const setupEventListeners = () => {
  // Toggle switch handler
  elements.masterSwitch.addEventListener('change', handleToggleSwitch);
  
  // Button click handlers
  elements.advancedBtn.addEventListener('click', openAdvancedSettings);
  elements.viewLogsBtn.addEventListener('click', openLogs);
};

/**
 * Handle master toggle switch changes
 */
const handleToggleSwitch = () => {
  const isActive = elements.masterSwitch.checked;
  
  // Save state to storage
  chrome.storage.sync.set({ isActive });
  
  // Send message to background script
  chrome.runtime.sendMessage({ 
    action: "toggleProtection", 
    state: isActive 
  });
};

/**
 * Open advanced settings page
 */
const openAdvancedSettings = () => {
  chrome.tabs.create({ 
    url: chrome.runtime.getURL('src/options/options.html') 
  });
};

/**
 * Open activity logs page
 */
const openLogs = () => {
  chrome.tabs.create({ 
    url: chrome.runtime.getURL('src/logs/logs.html') 
  });
};

/**
 * Fetch and update protection statistics
 */
const updateProtectionStats = () => {
  chrome.runtime.sendMessage({ action: "getStats" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error('Error fetching stats:', chrome.runtime.lastError);
      return;
    }
    
    elements.blockedCount.textContent = response.blockedDomains || 0;
    elements.apisBlocked.textContent = response.blockedAPIs || 0;
    elements.containersActive.textContent = response.containers || 0;
  });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePopup);