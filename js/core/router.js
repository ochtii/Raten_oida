/* ==========================================
   ROUTER.JS - SPA Routing mit Cache-Busting
   ========================================== */

// View Module werden dynamisch geladen mit Cache-Buster (wenn aktiviert)
const v = window.CACHE_BUSTER;
const cacheBusterQuery = (v && v !== 'disabled') ? `?v=${v}` : '';

export class Router {
    constructor(store) {
        this.store = store;
        this.viewModules = {};
        this.currentRoute = 'home';
        this.isLoading = false;
    }

    async loadView(viewName) {
        if (!this.viewModules[viewName]) {
            const module = await import(`../views/${viewName}.js${cacheBusterQuery}`);
            this.viewModules[viewName] = module[`${viewName}View`];
        }
        return this.viewModules[viewName];
    }

    init() {
        console.log('📍 Router initialisiert');
    }

    async navigateTo(route) {
        const validRoutes = ['home', 'games', 'points', 'stats', 'settings', 'dev'];
        
        if (!validRoutes.includes(route)) {
            console.warn(`Route "${route}" not found`);
            route = 'home';
        }

        this.currentRoute = route;
        window.location.hash = route;
        await this.render();
        this.updateActiveNav();
    }

    async render() {
        if (this.isLoading) return;
        this.isLoading = true;
        
        const container = document.getElementById('mainContent');
        console.log('🎨 Rendering view:', this.currentRoute);
        
        if (!container) {
            console.error('❌ Container #mainContent nicht gefunden!');
            this.isLoading = false;
            return;
        }

        try {
            const viewFunction = await this.loadView(this.currentRoute);
            console.log('📄 View function:', viewFunction);
            
            const html = viewFunction(this.store);
            console.log('📝 Generated HTML length:', html.length);
            
            container.innerHTML = html;
            console.log('✅ View gerendert');
        } catch (error) {
            console.error('❌ Fehler beim Laden der View:', error);
            container.innerHTML = `<div class="error">Fehler beim Laden: ${error.message}</div>`;
        }
        
        this.isLoading = false;
        
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
