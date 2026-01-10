/* ========================================
   STORE.JS - State Management mit LocalStorage
   Observer Pattern für Reaktivität
   ======================================== */

const STORAGE_KEY = 'raten_oida_state';

class Store {
    constructor() {
        this.state = this.loadState();
        this.listeners = [];
    }

    // Lädt State aus LocalStorage
    loadState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Fehler beim Laden des States:', error);
        }

        // Default State
        return {
            wallet: 1000,  // Startkapital in Schülling
            settings: {
                theme: 'dark',
                sound: true,
                difficulty: 'medium',
                developer: {
                    debugMode: false,
                    autoOpenDevTools: false,
                    loggingLevel: 'normal', // 'normal', 'verbose', 'debug'
                    performanceMonitor: false,
                    showFPS: false
                }
            },
            stats: {
                gamesPlayed: 0,
                gamesWon: 0,
                totalEarned: 0,
                totalSpent: 0,
                highScore: 0,
                capitalsGame: {
                    played: 0,
                    correct: 0,
                    streak: 0,
                    maxStreak: 0
                },
                populationGame: {
                    played: 0,
                    correct: 0,
                    streak: 0,
                    maxStreak: 0
                }
            },
            currentGame: null
        };
    }

    // Speichert State in LocalStorage
    saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
            this.notify();
        } catch (error) {
            console.error('Fehler beim Speichern des States:', error);
        }
    }

    // Observer Pattern - Listener registrieren
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Benachrichtigt alle Listener
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // === WALLET METHODEN ===

    getWallet() {
        return this.state.wallet;
    }

    addSchuelling(amount) {
        if (amount <= 0) return false;
        this.state.wallet += amount;
        this.state.stats.totalEarned += amount;
        this.saveState();
        return true;
    }

    paySchuelling(cost) {
        if (cost <= 0) return false;
        if (this.state.wallet < cost) return false;
        
        this.state.wallet -= cost;
        this.state.stats.totalSpent += cost;
        this.saveState();
        return true;
    }

    // === SETTINGS METHODEN ===

    getSetting(key) {
        return this.state.settings[key];
    }

    setSetting(key, value) {
        this.state.settings[key] = value;
        this.saveState();

        // Theme sofort anwenden
        if (key === 'theme') {
            document.documentElement.setAttribute('data-theme', value);
        }
    }

    toggleTheme() {
        const newTheme = this.state.settings.theme === 'dark' ? 'light' : 'dark';
        this.setSetting('theme', newTheme);
        return newTheme;
    }

    // === STATS METHODEN ===

    getStats() {
        return this.state.stats;
    }

    updateGameStats(gameType, result) {
        this.state.stats.gamesPlayed++;
        
        if (gameType === 'capitals' || gameType === 'population') {
            const gameStats = this.state.stats[`${gameType}Game`];
            gameStats.played++;

            if (result.correct) {
                gameStats.correct++;
                gameStats.streak++;
                if (gameStats.streak > gameStats.maxStreak) {
                    gameStats.maxStreak = gameStats.streak;
                }
            } else {
                gameStats.streak = 0;
            }
        }

        if (result.won) {
            this.state.stats.gamesWon++;
        }

        // Highscore Update
        if (result.score && result.score > this.state.stats.highScore) {
            this.state.stats.highScore = result.score;
        }

        this.saveState();
    }

    // === GAME STATE ===

    setCurrentGame(gameData) {
        this.state.currentGame = gameData;
        this.saveState();
    }

    getCurrentGame() {
        return this.state.currentGame;
    }

    clearCurrentGame() {
        this.state.currentGame = null;
        this.saveState();
    }

    // === RESET ===

    resetStats() {
        this.state.stats = {
            gamesPlayed: 0,
            gamesWon: 0,
            totalEarned: 0,
            totalSpent: 0,
            highScore: 0,
            capitalsGame: {
                played: 0,
                correct: 0,
                streak: 0,
                maxStreak: 0
            },
            populationGame: {
                played: 0,
                correct: 0,
                streak: 0,
                maxStreak: 0
            }
        };
        this.saveState();
    }

    resetWallet() {
        this.state.wallet = 1000;
        this.saveState();
    }

    resetAll() {
        localStorage.removeItem(STORAGE_KEY);
        this.state = this.loadState();
        this.saveState();
    }
}

// Singleton Instance
export const store = new Store();
