/* ========================================
   ROUTER.JS - View Management (Simulated Routing)
   ======================================== */

import { $, render, scrollToTop } from './dom.js';
import { store } from './store.js';
import { helpView } from '../views/helpView.js';
import { createStatsView } from '../views/statsView.js';

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = 'home';
        this.contentContainer = null;
    }

    // Route registrieren
    register(path, handler) {
        this.routes[path] = handler;
    }

    // Container setzen
    setContainer(selector) {
        this.contentContainer = $(selector);
    }

    // Route navigieren
    navigate(path) {
        if (!this.routes[path]) {
            console.error(`Route ${path} nicht gefunden`);
            return;
        }

        // Previous route cleanup
        if (this.routes[this.currentRoute]?.cleanup) {
            this.routes[this.currentRoute].cleanup();
        }

        // WICHTIG: Entferne menu-open um Scrolling zu ermöglichen
        document.body.classList.remove('menu-open');

        this.currentRoute = path;

        // View rendern
        const view = this.routes[path]();
        render(this.contentContainer, view);

        // Navigation aktiv markieren
        this.updateNavigation(path);

        // Scroll to top
        scrollToTop();

        // History API (optional)
        history.pushState({ route: path }, '', `#${path}`);
    }

    // Navigation UI updaten
    updateNavigation(activePath) {
        // Bottom Nav
        const navButtons = document.querySelectorAll('.nav-btn, [data-route]');
        navButtons.forEach(btn => {
            const route = btn.getAttribute('data-route');
            if (route === activePath) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Menu Links
        const menuLinks = document.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            const route = link.getAttribute('data-route');
            if (route === activePath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Init - Event Listener für Navigation
    init() {
        // Global Click Handler für alle data-route Links
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-route]');
            if (target) {
                e.preventDefault();
                const route = target.getAttribute('data-route');
                this.navigate(route);

                // Sandwich Menu schließen falls offen
                const sandwichMenu = $('#sandwich-menu');
                const overlay = $('#nav-overlay');
                if (sandwichMenu?.classList.contains('open')) {
                    sandwichMenu.classList.remove('open');
                    $('#sandwich-btn')?.classList.remove('active');
                    overlay?.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });

        // Browser Back/Forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.route) {
                this.navigate(e.state.route);
            }
        });

        // Initial Route aus Hash oder default zu home
        const hash = window.location.hash.substring(1);
        const initialRoute = hash && this.routes[hash] ? hash : 'home';
        this.navigate(initialRoute);
    }
}

// Singleton
const router = new Router();

// === VIEW TEMPLATES ===

// Home View
const homeView = () => {
    const wallet = store.getWallet();
    const stats = store.getStats();

    return `
        <div class="view">
            <h1 class="view-title">Willkommen OIDA!</h1>
            
            <div class="card text-center mb-xl">
                <div class="card-body">
                    <div class="currency currency-large mb-md">
                        💰 ${wallet} Schülling
                    </div>
                    <p class="text-secondary">Dein aktuelles Guthaben</p>
                </div>
            </div>

            <div class="grid grid-2 gap-md mb-xl">
                <div class="card text-center">
                    <div class="card-body">
                        <div class="text-4xl mb-sm">🎮</div>
                        <div class="text-2xl font-bold text-accent">${stats.gamesPlayed}</div>
                        <div class="text-sm text-secondary">Spiele gespielt</div>
                    </div>
                </div>
                <div class="card text-center">
                    <div class="card-body">
                        <div class="text-4xl mb-sm">🏆</div>
                        <div class="text-2xl font-bold text-accent-2">${stats.highScore}</div>
                        <div class="text-sm text-secondary">Highscore</div>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button class="btn btn-primary btn-large" data-route="game-select">
                    🎲 Spiel starten
                </button>
            </div>

            <div class="mt-xl text-center text-muted">
                <p>"Hau di über d'Häuser und rat ma wos!" 🎯</p>
            </div>
        </div>
    `;
};

// Game Select View
const gameSelectView = () => {
    return `
        <div class="view">
            <h1 class="view-title">Wähl dein Spiel OIDA</h1>
            
            <div class="grid grid-2 gap-lg">
                <div class="card game-card" data-game="capitals">
                    <div class="card-header text-center">
                        <div class="game-icon">🌍</div>
                        <h3 class="card-title">Hauptstädte OIDA</h3>
                    </div>
                    <div class="card-body">
                        <p class="text-secondary text-center">
                            Ratst du die richtigen Hauptstädte? 
                            Tipps kosten Schülling!
                        </p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary w-full" data-game-start="capitals">
                            Spielen
                        </button>
                    </div>
                </div>

                <div class="card game-card" data-game="population">
                    <div class="card-header text-center">
                        <div class="game-icon">👥</div>
                        <h3 class="card-title">Einwohner Battle</h3>
                    </div>
                    <div class="card-body">
                        <p class="text-secondary text-center">
                            Welche Stadt hat mehr Einwohner?
                            Rate richtig und verdien Schülling!
                        </p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary w-full" data-game-start="population">
                            Spielen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Stats View
const statsView = () => {
    return createStatsView(store);
};

// Settings View
const settingsView = () => {
    const theme = store.getSetting('theme');
    const accentColor = store.getSetting('accentColor') || 'green';
    const sound = store.getSetting('sound');
    const difficulty = store.getSetting('difficulty');

    return `
        <div class="view">
            <h1 class="view-title">Einstellungen</h1>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">🎨 Darstellung</h3>
                </div>
                <div class="card-body">
                    <div class="flex justify-between items-center mb-md">
                        <span>Theme:</span>
                        <button class="btn btn-outline btn-small" id="toggle-theme-btn">
                            ${theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                        </button>
                    </div>
                    
                    <div class="settings-section">
                        <div class="settings-label">Akzentfarbe:</div>
                        <div class="accent-colors-grid">
                            <button class="accent-color-btn ${accentColor === 'green' ? 'active' : ''}" data-color="green">
                                ${accentColor === 'green' ? '✓ ' : ''}Grün
                            </button>
                            <button class="accent-color-btn ${accentColor === 'blue' ? 'active' : ''}" data-color="blue">
                                ${accentColor === 'blue' ? '✓ ' : ''}Blau
                            </button>
                            <button class="accent-color-btn ${accentColor === 'purple' ? 'active' : ''}" data-color="purple">
                                ${accentColor === 'purple' ? '✓ ' : ''}Lila
                            </button>
                            <button class="accent-color-btn ${accentColor === 'pink' ? 'active' : ''}" data-color="pink">
                                ${accentColor === 'pink' ? '✓ ' : ''}Pink
                            </button>
                            <button class="accent-color-btn ${accentColor === 'orange' ? 'active' : ''}" data-color="orange">
                                ${accentColor === 'orange' ? '✓ ' : ''}Orange
                            </button>
                            <button class="accent-color-btn ${accentColor === 'yellow' ? 'active' : ''}" data-color="yellow">
                                ${accentColor === 'yellow' ? '✓ ' : ''}Gelb
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">🔊 Sound</h3>
                </div>
                <div class="card-body">
                    <div class="flex justify-between items-center">
                        <span>Sound Effekte:</span>
                        <button class="btn btn-outline btn-small" id="toggle-sound-btn">
                            ${sound ? '🔊 An' : '🔇 Aus'}
                        </button>
                    </div>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">⚙️ Spieleinstellungen</h3>
                </div>
                <div class="card-body">
                    <div class="flex justify-between items-center">
                        <span>Schwierigkeit:</span>
                        <select id="difficulty-select" class="btn btn-outline btn-small settings-select">
                            <option value="easy" ${difficulty === 'easy' ? 'selected' : ''}>Leicht</option>
                            <option value="medium" ${difficulty === 'medium' ? 'selected' : ''}>Mittel</option>
                            <option value="hard" ${difficulty === 'hard' ? 'selected' : ''}>Schwer</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">🛠️ Developer Tools</h3>
                </div>
                <div class="card-body">
                    <p class="text-muted mb-md settings-note">
                        Debug-Panel mit Console, State Inspector, Performance Monitor und mehr.
                    </p>
                    <div class="flex justify-between items-center mb-md">
                        <span>DevTools öffnen:</span>
                        <button class="btn btn-primary btn-small" id="open-devtools-btn">
                            🛠️ Öffnen
                        </button>
                    </div>
                    <div class="flex justify-between items-center">
                        <span>Tastenkombination:</span>
                        <span class="badge settings-version-badge">
                            Ctrl+Shift+D
                        </span>
                    </div>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">⚙️ Entwickler-Einstellungen</h3>
                </div>
                <div class="card-body">
                    <div class="flex justify-between items-center mb-md">
                        <div>
                            <div class="settings-dev-item-title">Debug Mode</div>
                            <div class="text-muted settings-dev-item-desc">Erweiterte Logs in der Console</div>
                        </div>
                        <button class="btn btn-outline btn-small" id="toggle-debug-btn">
                            ${store.getSetting('developer')?.debugMode ? '✅ An' : '❌ Aus'}
                        </button>
                    </div>
                    
                    <div class="flex justify-between items-center mb-md">
                        <div>
                            <div class="settings-dev-item-title">Auto-Open DevTools</div>
                            <div class="text-muted settings-dev-item-desc">DevTools beim Start öffnen</div>
                        </div>
                        <button class="btn btn-outline btn-small" id="toggle-auto-devtools-btn">
                            ${store.getSetting('developer')?.autoOpenDevTools ? '✅ An' : '❌ Aus'}
                        </button>
                    </div>

                    <div class="flex justify-between items-center mb-md">
                        <div>
                            <div class="settings-dev-item-title">Performance Monitor</div>
                            <div class="text-muted settings-dev-item-desc">FPS & Performance-Metriken</div>
                        </div>
                        <button class="btn btn-outline btn-small" id="toggle-perf-monitor-btn">
                            ${store.getSetting('developer')?.performanceMonitor ? '✅ An' : '❌ Aus'}
                        </button>
                    </div>

                    <div class="flex justify-between items-center mb-md">
                        <div class="settings-dev-flex">
                            <div class="settings-dev-label">Logging Level</div>
                            <select id="logging-level-select" class="btn btn-outline btn-small settings-select-full">
                                <option value="normal" ${store.getSetting('developer')?.loggingLevel === 'normal' ? 'selected' : ''}>Normal</option>
                                <option value="verbose" ${store.getSetting('developer')?.loggingLevel === 'verbose' ? 'selected' : ''}>Verbose</option>
                                <option value="debug" ${store.getSetting('developer')?.loggingLevel === 'debug' ? 'selected' : ''}>Debug</option>
                            </select>
                        </div>
                    </div>

                    <div class="pt-sm border-top">
                        <button class="btn btn-outline btn-small w-full mb-sm" id="clear-cache-btn">
                            🗑️ Cache leeren
                        </button>
                        <button class="btn btn-outline btn-small w-full" id="export-settings-btn">
                            📥 Einstellungen exportieren
                        </button>
                    </div>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">ℹ️ Über diese Version</h3>
                </div>
                <div class="card-body">
                    <div class="settings-info-grid">
                        <div class="settings-info-item">
                            <div class="settings-info-label">Versionsnummer</div>
                            <div class="settings-info-value settings-version-badge" id="settings-version">
                                v${store.getState().version || '1.0.0'}
                            </div>
                        </div>
                        <div class="settings-info-item">
                            <div class="settings-info-label">Build-Datum</div>
                            <div class="settings-info-value">
                                ${store.getState().buildDateFormatted || 'Unknown'}
                            </div>
                        </div>
                    </div>
                    <div class="settings-info-section">
                        <div class="settings-info-label">Repository</div>
                        <div class="settings-info-value settings-repo-link">
                            <a href="https://github.com/ochtii/Raten_oida" target="_blank" rel="noopener">
                                ochtii/Raten_oida ↗
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button class="btn btn-secondary" id="reset-all-btn">
                    ⚠️ Alles zurücksetzen
                </button>
            </div>
        </div>
    `;
};


export { router, homeView, gameSelectView, statsView, settingsView, helpView };
