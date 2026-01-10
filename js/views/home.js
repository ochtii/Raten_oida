/* ==========================================
   HOME VIEW
   ========================================== */

export const homeView = (store) => {
    const stats = store.getStats() || {};
    const wallet = store.getWallet() || 0;
    const points = store.getPoints() || 0;
    
    // Safe defaults
    const safeStats = {
        currentStreak: stats.currentStreak || 0,
        bestStreak: stats.bestStreak || 0,
        capitalsCorrect: stats.capitalsCorrect || 0,
        capitalsTotal: stats.capitalsTotal || 0,
        populationCorrect: stats.populationCorrect || 0,
        populationTotal: stats.populationTotal || 0,
        gamesPlayed: stats.gamesPlayed || 0,
        gamesWon: stats.gamesWon || 0
    };

    return `
        <div class="home-view">
            <div class="hero">
                <div class="hero-icon">🎮</div>
                <h1 class="hero-title">
                    Willkommen bei
                    <span class="hero-brand">RATEN<span style="color: var(--accent);">OIDA</span></span>
                </h1>
                <p class="hero-subtitle">
                    Teste dein Wissen über Hauptstädte und Einwohnerzahlen!
                </p>
            </div>

            <div class="stats-grid">
                <div class="stat-card wallet-card">
                    <div class="stat-background">
                        <div class="stat-icon-large">💰</div>
                    </div>
                    <div class="stat-content">
                        <div class="stat-label">Dein Guthaben</div>
                        <div class="stat-value-large">${wallet.toLocaleString('de-DE')}</div>
                        <div class="stat-currency">Schülling</div>
                    </div>
                    <div class="stat-shine"></div>
                </div>
                
                <div class="stat-card points-card">
                    <div class="stat-background">
                        <div class="stat-icon-large">⭐</div>
                    </div>
                    <div class="stat-content">
                        <div class="stat-label">Gesammelte Punkte</div>
                        <div class="stat-value-large">${points.toLocaleString('de-DE')}</div>
                        <div class="stat-progress">
                            ${points >= 1000 ? '🏆 Expert' : points >= 500 ? '📈 Fortgeschritten' : points >= 100 ? '🌱 Anfänger' : '🐣 Neuling'}
                        </div>
                    </div>
                    <div class="stat-shine"></div>
                </div>
                
                <div class="stat-card streak-card">
                    <div class="stat-background">
                        <div class="stat-icon-large">🔥</div>
                    </div>
                    <div class="stat-content">
                        <div class="stat-label">Aktuelle Serie</div>
                        <div class="stat-value-large">${safeStats.currentStreak}</div>
                        <div class="stat-sublabel">Beste: ${safeStats.bestStreak}</div>
                    </div>
                    <div class="stat-shine"></div>
                </div>
            </div>

            <div class="quick-actions">
                <a href="#games" data-route="games" class="action-card action-card-primary">
                    <div class="action-icon">🌍</div>
                    <h3 class="action-title">Hauptstädte</h3>
                    <p class="action-desc">Rate die Hauptstadt eines Landes</p>
                    <div class="action-stats">
                        ${safeStats.capitalsTotal > 0 ? `
                            <span class="action-stat">
                                ${safeStats.capitalsCorrect}/${safeStats.capitalsTotal} 
                                (${Math.round((safeStats.capitalsCorrect / safeStats.capitalsTotal) * 100)}%)
                            </span>
                        ` : '<span class="action-stat">Noch nicht gespielt</span>'}
                    </div>
                </a>

                <a href="#games" data-route="games" class="action-card action-card-secondary">
                    <div class="action-icon">👥</div>
                    <h3 class="action-title">Einwohner</h3>
                    <p class="action-desc">Schätze die Einwohnerzahl</p>
                    <div class="action-stats">
                        ${safeStats.populationTotal > 0 ? `
                            <span class="action-stat">
                                ${safeStats.populationCorrect}/${safeStats.populationTotal}
                                (${Math.round((safeStats.populationCorrect / safeStats.populationTotal) * 100)}%)
                            </span>
                        ` : '<span class="action-stat">Noch nicht gespielt</span>'}
                    </div>
                </a>
            </div>

            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">📊 Deine Statistik</h2>
                </div>
                <div class="card-body">
                    <div class="stats-list">
                        <div class="stats-item">
                            <span>Spiele gespielt:</span>
                            <strong>${safeStats.gamesPlayed || 0}</strong>
                        </div>
                        <div class="stats-item">
                            <span>Spiele gewonnen:</span>
                            <strong>${safeStats.gamesWon || 0}</strong>
                        </div>
                        <div class="stats-item">
                            <span>Beste Streak:</span>
                            <strong>${safeStats.bestStreak}</strong>
                        </div>
                        <div class="stats-item">
                            <span>Gewinnrate:</span>
                            <strong>${(safeStats.gamesPlayed || 0) > 0 ? Math.round(((safeStats.gamesWon || 0) / safeStats.gamesPlayed) * 100) : 0}%</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};
