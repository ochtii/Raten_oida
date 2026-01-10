/* ==========================================
   APP.JS - Main Application Entry Point
   ========================================== */

// Cache Buster für alle Imports
const cacheBuster = new Date().getTime();

import { Router } from `./core/router.js?v=${cacheBuster}`;
import { Store } from `./core/store.js?v=${cacheBuster}`;
import { UI } from `./core/ui.js?v=${cacheBuster}`;

class App {
    constructor() {
        this.store = new Store();
        this.router = new Router(this.store);
        this.ui = new UI(this.store);
    }

    init() {
        console.log('🚀 Raten OIDA gestartet');
        console.log('📦 Store:', this.store);
        console.log('📍 Router:', this.router);
        console.log('🎨 UI:', this.ui);
        
        // App global verfügbar machen für Settings
        window.app = this;
        
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
        this.router.navigateTo(initialRoute);
        
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
            sideMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            menuBtn.classList.toggle('active');
        };

        menuBtn?.addEventListener('click', toggleMenu);
        menuCloseBtn?.addEventListener('click', toggleMenu);
        overlay?.addEventListener('click', toggleMenu);

        // Navigation Items - Bind initial navigation
        this.bindNavigation(sideMenu, toggleMenu);

        // Hash Change
        window.addEventListener('hashchange', () => {
            this.router.navigateTo(window.location.hash.slice(1) || 'home');
        });
    }

    bindNavigation(sideMenu, toggleMenu) {
        // Navigation Items
        document.querySelectorAll('[data-route]').forEach(link => {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                const route = e.currentTarget.getAttribute('data-route');
                
                // Menu nur schließen wenn es ein Side-Menu Link ist (nicht Bottom-Nav)
                if (sideMenu && sideMenu.classList.contains('active')) {
                    toggleMenu();
                }
                
                this.router.navigateTo(route);
            });
        });
    }

    onStoreUpdate() {
        // Wallet in Navigation aktualisieren
        const walletDisplay = document.getElementById('walletDisplay');
        if (walletDisplay) {
            walletDisplay.textContent = this.store.getWallet().toLocaleString('de-DE');
        }
        
        // View neu rendern, wenn auf Home-Seite
        if (this.router.currentRoute === 'home') {
            this.router.render();
        }
    }
}

// App starten
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
