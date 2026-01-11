/* ==========================================
   ROUTER.JS - SPA Routing System
   ========================================== */

export class Router {
    constructor(store) {
        this.store = store;
        this.viewModules = {};
        this.currentRoute = 'home';
        this.isLoading = false;
    }

    init() {
        console.log('📍 Router initialisiert');
    }

    async loadView(viewName) {
        if (!this.viewModules[viewName]) {
            const url = window.cacheBuster 
                ? window.cacheBuster.bustCache(`../views/${viewName}.js`, 'js')
                : `../views/${viewName}.js`;
            const module = await import(url);
            this.viewModules[viewName] = module[`${viewName}View`];
        }
        return this.viewModules[viewName];
    }

    async navigateTo(route) {
        const validRoutes = ['home', 'games', 'points', 'stats', 'settings', 'changelog', 'dev'];
        
        if (!validRoutes.includes(route)) {
            console.warn(`Route "${route}" nicht gefunden`);
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
        
        if (!container) {
            console.error('❌ Container #mainContent nicht gefunden!');
            this.isLoading = false;
            return;
        }

        // Route-spezifische Layout-Klassen setzen
        container.classList.toggle('settings-expanded', this.currentRoute === 'settings');

        try {
            const viewFunction = await this.loadView(this.currentRoute);
            const html = viewFunction(this.store);
            container.innerHTML = html;
            console.log('✅ View gerendert:', this.currentRoute);
            
            // Event auslösen für andere Module
            document.dispatchEvent(new CustomEvent('routeChanged', { 
                detail: { route: this.currentRoute } 
            }));
        } catch (error) {
            console.error('❌ Fehler beim Laden der View:', error);
            container.innerHTML = `
                <div class="error-view">
                    <h2>⚠️ Fehler</h2>
                    <p>View konnte nicht geladen werden: ${error.message}</p>
                </div>
            `;
        }
        
        this.isLoading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateActiveNav() {
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
