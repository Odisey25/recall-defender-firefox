document.addEventListener('DOMContentLoaded', () => {
    const masterSwitch = document.getElementById('masterSwitch');
    const advancedBtn = document.getElementById('advancedBtn');
    const viewLogsBtn = document.getElementById('viewLogsBtn');
  
    // Cargar estado guardado
    chrome.storage.sync.get(['isActive'], (data) => {
      masterSwitch.checked = (data.isActive !== false);
    });
  
    // Guardar cambios
    masterSwitch.addEventListener('change', () => {
      chrome.storage.sync.set({ isActive: masterSwitch.checked });
      chrome.runtime.sendMessage({ action: "toggle", state: masterSwitch.checked });
    });
  
    // Abrir página de opciones
    advancedBtn.addEventListener('click', () => {
      chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
    });
  
    // Abrir registros
    viewLogsBtn.addEventListener('click', () => {
      chrome.tabs.create({ url: chrome.runtime.getURL('logs.html') });
    });
  
    // Actualizar estadísticas (ejemplo)
    chrome.runtime.sendMessage({ action: "getStats" }, (response) => {
      document.getElementById('blockedCount').textContent = response.blockedDomains || 0;
      document.getElementById('apisBlocked').textContent = response.blockedAPIs || 0;
      document.getElementById('containersActive').textContent = response.containers || 0;
    });
  });