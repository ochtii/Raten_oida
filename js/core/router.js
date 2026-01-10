/* ========================================
   ROUTER.JS - View Management (Simulated Routing)
   ======================================== */

import { $, render, scrollToTop } from './dom.js';
import { store } from './store.js';

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
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            const route = btn.getAttribute('data-route');
            if (route === activePath) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Sandwich Menu (falls offen)
        const menuLinks = document.querySelectorAll('.menu-list a');
        menuLinks.forEach(link => {
            const route = link.getAttribute('data-route');
            if (route === activePath) {
                link.style.color = 'var(--accent-primary)';
            } else {
                link.style.color = 'var(--text-primary)';
            }
        });
    }

    // Init - Event Listener für Navigation
    init() {
        // Bottom Nav Click Handler
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-route]');
            if (target) {
                e.preventDefault();
                const route = target.getAttribute('data-route');
                this.navigate(route);

                // Sandwich Menu schließen falls offen
                const sandwichMenu = $('#sandwich-menu');
                if (sandwichMenu?.classList.contains('open')) {
                    sandwichMenu.classList.remove('open');
                    $('#sandwich-btn')?.classList.remove('active');
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
export const router = new Router();

// === VIEW TEMPLATES ===

// Home View
export const homeView = () => {
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
export const gameSelectView = () => {
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
export const statsView = () => {
    const stats = store.getStats();
    const wallet = store.getWallet();
    
    const winRate = stats.gamesPlayed > 0 
        ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
        : 0;
    
    const capitalsAccuracy = stats.capitalsGame.played > 0
        ? Math.round((stats.capitalsGame.correct / stats.capitalsGame.played) * 100)
        : 0;
    
    const populationAccuracy = stats.populationGame.played > 0
        ? Math.round((stats.populationGame.correct / stats.populationGame.played) * 100)
        : 0;

    return `
        <div class="view">
            <h1 class="view-title">Deine Stats OIDA</h1>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">💰 Wirtschaft</h3>
                </div>
                <div class="card-body">
                    <div class="flex justify-between mb-md">
                        <span class="text-secondary">Aktuelles Guthaben:</span>
                        <span class="currency">${wallet} Schülling</span>
                    </div>
                    <div class="flex justify-between mb-md">
                        <span class="text-secondary">Gesamt verdient:</span>
                        <span class="text-accent">${stats.totalEarned} Schülling</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-secondary">Gesamt ausgegeben:</span>
                        <span class="text-accent-2">${stats.totalSpent} Schülling</span>
                    </div>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">🎮 Allgemein</h3>
                </div>
                <div class="card-body">
                    <div class="flex justify-between mb-md">
                        <span class="text-secondary">Spiele gespielt:</span>
                        <span class="font-bold">${stats.gamesPlayed}</span>
                    </div>
                    <div class="flex justify-between mb-md">
                        <span class="text-secondary">Spiele gewonnen:</span>
                        <span class="font-bold">${stats.gamesWon}</span>
                    </div>
                    <div class="flex justify-between mb-md">
                        <span class="text-secondary">Gewinnrate:</span>
                        <span class="font-bold text-accent">${winRate}%</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-secondary">Highscore:</span>
                        <span class="font-bold text-accent-2">${stats.highScore}</span>
                    </div>
                </div>
            </div>

            <div class="grid grid-2 gap-md mb-lg">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title text-lg">🌍 Hauptstädte</h4>
                    </div>
                    <div class="card-body">
                        <div class="text-sm text-secondary mb-sm">Gespielt: ${stats.capitalsGame.played}</div>
                        <div class="text-sm text-secondary mb-sm">Richtig: ${stats.capitalsGame.correct}</div>
                        <div class="text-sm text-secondary mb-sm">Genauigkeit: ${capitalsAccuracy}%</div>
                        <div class="text-sm text-accent">Max Streak: ${stats.capitalsGame.maxStreak}</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title text-lg">👥 Einwohner</h4>
                    </div>
                    <div class="card-body">
                        <div class="text-sm text-secondary mb-sm">Gespielt: ${stats.populationGame.played}</div>
                        <div class="text-sm text-secondary mb-sm">Richtig: ${stats.populationGame.correct}</div>
                        <div class="text-sm text-secondary mb-sm">Genauigkeit: ${populationAccuracy}%</div>
                        <div class="text-sm text-accent">Max Streak: ${stats.populationGame.maxStreak}</div>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button class="btn btn-outline" id="reset-stats-btn">
                    🔄 Stats zurücksetzen
                </button>
            </div>
        </div>
    `;
};

// Settings View
export const settingsView = () => {
    const theme = store.getSetting('theme');
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
                        <select id="difficulty-select" class="btn btn-outline btn-small" style="padding: 0.5rem;">
                            <option value="easy" ${difficulty === 'easy' ? 'selected' : ''}>Leicht</option>
                            <option value="medium" ${difficulty === 'medium' ? 'selected' : ''}>Mittel</option>
                            <option value="hard" ${difficulty === 'hard' ? 'selected' : ''}>Schwer</option>
                        </select>
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
