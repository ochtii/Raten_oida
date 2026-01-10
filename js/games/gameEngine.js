/* ========================================
   GAMEENGINE.JS - Basis für Spiellogik
   ======================================== */

import { store } from '../core/store.js';

export class GameEngine {
    constructor(gameType) {
        this.gameType = gameType;
        this.score = 0;
        this.streak = 0;
        this.round = 0;
        this.maxRounds = 10;
        this.isActive = false;
    }

    // Spiel initialisieren
    init() {
        this.score = 0;
        this.streak = 0;
        this.round = 0;
        this.isActive = true;
        
        store.setCurrentGame({
            type: this.gameType,
            score: this.score,
            round: this.round,
            startedAt: Date.now()
        });
    }

    // Antwort bewerten
    checkAnswer(userAnswer, correctAnswer) {
        const isCorrect = this.compareAnswers(userAnswer, correctAnswer);
        
        if (isCorrect) {
            this.streak++;
            this.score += this.calculatePoints();
            return {
                correct: true,
                points: this.calculatePoints(),
                streak: this.streak
            };
        } else {
            this.streak = 0;
            return {
                correct: false,
                points: 0,
                streak: 0
            };
        }
    }

    // Punkte berechnen (mit Streak Bonus)
    calculatePoints() {
        const basePoints = 100;
        const streakBonus = this.streak * 10;
        return basePoints + streakBonus;
    }

    // Nächste Runde
    nextRound() {
        this.round++;
        
        store.setCurrentGame({
            type: this.gameType,
            score: this.score,
            round: this.round,
            startedAt: store.getCurrentGame()?.startedAt || Date.now()
        });

        return this.round <= this.maxRounds;
    }

    // Spiel beenden
    endGame(won = false) {
        this.isActive = false;

        const gameData = {
            type: this.gameType,
            score: this.score,
            rounds: this.round,
            won: won
        };

        // Belohnung auszahlen
        if (won && this.score > 0) {
            const reward = Math.floor(this.score / 10); // 1 Schülling pro 10 Punkte
            store.addSchuelling(reward);
        }

        // Stats updaten
        store.updateGameStats(this.gameType, {
            correct: won,
            won: won,
            score: this.score
        });

        store.clearCurrentGame();

        return gameData;
    }

    // String Vergleich (case-insensitive, trimmed)
    compareAnswers(answer1, answer2) {
        if (!answer1 || !answer2) return false;
        return answer1.toString().toLowerCase().trim() === 
               answer2.toString().toLowerCase().trim();
    }

    // Progress in Prozent
    getProgress() {
        return Math.round((this.round / this.maxRounds) * 100);
    }

    // Ist Spiel zu Ende?
    isGameOver() {
        return this.round >= this.maxRounds || !this.isActive;
    }
}
