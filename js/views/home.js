/* ==========================================
   HOME VIEW
   ========================================== */

export const homeView = (store) => {
    console.log('🏠 Home View wird gerendert');
    console.log('📦 Store State:', store.state);
    
    const stats = store.getStats();
    const wallet = store.getWallet();
    const points = store.getPoints();
    
    console.log('📊 Stats:', stats);
    console.log('💰 Wallet:', wallet);
    console.log('⭐ Points:', points);
    
    // Debug: Zeige localStorage Inhalt
    const savedData = localStorage.getItem('raten_oida_v2');
    console.log('💾 LocalStorage:', savedData ? JSON.parse(savedData) : 'Leer');

    return `
        <div class="home-view">
            <!-- Debug Info -->
            <div style="background: rgba(255,0,0,0.1); border: 2px solid red; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; font-size: 0.875rem;">
                <strong>DEBUG INFO:</strong><br>
                Wallet: ${wallet} (Typ: ${typeof wallet})<br>
                Punkte: ${points} (Typ: ${typeof points})<br>
                Spiele: ${stats.gamesPlayed}<br>
                localStorage: ${savedData ? 'Vorhanden' : 'Leer'}
            </div>
            
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
                <div class="stat-card stat-card-primary">
                    <div class="stat-icon">💰</div>
                    <div class="stat-value">${wallet.toLocaleString('de-DE')}</div>
                    <div class="stat-label">Schülling</div>
                </div>
                <div class="stat-card stat-card-secondary">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-value">${points.toLocaleString('de-DE')}</div>
                    <div class="stat-label">Punkte</div>
                </div>
                <div class="stat-card stat-card-accent">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-value">${stats.currentStreak}</div>
                    <div class="stat-label">Streak</div>
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
                gap: var(--spacing-sm);
                margin-bottom: var(--spacing-lg);
            }

            .stat-card {
                background: var(--bg-card);
                border: 1px solid rgba(0, 255, 136, 0.1);
                border-radius: var(--radius-md);
                padding: var(--spacing-md);
                text-align: center;
                transition: all var(--transition-normal);
            }

            .stat-card:hover {
                transform: translateY(-4px);
                box-shadow: var(--shadow-glow);
            }

            .stat-card-primary { border-color: rgba(0, 255, 136, 0.3); }
            .stat-card-secondary { border-color: rgba(0, 240, 255, 0.3); }
            .stat-card-accent { border-color: rgba(255, 0, 110, 0.3); }

            .stat-icon {
                font-size: 2rem;
                margin-bottom: var(--spacing-xs);
            }

            .stat-value {
                font-size: 1.75rem;
                font-weight: 900;
                color: var(--primary);
                margin-bottom: 0.25rem;
            }

            .stat-label {
                font-size: 0.875rem;
                color: var(--text-secondary);
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
