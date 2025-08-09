// Neutraliza getDisplayMedia()
if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
    navigator.mediaDevices.getDisplayMedia = () => {
      console.warn("[Recall Defender] Screen capture blocked!");
      return Promise.reject(new Error("Permission denied by Recall Defender"));
    };
  }
  
  // Protección contra fingerprinting de Canvas
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function() {
    if (arguments[0] === "2d") {
      console.warn("[Recall Defender] Canvas API calls modified");
      const ctx = originalGetContext.apply(this, arguments);
      ctx.fillText = () => {}; // Sabotea funciones críticas
      return ctx;
    }
    return originalGetContext.apply(this, arguments);
  };