/* ==========================================
   STATS VIEW
   ========================================== */

export const statsView = (store) => {
    const stats = store.getStats();
    const history = store.getHistory();

    const totalGames = stats.gamesPlayed;
    const winRate = totalGames > 0 ? Math.round((stats.gamesWon / totalGames) * 100) : 0;
    const capitalsRate = stats.capitalsTotal > 0 ? Math.round((stats.capitalsCorrect / stats.capitalsTotal) * 100) : 0;
    const populationRate = stats.populationTotal > 0 ? Math.round((stats.populationCorrect / stats.populationTotal) * 100) : 0;

    return `
        <div class="stats-view">
            <h1 class="section-title">📊 Statistiken</h1>

            <div class="stats-overview">
                <div class="stat-box stat-box-primary">
                    <div class="stat-box-icon">🎮</div>
                    <div class="stat-box-value">${stats.gamesPlayed}</div>
                    <div class="stat-box-label">Spiele gespielt</div>
                </div>

                <div class="stat-box stat-box-success">
                    <div class="stat-box-icon">🏆</div>
                    <div class="stat-box-value">${stats.gamesWon}</div>
                    <div class="stat-box-label">Spiele gewonnen</div>
                </div>

                <div class="stat-box stat-box-accent">
                    <div class="stat-box-icon">📈</div>
                    <div class="stat-box-value">${winRate}%</div>
                    <div class="stat-box-label">Gewinnrate</div>
                </div>

                <div class="stat-box stat-box-warning">
                    <div class="stat-box-icon">🔥</div>
                    <div class="stat-box-value">${stats.bestStreak}</div>
                    <div class="stat-box-label">Beste Streak</div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">🌍 Hauptstädte</h2>
                    </div>
                    <div class="card-body">
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${capitalsRate}%; background: var(--primary);"></div>
                            </div>
                            <div class="progress-label">${capitalsRate}% Erfolgsrate</div>
                        </div>
                        <div class="stats-list">
                            <div class="stats-item">
                                <span>Gesamt gespielt:</span>
                                <strong>${stats.capitalsTotal}</strong>
                            </div>
                            <div class="stats-item">
                                <span>Richtig beantwortet:</span>
                                <strong>${stats.capitalsCorrect}</strong>
                            </div>
                            <div class="stats-item">
                                <span>Falsch beantwortet:</span>
                                <strong>${stats.capitalsTotal - stats.capitalsCorrect}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">👥 Einwohner</h2>
                    </div>
                    <div class="card-body">
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${populationRate}%; background: var(--secondary);"></div>
                            </div>
                            <div class="progress-label">${populationRate}% Erfolgsrate</div>
                        </div>
                        <div class="stats-list">
                            <div class="stats-item">
                                <span>Gesamt gespielt:</span>
                                <strong>${stats.populationTotal}</strong>
                            </div>
                            <div class="stats-item">
                                <span>Richtig beantwortet:</span>
                                <strong>${stats.populationCorrect}</strong>
                            </div>
                            <div class="stats-item">
                                <span>Falsch beantwortet:</span>
                                <strong>${stats.populationTotal - stats.populationCorrect}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            ${history.length > 0 ? `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">📜 Letzte Spiele</h2>
                    </div>
                    <div class="card-body">
                        <div class="history-list">
                            ${history.slice(0, 10).map(entry => `
                                <div class="history-item ${entry.correct ? 'history-success' : 'history-error'}">
                                    <div class="history-icon">
                                        ${entry.gameType === 'capitals' ? '🌍' : '👥'}
                                    </div>
                                    <div class="history-info">
                                        <div class="history-type">
                                            ${entry.gameType === 'capitals' ? 'Hauptstadt' : 'Einwohner'}
                                        </div>
                                        <div class="history-time">
                                            ${new Date(entry.timestamp).toLocaleDateString('de-DE')}
                                            ${new Date(entry.timestamp).toLocaleTimeString('de-DE')}
                                        </div>
                                    </div>
                                    <div class="history-result">
                                        ${entry.correct ? '✅' : '❌'}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            ` : `
                <div class="empty-state">
                    <div class="empty-state-icon">📊</div>
                    <div class="empty-state-title">Noch keine Spiele</div>
                    <div class="empty-state-text">
                        Spiele deine ersten Runden und sammle Statistiken!
                    </div>
                    <a href="#games" data-route="games" class="btn btn-primary">
                        Jetzt spielen
                    </a>
                </div>
            `}

            <div class="stats-actions">
                <button class="btn btn-outline" onclick="window.resetStats()">
                    🗑️ Statistiken zurücksetzen
                </button>
            </div>
        </div>

        <style>
            .stats-overview {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: var(--spacing-md);
                margin-bottom: var(--spacing-xl);
            }

            .stat-box {
                background: var(--bg-card);
                border: 2px solid rgba(0, 255, 136, 0.1);
                border-radius: var(--radius-md);
                padding: var(--spacing-lg);
                text-align: center;
                transition: all var(--transition-normal);
            }

            .stat-box:hover {
                transform: translateY(-4px);
                box-shadow: var(--shadow-md), var(--shadow-glow);
            }

            .stat-box-primary { border-color: rgba(0, 255, 136, 0.3); }
            .stat-box-success { border-color: rgba(0, 255, 136, 0.4); }
            .stat-box-accent { border-color: rgba(0, 240, 255, 0.3); }
            .stat-box-warning { border-color: rgba(255, 157, 0, 0.3); }

            .stat-box-icon {
                font-size: 2.5rem;
                margin-bottom: var(--spacing-sm);
            }

            .stat-box-value {
                font-size: 2rem;
                font-weight: 900;
                color: var(--primary);
                margin-bottom: var(--spacing-xs);
            }

            .stat-box-label {
                font-size: 0.875rem;
                color: var(--text-secondary);
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: var(--spacing-md);
                margin-bottom: var(--spacing-xl);
            }

            .progress-container {
                margin-bottom: var(--spacing-md);
            }

            .progress-bar {
                height: 12px;
                background: rgba(0, 255, 136, 0.1);
                border-radius: var(--radius-full);
                overflow: hidden;
                margin-bottom: var(--spacing-xs);
            }

            .progress-fill {
                height: 100%;
                background: var(--primary);
                border-radius: var(--radius-full);
                transition: width 1s ease-out;
                box-shadow: 0 0 10px currentColor;
            }

            .progress-label {
                text-align: center;
                font-size: 0.875rem;
                color: var(--text-secondary);
            }

            .stats-list {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-sm);
            }

            .stats-item {
                display: flex;
                justify-content: space-between;
                padding: var(--spacing-xs) 0;
                border-bottom: 1px solid rgba(0, 255, 136, 0.05);
            }

            .stats-item:last-child {
                border-bottom: none;
            }

            .stats-item span {
                color: var(--text-secondary);
            }

            .stats-item strong {
                color: var(--primary);
                font-weight: 700;
            }

            .history-list {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-xs);
            }

            .history-item {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                padding: var(--spacing-sm);
                background: rgba(0, 255, 136, 0.05);
                border-radius: var(--radius-sm);
                border-left: 3px solid var(--primary);
                transition: all var(--transition-fast);
            }

            .history-item:hover {
                background: rgba(0, 255, 136, 0.1);
                transform: translateX(4px);
            }

            .history-success {
                border-left-color: var(--primary);
            }

            .history-error {
                border-left-color: #ff0033;
                background: rgba(255, 0, 51, 0.05);
            }

            .history-error:hover {
                background: rgba(255, 0, 51, 0.1);
            }

            .history-icon {
                font-size: 1.5rem;
            }

            .history-info {
                flex: 1;
            }

            .history-type {
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            }

            .history-time {
                font-size: 0.75rem;
                color: var(--text-secondary);
            }

            .history-result {
                font-size: 1.25rem;
            }

            .empty-state {
                text-align: center;
                padding: var(--spacing-xl) var(--spacing-md);
                margin: var(--spacing-xl) 0;
            }

            .empty-state-icon {
                font-size: 5rem;
                margin-bottom: var(--spacing-md);
                opacity: 0.5;
            }

            .empty-state-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: var(--spacing-sm);
            }

            .empty-state-text {
                color: var(--text-secondary);
                margin-bottom: var(--spacing-lg);
            }

            .stats-actions {
                text-align: center;
                margin-top: var(--spacing-xl);
            }

            @media (max-width: 640px) {
                .stats-overview {
                    grid-template-columns: repeat(2, 1fr);
                    gap: var(--spacing-sm);
                }

                .stat-box {
                    padding: var(--spacing-md);
                }

                .stat-box-icon {
                    font-size: 2rem;
                }

                .stat-box-value {
                    font-size: 1.5rem;
                }
            }
        </style>
    `;
};

// Reset stats function
window.resetStats = () => {
    if (window.app && window.app.ui && window.app.store) {
        window.app.ui.showModal(`
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                <h2 style="margin-bottom: 1rem;">Statistiken zurücksetzen?</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                    Alle deine Spielstatistiken werden gelöscht. Diese Aktion kann nicht rückgängig gemacht werden!
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn btn-outline" onclick="window.closeModal()">
                        Abbrechen
                    </button>
                    <button class="btn btn-danger" onclick="window.confirmResetStats()">
                        Zurücksetzen
                    </button>
                </div>
            </div>
        `);
    }
};

window.confirmResetStats = () => {
    if (window.app && window.app.store) {
        // Reset stats in store
        const currentState = window.app.store.state;
        currentState.stats = {
            gamesPlayed: 0,
            gamesWon: 0,
            currentStreak: 0,
            bestStreak: 0,
            capitalsCorrect: 0,
            capitalsTotal: 0,
            populationCorrect: 0,
            populationTotal: 0
        };
        currentState.history = [];
        window.app.store.save();
        window.app.store.notify();

        window.closeModal();
        window.app.ui.showNotification('Statistiken wurden zurückgesetzt', 'info');
        window.app.router.navigateTo('stats');
    }
};
