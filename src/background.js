/**
 * Background Script - Core protection logic
 * Handles domain blocking and language detection
 */

const SECURITY_CONFIG = {
  // Domains to block (supports wildcards)
  blockedDomains: [
    "*://*.telemetry.microsoft.com/*",
    "*://recall.windows.com/*",
    "*://activity.windows.com/*",
    "*://*.events.data.microsoft.com/*"
  ],
  // Supported languages (default: English)
  supportedLanguages: ['de', 'en', 'es', 'fr', 'it', 'pt_BR'],
  defaultLanguage: 'en'
};

/**
 * Logs security events to chrome.storage.local
 * @param {string} message - Event description
 * @param {object} data - Additional event data
 */
const logSecurityEvent = (message, data = {}) => {
  chrome.storage.local.get(['securityLogs'], (result) => {
    const logs = result.securityLogs || [];
    logs.push({
      timestamp: new Date().toISOString(),
      message,
      ...data
    });
    // Keep only the last 100 logs
    chrome.storage.local.set({ securityLogs: logs.slice(-100) });
  });
};

// Pre-compile domain patterns for better performance
const domainPatterns = SECURITY_CONFIG.blockedDomains.map(
  domain => new RegExp(domain.replace(/\*/g, '.*'))
);

// Block specified domains
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const isBlocked = domainPatterns.some(pattern => 
      pattern.test(details.url)
    );
    
    if (isBlocked) {
      logSecurityEvent('Domain blocked', { 
        url: details.url,
        type: 'telemetry'
      });
      return { cancel: true };
    }
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

/**
 * Detects and sets the optimal language
 * @returns {string} Selected language code
 */
const initializeLanguageSupport = () => {
  try {
    // Get browser UI language (e.g. 'en-US' -> 'en')
    const browserLanguage = chrome.i18n.getUILanguage().split('-')[0];
    const effectiveLanguage = SECURITY_CONFIG.supportedLanguages.includes(browserLanguage) 
      ? browserLanguage 
      : SECURITY_CONFIG.defaultLanguage;
    
    // Store language preference
    chrome.storage.sync.set({ appLanguage: effectiveLanguage });
    logSecurityEvent('Language initialized', { 
      detected: browserLanguage,
      selected: effectiveLanguage
    });
    
    return effectiveLanguage;
  } catch (error) {
    logSecurityEvent('Language detection failed', { 
      error: error.message 
    });
    return SECURITY_CONFIG.defaultLanguage;
  }
};

// Initialize extension when installed
chrome.runtime.onInstalled.addListener(() => {
  const activeLanguage = initializeLanguageSupport();
  console.log(`Active language: ${activeLanguage}`);
});