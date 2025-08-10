/**
 * Content Script - Microsoft Recall Blocker
 * Protects against screen capture and canvas fingerprinting
 */

const PROTECTION_CONFIG = {
  logPrefix: '[Recall Defender]',
  blockedAPIs: {
    screenCapture: true,     // Block screen sharing API
    canvasFingerprinting: true, // Prevent canvas fingerprinting
    webRTC: false           // Optional: Enable to block WebRTC leaks
  }
};

// Neutralize screen capture API
if (PROTECTION_CONFIG.blockedAPIs.screenCapture) {
  const originalGetDisplayMedia = navigator.mediaDevices?.getDisplayMedia;
  if (originalGetDisplayMedia) {
    navigator.mediaDevices.getDisplayMedia = async () => {
      console.warn(`${PROTECTION_CONFIG.logPrefix} Screen capture blocked`);
      throw new DOMException('Permission denied', 'NotAllowedError');
    };
  }
}

// Advanced canvas fingerprinting protection
if (PROTECTION_CONFIG.blockedAPIs.canvasFingerprinting) {
  const setupCanvasProtection = () => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    
    HTMLCanvasElement.prototype.getContext = function(type, ...args) {
      if (type === '2d') {
        console.warn(`${PROTECTION_CONFIG.logPrefix} Canvas API modified`);
        const ctx = originalGetContext.apply(this, [type, ...args]);
        
        // Anti-fingerprinting modifications
        ctx.fillText = () => {};  // Disable text rendering
        ctx.getImageData = () => new ImageData(1, 1); // Fake image data
        ctx.measureText = () => ({ width: 0 }); // Disable text measurement
        
        return ctx;
      }
      return originalGetContext.apply(this, [type, ...args]);
    };
  };

  // Apply protection when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCanvasProtection);
  } else {
    setupCanvasProtection();
  }
}