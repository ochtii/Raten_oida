/* ========================================
   STATS VIEW - Points & Statistics Visualization
   ======================================== */

import { store } from '../core/store.js';

import { store } from '../core/store.js';

export const createStatsView = (storeInstance) => {
    const pointsStats = storeInstance.getPointsStats();
    const gameStats = storeInstance.getStats();
    const totalPoints = pointsStats.total;
    const capitalsPoints = pointsStats.capitalsPoints;
    const populationPoints = pointsStats.populationPoints;

    // Berechne Prozentanteile für Grafik
    const graphicData = {
        capitals: gameStats.capitalsGame,
        population: gameStats.populationGame
    };

    const capitalsWinRate = graphicData.capitals.played > 0 
        ? Math.round((graphicData.capitals.correct / graphicData.capitals.played) * 100) 
        : 0;
    const populationWinRate = graphicData.population.played > 0 
        ? Math.round((graphicData.population.correct / graphicData.population.played) * 100) 
        : 0;

    return `
        <div class="view">
            <h1 class="view-title">📊 Statistiken & Punkte</h1>

            <!-- POINTS OVERVIEW -->
            <div class="points-overview">
                <div class="points-card points-card-primary">
                    <div class="points-card-label">Gesamt Punkte</div>
                    <div class="points-card-value" id="total-points">${totalPoints}</div>
                    <div class="points-card-icon">⭐</div>
                </div>
                <div class="points-card points-card-capitals">
                    <div class="points-card-label">Capitals</div>
                    <div class="points-card-value" id="capitals-points">${capitalsPoints}</div>
                    <div class="points-card-icon">🌍</div>
                </div>
                <div class="points-card points-card-population">
                    <div class="points-card-label">Population</div>
                    <div class="points-card-value" id="population-points">${populationPoints}</div>
                    <div class="points-card-icon">👥</div>
                </div>
            </div>

            <!-- GAME STATISTICS -->
            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">🎮 Spielstatistiken</h3>
                </div>
                <div class="card-body">
                    <div class="stats-grid">
                        <!-- Capitals Stats -->
                        <div class="stat-item">
                            <div class="stat-icon">🌍</div>
                            <div class="stat-name">Capitals</div>
                            <div class="stat-details">
                                <div class="stat-row">
                                    <span>Gespielt:</span>
                                    <strong>${graphicData.capitals.played}</strong>
                                </div>
                                <div class="stat-row">
                                    <span>Richtig:</span>
                                    <strong>${graphicData.capitals.correct}</strong>
                                </div>
                                <div class="stat-row">
                                    <span>Quote:</span>
                                    <strong>${capitalsWinRate}%</strong>
                                </div>
                                <div class="stat-row">
                                    <span>Max Streak:</span>
                                    <strong>${graphicData.capitals.maxStreak}</strong>
                                </div>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${capitalsWinRate}%; background: linear-gradient(90deg, #00ff88, #00cc6f);"></div>
                            </div>
                        </div>

                        <!-- Population Stats -->
                        <div class="stat-item">
                            <div class="stat-icon">👥</div>
                            <div class="stat-name">Population</div>
                            <div class="stat-details">
                                <div class="stat-row">
                                    <span>Gespielt:</span>
                                    <strong>${graphicData.population.played}</strong>
                                </div>
                                <div class="stat-row">
                                    <span>Richtig:</span>
                                    <strong>${graphicData.population.correct}</strong>
                                </div>
                                <div class="stat-row">
                                    <span>Quote:</span>
                                    <strong>${populationWinRate}%</strong>
                                </div>
                                <div class="stat-row">
                                    <span>Max Streak:</span>
                                    <strong>${graphicData.population.maxStreak}</strong>
                                </div>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${populationWinRate}%; background: linear-gradient(90deg, #00f0ff, #0088cc);"></div>
                            </div>
                        </div>

                        <!-- Overall Stats -->
                        <div class="stat-item">
                            <div class="stat-icon">🏆</div>
                            <div class="stat-name">Gesamt</div>
                            <div class="stat-details">
                                <div class="stat-row">
                                    <span>Spiele:</span>
                                    <strong>${gameStats.gamesPlayed}</strong>
                                </div>
                                <div class="stat-row">
                                    <span>Gewonnen:</span>
                                    <strong>${gameStats.gamesWon}</strong>
                                </div>
                                <div class="stat-row">
                                    <span>Verdient:</span>
                                    <strong>${gameStats.totalEarned}</strong>
                                </div>
                                <div class="stat-row">
                                    <span>High Score:</span>
                                    <strong>${gameStats.highScore}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- POINTS HISTORY -->
            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">📈 Punkte Historie (letzte 10)</h3>
                </div>
                <div class="card-body">
                    <div class="points-history">
                        ${pointsStats.history.length === 0 
                            ? '<div class="text-center text-muted">Keine Einträge</div>'
                            : pointsStats.history.slice(0, 10).map((entry, idx) => `
                                <div class="history-item history-item-${idx % 2 === 0 ? 'even' : 'odd'}">
                                    <div class="history-time">
                                        ${new Date(entry.timestamp).toLocaleTimeString('de-DE', { 
                                            hour: '2-digit', 
                                            minute: '2-digit'
                                        })}
                                    </div>
                                    <div class="history-game">
                                        ${entry.game === 'capitals' ? '🌍 Capitals' : entry.game === 'population' ? '👥 Population' : '🎮 ' + entry.game}
                                    </div>
                                    <div class="history-multiplier">
                                        ${entry.multiplier > 1 ? `<span class="multiplier-badge">×${entry.multiplier.toFixed(1)}</span>` : ''}
                                    </div>
                                    <div class="history-points">
                                        <strong style="color: #00ff88;">+${entry.points}</strong>
                                    </div>
                                    <div class="history-total">
                                        <span style="color: #a0a0ff; font-size: 0.85rem;">Σ ${entry.total}</span>
                                    </div>
                                </div>
                            `).join('')
                        }
                    </div>
                </div>
            </div>

            <!-- CHART VISUALIZATION -->
            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">📉 Punkte Verteilung</h3>
                </div>
                <div class="card-body">
                    <div class="chart-container">
                        <div class="chart-item">
                            <div class="chart-name">Capitals</div>
                            <div class="chart-bar-container">
                                <div class="chart-bar" style="width: ${totalPoints > 0 ? (capitalsPoints / totalPoints * 100) : 0}%; background: linear-gradient(90deg, #00ff88, #00cc6f); height: 30px; border-radius: 4px;"></div>
                            </div>
                            <div class="chart-value">${capitalsPoints} Punkte</div>
                        </div>
                        <div class="chart-item">
                            <div class="chart-name">Population</div>
                            <div class="chart-bar-container">
                                <div class="chart-bar" style="width: ${totalPoints > 0 ? (populationPoints / totalPoints * 100) : 0}%; background: linear-gradient(90deg, #00f0ff, #0088cc); height: 30px; border-radius: 4px;"></div>
                            </div>
                            <div class="chart-value">${populationPoints} Punkte</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ACHIEVEMENTS -->
            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">🎖️ Erfolge</h3>
                </div>
                <div class="card-body">
                    <div class="achievements-grid">
                        ${graphicData.capitals.maxStreak >= 5 ? '<div class="achievement unlocked">🔥 Capitals 5er Streak</div>' : '<div class="achievement locked">🔥 Capitals 5er Streak</div>'}
                        ${graphicData.population.maxStreak >= 5 ? '<div class="achievement unlocked">🔥 Population 5er Streak</div>' : '<div class="achievement locked">🔥 Population 5er Streak</div>'}
                        ${totalPoints >= 100 ? '<div class="achievement unlocked">⭐ 100+ Punkte</div>' : '<div class="achievement locked">⭐ 100+ Punkte</div>'}
                        ${totalPoints >= 500 ? '<div class="achievement unlocked">💫 500+ Punkte</div>' : '<div class="achievement locked">💫 500+ Punkte</div>'}
                        ${gameStats.gamesWon >= 10 ? '<div class="achievement unlocked">🏆 10 Siege</div>' : '<div class="achievement locked">🏆 10 Siege</div>'}
                        ${gameStats.gamesPlayed >= 50 ? '<div class="achievement unlocked">🎮 50 Spiele</div>' : '<div class="achievement locked">🎮 50 Spiele</div>'}
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const statsView = () => {
    return createStatsView(store);
};
