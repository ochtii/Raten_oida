/* ==========================================
   HOME VIEW
   ========================================== */

export const homeView = (store) => {
    const stats = store.getStats();
    const wallet = store.getWallet();
    const points = store.getPoints();

    return `
        <div class="home-view">
            <div class="hero">
                <h1 class="hero-title">
                    <span class="hero-icon">🎮</span>
                    Willkommen bei<br>
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
                        <div class="stat-value-large">${stats.currentStreak}</div>
                        <div class="stat-sublabel">Beste: ${stats.bestStreak}</div>
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
                        ${stats.capitalsTotal > 0 ? `
                            <span class="action-stat">
                                ${stats.capitalsCorrect}/${stats.capitalsTotal} 
                                (${Math.round((stats.capitalsCorrect / stats.capitalsTotal) * 100)}%)
                            </span>
                        ` : '<span class="action-stat">Noch nicht gespielt</span>'}
                    </div>
                </a>

                <a href="#games" data-route="games" class="action-card action-card-secondary">
                    <div class="action-icon">👥</div>
                    <h3 class="action-title">Einwohner</h3>
                    <p class="action-desc">Schätze die Einwohnerzahl</p>
                    <div class="action-stats">
                        ${stats.populationTotal > 0 ? `
                            <span class="action-stat">
                                ${stats.populationCorrect}/${stats.populationTotal}
                                (${Math.round((stats.populationCorrect / stats.populationTotal) * 100)}%)
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
                            <strong>${stats.gamesPlayed}</strong>
                        </div>
                        <div class="stats-item">
                            <span>Spiele gewonnen:</span>
                            <strong>${stats.gamesWon}</strong>
                        </div>
                        <div class="stats-item">
                            <span>Beste Streak:</span>
                            <strong>${stats.bestStreak}</strong>
                        </div>
                        <div class="stats-item">
                            <span>Gewinnrate:</span>
                            <strong>${stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0}%</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .hero {
                text-align: center;
                margin-bottom: var(--spacing-xl);
                padding: var(--spacing-lg) 0;
            }

            .hero-icon {
                font-size: 4rem;
                display: block;
                margin-bottom: var(--spacing-sm);
                animation: pulse 2s ease-in-out infinite;
            }

            .hero-title {
                font-size: 2rem;
                font-weight: 900;
                line-height: 1.2;
                margin-bottom: var(--spacing-sm);
            }

            .hero-brand {
                background: linear-gradient(90deg, var(--primary), var(--secondary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-size: 2.5rem;
            }

            .hero-subtitle {
                font-size: 1.125rem;
                color: var(--text-secondary);
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: var(--spacing-md);
                margin-bottom: var(--spacing-xl);
            }

            .stat-card {
                position: relative;
                background: linear-gradient(135deg, rgba(10, 14, 39, 0.8), rgba(26, 16, 51, 0.6));
                border: 2px solid rgba(0, 255, 136, 0.2);
                border-radius: var(--radius-lg);
                padding: var(--spacing-lg);
                overflow: hidden;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
            }

            .stat-card:hover {
                transform: translateY(-8px) scale(1.02);
                border-color: var(--primary);
                box-shadow: 
                    0 12px 40px rgba(0, 0, 0, 0.4),
                    0 0 30px rgba(0, 255, 136, 0.4);
            }

            .stat-background {
                position: absolute;
                top: -20px;
                right: -20px;
                opacity: 0.1;
                pointer-events: none;
            }

            .stat-icon-large {
                font-size: 6rem;
                filter: blur(4px);
            }

            .stat-content {
                position: relative;
                z-index: 2;
            }

            .stat-label {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: var(--text-secondary);
                margin-bottom: 0.5rem;
                font-weight: 600;
            }

            .stat-value-large {
                font-size: 2.5rem;
                font-weight: 900;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 0.25rem;
                line-height: 1;
            }

            .stat-currency {
                font-size: 0.875rem;
                color: var(--text-muted);
                font-weight: 500;
            }

            .stat-progress {
                font-size: 0.875rem;
                color: var(--primary);
                font-weight: 600;
                margin-top: 0.5rem;
            }

            .stat-sublabel {
                font-size: 0.75rem;
                color: var(--text-muted);
                margin-top: 0.5rem;
            }

            .stat-shine {
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                transition: left 0.6s;
            }

            .stat-card:hover .stat-shine {
                left: 100%;
            }

            /* Spezielle Farben für Karten */
            .wallet-card {
                border-color: rgba(255, 215, 0, 0.3);
            }

            .wallet-card:hover {
                border-color: #ffd700;
                box-shadow: 
                    0 12px 40px rgba(0, 0, 0, 0.4),
                    0 0 30px rgba(255, 215, 0, 0.4);
            }

            .wallet-card .stat-value-large {
                background: linear-gradient(135deg, #ffd700, #ffed4e);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .points-card {
                border-color: rgba(0, 240, 255, 0.3);
            }

            .points-card:hover {
                border-color: #00f0ff;
                box-shadow: 
                    0 12px 40px rgba(0, 0, 0, 0.4),
                    0 0 30px rgba(0, 240, 255, 0.4);
            }

            .points-card .stat-value-large {
                background: linear-gradient(135deg, #00f0ff, #00ff88);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .streak-card {
                border-color: rgba(255, 100, 0, 0.3);
            }

            .streak-card:hover {
                border-color: #ff6400;
                box-shadow: 
                    0 12px 40px rgba(0, 0, 0, 0.4),
                    0 0 30px rgba(255, 100, 0, 0.4);
            }

            .streak-card .stat-value-large {
                background: linear-gradient(135deg, #ff6400, #ffaa00);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .quick-actions {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: var(--spacing-md);
                margin-bottom: var(--spacing-lg);
            }

            .action-card {
                background: var(--bg-card);
                border: 1px solid rgba(0, 255, 136, 0.1);
                border-radius: var(--radius-md);
                padding: var(--spacing-md);
                text-decoration: none;
                color: var(--text-primary);
                transition: all var(--transition-normal);
                display: flex;
                flex-direction: column;
                gap: var(--spacing-xs);
            }

            .action-card:hover {
                transform: translateY(-4px);
                box-shadow: var(--shadow-lg), var(--shadow-glow);
                border-color: rgba(0, 255, 136, 0.4);
            }

            .action-card-primary:hover { border-color: var(--primary); }
            .action-card-secondary:hover { border-color: var(--secondary); }

            .action-icon {
                font-size: 3rem;
                margin-bottom: var(--spacing-xs);
            }

            .action-title {
                font-size: 1.25rem;
                font-weight: 700;
                color: var(--primary);
                margin-bottom: var(--spacing-xs);
            }

            .action-desc {
                color: var(--text-secondary);
                margin-bottom: var(--spacing-sm);
                flex: 1;
            }

            .action-stats {
                padding-top: var(--spacing-xs);
                border-top: 1px solid rgba(0, 255, 136, 0.1);
            }

            .action-stat {
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

            @media (max-width: 640px) {
                .hero-title {
                    font-size: 1.5rem;
                }

                .hero-brand {
                    font-size: 2rem;
                }

                .stats-grid {
                    grid-template-columns: 1fr;
                }

                .stat-card {
                    padding: var(--spacing-sm);
                }
            }
        </style>
    `;
};
