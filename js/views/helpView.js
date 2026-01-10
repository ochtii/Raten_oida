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
                    <ol style="margin: 0; padding-left: 1.5rem;">
                        <li style="margin-bottom: var(--spacing-sm);">Wähle ein <strong>Spiel</strong> aus der Spieleauswahl</li>
                        <li style="margin-bottom: var(--spacing-sm);">Setze deinen <strong>Einsatz</strong> (Schülling)</li>
                        <li style="margin-bottom: var(--spacing-sm);">Beantworte die <strong>Frage richtig</strong></li>
                        <li>Gewinne <strong>doppelt</strong> deinen Einsatz zurück</li>
                    </ol>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">🎮 Verfügbare Spiele</h3>
                </div>
                <div class="card-body">
                    <div style="margin-bottom: var(--spacing-lg);">
                        <h4 style="color: var(--accent-primary); margin-bottom: var(--spacing-sm);">🌍 Hauptstädte Quiz</h4>
                        <p style="margin: 0; color: var(--text-muted);">
                            Rate die Hauptstadt eines zufälligen Landes. Du bekommst 4 Antwortmöglichkeiten. 
                            Je schneller du antwortest, desto höher der Bonus.
                        </p>
                    </div>
                    
                    <div>
                        <h4 style="color: var(--accent-primary); margin-bottom: var(--spacing-sm);">👥 Einwohner Quiz</h4>
                        <p style="margin: 0; color: var(--text-muted);">
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
                        <span style="font-size: 2rem;">💵</span>
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; color: var(--accent-primary);">Startguthaben</h4>
                            <p style="margin: 0; color: var(--text-muted);">Du startest mit <strong>1.000 Schülling</strong></p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-md mb-md">
                        <span style="font-size: 2rem;">🎲</span>
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; color: var(--accent-primary);">Einsatz wählen</h4>
                            <p style="margin: 0; color: var(--text-muted);">Setze zwischen <strong>10 - 500 Schülling</strong> pro Runde</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-md">
                        <span style="font-size: 2rem;">✅</span>
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; color: var(--accent-primary);">Gewinn</h4>
                            <p style="margin: 0; color: var(--text-muted);">Bei richtiger Antwort: <strong>2x deinen Einsatz</strong></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-lg">
                <div class="card-header">
                    <h3 class="card-title">📊 Statistiken & Fortschritt</h3>
                </div>
                <div class="card-body">
                    <p style="margin-bottom: var(--spacing-md);">
                        Im <strong>Statistik-Bereich</strong> siehst du:
                    </p>
                    <ul style="margin: 0; padding-left: 1.5rem;">
                        <li style="margin-bottom: var(--spacing-xs);">Gespielte Spiele & Gewinnrate</li>
                        <li style="margin-bottom: var(--spacing-xs);">Gesamtgewinn & Verluste</li>
                        <li style="margin-bottom: var(--spacing-xs);">Aktuelle Streak (Serie)</li>
                        <li style="margin-bottom: var(--spacing-xs);">Highscore & beste Leistungen</li>
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
                        <span style="font-size: 2rem;">🎨</span>
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; color: var(--accent-primary);">Themes & Farben</h4>
                            <p style="margin: 0; color: var(--text-muted);">Wechsle zwischen Dark/Light Mode und wähle deine Akzentfarbe</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-md mb-md">
                        <span style="font-size: 2rem;">🔊</span>
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; color: var(--accent-primary);">Sound</h4>
                            <p style="margin: 0; color: var(--text-muted);">Aktiviere/Deaktiviere Soundeffekte</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-md">
                        <span style="font-size: 2rem;">🛠️</span>
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; color: var(--accent-primary);">Developer Tools</h4>
                            <p style="margin: 0; color: var(--text-muted);">Debug-Panel für Entwickler (nur in Dev-Mode)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-lg" style="background: linear-gradient(135deg, var(--bg-card), var(--bg-tertiary)); border: 2px solid var(--accent-primary);">
                <div class="card-header">
                    <h3 class="card-title">💡 Profi-Tipps</h3>
                </div>
                <div class="card-body">
                    <ul style="margin: 0; padding-left: 1.5rem;">
                        <li style="margin-bottom: var(--spacing-sm);">
                            <strong>Starte klein:</strong> Teste neue Spiele erst mit kleinen Einsätzen
                        </li>
                        <li style="margin-bottom: var(--spacing-sm);">
                            <strong>Streak aufbauen:</strong> Mehrere richtige Antworten hintereinander = Bonus
                        </li>
                        <li style="margin-bottom: var(--spacing-sm);">
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
                    <div style="display: grid; gap: var(--spacing-sm);">
                        <div class="flex justify-between items-center">
                            <span>DevTools öffnen/schließen:</span>
                            <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-family: monospace; border: 1px solid var(--accent-primary);">Ctrl+Shift+D</kbd>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Menu schließen:</span>
                            <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-family: monospace; border: 1px solid var(--accent-primary);">ESC</kbd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};
