/* ========================================
   HELP VIEW - Hilfe & Anleitung
   ======================================== */

export const helpView = () => {
    return `
        <div class="view">
            <h1 class="view-title">❓ Hilfe & Anleitung</h1>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">🚀 Schnellstart</h3>
                </div>
                <div class="card-body">
                    <ol class="help-list">
                        <li>Wähle ein <strong>Spiel</strong> aus der Spieleauswahl</li>
                        <li>Setze deinen <strong>Einsatz</strong> (Schülling)</li>
                        <li>Beantworte die <strong>Frage richtig</strong></li>
                        <li>Gewinne <strong>doppelt</strong> deinen Einsatz zurück</li>
                    </ol>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">🎮 Verfügbare Spiele</h3>
                </div>
                <div class="card-body">
                    <div class="help-section">
                        <h4 class="help-section-title">🌍 Hauptstädte Quiz</h4>
                        <p class="help-section-text">
                            Rate die Hauptstadt eines zufälligen Landes. Du bekommst 4 Antwortmöglichkeiten. 
                            Je schneller du antwortest, desto höher der Bonus.
                        </p>
                    </div>
                    
                    <div>
                        <h4 class="help-section-title">👥 Einwohner Quiz</h4>
                        <p class="help-section-text">
                            Schätze, welche Stadt mehr Einwohner hat. Vergleiche zwei Städte und wähle die größere aus.
                            Perfekt für Geographie-Fans.
                        </p>
                    </div>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">💰 Schülling & Einsätze</h3>
                </div>
                <div class="card-body">
                    <div class="flex items-start gap-md mb-md">
                        <span class="help-icon-large">💵</span>
                        <div>
                            <h4 class="help-feature-title">Startguthaben</h4>
                            <p class="help-feature-desc">Du startest mit <strong>1.000 Schülling</strong></p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-md mb-md">
                        <span class="help-icon-large">🎲</span>
                        <div>
                            <h4 class="help-feature-title">Einsatz wählen</h4>
                            <p class="help-feature-desc">Setze zwischen <strong>10 - 500 Schülling</strong> pro Runde</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-md">
                        <span class="help-icon-large">✅</span>
                        <div>
                            <h4 class="help-feature-title">Gewinn</h4>
                            <p class="help-feature-desc">Bei richtiger Antwort: <strong>2x deinen Einsatz</strong></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">📊 Statistiken & Fortschritt</h3>
                </div>
                <div class="card-body">
                    <p class="help-intro-text">
                        Im <strong>Statistik-Bereich</strong> siehst du:
                    </p>
                    <ul class="help-stats-list">
                        <li>Gespielte Spiele & Gewinnrate</li>
                        <li>Gesamtgewinn & Verluste</li>
                        <li>Aktuelle Streak (Serie)</li>
                        <li>Highscore & beste Leistungen</li>
                        <li>Detaillierte Stats pro Spieltyp</li>
                    </ul>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">⚙️ Personalisierung</h3>
                </div>
                <div class="card-body">
                    <div class="flex items-start gap-md mb-md">
                        <span class="help-icon-large">🎨</span>
                        <div>
                            <h4 class="help-feature-title">Themes & Farben</h4>
                            <p class="help-feature-desc">Wechsle zwischen Dark/Light Mode und wähle deine Akzentfarbe</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-md mb-md">
                        <span class="help-icon-large">🔊</span>
                        <div>
                            <h4 class="help-feature-title">Sound</h4>
                            <p class="help-feature-desc">Aktiviere/Deaktiviere Soundeffekte</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-md">
                        <span class="help-icon-large">🛠️</span>
                        <div>
                            <h4 class="help-feature-title">Developer Tools</h4>
                            <p class="help-feature-desc">Debug-Panel für Entwickler (nur in Dev-Mode)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-lg help-tips-card">
                <div class="card-header">
                    <h3 class="card-title">💡 Profi-Tipps</h3>
                </div>
                <div class="card-body">
                    <ul class="help-list">
                        <li>
                            <strong>Starte klein:</strong> Teste neue Spiele erst mit kleinen Einsätzen
                        </li>
                        <li>
                            <strong>Streak aufbauen:</strong> Mehrere richtige Antworten hintereinander = Bonus
                        </li>
                        <li>
                            <strong>Stats nutzen:</strong> Analysiere deine Stärken und Schwächen
                        </li>
                        <li>
                            <strong>Nicht übertreiben:</strong> Bei Pechsträhne eine Pause einlegen
                        </li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">⌨️ Tastenkombinationen</h3>
                </div>
                <div class="card-body">
                    <div class="help-shortcuts-grid">
                        <div class="flex justify-between items-center">
                            <span>DevTools öffnen/schließen:</span>
                            <kbd class="help-kbd">Ctrl+Shift+D</kbd>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Menu schließen:</span>
                            <kbd class="help-kbd">ESC</kbd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};
