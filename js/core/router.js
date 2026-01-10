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
                    
                    <div style="margin-bottom: var(--spacing-sm);">
                        <div style="font-weight: 600; margin-bottom: var(--spacing-sm);">Akzentfarbe:</div>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-sm);">
                            <button class="accent-color-btn ${accentColor === 'green' ? 'active' : ''}" data-color="green" style="background: #00ff88; color: #000;">
                                ${accentColor === 'green' ? '✓ ' : ''}Grün
                            </button>
                            <button class="accent-color-btn ${accentColor === 'blue' ? 'active' : ''}" data-color="blue" style="background: #00ddff; color: #000;">
                                ${accentColor === 'blue' ? '✓ ' : ''}Blau
                            </button>
                            <button class="accent-color-btn ${accentColor === 'purple' ? 'active' : ''}" data-color="purple" style="background: #a855f7; color: #fff;">
                                ${accentColor === 'purple' ? '✓ ' : ''}Lila
                            </button>
                            <button class="accent-color-btn ${accentColor === 'pink' ? 'active' : ''}" data-color="pink" style="background: #ff0066; color: #fff;">
                                ${accentColor === 'pink' ? '✓ ' : ''}Pink
                            </button>
                            <button class="accent-color-btn ${accentColor === 'orange' ? 'active' : ''}" data-color="orange" style="background: #ff9500; color: #000;">
                                ${accentColor === 'orange' ? '✓ ' : ''}Orange
                            </button>
                            <button class="accent-color-btn ${accentColor === 'yellow' ? 'active' : ''}" data-color="yellow" style="background: #ffcc00; color: #000;">
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
                        <select id="difficulty-select" class="btn btn-outline btn-small" style="padding: 0.5rem;">
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
                    <p class="text-muted mb-md" style="font-size: 0.875rem;">
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
                        <span class="badge" style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-family: monospace; font-size: 0.75rem;">
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
                            <div style="font-weight: 600;">Debug Mode</div>
                            <div class="text-muted" style="font-size: 0.75rem;">Erweiterte Logs in der Console</div>
                        </div>
                        <button class="btn btn-outline btn-small" id="toggle-debug-btn">
                            ${store.getSetting('developer')?.debugMode ? '✅ An' : '❌ Aus'}
                        </button>
                    </div>
                    
                    <div class="flex justify-between items-center mb-md">
                        <div>
                            <div style="font-weight: 600;">Auto-Open DevTools</div>
                            <div class="text-muted" style="font-size: 0.75rem;">DevTools beim Start öffnen</div>
                        </div>
                        <button class="btn btn-outline btn-small" id="toggle-auto-devtools-btn">
                            ${store.getSetting('developer')?.autoOpenDevTools ? '✅ An' : '❌ Aus'}
                        </button>
                    </div>

                    <div class="flex justify-between items-center mb-md">
                        <div>
                            <div style="font-weight: 600;">Performance Monitor</div>
                            <div class="text-muted" style="font-size: 0.75rem;">FPS & Performance-Metriken</div>
                        </div>
                        <button class="btn btn-outline btn-small" id="toggle-perf-monitor-btn">
                            ${store.getSetting('developer')?.performanceMonitor ? '✅ An' : '❌ Aus'}
                        </button>
                    </div>

                    <div class="flex justify-between items-center mb-md">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 0.5rem;">Logging Level</div>
                            <select id="logging-level-select" class="btn btn-outline btn-small" style="padding: 0.5rem; width: 100%;">
                                <option value="normal" ${store.getSetting('developer')?.loggingLevel === 'normal' ? 'selected' : ''}>Normal</option>
                                <option value="verbose" ${store.getSetting('developer')?.loggingLevel === 'verbose' ? 'selected' : ''}>Verbose</option>
                                <option value="debug" ${store.getSetting('developer')?.loggingLevel === 'debug' ? 'selected' : ''}>Debug</option>
                            </select>
                        </div>
                    </div>

                    <div style="padding-top: var(--spacing-sm); border-top: 1px solid var(--bg-tertiary);">
                        <button class="btn btn-outline btn-small" id="clear-cache-btn" style="width: 100%; margin-bottom: var(--spacing-sm);">
                            🗑️ Cache leeren
                        </button>
                        <button class="btn btn-outline btn-small" id="export-settings-btn" style="width: 100%;">
                            📥 Einstellungen exportieren
                        </button>
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


// Help View
export const helpView = () => {
    return `
        <div class="view">
            <h1 class="view-title">❓ Hilfe & Anleitung</h1>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">🚀 Schnellstart</h3>
                </div>
                <div class="card-body">
                    <ol style="margin: 0; padding-left: 1.5rem;">
                        <li style="margin-bottom: var(--spacing-sm);">Wähle ein <strong>Spiel</strong> aus der Spieleauswahl</li>
                        <li style="margin-bottom: var(--spacing-sm);">Setze deinen <strong>Einsatz</strong> (Schülling)</li>
                        <li style="margin-bottom: var(--spacing-sm);">Beantworte die <strong>Frage richtig</strong></li>
                    </ol>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">🎮 Verfügbare Spiele</h3>
                </div>
                <div class="card-body">
                    <div style="margin-bottom: var(--spacing-lg);">
                        <h4 style="color: var(--accent-primary); margin-bottom: var(--spacing-sm);">🌍 Hauptstädte Quiz</h4>
                        <p style="margin: 0; color: var(--text-muted);">
                            Rate die Hauptstadt eines zufälligen Landes. Du bekommst 4 Antwortmöglichkeiten. 
                            Je schneller du antwortest, desto höher der Bonus!
                        </p>
                    </div>
                    
                    <div>
                        <h4 style="color: var(--accent-primary); margin-bottom: var(--spacing-sm);">👥 Einwohner Quiz</h4>
                        <p style="margin: 0; color: var(--text-muted);">
                            Schätze, welche Stadt mehr Einwohner hat. Vergleiche zwei Städte und wähle die größere aus.
                            Perfekt für Geographie-Fans!
                        </p>
                    </div>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">💰 Schülling & Einsätze</h3>
                </div>
                <div class="card-body">
                    <div class="flex items-start gap-md mb-md">
                        <span style="font-size: 2rem;">💵</span>
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; color: var(--accent-primary);">Startguthaben</h4>
                            <p style="margin: 0; color: var(--text-muted);">Du startest mit <strong>1.000 Schülling</strong></p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-md mb-md">
                        <span style="font-size: 2rem;">🎲</span>
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; color: var(--accent-primary);">Einsatz wählen</h4>
                            <p style="margin: 0; color: var(--text-muted);">Setze zwischen <strong>10 - 500 Schülling</strong> pro Runde</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-md">
                        <span style="font-size: 2rem;">✅</span>
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; color: var(--accent-primary);">Gewinn</h4>
                            <p style="margin: 0; color: var(--text-muted);">Bei richtiger Antwort: <strong>2x deinen Einsatz</strong></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">📊 Statistiken & Fortschritt</h3>
                </div>
                <div class="card-body">
                    <p style="margin-bottom: var(--spacing-md);">
                        Im <strong>Statistik-Bereich</strong> siehst du:
                    </p>
                    <ul style="margin: 0; padding-left: 1.5rem;">
                        <li style="margin-bottom: var(--spacing-xs);">Gespielte Spiele & Gewinnrate</li>
                        <li style="margin-bottom: var(--spacing-xs);">Gesamtgewinn & Verluste</li>
                        <li style="margin-bottom: var(--spacing-xs);">Aktuelle Streak (Serie)</li>
                        <li style="margin-bottom: var(--spacing-xs);">Highscore & beste Leistungen</li>
                        <li>Detaillierte Stats pro Spieltyp</li>
                    </ul>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">⚙️ Personalisierung</h3>
                </div>
                <div class="card-body">
                    <div class="flex items-start gap-md mb-md">
                        <span style="font-size: 2rem;">🎨</span>
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; color: var(--accent-primary);">Themes & Farben</h4>
                            <p style="margin: 0; color: var(--text-muted);">Wechsle zwischen Dark/Light Mode und wähle deine Akzentfarbe</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-md mb-md">
                        <span style="font-size: 2rem;">🔊</span>
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; color: var(--accent-primary);">Sound</h4>
                            <p style="margin: 0; color: var(--text-muted);">Aktiviere/Deaktiviere Soundeffekte</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-md">
                        <span style="font-size: 2rem;">🛠️</span>
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; color: var(--accent-primary);">Developer Tools</h4>
                            <p style="margin: 0; color: var(--text-muted);">Debug-Panel für Entwickler (nur in Dev-Mode)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-lg" style="background: linear-gradient(135deg, var(--bg-card), var(--bg-tertiary)); border: 2px solid var(--accent-primary);">
                <div class="card-header">
                    <h3 class="card-title">💡 Profi-Tipps</h3>
                </div>
                <div class="card-body">
                    <ul style="margin: 0; padding-left: 1.5rem;">
                        <li style="margin-bottom: var(--spacing-sm);">
                            <strong>Starte klein:</strong> Teste neue Spiele erst mit kleinen Einsätzen
                        </li>
                        <li style="margin-bottom: var(--spacing-sm);">
                            <strong>Streak aufbauen:</strong> Mehrere richtige Antworten hintereinander = Bonus
                        </li>
                        <li style="margin-bottom: var(--spacing-sm);">
                            <strong>Stats nutzen:</strong> Analysiere deine Stärken und Schwächen
                        </li>
                        <li>
                            <strong>Nicht übertreiben:</strong> Bei Pechsträhne eine Pause einlegen
                        </li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">⌨️ Tastenkombinationen</h3>
                </div>
                <div class="card-body">
                    <div style="display: grid; gap: var(--spacing-sm);">
                        <div class="flex justify-between items-center">
                            <span>DevTools öffnen/schließen:</span>
                            <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-family: monospace; border: 1px solid var(--accent-primary);">Ctrl+Shift+D</kbd>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Menu öffnen:</span>
                            <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-family: monospace; border: 1px solid var(--accent-primary);">ESC</kbd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};


export { router, homeView, gameSelectView, statsView, settingsView, helpView };
