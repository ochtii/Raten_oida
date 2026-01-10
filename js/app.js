/* ==========================================
   APP.JS - Main Application Entry Point
   ========================================== */

// Cache-Buster für alle Module
const v = window.CACHE_BUSTER || Date.now();

class App {
    constructor() {
        this.store = null;
        this.router = null;
        this.ui = null;
        this.isRendering = false;
    }

    async init() {
        // Dynamische Imports mit Cache-Buster
        const [{ Router }, { Store }, { UI }, { DebugConsole }] = await Promise.all([
            import(`./core/router.js?v=${v}`),
            import(`./core/store.js?v=${v}`),
            import(`./core/ui.js?v=${v}`),
            import(`./core/debug-console.js?v=${v}`)
        ]);
        
        this.store = new Store();
        this.router = new Router(this.store);
        this.ui = new UI(this.store);
        this.debugConsole = new DebugConsole();
        
        console.log('🚀 Raten OIDA gestartet');
        console.log('📦 Store:', this.store);
        console.log('📍 Router:', this.router);
        console.log('🎨 UI:', this.ui);
        
        // App global verfügbar machen für Settings
        window.app = this;
        
        // Debug Console initialisieren
        this.debugConsole.init();
        console.log('✅ Debug Console initialisiert');
        
        // UI initialisieren
        this.ui.init();
        console.log('✅ UI initialisiert');
        
        // Router initialisieren
        this.router.init();
        console.log('✅ Router initialisiert');
        
        // Event Listeners
        this.setupEventListeners();
        console.log('✅ Event Listeners registriert');
        
        // Initial route laden
        const initialRoute = window.location.hash.slice(1) || 'home';
        console.log('📍 Navigiere zu:', initialRoute);
        await this.router.navigateTo(initialRoute);
        
        // Store-Updates überwachen
        this.store.subscribe(() => this.onStoreUpdate());
        console.log('✅ App vollständig geladen');
    }

    setupEventListeners() {
        // Menu Toggle
        const menuBtn = document.getElementById('menuBtn');
        const menuCloseBtn = document.getElementById('menuCloseBtn');
        const overlay = document.getElementById('overlay');
        const sideMenu = document.getElementById('sideMenu');

        const toggleMenu = () => {
            sideMenu?.classList.toggle('active');
            overlay?.classList.toggle('active');
            menuBtn?.classList.toggle('active');
        };

        menuBtn?.addEventListener('click', toggleMenu);
        menuCloseBtn?.addEventListener('click', toggleMenu);
        overlay?.addEventListener('click', toggleMenu);

        // Event Delegation für Navigation - funktioniert auch für dynamisch erstellte Elemente
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-route]');
            if (link) {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                
                // Menu schließen wenn offen
                if (sideMenu?.classList.contains('active')) {
                    toggleMenu();
                }
                
                this.router.navigateTo(route);
            }
        });

        // Hash Change
        window.addEventListener('hashchange', () => {
            this.router.navigateTo(window.location.hash.slice(1) || 'home');
        });
    }

    onStoreUpdate() {
        // Wallet in Navigation aktualisieren
        const walletDisplay = document.getElementById('walletDisplay');
        if (walletDisplay) {
            walletDisplay.textContent = this.store.getWallet().toLocaleString('de-DE');
        }
        
        // View nur neu rendern wenn nicht bereits am rendern und auf Home-Seite
        // NICHT automatisch neu rendern - das verursacht das Blinken
    }
}

// App starten
document.addEventListener('DOMContentLoaded', async () => {
    const app = new App();
    await app.init();
});
