document.addEventListener('DOMContentLoaded', () => {
    const logsDiv = document.getElementById('logs');
    const clearBtn = document.getElementById('clearLogs');
  
    // Mostrar registros guardados
    chrome.storage.local.get(['activityLogs'], (data) => {
      if (data.activityLogs) {
        data.activityLogs.forEach(log => {
          logsDiv.innerHTML += `<div class="log-entry">[${log.time}] ${log.message}</div>`;
        });
      }
    });
  
    // Borrar registros
    clearBtn.addEventListener('click', () => {
      chrome.storage.local.set({ activityLogs: [] }, () => {
        logsDiv.innerHTML = '';
      });
    });
  });