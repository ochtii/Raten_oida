/* ==========================================
   POINTS VIEW - Punktesystem & Achievements
   ========================================== */

export const pointsView = (store) => {
    try {
        const points = store.getPoints() || 0;
        const stats = store.getStats() || {};
        const history = store.getHistory() || [];
        
        // Defaults für Stats
        const safeStats = {
            gamesPlayed: stats.gamesPlayed || 0,
            gamesWon: stats.gamesWon || 0,
            capitalsCorrect: stats.capitalsCorrect || 0,
            capitalsTotal: stats.capitalsTotal || 0,
            populationCorrect: stats.populationCorrect || 0,
            populationTotal: stats.populationTotal || 0,
            bestStreak: stats.bestStreak || 0,
            currentStreak: stats.currentStreak || 0
        };
        
        // Rang basierend auf Punkten berechnen
    const getRank = (pts) => {
        if (pts >= 10000) return { name: 'Grandmaster', icon: '👑', color: '#ffd700', next: null };
        if (pts >= 5000) return { name: 'Master', icon: '🏆', color: '#c0c0c0', next: 10000 };
        if (pts >= 2500) return { name: 'Expert', icon: '⭐', color: '#cd7f32', next: 5000 };
        if (pts >= 1000) return { name: 'Profi', icon: '🎯', color: '#00ff88', next: 2500 };
        if (pts >= 500) return { name: 'Fortgeschritten', icon: '📈', color: '#00f0ff', next: 1000 };
        if (pts >= 100) return { name: 'Anfänger', icon: '🌱', color: '#a0a0ff', next: 500 };
        return { name: 'Neuling', icon: '🐣', color: '#888', next: 100 };
    };
    
    const rank = getRank(points);
    const progress = rank.next ? Math.min(100, ((points / rank.next) * 100)) : 100;
    
    // Achievements Definition
    const achievements = [
        {
            id: 'first_game',
            name: 'Erste Schritte',
            description: 'Spiele dein erstes Spiel',
            icon: '🎮',
            unlocked: safeStats.gamesPlayed >= 1,
            points: 10
        },
        {
            id: 'games_10',
            name: 'Fleißig',
            description: 'Spiele 10 Spiele',
            icon: '🔥',
            unlocked: safeStats.gamesPlayed >= 10,
            points: 50,
            progress: safeStats.gamesPlayed,
            total: 10
        },
        {
            id: 'games_50',
            name: 'Enthusiast',
            description: 'Spiele 50 Spiele',
            icon: '💪',
            unlocked: safeStats.gamesPlayed >= 50,
            points: 100,
            progress: safeStats.gamesPlayed,
            total: 50
        },
        {
            id: 'streak_5',
            name: 'Glückssträhne',
            description: 'Erreiche eine Streak von 5',
            icon: '🌟',
            unlocked: safeStats.bestStreak >= 5,
            points: 25,
            progress: safeStats.bestStreak,
            total: 5
        },
        {
            id: 'streak_10',
            name: 'Unaufhaltsam',
            description: 'Erreiche eine Streak von 10',
            icon: '⚡',
            unlocked: safeStats.bestStreak >= 10,
            points: 75,
            progress: safeStats.bestStreak,
            total: 10
        },
        {
            id: 'capitals_master',
            name: 'Hauptstadt-Meister',
            description: '20 Hauptstädte richtig',
            icon: '🏛️',
            unlocked: safeStats.capitalsCorrect >= 20,
            points: 50,
            progress: safeStats.capitalsCorrect,
            total: 20
        },
        {
            id: 'population_expert',
            name: 'Bevölkerungs-Experte',
            description: '20 Bevölkerungen richtig',
            icon: '👥',
            unlocked: safeStats.populationCorrect >= 20,
            points: 50,
            progress: safeStats.populationCorrect,
            total: 20
        },
        {
            id: 'perfect_10',
            name: 'Perfektionist',
            description: '10 Spiele perfekt',
            icon: '💯',
            unlocked: safeStats.gamesWon >= 10,
            points: 100,
            progress: safeStats.gamesWon,
            total: 10
        },
        {
            id: 'points_1000',
            name: 'Tausender',
            description: 'Erreiche 1000 Punkte',
            icon: '🎯',
            unlocked: points >= 1000,
            points: 100,
            progress: points,
            total: 1000
        },
        {
            id: 'points_5000',
            name: 'Elite',
            description: 'Erreiche 5000 Punkte',
            icon: '👑',
            unlocked: points >= 5000,
            points: 500,
            progress: points,
            total: 5000
        }
    ];
    
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalAchievementPoints = achievements.reduce((sum, a) => a.unlocked ? sum + a.points : sum, 0);
    
    // Letzte Punkte-Aktionen
    const recentPoints = history.slice(0, 10);
    
    return `
        <div class="points-view">
            <style>
                .points-view {
                    padding-bottom: 2rem;
                }
                
                .rank-card {
                    background: linear-gradient(135deg, var(--bg-card), var(--bg-secondary));
                    border: 2px solid ${rank.color};
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-lg);
                    margin-bottom: var(--spacing-lg);
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                
                .rank-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, ${rank.color}22 0%, transparent 70%);
                    pointer-events: none;
                }
                
                .rank-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    animation: float 3s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                .rank-name {
                    font-size: 2rem;
                    font-weight: bold;
                    color: ${rank.color};
                    margin-bottom: 0.5rem;
                    text-shadow: 0 0 20px ${rank.color}55;
                }
                
                .points-display {
                    font-size: 3rem;
                    font-weight: bold;
                    color: var(--primary);
                    margin: 1rem 0;
                }
                
                .progress-bar-container {
                    background: rgba(0,0,0,0.3);
                    border-radius: 100px;
                    height: 24px;
                    margin-top: 1rem;
                    overflow: hidden;
                    position: relative;
                }
                
                .progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, ${rank.color}, var(--primary));
                    border-radius: 100px;
                    transition: width 1s ease-out;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding-right: 12px;
                    font-size: 0.875rem;
                    font-weight: bold;
                }
                
                .next-rank {
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                }
                
                .achievements-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 2rem 0 1rem;
                }
                
                .achievement-card {
                    background: var(--bg-card);
                    border: 1px solid rgba(0, 255, 136, 0.15);
                    border-radius: var(--radius-md);
                    padding: var(--spacing-md);
                    margin-bottom: var(--spacing-sm);
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    transition: all 0.3s;
                    position: relative;
                    overflow: hidden;
                }
                
                .achievement-card.unlocked {
                    border-color: var(--primary);
                    background: linear-gradient(135deg, var(--bg-card), rgba(0, 255, 136, 0.05));
                }
                
                .achievement-card.locked {
                    opacity: 0.5;
                }
                
                .achievement-icon {
                    font-size: 2.5rem;
                    min-width: 60px;
                    text-align: center;
                }
                
                .achievement-card.locked .achievement-icon {
                    filter: grayscale(100%);
                }
                
                .achievement-info {
                    flex: 1;
                }
                
                .achievement-name {
                    font-size: 1.125rem;
                    font-weight: bold;
                    margin-bottom: 0.25rem;
                }
                
                .achievement-desc {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                }
                
                .achievement-progress {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    margin-top: 0.5rem;
                }
                
                .achievement-progress-bar {
                    height: 4px;
                    background: rgba(0,0,0,0.3);
                    border-radius: 2px;
                    margin-top: 0.25rem;
                    overflow: hidden;
                }
                
                .achievement-progress-fill {
                    height: 100%;
                    background: var(--primary);
                    transition: width 0.5s ease-out;
                }
                
                .achievement-points {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary);
                    min-width: 60px;
                    text-align: right;
                }
                
                .achievement-card.locked .achievement-points {
                    color: var(--text-muted);
                }
                
                .history-item {
                    background: var(--bg-card);
                    border: 1px solid rgba(0, 255, 136, 0.1);
                    border-radius: var(--radius-md);
                    padding: var(--spacing-md);
                    margin-bottom: var(--spacing-sm);
                    transition: all 0.3s;
                }

                .history-item:hover {
                    transform: translateX(4px);
                    border-color: rgba(0, 255, 136, 0.3);
                }

                .history-item.correct {
                    border-left: 4px solid var(--primary);
                }

                .history-item.incorrect {
                    border-left: 4px solid var(--accent);
                }

                .history-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .history-info {
                    flex: 1;
                }

                .history-type {
                    font-weight: 600;
                    font-size: 0.875rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .history-time {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                }

                .history-points {
                    font-weight: bold;
                    font-size: 1.25rem;
                    min-width: 60px;
                    text-align: right;
                }

                .history-points.positive {
                    color: var(--primary);
                }

                .history-points.negative {
                    color: var(--accent);
                }

                .history-details {
                    margin-top: 0.75rem;
                    padding-top: 0.75rem;
                    border-top: 1px solid rgba(0, 255, 136, 0.1);
                    font-size: 0.875rem;
                }

                .history-question {
                    color: var(--text-secondary);
                    margin-bottom: 0.25rem;
                }

                .history-answer {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .history-answer-item {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .history-answer-item.user {
                    color: var(--text-secondary);
                }

                .history-answer-item.user.wrong {
                    color: var(--accent);
                    text-decoration: line-through;
                }

                .history-answer-item.correct-ans {
                    color: var(--primary);
                    font-weight: 600;
                }

                .history-streak {
                    font-size: 0.75rem;
                    color: var(--warning);
                    margin-top: 0.25rem;
                }
            </style>
            
            <!-- Rang Card -->
            <div class="rank-card">
                <div class="rank-icon">${rank.icon}</div>
                <div class="rank-name">${rank.name}</div>
                <div class="points-display">${points.toLocaleString('de-DE')} Punkte</div>
                
                ${rank.next ? `
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${progress}%">
                            ${Math.round(progress)}%
                        </div>
                    </div>
                    <div class="next-rank">
                        Noch ${(rank.next - points).toLocaleString('de-DE')} Punkte bis ${getRank(rank.next).name}
                    </div>
                ` : `
                    <div class="next-rank" style="color: var(--primary);">
                        ✨ Maximaler Rang erreicht! ✨
                    </div>
                `}
            </div>
            
            <!-- Achievements -->
            <div class="achievements-header">
                <h2 class="section-title">🏆 Achievements</h2>
                <div style="font-size: 0.875rem; color: var(--text-secondary);">
                    ${unlockedCount}/${achievements.length} freigeschaltet
                    <br>
                    <span style="color: var(--primary);">+${totalAchievementPoints} Bonuspunkte</span>
                </div>
            </div>
            
            <div class="achievements-grid">
                ${achievements.map(achievement => `
                    <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                        <div class="achievement-icon">${achievement.icon}</div>
                        <div class="achievement-info">
                            <div class="achievement-name">${achievement.name}</div>
                            <div class="achievement-desc">${achievement.description}</div>
                            ${!achievement.unlocked && achievement.total ? `
                                <div class="achievement-progress">
                                    ${achievement.progress || 0} / ${achievement.total}
                                    <div class="achievement-progress-bar">
                                        <div class="achievement-progress-fill" 
                                             style="width: ${((achievement.progress || 0) / achievement.total * 100)}%">
                                        </div>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        <div class="achievement-points">
                            ${achievement.unlocked ? '✓' : '+'} ${achievement.points}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Punkte-Historie -->
            ${recentPoints.length > 0 ? `
                <h2 class="section-title" style="margin-top: 2rem;">📜 Letzte Aktivitäten</h2>
                <div class="history-list">
                    ${recentPoints.map(item => {
                        const time = new Date(item.timestamp);
                        const dateStr = time.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
                        const timeStr = time.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
                        const typeLabel = item.type === 'capitals' ? '🏛️ Hauptstädte' : '👥 Bevölkerung';
                        const statusIcon = item.correct ? '✓' : '✗';
                        
                        return `
                            <div class="history-item ${item.correct ? 'correct' : 'incorrect'}">
                                <div class="history-header">
                                    <div class="history-info">
                                        <div class="history-type">
                                            <span>${statusIcon}</span>
                                            ${typeLabel}
                                        </div>
                                        <div class="history-time">${dateStr} um ${timeStr}</div>
                                    </div>
                                    <div class="history-points ${item.points > 0 ? 'positive' : 'negative'}">
                                        ${item.points > 0 ? '+' : ''}${item.points}
                                    </div>
                                </div>
                                ${item.question ? `
                                    <div class="history-details">
                                        <div class="history-question">
                                            <strong>Frage:</strong> ${item.question}
                                        </div>
                                        <div class="history-answer">
                                            ${!item.correct && item.userAnswer ? `
                                                <span class="history-answer-item user wrong">
                                                    Deine Antwort: ${item.userAnswer}
                                                </span>
                                            ` : ''}
                                            <span class="history-answer-item correct-ans">
                                                ${item.correct ? '✓' : '→'} ${item.correctAnswer}
                                            </span>
                                        </div>
                                        ${item.streak > 0 ? `
                                            <div class="history-streak">🔥 Streak: ${item.streak}</div>
                                        ` : ''}
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            ` : `
                <div class="card" style="text-align: center; margin-top: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🎮</div>
                    <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">Noch keine Aktivitäten</h3>
                    <p style="color: var(--text-muted);">Spiele ein Quiz, um deine Historie zu füllen!</p>
                    <a href="#games" data-route="games" class="btn btn-primary" style="margin-top: 1rem;">
                        Jetzt spielen
                    </a>
                </div>
            `}
        </div>
    `;
    } catch (error) {
        console.error('Points View Error:', error);
        return `
            <div style="padding: 2rem; text-align: center;">
                <h2 style="color: var(--accent);">❌ Fehler beim Laden</h2>
                <p style="color: var(--text-secondary); margin-top: 1rem;">${error.message}</p>
                <pre style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: left; overflow-x: auto;">
                    ${error.stack || 'Kein Stack verfügbar'}
                </pre>
            </div>
        `;
    }
};
