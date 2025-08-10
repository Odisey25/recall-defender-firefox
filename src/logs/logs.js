/**
 * Recall Defender Logs Page
 * Displays and manages activity logs
 */

// DOM Elements
const elements = {
  logsContainer: document.getElementById('logs'),
  clearBtn: document.getElementById('clearLogs'),
  refreshBtn: document.getElementById('refreshLogs')
};

// Log entry template
const logEntryTemplate = (log) => `
  <div class="log-entry">
    <span class="log-time">[${new Date(log.timestamp).toLocaleString()}]</span>
    ${log.message}
    ${log.url ? `<br><small>URL: ${log.url}</small>` : ''}
  </div>
`;

/**
 * Load and display logs from storage
 */
const loadLogs = () => {
  chrome.storage.local.get(['securityLogs'], (result) => {
    const logs = result.securityLogs || [];
    elements.logsContainer.innerHTML = '';

    if (logs.length === 0) {
      elements.logsContainer.innerHTML = '<div class="empty-state">No activity logs found</div>';
      return;
    }

    // Display logs in reverse chronological order
    logs.reverse().forEach(log => {
      elements.logsContainer.innerHTML += logEntryTemplate(log);
    });
  });
};

/**
 * Clear all logs from storage
 */
const clearLogs = () => {
  if (confirm('Are you sure you want to clear all logs?')) {
    chrome.storage.local.set({ securityLogs: [] }, () => {
      loadLogs();
    });
  }
};

/**
 * Initialize the logs page
 */
const initLogsPage = () => {
  // Load initial logs
  loadLogs();

  // Set up event listeners
  elements.clearBtn.addEventListener('click', clearLogs);
  elements.refreshBtn.addEventListener('click', loadLogs);

  // Listen for new log events from background
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'newLog') {
      loadLogs();
    }
  });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initLogsPage);