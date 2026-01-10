/* ==========================================
   STORE.JS - State Management
   ========================================== */

export class Store {
    constructor() {
        this.state = this.loadState();
        this.subscribers = [];
    }

    loadState() {
        const saved = localStorage.getItem('raten_oida_v2');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Fehler beim Laden des Spielstands:', e);
            }
        }
        
        return {
            wallet: 0,
            points: 0,
            stats: {
                gamesPlayed: 0,
                gamesWon: 0,
                currentStreak: 0,
                bestStreak: 0
            },
            history: [],
            settings: {
                sound: true,
                notifications: true,
                theme: 'dark'
            }
        };
    }

    saveState() {
        try {
            localStorage.setItem('raten_oida_v2', JSON.stringify(this.state));
            this.notify();
        } catch (e) {
            console.error('Fehler beim Speichern:', e);
        }
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notify() {
        this.subscribers.forEach(callback => callback(this.state));
    }

    getWallet() {
        return this.state?.wallet ?? 0;
    }

    addMoney(amount) {
        this.state.wallet += amount;
        this.saveState();
    }

    getPoints() {
        return this.state?.points ?? 0;
    }

    addPoints(amount) {
        this.state.points += amount;
        this.saveState();
    }

    getStats() {
        return this.state?.stats ?? {
            gamesPlayed: 0,
            gamesWon: 0,
            currentStreak: 0,
            bestStreak: 0
        };
    }

    getHistory() {
        return this.state?.history ?? [];
    }

    addHistory(entry) {
        if (!this.state.history) {
            this.state.history = [];
        }
        this.state.history.unshift({
            ...entry,
            timestamp: new Date().toISOString()
        });
        
        if (this.state.history.length > 50) {
            this.state.history = this.state.history.slice(0, 50);
        }
        
        this.saveState();
    }

    recordGame(gameType, won, pointsEarned, details = {}) {
        const stats = this.getStats();
        stats.gamesPlayed = (stats.gamesPlayed || 0) + 1;
        
        if (won) {
            stats.gamesWon = (stats.gamesWon || 0) + 1;
            stats.currentStreak = (stats.currentStreak || 0) + 1;
            stats.bestStreak = Math.max(stats.bestStreak || 0, stats.currentStreak);
        } else {
            stats.currentStreak = 0;
        }
        
        this.state.points += pointsEarned;
        
        this.addHistory({
            game: gameType,
            won,
            points: pointsEarned,
            ...details
        });
        
        this.saveState();
    }

    getSettings() {
        return this.state?.settings ?? {
            sound: true,
            notifications: true,
            theme: 'dark'
        };
    }

    updateSettings(settings) {
        this.state.settings = { ...this.state.settings, ...settings };
        this.saveState();
    }

    reset() {
        this.state = {
            wallet: 0,
            points: 0,
            stats: {
                gamesPlayed: 0,
                gamesWon: 0,
                currentStreak: 0,
                bestStreak: 0
            },
            history: [],
            settings: this.state.settings
        };
        this.saveState();
    }
}
