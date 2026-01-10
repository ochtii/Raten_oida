/* ==========================================
   ROUTER.JS - SPA Routing
   ========================================== */

// Cache-Buster für dynamische Imports
const v = window.CACHE_BUSTER || Date.now();

// Dynamische Imports mit Cache-Buster
const [
    { homeView },
    { gamesView },
    { statsView },
    { settingsView },
    { pointsView },
    { devView }
] = await Promise.all([
    import(`../views/home.js?v=${v}`),
    import(`../views/games.js?v=${v}`),
    import(`../views/stats.js?v=${v}`),
    import(`../views/settings.js?v=${v}`),
    import(`../views/points.js?v=${v}`),
    import(`../views/dev.js?v=${v}`)
]);

export class Router {
    constructor(store) {
        this.store = store;
        this.routes = {
            'home': homeView,
            'games': gamesView,
            'points': pointsView,
            'stats': statsView,
            'settings': settingsView,
            'dev': devView
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
        console.log('🎨 Rendering view:', this.currentRoute);
        console.log('📦 Container:', container);
        
        if (!container) {
            console.error('❌ Container #mainContent nicht gefunden!');
            return;
        }

        const viewFunction = this.routes[this.currentRoute];
        console.log('📄 View function:', viewFunction);
        
        const html = viewFunction(this.store);
        console.log('📝 Generated HTML length:', html.length);
        
        container.innerHTML = html;
        console.log('✅ View gerendert');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update active navigation
        this.updateActiveNav();
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
