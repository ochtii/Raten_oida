/* ==========================================
   CHANGELOG VIEW - Git History & Changes
   ========================================== */

export const changelogView = (store) => {
    return `
        <div class="changelog-view">
            <h1 class="section-title">📜 Changelog</h1>
            
            <div class="changelog-intro">
                <p>Hier findest du alle Änderungen und Updates der App in chronologischer Reihenfolge.</p>
            </div>

            <div id="changelogList" class="changelog-list">
                <div class="loading-state">
                    <div class="spinner"></div>
                    <p>Lade Changelog...</p>
                </div>
            </div>
        </div>
    `;
};

// Changelog laden nach View-Render
window.loadChangelog = async () => {
    const container = document.getElementById('changelogList');
    if (!container) return;

    try {
        // Lade Git-Commits vom Server
        const response = await fetch('/api/git-log');
        
        if (!response.ok) {
            // Fallback: Nutze statische Changelog-Daten
            loadStaticChangelog(container);
            return;
        }

        const commits = await response.json();
        renderChangelog(container, commits);
    } catch (error) {
        console.error('Fehler beim Laden des Changelogs:', error);
        loadStaticChangelog(container);
    }
};

function loadStaticChangelog(container) {
    // Statische Changelog-Daten als Fallback
    const staticChanges = [
        {
            version: '1.0.2.9',
            date: '2026-01-11',
            message: 'Benachrichtigungshistorie komplett neu gestaltet',
            details: 'Übersichtliche Liste mit Icons, Typ-Badges und verbesserter Formatierung',
            files: ['js/views/settings.js', 'css/app.css'],
            stats: { additions: 173, deletions: 39 }
        },
        {
            version: '1.0.2.8',
            date: '2026-01-11',
            message: 'Einstellungen: Cards erweitert',
            details: 'Cards auf 90% Bildschirmbreite erweitert und Seitenabstände reduziert',
            files: ['css/app.css', 'js/core/router.js'],
            stats: { additions: 24, deletions: 2 }
        },
        {
            version: '1.0.2.7',
            date: '2026-01-11',
            message: 'Bugfix: Lade-Loop behoben',
            details: 'localStorage Events mit Werte-Anzeige (vorher/nachher), kompaktes Toggle-Layout implementiert',
            files: ['js/core/ui.js', 'js/views/settings.js', 'css/app.css'],
            stats: { additions: 156, deletions: 47 }
        },
        {
            version: '1.0.2.6',
            date: '2026-01-11',
            message: 'Benachrichtigungen erweitert',
            details: 'localStorage Events hinzugefügt, Einstellungen synchronisiert, Synchronisations-Benachrichtigung implementiert',
            files: ['js/core/ui.js', 'js/views/settings.js'],
            stats: { additions: 234, deletions: 12 }
        },
        {
            version: '1.0.2.5',
            date: '2026-01-11',
            message: 'UI-Verbesserungen',
            details: 'Benachrichtigungs-Historie Modal & Layout-Korrekturen',
            files: ['js/views/settings.js', 'css/app.css'],
            stats: { additions: 89, deletions: 23 }
        },
        {
            version: '1.0.2.4',
            date: '2026-01-11',
            message: 'Feature: Debug-Konsole',
            details: 'Benachrichtigungs-Einstellungen & Debug-Konsole Verbesserungen',
            files: ['js/core/debug-console.js', 'js/views/settings.js'],
            stats: { additions: 178, deletions: 34 }
        },
        {
            version: '1.0.2.3',
            date: '2026-01-11',
            message: 'Automatisches Versionierungssystem',
            details: 'Implementierung eines automatischen Versionierungssystems',
            files: ['auto-version.js', 'package.json'],
            stats: { additions: 256, deletions: 8 }
        },
        {
            version: '1.0.2.2',
            date: '2026-01-11',
            message: 'Footer-Verbesserungen',
            details: 'Layout verbessert, Scrolling bei Cheats behoben, Cachebuster-Info aktualisiert',
            files: ['js/views/dev.js', 'css/app.css'],
            stats: { additions: 67, deletions: 19 }
        },
        {
            version: '1.0.2.1',
            date: '2026-01-11',
            message: 'Navigation-Fixes',
            details: 'Bottom Navigation repariert, Feuerwerks-Animation Anzeigeprobleme behoben',
            files: ['js/views/dev.js', 'css/app.css', 'index.html'],
            stats: { additions: 134, deletions: 56 }
        },
        {
            version: '1.0.2.0',
            date: '2026-01-10',
            message: 'DevTools erweitert',
            details: 'Scroll-Probleme behoben, Info-Icon z-index erhöht, Cache-Buster umbenannt',
            files: ['js/views/dev.js', 'css/app.css'],
            stats: { additions: 98, deletions: 42 }
        }
    ];

    renderChangelog(container, staticChanges);
}

function renderChangelog(container, changes) {
    const html = changes.map((change, index) => {
        const totalChanges = change.stats.additions + change.stats.deletions;
        const additionPercent = totalChanges > 0 ? (change.stats.additions / totalChanges) * 100 : 0;
        const deletionPercent = totalChanges > 0 ? (change.stats.deletions / totalChanges) * 100 : 0;
        
        // Visualisierung als Balken
        const maxBars = 20;
        const additionBars = Math.round((change.stats.additions / totalChanges) * maxBars);
        const deletionBars = maxBars - additionBars;
        const visualBar = '+'.repeat(additionBars) + '-'.repeat(deletionBars);

        return `
            <div class="changelog-item" data-index="${index}">
                <div class="changelog-header">
                    <div class="changelog-title-row">
                        <span class="changelog-version">v${change.version}</span>
                        <span class="changelog-date">${new Date(change.date).toLocaleDateString('de-DE')}</span>
                    </div>
                    <h3 class="changelog-message">${change.message}</h3>
                </div>
                
                <div class="changelog-stats">
                    <div class="stat-item stat-additions">
                        <span class="stat-icon">+</span>
                        <span class="stat-value">${change.stats.additions}</span>
                    </div>
                    <div class="changelog-bar">
                        <div class="bar-additions" style="width: ${additionPercent}%"></div>
                        <div class="bar-deletions" style="width: ${deletionPercent}%"></div>
                    </div>
                    <div class="stat-item stat-deletions">
                        <span class="stat-icon">-</span>
                        <span class="stat-value">${change.stats.deletions}</span>
                    </div>
                </div>

                <button class="btn btn-sm btn-outline changelog-toggle" onclick="window.toggleChangelogDetails(${index})">
                    <span class="toggle-icon">▼</span> Details
                </button>

                <div class="changelog-details" id="changelog-details-${index}" style="display: none;">
                    <div class="details-content">
                        <p class="details-description">${change.details}</p>
                        
                        <div class="details-files">
                            <h4>📁 Geänderte Dateien:</h4>
                            <ul class="file-list">
                                ${change.files.map((file, fileIdx) => {
                                    // Simuliere Stats für einzelne Dateien (basierend auf Gesamt-Stats)
                                    const fileAdditions = Math.round(change.stats.additions / change.files.length);
                                    const fileDeletions = Math.round(change.stats.deletions / change.files.length);
                                    const fileTotal = fileAdditions + fileDeletions;
                                    const fileMaxBars = 10;
                                    const fileAddBars = Math.round((fileAdditions / fileTotal) * fileMaxBars);
                                    const fileDelBars = fileMaxBars - fileAddBars;
                                    const fileVisualBar = '+'.repeat(fileAddBars) + '-'.repeat(fileDelBars);
                                    
                                    return `
                                    <li class="file-item">
                                        <span class="file-icon">${getFileIcon(file)}</span>
                                        <span class="file-name">${file}</span>
                                        <span class="file-bar">${fileVisualBar}</span>
                                    </li>
                                `}).join('')}
                            </ul>
                        </div>

                        <div class="details-visual">
                            <h4>📊 Änderungen:</h4>
                            <div class="visual-diagram">
                                <div class="diagram-bar">
                                    <div class="diagram-additions" style="width: ${additionPercent}%">
                                        <span class="diagram-label">+${change.stats.additions}</span>
                                    </div>
                                    <div class="diagram-deletions" style="width: ${deletionPercent}%">
                                        <span class="diagram-label">-${change.stats.deletions}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="visual-stats">
                                <span class="visual-add">+${change.stats.additions} Zeilen</span>
                                <span class="visual-del">-${change.stats.deletions} Zeilen</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
}

function getFileIcon(filename) {
    if (filename.endsWith('.js')) return '📜';
    if (filename.endsWith('.css')) return '🎨';
    if (filename.endsWith('.html')) return '📄';
    if (filename.endsWith('.json')) return '📋';
    if (filename.endsWith('.md')) return '📝';
    return '📁';
}

window.toggleChangelogDetails = (index) => {
    const details = document.getElementById(`changelog-details-${index}`);
    const button = document.querySelector(`[data-index="${index}"] .changelog-toggle`);
    const icon = button.querySelector('.toggle-icon');
    
    if (details.style.display === 'none') {
        details.style.display = 'block';
        icon.textContent = '▲';
        button.innerHTML = '<span class="toggle-icon">▲</span> Details ausblenden';
    } else {
        details.style.display = 'none';
        icon.textContent = '▼';
        button.innerHTML = '<span class="toggle-icon">▼</span> Details';
    }
};

// Automatisch Changelog laden wenn View gerendert wird
document.addEventListener('routeChanged', (e) => {
    if (e.detail.route === 'changelog') {
        setTimeout(() => window.loadChangelog(), 100);
    }
});
