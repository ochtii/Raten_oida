/* ========================================
   POPULATIONGAME.JS - Einwohner Battle Logik
   ======================================== */

import { GameEngine } from './gameEngine.js';
import { getRandomCityPair, formatPopulation } from '../data/population.js';
import { store } from '../core/store.js';
import { formatCurrency } from '../core/dom.js';
import { modal } from '../components/modal.js';
import { router } from '../core/router.js';

export class PopulationGame extends GameEngine {
    constructor() {
        super('population');
        this.currentPair = null;
        this.usedCities = [];
    }

    // Neues Stadt-Paar generieren
    generatePair() {
        const pair = getRandomCityPair(this.usedCities);
        
        this.usedCities.push(pair.cityA.city, pair.cityB.city);
        this.currentPair = pair;

        return pair;
    }

    // Antwort prüfen (welche Stadt hat mehr Einwohner?)
    submitAnswer(selectedCity) {
        const { cityA, cityB } = this.currentPair;
        
        let correctCity;
        if (cityA.population > cityB.population) {
            correctCity = cityA;
        } else {
            correctCity = cityB;
        }

        const isCorrect = selectedCity === correctCity.city;
        const result = this.checkAnswer(selectedCity, correctCity.city);

        // Belohnung
        if (result.correct) {
            const reward = Math.floor(result.points / 10);
            store.addSchuelling(reward);
        }

        return {
            ...result,
            correctCity: correctCity,
            difference: Math.abs(cityA.population - cityB.population)
        };
    }
}

// === VIEW & GAME CONTROLLER ===

let currentGame = null;

export const startPopulationGame = () => {
    modal.open({
        title: '👥 Einwohner Battle',
        content: `
            <div class="text-center">
                <p class="mb-md">Welche Stadt hat mehr Einwohner?</p>
                <p class="text-secondary text-sm mb-lg">
                    Wähle die richtige Stadt und verdiene Schülling!
                    ${store.getSetting('difficulty') === 'hard' ? 'Schwierigkeitsgrad: Schwer' : ''}
                </p>
                <button class="btn btn-primary btn-large" id="start-population-btn">
                    🎮 Los geht's!
                </button>
            </div>
        `,
        buttons: []
    });

    document.getElementById('start-population-btn')?.addEventListener('click', () => {
        modal.close();
        initPopulationGame();
    });
};

const initPopulationGame = () => {
    currentGame = new PopulationGame();
    currentGame.init();
    
    renderPopulationGame();
};

const renderPopulationGame = () => {
    if (!currentGame) return;

    const pair = currentGame.generatePair();
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
            <div class="text-center mb-xl">
                <h2 class="text-2xl font-bold mb-md">
                    Welche Stadt hat<br/>
                    <span class="text-accent">MEHR Einwohner</span>?
                </h2>
            </div>

            <!-- Stadt A vs Stadt B -->
            <div class="grid grid-2 gap-lg mb-lg">
                <!-- Stadt A -->
                <div class="card game-card hover-lift transition cursor-pointer city-card" 
                     data-city="${pair.cityA.city}">
                    <div class="card-body text-center">
                        <div class="text-4xl mb-md">🏙️</div>
                        <h3 class="text-2xl font-bold text-accent mb-sm">
                            ${pair.cityA.city}
                        </h3>
                        <div class="text-sm text-secondary mb-sm">
                            ${pair.cityA.country}
                        </div>
                        <div class="badge">${pair.cityA.continent}</div>
                        <div class="mt-lg">
                            <button class="btn btn-primary w-full" data-answer="${pair.cityA.city}">
                                Diese Stadt!
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Stadt B -->
                <div class="card game-card hover-lift transition cursor-pointer city-card" 
                     data-city="${pair.cityB.city}">
                    <div class="card-body text-center">
                        <div class="text-4xl mb-md">🏙️</div>
                        <h3 class="text-2xl font-bold text-accent mb-sm">
                            ${pair.cityB.city}
                        </h3>
                        <div class="text-sm text-secondary mb-sm">
                            ${pair.cityB.country}
                        </div>
                        <div class="badge">${pair.cityB.continent}</div>
                        <div class="mt-lg">
                            <button class="btn btn-primary w-full" data-answer="${pair.cityB.city}">
                                Diese Stadt!
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Info -->
            <div class="text-center text-muted text-sm mb-lg">
                <p>💡 Rate klug OIDA!</p>
            </div>

            <!-- Zurück Button -->
            <div class="text-center">
                <button class="btn btn-outline btn-small" id="quit-game-btn">
                    ❌ Spiel beenden
                </button>
            </div>
        </div>
    `;

    router.contentContainer.innerHTML = content;

    // Event Listeners
    setupPopulationGameEvents(pair);
};

const setupPopulationGameEvents = (pair) => {
    // Antwort Buttons
    document.querySelectorAll('[data-answer]').forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.getAttribute('data-answer');
            handleAnswer(answer, pair);
        });
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

const handleAnswer = async (selectedCity, pair) => {
    const result = currentGame.submitAnswer(selectedCity);

    // Zeige Einwohnerzahlen
    const cards = document.querySelectorAll('.city-card');
    cards.forEach(card => {
        const cityName = card.getAttribute('data-city');
        const cityData = cityName === pair.cityA.city ? pair.cityA : pair.cityB;
        
        // Füge Einwohnerzahl hinzu
        const badge = card.querySelector('.badge');
        const popDiv = document.createElement('div');
        popDiv.className = 'text-xl font-bold mt-md';
        popDiv.textContent = formatPopulation(cityData.population);
        
        if (cityName === result.correctCity.city) {
            popDiv.classList.add('text-accent');
            card.style.borderColor = 'var(--accent-primary)';
            card.style.boxShadow = '0 0 20px var(--accent-primary)';
        } else {
            popDiv.classList.add('text-secondary');
        }
        
        badge.insertAdjacentElement('afterend', popDiv);
        
        // Buttons deaktivieren
        const btn = card.querySelector('button');
        if (btn) btn.disabled = true;
    });

    // Feedback Modal
    await modal.alert({
        title: result.correct ? '✅ Passt!' : '❌ Na oida!',
        message: result.correct 
            ? `
                <div class="text-center">
                    <div class="text-2xl mb-md">Richtig!</div>
                    <div class="text-accent font-bold mb-sm">+${result.points} Punkte</div>
                    <div class="currency">+${Math.floor(result.points/10)} Schülling</div>
                    <p class="text-sm text-secondary mt-md">
                        Unterschied: ${formatPopulation(result.difference)} Einwohner
                    </p>
                </div>
            `
            : `
                <div class="text-center">
                    <div class="text-2xl mb-md">Falsch!</div>
                    <p class="text-secondary">
                        ${result.correctCity.city} hat mehr Einwohner!<br/>
                        <span class="text-accent">${formatPopulation(result.correctCity.population)}</span>
                    </p>
                </div>
            `,
        buttonText: 'Weiter'
    });

    // Nächste Runde oder Spiel beenden
    if (currentGame.isGameOver()) {
        showGameOver();
    } else {
        renderPopulationGame();
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
