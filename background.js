chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      const blockedDomains = [
        "*://*.telemetry.microsoft.com/*",
        "*://recall.windows.com/*"
      ];
      if (blockedDomains.some(domain => details.url.match(domain))) {
        return { cancel: true }; // Bloquea la solicitud
      }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );