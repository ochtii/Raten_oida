/* ========================================
   CAPITALSGAME.JS - Hauptstädte Quiz Logik
   ======================================== */

import { GameEngine } from './gameEngine.js';
import { capitalsData, generateWrongAnswers } from '../data/capitals.js';
import { store } from '../core/store.js';
import { shuffle, formatCurrency } from '../core/dom.js';
import { modal } from '../components/modal.js';
import { router } from '../core/router.js';

export class CapitalsGame extends GameEngine {
    constructor() {
        super('capitals');
        this.currentQuestion = null;
        this.options = [];
        this.hintsUsed = 0;
        this.difficulty = store.getSetting('difficulty') || 'medium';
    }

    // Neue Frage generieren
    generateQuestion() {
        // Filtere nach Schwierigkeit
        let pool = capitalsData;
        if (this.difficulty !== 'all') {
            pool = capitalsData.filter(item => {
                if (this.difficulty === 'easy') return item.difficulty === 'easy';
                if (this.difficulty === 'medium') return item.difficulty === 'easy' || item.difficulty === 'medium';
                return true; // hard = alle
            });
        }

        // Zufälliges Land
        const question = pool[Math.floor(Math.random() * pool.length)];
        
        // Falsche Antworten generieren
        const wrongAnswers = generateWrongAnswers(question.capital, 3);
        
        // Alle Optionen mischen
        this.options = shuffle([question.capital, ...wrongAnswers]);
        
        this.currentQuestion = question;
        this.hintsUsed = 0;

        return {
            country: question.country,
            continent: question.continent,
            options: this.options,
            correctAnswer: question.capital
        };
    }

    // Tipp kaufen (50/50)
    buyHint() {
        const hintCost = 50;
        
        if (this.hintsUsed >= 2) {
            modal.alert({
                title: 'Na oida!',
                message: 'Du hast schon alle Tipps für diese Frage verwendet!'
            });
            return false;
        }

        if (!store.paySchuelling(hintCost)) {
            modal.alert({
                title: 'Zu wenig Schülling!',
                message: `Du brauchst ${hintCost} Schülling für einen Tipp!`
            });
            return false;
        }

        this.hintsUsed++;

        // Entferne eine falsche Antwort
        const correctAnswer = this.currentQuestion.capital;
        const wrongOptions = this.options.filter(opt => opt !== correctAnswer);
        
        if (wrongOptions.length > 0) {
            const toRemove = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
            return toRemove;
        }

        return null;
    }

    // Antwort prüfen
    submitAnswer(selectedAnswer) {
        const result = this.checkAnswer(selectedAnswer, this.currentQuestion.capital);
        
        // Belohnung für richtige Antwort
        if (result.correct) {
            const reward = Math.floor(result.points / 10);
            store.addSchuelling(reward);
        }

        return result;
    }
}

// === VIEW & GAME CONTROLLER ===

let currentGame = null;

export const startCapitalsGame = () => {
    // Modal für Schwierigkeitsauswahl
    modal.open({
        title: '🌍 Hauptstädte OIDA',
        content: `
            <div class="text-center">
                <p class="mb-lg">Wähle die Schwierigkeit:</p>
                <div class="flex flex-col gap-md">
                    <button class="btn btn-primary" data-difficulty="easy">
                        😊 Leicht
                    </button>
                    <button class="btn btn-primary" data-difficulty="medium">
                        😐 Mittel
                    </button>
                    <button class="btn btn-primary" data-difficulty="hard">
                        😈 Schwer
                    </button>
                </div>
            </div>
        `,
        buttons: []
    });

    // Event Listener für Schwierigkeitsauswahl
    document.querySelectorAll('[data-difficulty]').forEach(btn => {
        btn.addEventListener('click', () => {
            const difficulty = btn.getAttribute('data-difficulty');
            modal.close();
            initCapitalsGame(difficulty);
        });
    });
};

const initCapitalsGame = (difficulty) => {
    currentGame = new CapitalsGame();
    currentGame.difficulty = difficulty;
    currentGame.init();
    
    renderCapitalsGame();
};

const renderCapitalsGame = () => {
    if (!currentGame) return;

    // Neue Frage generieren
    const question = currentGame.generateQuestion();
    currentGame.nextRound();

    const content = `
        <div class="view">
            <!-- Header -->
            <div class="flex justify-between items-center mb-lg">
                <div>
                    <div class="text-sm text-secondary">Runde ${currentGame.round}/${currentGame.maxRounds}</div>
                    <div class="text-2xl font-bold text-accent">Score: ${currentGame.score}</div>
                </div>
                <div class="text-right">
                    <div class="text-sm text-secondary">Streak</div>
                    <div class="text-xl font-bold text-accent-2">🔥 ${currentGame.streak}</div>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="progress mb-xl">
                <div class="progress-bar" style="width: ${currentGame.getProgress()}%">
                    ${currentGame.getProgress()}%
                </div>
            </div>

            <!-- Frage -->
            <div class="card mb-xl">
                <div class="card-body text-center">
                    <div class="text-sm text-secondary mb-sm">${question.continent}</div>
                    <h2 class="text-3xl font-bold mb-md">
                        Was ist die Hauptstadt von<br/>
                        <span class="text-accent">${question.country}</span>?
                    </h2>
                    <div class="badge badge-secondary">${currentGame.difficulty}</div>
                </div>
            </div>

            <!-- Tipp Button -->
            <div class="text-center mb-lg">
                <button class="btn btn-outline btn-small" id="hint-btn">
                    💡 Tipp kaufen (50 Schülling)
                </button>
                <div class="text-xs text-muted mt-sm">Tipps verwendet: ${currentGame.hintsUsed}/2</div>
            </div>

            <!-- Antwort Optionen -->
            <div class="grid grid-2 gap-md" id="options-grid">
                ${question.options.map((option, index) => `
                    <button 
                        class="btn btn-primary btn-large answer-btn" 
                        data-answer="${option}"
                        data-index="${index}"
                    >
                        ${option}
                    </button>
                `).join('')}
            </div>

            <!-- Zurück Button -->
            <div class="text-center mt-xl">
                <button class="btn btn-outline btn-small" id="quit-game-btn">
                    ❌ Spiel beenden
                </button>
            </div>
        </div>
    `;

    router.contentContainer.innerHTML = content;

    // Event Listeners
    setupCapitalsGameEvents(question);
};

const setupCapitalsGameEvents = (question) => {
    // Antwort Buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.getAttribute('data-answer');
            handleAnswer(answer, question.correctAnswer);
        });
    });

    // Tipp Button
    const hintBtn = document.getElementById('hint-btn');
    hintBtn?.addEventListener('click', () => {
        const toRemove = currentGame.buyHint();
        if (toRemove) {
            // Entferne Button
            const btnToRemove = document.querySelector(`[data-answer="${toRemove}"]`);
            if (btnToRemove) {
                btnToRemove.classList.add('btn-disabled');
                btnToRemove.disabled = true;
                btnToRemove.style.opacity = '0.3';
            }
        }
    });

    // Quit Button
    const quitBtn = document.getElementById('quit-game-btn');
    quitBtn?.addEventListener('click', async () => {
        const confirmed = await modal.confirm({
            title: 'Spiel beenden?',
            message: 'Willst du das Spiel wirklich beenden? Dein Fortschritt geht verloren!',
            confirmText: 'Ja, beenden',
            cancelText: 'Weiterspielen'
        });

        if (confirmed) {
            currentGame.endGame(false);
            currentGame = null;
            router.navigate('game-select');
        }
    });
};

const handleAnswer = async (selectedAnswer, correctAnswer) => {
    const result = currentGame.submitAnswer(selectedAnswer);

    // Feedback anzeigen
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        const answer = btn.getAttribute('data-answer');
        
        if (answer === correctAnswer) {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-primary');
            btn.style.background = 'var(--gradient-primary)';
        } else if (answer === selectedAnswer && !result.correct) {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-secondary');
        }
    });

    // Feedback Modal
    await modal.alert({
        title: result.correct ? '✅ Passt!' : '❌ Na oida!',
        message: result.correct 
            ? `Richtig! +${result.points} Punkte und +${Math.floor(result.points/10)} Schülling!` 
            : `Falsch! Die richtige Antwort war: ${correctAnswer}`,
        buttonText: 'Weiter'
    });

    // Nächste Runde oder Spiel beenden
    if (currentGame.isGameOver()) {
        showGameOver();
    } else {
        renderCapitalsGame();
    }
};

const showGameOver = async () => {
    const gameData = currentGame.endGame(true);
    const reward = Math.floor(gameData.score / 10);

    await modal.alert({
        title: '🎉 Spiel beendet!',
        message: `
            <div class="text-center">
                <div class="text-3xl mb-md">Score: ${gameData.score}</div>
                <div class="currency currency-large mb-md">+${reward} Schülling</div>
                <p class="text-secondary">Hau di über d'Häuser! 🎯</p>
            </div>
        `,
        buttonText: 'Passt!'
    });

    currentGame = null;
    router.navigate('game-select');
};
