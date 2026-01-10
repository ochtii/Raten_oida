/* ==========================================
   ROUTER.JS - SPA Routing
   ========================================== */

import { homeView } from '../views/home.js';
import { gamesView } from '../views/games.js';
import { statsView } from '../views/stats.js';
import { settingsView } from '../views/settings.js';

export class Router {
    constructor(store) {
        this.store = store;
        this.routes = {
            'home': homeView,
            'games': gamesView,
            'stats': statsView,
            'settings': settingsView
        };
        this.currentRoute = 'home';
    }

    init() {
        console.log('📍 Router initialisiert');
    }

    navigateTo(route) {
        if (!this.routes[route]) {
            console.warn(`Route "${route}" not found`);
            route = 'home';
        }

        this.currentRoute = route;
        window.location.hash = route;
        this.render();
        this.updateActiveNav();
    }

    render() {
        const container = document.getElementById('mainContent');
        if (!container) return;

        const viewFunction = this.routes[this.currentRoute];
        container.innerHTML = viewFunction(this.store);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateActiveNav() {
        // Update all nav items
        document.querySelectorAll('[data-route]').forEach(item => {
            const route = item.getAttribute('data-route');
            if (route === this.currentRoute) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}
