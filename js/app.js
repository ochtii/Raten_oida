/* ==========================================
   APP.JS - Main Application Entry Point
   ========================================== */

import { Router } from './core/router.js';
import { Store } from './core/store.js';
import { UI } from './core/ui.js';

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

        // Navigation Items
        document.querySelectorAll('[data-route]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = e.currentTarget.getAttribute('data-route');
                
                // Menu schließen wenn mobil
                if (window.innerWidth < 768) {
                    toggleMenu();
                }
                
                this.router.navigateTo(route);
            });
        });

        // Hash Change
        window.addEventListener('hashchange', () => {
            this.router.navigateTo(window.location.hash.slice(1) || 'home');
        });
    }

    onStoreUpdate() {
        // Wallet aktualisieren
        const walletDisplay = document.getElementById('walletDisplay');
        if (walletDisplay) {
            walletDisplay.textContent = this.store.getWallet().toLocaleString('de-DE');
        }
    }
}

// App starten
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
