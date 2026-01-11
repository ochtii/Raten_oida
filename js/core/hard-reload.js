/* ==========================================
   HARD RELOAD SYSTEM
   Complete cache-free reload for GitHub Pages
   ========================================== */

window.performHardReload = function() {
    // Show notification before reload
    if (window.app && window.app.ui) {
        window.app.ui.showNotification('🚀 Hard Reload gestartet - Alle Caches werden geleert...', 'info');
    }
    
    // GitHub Pages URL (adjust if different)
    const baseUrl = 'https://ochtii.github.io/Raten_oida/';
    
    // Generate unique cache-busting timestamp
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);
    
    // Build URL with aggressive cache-busting parameters
    const hardReloadUrl = `${baseUrl}?_nocache=${timestamp}&_cb=${randomId}&_reload=hard&_v=${timestamp}`;
    
    // Clear all browser caches
    try {
        // Clear Service Worker caches if available
        if ('caches' in window) {
            caches.keys().then(function(cacheNames) {
                cacheNames.forEach(function(cacheName) {
                    caches.delete(cacheName);
                });
            });
        }
        
        // Unregister Service Workers
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
                registrations.forEach(function(registration) {
                    registration.unregister();
                });
            });
        }
        
        // Optional: Clear localStorage and sessionStorage
        // Uncomment if you want to clear all app data
        // localStorage.clear();
        // sessionStorage.clear();
        
    } catch (error) {
        console.error('Error clearing caches:', error);
    }
    
    // Wait a bit for cleanup, then perform hard navigation
    setTimeout(() => {
        // Use location.replace() for hard reload without back button entry
        window.location.replace(hardReloadUrl);
    }, 500);
};
