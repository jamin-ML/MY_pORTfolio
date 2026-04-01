/* ============================
   BINARY RAIN ANIMATION
   Matrix-style Binary Rain Effect
   ============================ */

class BinaryRain {
  constructor() {
    this.canvas = document.getElementById('binary-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Detect mobile device
    this.isMobile = window.innerWidth <= 768;
    this.isSmallMobile = window.innerWidth <= 400;
    
    // Color scheme
    this.colors = {
      primary: '#00FF41',    // Matrix Green
      secondary: '#00CC33',  // Darker Green
      tertiary: '#00FF99'    // Lighter Green
    };
    
    // Binary rain settings (adjusted for mobile)
    this.fontSize = this.isMobile ? 12 : 14;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    
    // Reduce columns on mobile for better performance
    if (this.isMobile) {
      this.columns = Math.floor(this.columns / 2);
    }
    if (this.isSmallMobile) {
      this.columns = Math.floor(this.columns / 3);
    }
    
    this.drops = new Array(this.columns).fill(1);
    
    this.binary = '01';
    this.startTime = Date.now();
    this.isRunning = true;
    this.frameCount = 0;
    
    // Start animation
    this.animate();
    
    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());
    
    // Pause on visibility change
    document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
  }
  
  animate() {
    if (!this.isRunning) {
      requestAnimationFrame(() => this.animate());
      return;
    }
    
    // Skip frames on mobile for better performance
    this.frameCount++;
    if (this.isMobile && this.frameCount % 2 !== 0) {
      requestAnimationFrame(() => this.animate());
      return;
    }
    if (this.isSmallMobile && this.frameCount % 3 !== 0) {
      requestAnimationFrame(() => this.animate());
      return;
    }
    
    // Semi-transparent background for trail effect
    this.ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Set text properties
    this.ctx.fillStyle = this.getColor();
    this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
    this.ctx.textAlign = 'center';
    
    // Draw and animate drops
    for (let i = 0; i < this.drops.length; i++) {
      const text = this.binary[Math.floor(Math.random() * this.binary.length)];
      this.ctx.fillText(
        text,
        i * this.fontSize,
        this.drops[i] * this.fontSize
      );
      
      // Randomize drop speed and reset
      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      } else {
        this.drops[i]++;
      }
    }
    
    requestAnimationFrame(() => this.animate());
  }
  
  getColor() {
    // Cycle through colors based on time
    const colors = [
      this.colors.primary,
      this.colors.secondary,
      this.colors.tertiary
    ];
    const index = Math.floor((Date.now() - this.startTime) / 1000) % colors.length;
    return colors[index];
  }
  
  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Update mobile detection on resize
    this.isMobile = window.innerWidth <= 768;
    this.isSmallMobile = window.innerWidth <= 400;
    
    // Adjust font size for mobile
    this.fontSize = this.isMobile ? 12 : 14;
    
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    
    // Reduce columns on mobile for better performance
    if (this.isMobile) {
      this.columns = Math.floor(this.columns / 2);
    }
    if (this.isSmallMobile) {
      this.columns = Math.floor(this.columns / 3);
    }
    
    this.drops = new Array(this.columns).fill(1);
  }
  
  handleVisibilityChange() {
    this.isRunning = !document.hidden;
  }
  
  pause() {
    this.isRunning = false;
  }
  
  resume() {
    this.isRunning = true;
  }
  
  destroy() {
    this.isRunning = false;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  globalThis.binaryRain = new BinaryRain();
  
  console.log('%c Binary Rain Initialized 🟢', 'color: #00FF41; font-size: 14px;');
});

// Cleanup before unload
globalThis.addEventListener('beforeunload', () => {
  if (globalThis.binaryRain) {
    globalThis.binaryRain.destroy();
  }
});
