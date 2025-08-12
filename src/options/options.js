document.addEventListener('DOMContentLoaded', () => {
  const saveBtn = document.getElementById('saveBtn');
  const statusEl = document.getElementById('statusMessage');
  
  // Mostrar configuración guardada
  chrome.storage.sync.get(['blockedDomains', 'disabledAPIs'], (result) => {
      if (chrome.runtime.lastError) {
          showStatus("Error loading settings: " + chrome.runtime.lastError.message, "error");
          return;
      }

      if (result.blockedDomains) {
          document.getElementById('blockedDomains').value = result.blockedDomains.join('\n');
      }
      
      if (result.disabledAPIs) {
          document.getElementById('disableScreenCapture').checked = 
              result.disabledAPIs.includes('getDisplayMedia');
          document.getElementById('disableCanvas').checked = 
              result.disabledAPIs.includes('Canvas');
          document.getElementById('disableWebRTC').checked = 
              result.disabledAPIs.includes('WebRTC');
      }
  });

  // Manejar guardado
  saveBtn.addEventListener('click', () => {
      const blockedDomains = document.getElementById('blockedDomains').value
          .split('\n')
          .map(domain => domain.trim())
          .filter(domain => domain.length > 0);
      
      const disabledAPIs = [];
      if (document.getElementById('disableScreenCapture').checked) {
          disabledAPIs.push('getDisplayMedia');
      }
      if (document.getElementById('disableCanvas').checked) {
          disabledAPIs.push('Canvas');
      }
      if (document.getElementById('disableWebRTC').checked) {
          disabledAPIs.push('WebRTC');
      }

      chrome.storage.sync.set({ blockedDomains, disabledAPIs }, () => {
          if (chrome.runtime.lastError) {
              showStatus("Save failed: " + chrome.runtime.lastError.message, "error");
          } else {
              showStatus("Settings saved successfully!", "success");
              // Actualizar el background script
              chrome.runtime.sendMessage({
                  action: "settingsUpdated",
                  blockedDomains,
                  disabledAPIs
              });
          }
      });
  });

  function showStatus(message, type) {
      statusEl.textContent = message;
      statusEl.className = `status-message ${type}`;
      statusEl.style.display = 'block';
      setTimeout(() => {
          statusEl.style.display = 'none';
      }, 3000);
  }
});