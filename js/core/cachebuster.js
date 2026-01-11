/* ==========================================
   CACHEBUSTER SYSTEM - Enhanced with HTML Support
   ========================================== */

class CacheBuster {
    constructor() {
        this.enabled = localStorage.getItem('cacheBusterEnabled') !== 'false';
        this.htmlEnabled = localStorage.getItem('cacheBusterHTML') !== 'false';
        this.cssEnabled = localStorage.getItem('cacheBusterCSS') !== 'false';
        this.jsEnabled = localStorage.getItem('cacheBusterJS') !== 'false';
        this.timestamp = Date.now();
        this.buildId = this.generateBuildId();
        
        if (this.enabled) {
            this.showBanner();
        }
    }
    
    generateBuildId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Append cache buster to URL
    bustCache(url, type = 'auto') {
        if (!this.enabled) return url;
        
        // Auto-detect type from URL if not specified
        if (type === 'auto') {
            if (url.endsWith('.html')) type = 'html';
            else if (url.endsWith('.css')) type = 'css';
            else if (url.endsWith('.js')) type = 'js';
        }
        
        // Check if this type is enabled
        if (type === 'html' && !this.htmlEnabled) return url;
        if (type === 'css' && !this.cssEnabled) return url;
        if (type === 'js' && !this.jsEnabled) return url;
        
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}_cb=${this.buildId}`;
    }
    
    // Show cachebuster banner
    showBanner() {
        // Remove existing banner
        const existing = document.getElementById('cachebuster-banner');
        if (existing) existing.remove();
        
        const banner = document.createElement('div');
        banner.id = 'cachebuster-banner';
        banner.className = 'cachebuster-banner';
        
        const activeTypes = [];
        if (this.htmlEnabled) activeTypes.push('HTML');
        if (this.cssEnabled) activeTypes.push('CSS');
        if (this.jsEnabled) activeTypes.push('JS');
        
        banner.innerHTML = `
            <div class="cachebuster-content">
                <div class="cachebuster-icon">🔄</div>
                <div class="cachebuster-info">
                    <div class="cachebuster-title">Cachebuster Aktiv</div>
                    <div class="cachebuster-details">
                        <span class="cachebuster-types">${activeTypes.join(' • ')}</span>
                        <span class="cachebuster-separator">|</span>
                        <span class="cachebuster-build">Build: ${this.buildId.split('-')[1]}</span>
                        <span class="cachebuster-separator">|</span>
                        <span class="cachebuster-time">${new Date(this.timestamp).toLocaleTimeString('de-DE')}</span>
                    </div>
                </div>
                <button class="cachebuster-close" onclick="window.cacheBuster.hideBanner()" title="Banner ausblenden">✕</button>
            </div>
        `;
        
        document.body.insertBefore(banner, document.body.firstChild);
        
        // Auto-hide after 10 seconds
        setTimeout(() => banner.classList.add('cachebuster-banner-minimized'), 10000);
    }
    
    hideBanner() {
        const banner = document.getElementById('cachebuster-banner');
        if (banner) {
            banner.style.animation = 'slideOutTop 0.3s ease-out';
            setTimeout(() => banner.remove(), 300);
        }
    }
    
    // Toggle specific type
    toggleType(type) {
        const key = `cacheBuster${type.toUpperCase()}`;
        const current = localStorage.getItem(key) !== 'false';
        const newState = !current;
        
        localStorage.setItem(key, newState.toString());
        this[`${type}Enabled`] = newState;
        
        // Update build ID when toggling
        this.buildId = this.generateBuildId();
        this.timestamp = Date.now();
        
        // Refresh banner
        if (this.enabled) {
            this.showBanner();
        }
        
        return newState;
    }
    
    // Enable/disable entire system
    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('cacheBusterEnabled', this.enabled.toString());
        
        if (this.enabled) {
            this.buildId = this.generateBuildId();
            this.timestamp = Date.now();
            this.showBanner();
        } else {
            this.hideBanner();
        }
        
        return this.enabled;
    }
    
    // Get current status
    getStatus() {
        return {
            enabled: this.enabled,
            html: this.htmlEnabled,
            css: this.cssEnabled,
            js: this.jsEnabled,
            buildId: this.buildId,
            timestamp: this.timestamp
        };
    }
}

// Initialize global cachebuster
window.cacheBuster = new CacheBuster();

export default CacheBuster;
