/* ==========================================
   STORE.JS - State Management
   ========================================== */

const STORAGE_KEY = 'raten_oida_v2';

export class Store {
    constructor() {
        this.state = this.loadState();
        this.listeners = [];
    }

    loadState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.error('Load error:', e);
        }

        return {
            wallet: 1000,
            points: 0,
            stats: {
                gamesPlayed: 0,
                gamesWon: 0,
                capitalsCorrect: 0,
                capitalsTotal: 0,
                populationCorrect: 0,
                populationTotal: 0,
                bestStreak: 0,
                currentStreak: 0
            },
            settings: {
                theme: 'dark',
                sound: true,
                difficulty: 'medium'
            },
            history: []
        };
    }

    saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
            this.notify();
        } catch (e) {
            console.error('Save error:', e);
        }
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // Wallet
    getWallet() {
        return this.state.wallet;
    }

    addMoney(amount) {
        this.state.wallet += amount;
        this.saveState();
    }

    spendMoney(amount) {
        if (this.state.wallet >= amount) {
            this.state.wallet -= amount;
            this.saveState();
            return true;
        }
        return false;
    }

    // Points
    getPoints() {
        return this.state.points;
    }

    addPoints(points) {
        this.state.points += points;
        this.saveState();
    }

    // Stats
    getStats() {
        return this.state.stats;
    }

    recordGame(type, correct, points) {
        this.state.stats.gamesPlayed++;
        if (correct) {
            this.state.stats.gamesWon++;
            this.state.stats.currentStreak++;
            if (this.state.stats.currentStreak > this.state.stats.bestStreak) {
                this.state.stats.bestStreak = this.state.stats.currentStreak;
            }
        } else {
            this.state.stats.currentStreak = 0;
        }

        if (type === 'capitals') {
            this.state.stats.capitalsTotal++;
            if (correct) this.state.stats.capitalsCorrect++;
        } else if (type === 'population') {
            this.state.stats.populationTotal++;
            if (correct) this.state.stats.populationCorrect++;
        }

        this.addPoints(points);
        this.addHistory(type, correct, points);
        this.saveState();
    }

    // History
    addHistory(type, correct, points) {
        this.state.history.unshift({
            timestamp: new Date().toISOString(),
            type,
            correct,
            points
        });
        
        // Nur letzte 50 behalten
        if (this.state.history.length > 50) {
            this.state.history = this.state.history.slice(0, 50);
        }
    }

    getHistory() {
        return this.state.history;
    }

    // Settings
    getSetting(key) {
        return this.state.settings[key];
    }

    setSetting(key, value) {
        this.state.settings[key] = value;
        this.saveState();
    }

    // Reset
    reset() {
        localStorage.removeItem(STORAGE_KEY);
        this.state = this.loadState();
        this.saveState();
    }
}
