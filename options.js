document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('saveBtn');
    
    // Cargar configuración guardada
    chrome.storage.sync.get(['blockedDomains', 'disabledAPIs'], (data) => {
      if (data.blockedDomains) {
        document.getElementById('blockedDomains').value = data.blockedDomains.join('\n');
      }
      if (data.disabledAPIs) {
        document.getElementById('disableScreenCapture').checked = data.disabledAPIs.includes('getDisplayMedia');
        document.getElementById('disableCanvas').checked = data.disabledAPIs.includes('Canvas');
        document.getElementById('disableWebRTC').checked = data.disabledAPIs.includes('WebRTC');
      }
    });
  
    // Guardar configuración
    saveBtn.addEventListener('click', () => {
      const blockedDomains = document.getElementById('blockedDomains').value
        .split('\n')
        .map(domain => domain.trim())
        .filter(domain => domain);
      
      const disabledAPIs = [];
      if (document.getElementById('disableScreenCapture').checked) disabledAPIs.push('getDisplayMedia');
      if (document.getElementById('disableCanvas').checked) disabledAPIs.push('Canvas');
      if (document.getElementById('disableWebRTC').checked) disabledAPIs.push('WebRTC');
  
      chrome.storage.sync.set({ blockedDomains, disabledAPIs }, () => {
        alert('¡Configuración guardada!');
      });
    });
  });