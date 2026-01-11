/* ==========================================
   APP.JS - Main Application Entry Point
   ========================================== */

// Global Cache-Buster Helper
window.getCacheBuster = () => {
    const v = window.CACHE_BUSTER;
    return (v && v !== 'disabled') ? `?v=${v}` : '';
};

class App {
    constructor() {
        this.store = null;
        this.router = null;
        this.ui = null;
        this.debugConsole = null;
    }

    async init() {
        try {
            console.log('🚀 Raten OIDA wird initialisiert...');
            
            const cb = window.getCacheBuster();
            
            // Module laden
            const [
                { Router },
                { Store },
                { UI },
                { DebugConsole }
            ] = await Promise.all([
                import(`./core/router.js${cb}`),
                import(`./core/store.js${cb}`),
                import(`./core/ui.js${cb}`),
                import(`./core/debug-console.js${cb}`)
            ]);
            
            // Instanzen erstellen
            this.store = new Store();
            this.router = new Router(this.store);
            this.ui = new UI(this.store);
            this.debugConsole = new DebugConsole();
            
            // Global verfügbar machen
            window.app = this;
            
            // Komponenten initialisieren
            this.debugConsole.init();
            this.ui.init();
            this.router.init();
            
            // Einstellungen synchronisieren
            this.ui.syncSettings();
            
            // Event Listeners
            this.setupEventListeners();
            
            // Initial Route laden
            const initialRoute = window.location.hash.slice(1) || 'home';
            await this.router.navigateTo(initialRoute);
            
            // Store Updates überwachen
            this.store.subscribe(() => this.onStoreUpdate());
            
            // Footer-Info bei jedem Reload aktualisieren
            setTimeout(() => {
                if (typeof window.updateFooterInfo === 'function') {
                    window.updateFooterInfo();
                }
            }, 100);
            
            console.log('✅ App erfolgreich geladen');
        } catch (error) {
            console.error('❌ Fehler beim Laden der App:', error);
        }
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

        // Navigation - Event Delegation
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-route]');
            if (link) {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                
                // Menu schließen
                if (sideMenu?.classList.contains('active')) {
                    toggleMenu();
                }
                
                this.router.navigateTo(route);
            }
        });

        // Hash Change
        window.addEventListener('hashchange', () => {
            const route = window.location.hash.slice(1) || 'home';
            this.router.navigateTo(route);
        });
    }

    onStoreUpdate() {
        // Wallet in Navigation aktualisieren
        const walletDisplay = document.getElementById('walletDisplay');
        if (walletDisplay) {
            const wallet = this.store.getWallet() ?? 0;
            walletDisplay.textContent = wallet.toLocaleString('de-DE');
        }
    }
}

// App starten nach DOM Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        const app = new App();
        await app.init();
    });
} else {
    // DOM bereits geladen
    (async () => {
        const app = new App();
        await app.init();
    })();
}

// Footer Info Funktion - global verfügbar
window.updateFooterInfo = () => {
    const enabled = localStorage.getItem('footerInfoEnabled') !== 'false';
    let footer = document.getElementById('appFooterInfo');
    const bottomNav = document.querySelector('.bottom-nav');
    
    if (enabled) {
        if (!footer) {
            footer = document.createElement('div');
            footer.id = 'appFooterInfo';
            footer.className = 'app-footer-info';
            // Footer zu #app hinzufügen statt zu body
            const app = document.getElementById('app');
            if (app) {
                app.appendChild(footer);
            } else {
                document.body.appendChild(footer);
            }
        }
        
        // Version und Build-Datum aus version.json laden
        fetch('./version.json')
            .then(response => response.json())
            .then(versionData => {
                const version = versionData.version;
                const buildDate = new Date(versionData.buildDate).toLocaleString('de-DE');
                footer.innerHTML = `
                    <a href="#changelog" data-route="changelog" class="footer-version">v${version}</a>
                    <span class="footer-separator">|</span>
                    <span class="footer-date">Build: ${buildDate}</span>
                `;
            })
            .catch(error => {
                console.error('Fehler beim Laden der Version:', error);
                // Fallback: Nur Datum, Version wird nachgeladen
                const buildDate = new Date().toLocaleString('de-DE');
                footer.innerHTML = `
                    <a href="#changelog" data-route="changelog" class="footer-version">v1.3.3.7</a>
                    <span class="footer-separator">|</span>
                    <span class="footer-date">Build: ${buildDate}</span>
                `;
            });
        
        footer.style.display = 'flex';
        // Bottom Navigation nach oben verschieben
        if (bottomNav) {
            bottomNav.classList.add('with-footer');
        }
    } else {
        if (footer) {
            footer.style.display = 'none';
        }
        // Bottom Navigation zurück an ursprüngliche Position
        if (bottomNav) {
            bottomNav.classList.remove('with-footer');
        }
    }
};
