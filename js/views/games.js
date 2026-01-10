/* ==========================================
   GAMES VIEW
   ========================================== */

// Dynamische Imports mit Cache-Buster (wenn aktiviert)
const v = window.CACHE_BUSTER;
const cacheBusterQuery = (v && v !== 'disabled') ? `?v=${v}` : '';
let capitalsData = null;
let populationData = null;

// Daten beim ersten Aufruf laden
async function loadGameData() {
    if (!capitalsData) {
        const capitals = await import(`../data/capitals.js${cacheBusterQuery}`);
        capitalsData = capitals.capitalsData;
    }
    if (!populationData) {
        const population = await import(`../data/population.js${cacheBusterQuery}`);
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
