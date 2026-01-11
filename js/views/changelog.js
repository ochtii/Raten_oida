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
            version: '1.0.8.1',
            date: '2026-01-11',
            message: 'fix: Changelog Syntax-Fehler behoben',
            details: `fix: Changelog Syntax-Fehler behoben

Entfernte übermäßige Einrückung im staticChanges Array die vom Auto-Versioning Script eingefügt wurde.`,
            files: [],
            stats: { additions: 0, deletions: 0 }
        },
        {
            version: '1.0.8.0',
            date: '2026-01-11',
            message: 'feat: Auto Reload Funktion für Dev Tools',
            details: `feat: Auto Reload Funktion für Dev Tools

✨ Features:
- Auto Reload Toggle in Dev Tools
- Einstellbares Intervall (1-600 Sekunden)
- Automatische Änderungserkennung (Version, CSS, JS)
- Hash-basierte Datei-Vergleiche
- Live Countdown-Timer im Header-Banner
- Manueller Modus (aktiv bis deaktiviert)

🎯 Funktionsweise:
- Prüft version.json auf neue Versionsnummer
- Hash-Vergleich für CSS und JS Dateien
- Automatischer Reload bei Änderungen
- Visual Feedback durch Banner mit Timer

📱 UI/UX:
- Toggle in Dev Tools Toggle-Panel
- Range Slider für Intervall-Einstellung (1s - 600s)
- Live Timer-Anzeige im Banner
- Info-Button mit detaillierter Erklärung
- Persistente Einstellungen (localStorage)

⚙️ Technisch:
- Simple Hash-Funktion für Datei-Vergleiche
- Separate Countdown und Check-Timer
- Meta-Tag für App-Version
- Auto-Start beim Laden wenn aktiviert`,
            files: [],
            stats: { additions: 0, deletions: 0 },
            expanded: true
        },
        {
            version: '1.0.7.3',
            date: '2026-01-11',
            message: 'chore: Update version to 1.0.7.2 and sync changelog entries',
            details: 'chore: Update version to 1.0.7.2 and sync changelog entries',
            files: [],
            stats: { additions: 0, deletions: 0 }
        },
        {
            version: '1.0.7.2',
            date: '2026-01-11',
            message: 'chore: Sync auto-versioning changes',
            details: 'chore: Sync auto-versioning changes',
            files: [],
            stats: { additions: 0, deletions: 0 }
        },
        {
            version: '1.0.7.1',
            date: '2026-01-11',
            message: 'fix: Entferne HTML-Kommentar aus Template Literal in dev.js',
            details: `fix: Entferne HTML-Kommentar aus Template Literal in dev.js

HTML-Kommentare in Template Literals können zu 'Unexpected token <' Fehlern führen.`,
            files: [],
            stats: { additions: 0, deletions: 0 }
        },
        {
            version: '1.0.7.0',
            date: '2026-01-11',
            message: 'feat: Optimierte Einstellungsseite',
            details: `feat: Optimierte Einstellungsseite

- Entfernte Theme-Vorschaubilder (kompakte Button-Ansicht)
- Schwebendes Such-Symbol (standardmäßig ausgeblendet)
- Schließen-Button für Suchfeld
- Benachrichtigungsgröße einstellbar (klein/mittel/groß)
- Benachrichtigungstypen als Multiple Choice (Erfolg/Fehler/Warnung/Info)
- Floating Search Toggle mit Animation
- Kompakte Theme-Buttons mit Emojis`,
            files: [],
            stats: { additions: 0, deletions: 0 }
        },
        {
            version: '1.0.6.1',
            date: '2026-01-11',
            message: 'fix: Optional chaining syntax error in settings.js',
            details: `fix: Optional chaining syntax error in settings.js

Fixed 'Invalid left-hand side in assignment' error by replacing optional chaining operator in assignment statements with proper null checks.`,
            files: [],
            stats: { additions: 0, deletions: 0 }
        },
        {
            version: '1.0.6.0',
            date: '2026-01-11',
            message: 'feat: Enhanced Cachebuster System with Auto-Changelog',
            details: `feat: Enhanced Cachebuster System with Auto-Changelog

✨ Features:
- Auto-update changelog with versioning system
- Cachebuster support for HTML files
- Granular cachebuster toggles (HTML/CSS/JS)
- Visual cachebuster header banner

📦 New Files:
- js/core/cachebuster.js: Complete cachebuster module

🔧 Modified:
- auto-version.js: Added updateChangelog() method
- js/views/dev.js: Granular toggles + enhanced info modal
- index.html: Cachebuster integration
- js/app.js: Updated module loading
- js/core/router.js: Cachebuster API integration
- css/app.css: Banner styles + animations

🎨 Banner Features:
- Animated rotating icon
- Active types display (HTML • CSS • JS)
- Build ID + timestamp
- Auto-minimize after 10s
- Mobile responsive`,
            files: [],
            stats: { additions: 0, deletions: 0 }
        },
        {
            version: '1.0.5.0',
            date: '2026-01-11',
            message: 'Feature: Theme-Switcher mit 10 Themes',
            details: 'Dark Mode durch umfassenden Theme-Switcher ersetzt: Auto (System), Hell, Dunkel, Metall, Rapid Wien, Gaylord (LGBTQ Rainbow animiert), Spritzkack (Braun/Kot), Spongebob (Gelb/Blau), 420 (Cannabis grün), Acid Special (psychedelisch mit extremen Animationen, Blur, Glitzer).',
            files: ['js/views/settings.js', 'css/app.css', 'js/app.js', 'version.json', 'js/views/dev.js'],
            stats: { additions: 503, deletions: 13 },
            expanded: true
        },
        {
            version: '1.0.4.5',
            date: '2026-01-11',
            message: 'Debug: Fallback-Versionen auf v1.3.3.7 geändert',
            details: 'Erleichtert Erkennung von Fallback-Fällen bei Versionsnummern-Anzeige in Settings und Footer.',
            files: ['js/views/settings.js', 'js/app.js'],
            stats: { additions: 5, deletions: 5 }
        },
        {
            version: '1.0.4.4',
            date: '2026-01-11',
            message: 'Auto-Version Update',
            details: 'Automatische Versionsaktualisierung durch Auto-Versioning-System.',
            files: ['version.json', 'js/views/dev.js', 'README.md'],
            stats: { additions: 3, deletions: 3 }
        },
        {
            version: '1.0.4.3',
            date: '2026-01-11',
            message: 'Bugfix: Toggle-Picker Layout korrigiert, Versions-Synchronisierung',
            details: 'Toggle-Picker jetzt korrekt im flex-column Layout mit proper wrapping, Changelog auf aktuelle Version aktualisiert, Footer Fallback-Version korrigiert.',
            files: ['js/views/settings.js', 'js/views/changelog.js', 'js/app.js', 'css/app.css'],
            stats: { additions: 33, deletions: 14 }
        },
        {
            version: '1.0.4.2',
            date: '2026-01-11',
            message: 'UI: File-Balken am Badge-Rand + komplett unterschiedliche Toggle-Designs',
            details: 'File-Balken jetzt am unteren Rand der File-Badges mit modernem Card-Design. 4 deutlich verschiedene Toggle-Styles: iOS 14+ (Apple authentisch), Material Design 3 (Google mit Ripple), Neon Cyberpunk (ON/OFF Text + extremer Glow), Minimal Fluent (Microsoft mit Glassmorphism).',
            files: ['js/views/changelog.js', 'css/app.css', 'version.json', 'js/views/dev.js'],
            stats: { additions: 155, deletions: 78 }
        },
        {
            version: '1.0.4.1',
            date: '2026-01-11',
            message: 'Changelog: Aktueller Build expandiert mit modernen File-Balken',
            details: 'Aktueller Build 1.0.4.0 ganz oben expandiert angezeigt, moderne rot/grün Streifen für File-Änderungen statt [+++----] Balken, Shimmer-Animation, aktueller Build mit Glow-Effekt hervorgehoben.',
            files: ['js/views/changelog.js', 'css/app.css'],
            stats: { additions: 107, deletions: 25 }
        },
        {
            version: '1.0.4.0',
            date: '2026-01-11',
            message: 'Feature: Moderne Toggle-Styles mit Picker',
            details: '5 verschiedene Toggle-Designs (Classic, iOS, Material, Neon, Minimal) implementiert. Toggle-Style-Picker zu Design-Einstellungen hinzugefügt mit Live-Vorschau für jeden Style und localStorage-Persistierung.',
            files: ['js/views/settings.js', 'css/app.css', 'version.json', 'js/views/dev.js'],
            stats: { additions: 291, deletions: 3 }
        },
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
        
        // Erste Version (aktueller Build) ist standardmäßig expandiert
        const isExpanded = change.expanded === true || index === 0;

        return `
            <div class="changelog-item ${isExpanded ? 'changelog-item-current' : ''}" data-index="${index}">
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
                    <span class="toggle-icon">${isExpanded ? '▲' : '▼'}</span> ${isExpanded ? 'Details ausblenden' : 'Details'}
                </button>

                <div class="changelog-details" id="changelog-details-${index}" style="display: ${isExpanded ? 'block' : 'none'};">
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
                                    const fileAddPercent = fileTotal > 0 ? (fileAdditions / fileTotal) * 100 : 0;
                                    const fileDelPercent = fileTotal > 0 ? (fileDeletions / fileTotal) * 100 : 0;
                                    
                                    return `
                                    <li class="file-item">
                                        <div class="file-item-content">
                                            <div class="file-info">
                                                <span class="file-icon">${getFileIcon(file)}</span>
                                                <span class="file-name">${file}</span>
                                            </div>
                                            <span class="file-stats">+${fileAdditions} -${fileDeletions}</span>
                                        </div>
                                        <div class="file-bar-modern">
                                            <div class="file-bar-add" style="width: ${fileAddPercent}%"></div>
                                            <div class="file-bar-del" style="width: ${fileDelPercent}%"></div>
                                        </div>
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
