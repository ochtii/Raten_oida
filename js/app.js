/* ========================================
   APP.JS - Main Entry Point
   Initialisiert die App und alle Module
   ======================================== */

import { router, homeView, gameSelectView, statsView, settingsView } from './core/router.js';
import { store } from './core/store.js';
import { Navigation } from './components/navigation.js';
import { modal } from './components/modal.js';
import { startCapitalsGame } from './games/capitalsGame.js';
import { startPopulationGame } from './games/populationGame.js';
import { initDevTools } from './components/devTools.js';
import { $ } from './core/dom.js';

class App {
    constructor() {
        this.navigation = null;
    }

    init() {
        console.log('🎮 Raten OIDA wird initialisiert...');

        // Theme laden
        this.loadTheme();

        // Router Setup
        this.setupRouter();

        // Navigation initialisieren
        this.navigation = new Navigation();

        // Settings Event Listeners
        this.setupSettingsListeners();

        // Game Start Listeners
        this.setupGameListeners();

        // Stats Listeners
        this.setupStatsListeners();

        // Initial Route
        router.init();

        // DevTools initialisieren (nur in Development)
        initDevTools();

        console.log('✅ Raten OIDA bereit! Hau di über d\'Häuser! 🎯');
    }

    // Theme aus Store laden und anwenden
    loadTheme() {
        const theme = store.getSetting('theme');
        document.documentElement.setAttribute('data-theme', theme);
    }

    // Router Routen registrieren
    setupRouter() {
        router.setContainer('#app-content');
        
        router.register('home', homeView);
        router.register('game-select', gameSelectView);
        router.register('stats', statsView);
        router.register('settings', settingsView);
    }

    // Settings Event Listeners
    setupSettingsListeners() {
        // Theme Toggle
        document.addEventListener('click', (e) => {
            if (e.target.id === 'toggle-theme-btn' || e.target.closest('#toggle-theme-btn')) {
                const newTheme = store.toggleTheme();
                
                // Button Text aktualisieren
                const btn = $('#toggle-theme-btn');
                if (btn) {
                    btn.textContent = newTheme === 'dark' ? '🌙 Dark' : '☀️ Light';
                }

                modal.alert({
                    title: 'Theme geändert',
                    message: `Theme auf ${newTheme === 'dark' ? 'Dark Mode' : 'Light Mode'} gesetzt!`
                });
            }

            // Sound Toggle
            if (e.target.id === 'toggle-sound-btn' || e.target.closest('#toggle-sound-btn')) {
                const currentSound = store.getSetting('sound');
                const newSound = !currentSound;
                store.setSetting('sound', newSound);

                const btn = $('#toggle-sound-btn');
                if (btn) {
                    btn.textContent = newSound ? '🔊 An' : '🔇 Aus';
                }
            }

            // Reset All
            if (e.target.id === 'reset-all-btn' || e.target.closest('#reset-all-btn')) {
                modal.confirm({
                    title: '⚠️ Alles zurücksetzen?',
                    message: 'Das löscht ALLE Daten, Stats und dein Guthaben! Bist du sicher?',
                    confirmText: 'Ja, alles löschen',
                    cancelText: 'Abbrechen'
                }).then(confirmed => {
                    if (confirmed) {
                        store.resetAll();
                        modal.alert({
                            title: 'Zurückgesetzt',
                            message: 'Alle Daten wurden gelöscht!'
                        }).then(() => {
                            router.navigate('home');
                        });
                    }
                });
            }
        });

        // DevTools Button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'open-devtools-btn' || e.target.closest('#open-devtools-btn')) {
                if (window.devTools) {
                    window.devTools.open();
                } else {
                    modal.alert({
                        title: 'DevTools nicht verfügbar',
                        message: 'DevTools sind nur in Development-Umgebungen verfügbar.'
                    });
                }
            }
        });

        // Difficulty Select
        document.addEventListener('change', (e) => {
            if (e.target.id === 'difficulty-select') {
                const difficulty = e.target.value;
                store.setSetting('difficulty', difficulty);
                
                modal.alert({
                    title: 'Schwierigkeit geändert',
                    message: `Schwierigkeit auf "${difficulty}" gesetzt!`
                });
            }
        });
    }

    // Game Start Listeners
    setupGameListeners() {
        document.addEventListener('click', (e) => {
            const gameStartBtn = e.target.closest('[data-game-start]');
            
            if (gameStartBtn) {
                const gameType = gameStartBtn.getAttribute('data-game-start');
                
                if (gameType === 'capitals') {
                    startCapitalsGame();
                } else if (gameType === 'population') {
                    startPopulationGame();
                }
            }
        });
    }

    // Stats Listeners
    setupStatsListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'reset-stats-btn' || e.target.closest('#reset-stats-btn')) {
                modal.confirm({
                    title: '📊 Stats zurücksetzen?',
                    message: 'Willst du wirklich alle Statistiken löschen? Dein Guthaben bleibt erhalten.',
                    confirmText: 'Ja, zurücksetzen',
                    cancelText: 'Abbrechen'
                }).then(confirmed => {
                    if (confirmed) {
                        store.resetStats();
                        modal.alert({
                            title: 'Stats zurückgesetzt',
                            message: 'Alle Statistiken wurden gelöscht!'
                        }).then(() => {
                            router.navigate('stats'); // Reload Stats View
                        });
                    }
                });
            }
        });
    }
}

// App starten wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

// Service Worker (optional für PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Später für PWA implementieren
        // navigator.serviceWorker.register('/sw.js');
    });
}
