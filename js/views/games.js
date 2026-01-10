/* ==========================================
   GAMES VIEW
   ========================================== */

// Dynamische Imports mit Cache-Buster
const v = window.CACHE_BUSTER || Date.now();
let capitalsData = null;
let populationData = null;

// Daten beim ersten Aufruf laden
async function loadGameData() {
    if (!capitalsData) {
        const capitals = await import(`../data/capitals.js?v=${v}`);
        capitalsData = capitals.capitalsData;
    }
    if (!populationData) {
        const population = await import(`../data/population.js?v=${v}`);
        populationData = population.populationData;
    }
}

// Sofort Daten laden
loadGameData();

let currentGame = null;
let currentQuestion = null;
let gameState = {
    score: 0,
    streak: 0,
    questionsAnswered: 0,
    correctAnswers: 0
};

export const gamesView = (store) => {
    return `
        <div class="games-view">
            <div id="gameContainer">
                ${renderGameSelection()}
            </div>
        </div>

        <style>
            .game-selection {
                max-width: 800px;
                margin: 0 auto;
            }

            .game-selector-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: var(--spacing-md);
                margin-bottom: var(--spacing-xl);
            }

            .game-selector-card {
                background: var(--bg-card);
                border: 2px solid rgba(0, 255, 136, 0.1);
                border-radius: var(--radius-md);
                padding: var(--spacing-lg);
                text-align: center;
                cursor: pointer;
                transition: all var(--transition-normal);
            }

            .game-selector-card:hover {
                transform: translateY(-8px);
                box-shadow: var(--shadow-lg), var(--shadow-glow);
                border-color: var(--primary);
            }

            .game-selector-icon {
                font-size: 4rem;
                margin-bottom: var(--spacing-md);
                display: block;
            }

            .game-selector-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--primary);
                margin-bottom: var(--spacing-sm);
            }

            .game-selector-desc {
                color: var(--text-secondary);
                margin-bottom: var(--spacing-md);
            }

            .game-interface {
                max-width: 700px;
                margin: 0 auto;
            }

            .game-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--spacing-lg);
                padding: var(--spacing-md);
                background: var(--bg-card);
                border-radius: var(--radius-md);
                border: 1px solid rgba(0, 255, 136, 0.1);
            }

            .game-stat {
                text-align: center;
            }

            .game-stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--primary);
                display: block;
            }

            .game-stat-label {
                font-size: 0.875rem;
                color: var(--text-secondary);
            }

            .question-card {
                background: var(--bg-card);
                border: 2px solid rgba(0, 255, 136, 0.2);
                border-radius: var(--radius-lg);
                padding: var(--spacing-xl);
                margin-bottom: var(--spacing-lg);
                box-shadow: var(--shadow-md), var(--shadow-glow);
                animation: fadeIn 0.5s ease-out;
            }

            .question-text {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--text-primary);
                text-align: center;
                margin-bottom: var(--spacing-lg);
                line-height: 1.4;
            }

            .question-highlight {
                color: var(--primary);
                font-size: 1.75rem;
            }

            .answers-grid {
                display: grid;
                gap: var(--spacing-sm);
            }

            .answer-btn {
                background: var(--bg-card);
                border: 2px solid rgba(0, 255, 136, 0.2);
                border-radius: var(--radius-md);
                padding: var(--spacing-md);
                font-size: 1.125rem;
                color: var(--text-primary);
                cursor: pointer;
                transition: all var(--transition-normal);
                text-align: left;
            }

            .answer-btn:hover:not(:disabled) {
                background: rgba(0, 255, 136, 0.1);
                border-color: var(--primary);
                transform: translateX(8px);
            }

            .answer-btn:disabled {
                cursor: not-allowed;
                opacity: 0.6;
            }

            .answer-btn.correct {
                background: rgba(0, 255, 136, 0.2);
                border-color: var(--primary);
                animation: pulse 0.5s ease-out;
                opacity: 1 !important;
            }

            .answer-btn.incorrect {
                background: rgba(255, 0, 0, 0.2);
                border-color: #ff0033;
            }

            .correct-answer-label {
                color: var(--primary);
                font-weight: bold;
                margin-right: 0.5rem;
            }

            .solution-reveal {
                margin-top: var(--spacing-lg);
                padding: var(--spacing-md);
                background: linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(255, 0, 110, 0.05));
                border: 2px solid var(--accent);
                border-radius: var(--radius-md);
                animation: slideDown 0.3s ease-out;
            }

            .solution-header {
                font-size: 1.125rem;
                font-weight: bold;
                color: var(--accent);
                margin-bottom: 0.5rem;
            }

            .solution-text {
                color: var(--text-primary);
                font-size: 1rem;
            }

            .solution-text strong {
                color: var(--primary);
                font-size: 1.25rem;
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .game-actions {
                display: flex;
                gap: var(--spacing-sm);
                justify-content: center;
            }

            @media (max-width: 640px) {
                .game-header {
                    flex-wrap: wrap;
                    gap: var(--spacing-sm);
                }

                .question-text {
                    font-size: 1.25rem;
                }

                .question-highlight {
                    font-size: 1.5rem;
                }
            }
        </style>
    `;
};

function renderGameSelection() {
    return `
        <div class="game-selection">
            <h1 class="section-title">Wähle ein Spiel</h1>
            
            <div class="game-selector-grid">
                <div class="game-selector-card" onclick="window.startGame('capitals')">
                    <span class="game-selector-icon">🌍</span>
                    <h2 class="game-selector-title">Hauptstädte</h2>
                    <p class="game-selector-desc">
                        Rate die Hauptstadt verschiedener Länder aus aller Welt!
                    </p>
                    <button class="btn btn-primary">Spielen</button>
                </div>

                <div class="game-selector-card" onclick="window.startGame('population')">
                    <span class="game-selector-icon">👥</span>
                    <h2 class="game-selector-title">Einwohner</h2>
                    <p class="game-selector-desc">
                        Schätze die Einwohnerzahl verschiedener Städte und Länder!
                    </p>
                    <button class="btn btn-secondary">Spielen</button>
                </div>
            </div>
        </div>
    `;
}

function renderGameInterface() {
    return `
        <div class="game-interface">
            <div class="game-header">
                <div class="game-stat">
                    <span class="game-stat-value">${gameState.score}</span>
                    <span class="game-stat-label">Punkte</span>
                </div>
                <div class="game-stat">
                    <span class="game-stat-value">${gameState.streak}</span>
                    <span class="game-stat-label">Streak</span>
                </div>
                <div class="game-stat">
                    <span class="game-stat-value">${gameState.questionsAnswered}</span>
                    <span class="game-stat-label">Fragen</span>
                </div>
            </div>

            <div class="question-card">
                ${renderQuestion()}
            </div>

            <div class="game-actions">
                <button class="btn btn-secondary" onclick="window.endGame()">
                    🏠 Beenden
                </button>
                <button class="btn btn-primary" onclick="window.nextQuestion()">
                    ➡️ Nächste Frage
                </button>
            </div>
        </div>
    `;
}

function renderQuestion() {
    if (!currentQuestion) return '';

    if (currentGame === 'capitals') {
        return `
            <div class="question-text">
                Was ist die Hauptstadt von<br>
                <span class="question-highlight">${currentQuestion.country}</span>?
            </div>
            <div class="answers-grid">
                ${currentQuestion.options.map((option, index) => `
                    <button class="answer-btn" onclick="window.checkAnswer(${index})">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
    } else {
        return `
            <div class="question-text">
                Wie viele Einwohner hat<br>
                <span class="question-highlight">${currentQuestion.location}</span>?
            </div>
            <div class="answers-grid">
                ${currentQuestion.options.map((option, index) => `
                    <button class="answer-btn" onclick="window.checkAnswer(${index})">
                        ${option.toLocaleString('de-DE')}
                    </button>
                `).join('')}
            </div>
        `;
    }
}

// Game logic functions
window.startGame = async (gameType) => {
    // Sicherstellen dass Daten geladen sind
    await loadGameData();
    
    if (!capitalsData || !populationData) {
        console.error('Spieldaten konnten nicht geladen werden');
        return;
    }
    
    currentGame = gameType;
    gameState = {
        score: 0,
        streak: 0,
        questionsAnswered: 0,
        correctAnswers: 0
    };
    nextQuestion();
};

window.nextQuestion = () => {
    if (currentGame === 'capitals') {
        generateCapitalsQuestion();
    } else if (currentGame === 'population') {
        generatePopulationQuestion();
    }
    updateGameInterface();
};

window.checkAnswer = (answerIndex) => {
    const buttons = document.querySelectorAll('.answer-btn');
    const isCorrect = answerIndex === currentQuestion.correctIndex;
    const pointsEarned = isCorrect ? 10 * (gameState.streak + 1) : 0;
    
    // Bereite Details für Historie vor
    let question, userAnswer, correctAnswer;
    if (currentGame === 'capitals') {
        question = currentQuestion.country;
        userAnswer = currentQuestion.options[answerIndex];
        correctAnswer = currentQuestion.capital;
    } else {
        question = currentQuestion.location;
        userAnswer = currentQuestion.options[answerIndex].toLocaleString('de-DE');
        correctAnswer = currentQuestion.population.toLocaleString('de-DE');
    }

    gameState.questionsAnswered++;
    
    if (isCorrect) {
        gameState.correctAnswers++;
        gameState.streak++;
        gameState.score += pointsEarned;
        buttons[answerIndex].classList.add('correct');
        
        // Show notification
        if (window.app && window.app.ui) {
            window.app.ui.showNotification('✅ Richtig! +' + pointsEarned + ' Punkte', 'success');
        }
    } else {
        gameState.streak = 0;
        buttons[answerIndex].classList.add('incorrect');
        buttons[currentQuestion.correctIndex].classList.add('correct');
        
        // Zeige richtige Lösung an
        const correctBtn = buttons[currentQuestion.correctIndex];
        correctBtn.innerHTML = `<span class="correct-answer-label">✓ Richtig:</span> ${correctBtn.textContent}`;
        
        // Zeige Lösungs-Info
        const questionCard = document.querySelector('.question-card');
        if (questionCard) {
            const solutionDiv = document.createElement('div');
            solutionDiv.className = 'solution-reveal';
            solutionDiv.innerHTML = `
                <div class="solution-header">❌ Falsche Antwort</div>
                <div class="solution-text">
                    Die richtige Antwort war: <strong>${correctAnswer}</strong>
                </div>
            `;
            questionCard.appendChild(solutionDiv);
        }
        
        if (window.app && window.app.ui) {
            window.app.ui.showNotification('❌ Leider falsch! Richtig: ' + correctAnswer, 'error');
        }
    }

    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);

    // Update game stats in store mit Details
    if (window.app && window.app.store) {
        window.app.store.recordGame(currentGame, isCorrect, pointsEarned, {
            question,
            userAnswer,
            correctAnswer,
            streak: gameState.streak
        });
        if (isCorrect) {
            window.app.store.addMoney(pointsEarned);
        }
    }

    updateGameInterface();
};

window.endGame = () => {
    currentGame = null;
    currentQuestion = null;
    updateGameInterface();
    
    if (window.app && window.app.ui) {
        window.app.ui.showNotification(
            `Spiel beendet! ${gameState.correctAnswers}/${gameState.questionsAnswered} richtig`,
            'info'
        );
    }
};

function generateCapitalsQuestion() {
    // capitalsData ist ein Array von Objekten mit { country, capital, ... }
    const randomIndex = Math.floor(Math.random() * capitalsData.length);
    const correctEntry = capitalsData[randomIndex];
    const country = correctEntry.country;
    const capital = correctEntry.capital;

    // Generate 3 wrong options
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
        const wrongIndex = Math.floor(Math.random() * capitalsData.length);
        const wrongCapital = capitalsData[wrongIndex].capital;
        if (wrongCapital !== capital && !wrongOptions.includes(wrongCapital)) {
            wrongOptions.push(wrongCapital);
        }
    }

    // Mix correct answer with wrong options
    const options = [capital, ...wrongOptions];
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    currentQuestion = {
        country,
        capital,
        options,
        correctIndex: options.indexOf(capital)
    };
}

function generatePopulationQuestion() {
    // populationData ist ein Array von Objekten mit { city, population, ... }
    const randomIndex = Math.floor(Math.random() * populationData.length);
    const correctEntry = populationData[randomIndex];
    const location = correctEntry.city;
    const population = correctEntry.population;

    // Generate 3 plausible wrong options (mindestens 20% anders)
    const wrongOptions = [];
    const minDiff = population * 0.2;
    let attempts = 0;
    
    while (wrongOptions.length < 3 && attempts < 100) {
        attempts++;
        // Generiere Zufallszahl zwischen 50% und 200% der echten Bevölkerung
        const multiplier = 0.5 + Math.random() * 1.5;
        const wrongPop = Math.round(population * multiplier / 10000) * 10000; // Auf 10.000 runden
        
        // Prüfen ob unterschiedlich genug
        const isDifferent = Math.abs(wrongPop - population) > minDiff;
        const isUnique = !wrongOptions.includes(wrongPop) && wrongPop !== population;
        
        if (isDifferent && isUnique && wrongPop > 0) {
            wrongOptions.push(wrongPop);
        }
    }
    
    // Falls nicht genug Optionen, füge einfache Varianten hinzu
    while (wrongOptions.length < 3) {
        const fallback = population * (0.5 + wrongOptions.length * 0.5);
        wrongOptions.push(Math.round(fallback / 10000) * 10000);
    }

    // Mix correct answer with wrong options
    const options = [population, ...wrongOptions];
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    // Finde den korrekten Index nach dem Shuffle
    let correctIndex = 0;
    for (let i = 0; i < options.length; i++) {
        if (options[i] === population) {
            correctIndex = i;
            break;
        }
    }

    currentQuestion = {
        location,
        population,
        options,
        correctIndex
    };
}

function updateGameInterface() {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    if (currentGame && currentQuestion) {
        container.innerHTML = renderGameInterface();
    } else {
        container.innerHTML = renderGameSelection();
    }
}
