/* ==========================================
   DEVELOPER VIEW - Dev Tools & Debug
   ========================================== */

export const devView = (store) => {
    const state = store.state;
    const savedData = localStorage.getItem('raten_oida_v2');
    const cacheBusterEnabled = localStorage.getItem('cacheBusterEnabled') !== 'false';
    const footerInfoEnabled = localStorage.getItem('footerInfoEnabled') !== 'false';
    
    // Version Info
    const version = '1.0.2.1';
    const buildDate = '2026-01-10T12:17:00Z';
    
    return `
        <div class="dev-view">
            <h1 class="section-title">🛠️ Developer Tools</h1>
            
            <!-- Quick Actions - Debug & Utility -->
            <div class="dev-card dev-hero-card">
                <h3>🛠️ Debug & Utility</h3>
                <div class="dev-hero-actions">
                    <button class="dev-hero-btn ${window.app && window.app.debugConsole && window.app.debugConsole.isVisible ? 'dev-hero-btn-accent' : 'dev-hero-btn-secondary'}" onclick="window.toggleDebugConsole()">
                        <span class="dev-hero-icon">🐛</span>
                        <span class="dev-hero-label">Debug Konsole</span>
                    </button>
                    <button class="dev-hero-btn dev-hero-btn-secondary" onclick="window.devResetStats()">
                        <span class="dev-hero-icon">📊</span>
                        <span class="dev-hero-label">Reset</span>
                    </button>
                    <button class="dev-hero-btn dev-hero-btn-secondary" onclick="window.devGenerateTestData()">
                        <span class="dev-hero-icon">🧪</span>
                        <span class="dev-hero-label">Test</span>
                    </button>
                </div>
            </div>
            
            <!-- Cheat Actions -->
            <div class="dev-card dev-hero-card dev-cheat-card">
                <h3>🎮 Cheats</h3>
                <div class="dev-hero-actions dev-hero-actions-col">
                    <div class="dev-cheat-step-row">
                        <label for="devCheatStepSelect">Stufe:</label>
                        <select id="devCheatStepSelect" class="dev-cheat-step">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="1000" selected>1000</option>
                        </select>
                    </div>
                    <div class="dev-cheat-group">
                        <span class="dev-cheat-label">💰 Schülling:</span>
                        <div class="dev-split-btn">
                            <button type="button" class="dev-split-btn-minus" onclick="event.preventDefault(); event.stopPropagation(); window.devChangeWallet(-window.devCheatStep, this)">-</button>
                            <button type="button" class="dev-split-btn-plus" onclick="event.preventDefault(); event.stopPropagation(); window.devChangeWallet(window.devCheatStep, this)">+</button>
                        </div>
                    </div>
                    <div class="dev-cheat-group">
                        <span class="dev-cheat-label">⭐ Punkte:</span>
                        <div class="dev-split-btn">
                            <button type="button" class="dev-split-btn-minus" onclick="event.preventDefault(); event.stopPropagation(); window.devChangePoints(-window.devCheatStep, this)">-</button>
                            <button type="button" class="dev-split-btn-plus" onclick="event.preventDefault(); event.stopPropagation(); window.devChangePoints(window.devCheatStep, this)">+</button>
                        </div>
                    </div>
                    <!-- Sonstige Cheats -->
                    <button class="dev-hero-btn dev-hero-btn-success" onclick="window.devMaxStreak()">
                        <span class="dev-hero-icon">🔥</span>
                        <span class="dev-hero-label">Streak</span>
                    </button>
                    <button class="dev-hero-btn dev-hero-btn-success" onclick="window.devWinAll()">
                        <span class="dev-hero-icon">🏆</span>
                        <span class="dev-hero-label">100% Win</span>
                    </button>
                </div>
            </div>
            
            <!-- Toggle Control Panel -->
            <div class="dev-card toggle-panel">
                <h3>🎛️ Toggles</h3>
                <div class="toggle-grid">
                    <div class="toggle-compact" id="toggleCacheBuster" onclick="window.devToggleCacheBuster()">
                        <span class="toggle-compact-label">${cacheBusterEnabled ? '🔄' : '⏸️'} Cachebuster</span>
                        <button type="button" class="toggle-info-btn" onclick="event.stopPropagation(); window.devShowCacheBusterInfo()" title="Info">❓</button>
                        <div class="toggle-switch ${cacheBusterEnabled ? 'on' : 'off'}"></div>
                    </div>
                    
                    <div class="toggle-compact" id="toggleFooterInfo" onclick="window.devToggleFooterInfo()">
                        <span class="toggle-compact-label">📋 Footer</span>
                        <div class="toggle-switch ${footerInfoEnabled ? 'on' : 'off'}"></div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Stats -->
            <div class="dev-grid">
                <div class="dev-card">
                    <h3>📊 Live State</h3>
                    <div class="dev-info">
                        <div class="dev-item">
                            <span>Wallet:</span>
                            <strong class="value-wallet">${(state.wallet ?? 0).toLocaleString('de-DE')}</strong>
                        </div>
                        <div class="dev-item">
                            <span>Punkte:</span>
                            <strong class="value-points">${(state.points ?? 0).toLocaleString('de-DE')}</strong>
                        </div>
                        <div class="dev-item">
                            <span>Spiele:</span>
                            <strong>${state.stats?.gamesPlayed ?? 0}</strong>
                        </div>
                        <div class="dev-item">
                            <span>Streak:</span>
                            <strong>${state.stats?.currentStreak ?? 0} / ${state.stats?.bestStreak ?? 0}</strong>
                        </div>
                    </div>
                </div>
                
                <div class="dev-card">
                    <h3>💾 Storage Info</h3>
                    <div class="dev-info">
                        <div class="dev-item">
                            <span>Key:</span>
                            <code>raten_oida_v2</code>
                        </div>
                        <div class="dev-item">
                            <span>Status:</span>
                            <strong>${savedData ? '✅ Vorhanden' : '❌ Leer'}</strong>
                        </div>
                        <div class="dev-item">
                            <span>Größe:</span>
                            <strong>${savedData ? Math.round(savedData.length / 1024) : 0} KB</strong>
                        </div>
                        <div class="dev-item">
                            <span>Items:</span>
                            <strong>${state.history?.length ?? 0} Einträge</strong>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- JSON Viewer -->
            <div class="dev-card">
                <h3>🔍 Raw JSON</h3>
                <div class="dev-json-controls">
                    <button class="btn btn-sm" onclick="window.devCopyJSON()">📋 Copy</button>
                    <button class="btn btn-sm" onclick="window.devDownloadJSON()">💾 Download</button>
                    <button class="btn btn-sm btn-danger" onclick="window.devClearStorage()">🗑️ Clear</button>
                </div>
                <pre class="dev-json" id="devJson">${JSON.stringify(state, null, 2)}</pre>
            </div>
        </div>
        
    `;
};

// Cheat Functions
window.devCheatStep = 1000;
window.devSetCheatStep = (val) => {
    window.devCheatStep = parseInt(val, 10);
};

// Initialize cheat step selector when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('devCheatStepSelect');
    if (select) {
        select.value = window.devCheatStep;
        select.addEventListener('change', (e) => {
            window.devCheatStep = parseInt(e.target.value, 10);
        });
    }
});

window.devChangeWallet = (amount, btn) => {
    if (window.app) {
        const state = window.app.store.state;
        state.wallet = Math.max(0, (state.wallet ?? 0) + amount);
        window.app.store.saveState();
        // Feuerwerks-Animation anstatt Notification
        devShowFireworks(`💰 ${amount > 0 ? '+' : ''}${amount}`, amount > 0 ? '#00ff88' : '#ff0033');
        // Kein render() Aufruf um Scrolling zu vermeiden
        devAnimateBtn(btn);
    }
};

window.devChangePoints = (amount, btn) => {
    if (window.app) {
        const state = window.app.store.state;
        state.points = Math.max(0, (state.points ?? 0) + amount);
        window.app.store.saveState();
        // Feuerwerks-Animation anstatt Notification
        devShowFireworks(`⭐ ${amount > 0 ? '+' : ''}${amount}`, amount > 0 ? '#00f0ff' : '#ff6400');
        // Kein render() Aufruf um Scrolling zu vermeiden
        devAnimateBtn(btn);
    }
};

function devAnimateBtn(btn) {
    btn.classList.add('dev-split-btn-animate');
    setTimeout(() => btn.classList.remove('dev-split-btn-animate'), 180);
}

window.devShowFireworks = (text, color) => {
    // Erstelle Container für Feuerwerk
    const container = document.createElement('div');
    container.className = 'dev-fireworks-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    `;
    document.body.appendChild(container);

    // Erstelle Text-Anzeige
    const textElement = document.createElement('div');
    textElement.textContent = text;
    textElement.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        font-weight: bold;
        color: ${color};
        text-shadow: 0 0 20px ${color}80;
        animation: devFireworksText 2s ease-out forwards;
        z-index: 10000;
        pointer-events: none;
        user-select: none;
    `;
    container.appendChild(textElement);

    // Erstelle Partikel
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 100 + Math.random() * 100;
        const delay = Math.random() * 0.5;

        particle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 10px ${color}80;
            animation: devFireworksParticle 2s ease-out ${delay}s forwards;
            --angle: ${angle}rad;
            --distance: ${distance}px;
            pointer-events: none;
            user-select: none;
        `;
        container.appendChild(particle);
    }

    // Entferne Container nach Animation
    setTimeout(() => {
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
    }, 2500);
};

// Developer Functions
window.toggleDebugConsole = () => {
    if (window.app && window.app.debugConsole) {
        window.app.debugConsole.toggle();
        // View neu rendern, um Button-Status zu aktualisieren
        if (window.app && window.app.router) {
            window.app.router.render();
        }
    }
};

window.devToggleCacheBuster = () => {
    const currentState = localStorage.getItem('cacheBusterEnabled') !== 'false';
    const newState = !currentState;
    localStorage.setItem('cacheBusterEnabled', newState.toString());
    
    if (window.app && window.app.ui) {
        window.app.ui.showNotification(
            `🔄 Cache-Buster ${newState ? 'aktiviert' : 'deaktiviert'} - Seite neu laden!`,
            'info'
        );
    }
    
    // Toggle-Switch aktualisieren
    setTimeout(() => {
        const toggleSwitch = document.querySelector('#toggleCacheBuster .toggle-switch');
        const label = document.querySelector('#toggleCacheBuster .toggle-compact-label');
        
        if (toggleSwitch) {
            toggleSwitch.className = `toggle-switch ${newState ? 'on' : 'off'}`;
        }
        if (label) {
            label.textContent = `${newState ? '🔄' : '⏸️'} Cache`;
        }
    }, 50);
};

window.devToggleFooterInfo = () => {
    const currentState = localStorage.getItem('footerInfoEnabled') !== 'false';
    const newState = !currentState;
    localStorage.setItem('footerInfoEnabled', newState.toString());
    
    // Footer anzeigen/verstecken
    window.updateFooterInfo();
    
    if (window.app && window.app.ui) {
        window.app.ui.showNotification(
            `📋 Footer-Info ${newState ? 'aktiviert' : 'deaktiviert'}`,
            'info'
        );
    }
    
    // Toggle-Switch aktualisieren
    setTimeout(() => {
        const toggleSwitch = document.querySelector('#toggleFooterInfo .toggle-switch');
        if (toggleSwitch) {
            toggleSwitch.className = `toggle-switch ${newState ? 'on' : 'off'}`;
        }
    }, 50);
};

window.updateFooterInfo = () => {
    const enabled = localStorage.getItem('footerInfoEnabled') !== 'false';
    let footer = document.getElementById('appFooterInfo');
    const bottomNav = document.querySelector('.bottom-nav');
    
    if (enabled) {
        if (!footer) {
            footer = document.createElement('div');
            footer.id = 'appFooterInfo';
            footer.className = 'app-footer-info';
            // Footer zu #app hinzufügen statt zu body
            const app = document.getElementById('app');
            if (app) {
                app.appendChild(footer);
            } else {
                document.body.appendChild(footer);
            }
        }
        
        // Version und Build-Datum aus version.json laden
        fetch('./version.json')
            .then(response => response.json())
            .then(versionData => {
                const version = versionData.version;
                const buildDate = new Date(versionData.buildDate).toLocaleString('de-DE');
                footer.innerHTML = `
                    <span class="footer-version">v${version}</span>
                    <span class="footer-separator">|</span>
                    <span class="footer-date">Build: ${buildDate}</span>
                `;
            })
            .catch(error => {
                console.error('Fehler beim Laden der Version:', error);
                // Fallback auf hartkodierte Werte
                const version = '1.0.1.0';
                const buildDate = new Date('2026-01-11T05:16:57.512Z').toLocaleString('de-DE');
                footer.innerHTML = `
                    <span class="footer-version">v${version}</span>
                    <span class="footer-separator">|</span>
                    <span class="footer-date">Build: ${buildDate}</span>
                `;
            });
        
        footer.style.display = 'flex';
        // Bottom Navigation nach oben verschieben
        if (bottomNav) {
            bottomNav.classList.add('with-footer');
        }
    } else {
        if (footer) {
            footer.style.display = 'none';
        }
        // Bottom Navigation zurück an ursprüngliche Position
        if (bottomNav) {
            bottomNav.classList.remove('with-footer');
        }
    }
};

// Footer beim App-Start initialisieren
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => window.updateFooterInfo(), 100);
});

window.devAddWallet = () => {
    if (window.app) {
        window.app.store.state.wallet += 1000;
        window.app.store.saveState();
        window.app.ui.showNotification('💰 +1000 Schülling', 'success');
        window.app.router.render();
    }
};

window.devAddPoints = () => {
    if (window.app) {
        window.app.store.state.points += 100;
        window.app.store.saveState();
        window.app.ui.showNotification('⭐ +100 Punkte', 'success');
        window.app.router.render();
    }
};

window.devResetStats = () => {
    if (window.app && confirm('Stats wirklich zurücksetzen?')) {
        window.app.store.state.stats = {
            gamesPlayed: 0,
            gamesWon: 0,
            capitalsCorrect: 0,
            capitalsTotal: 0,
            populationCorrect: 0,
            populationTotal: 0,
            bestStreak: 0,
            currentStreak: 0
        };
        window.app.store.saveState();
        window.app.ui.showNotification('📊 Stats zurückgesetzt', 'info');
        window.app.router.render();
    }
};

window.devGenerateTestData = () => {
    if (window.app && confirm('Test-Daten generieren?')) {
        window.app.store.state.wallet = 5000;
        window.app.store.state.points = 2500;
        window.app.store.state.stats = {
            gamesPlayed: 42,
            gamesWon: 28,
            capitalsCorrect: 35,
            capitalsTotal: 50,
            populationCorrect: 18,
            populationTotal: 25,
            bestStreak: 12,
            currentStreak: 5
        };
        window.app.store.saveState();
        window.app.ui.showNotification('🧪 Test-Daten generiert', 'success');
        window.app.router.render();
    }
};

window.devCopyJSON = () => {
    const json = document.getElementById('devJson').textContent;
    navigator.clipboard.writeText(json).then(() => {
        window.app.ui.showNotification('📋 JSON kopiert', 'success');
    });
};

window.devDownloadJSON = () => {
    const json = document.getElementById('devJson').textContent;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raten-oida-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    window.app.ui.showNotification('💾 JSON heruntergeladen', 'success');
};

window.devClearStorage = () => {
    if (confirm('⚠️ WIRKLICH localStorage löschen?')) {
        localStorage.removeItem('raten_oida_v2');
        window.app.ui.showNotification('🗑️ Storage gelöscht', 'info');
        setTimeout(() => location.reload(), 1000);
    }
};

// Zusätzliche Cheat-Funktionen
window.devAddWalletMax = () => {
    if (window.app) {
        window.app.store.state.wallet += 10000;
        window.app.store.saveState();
        window.app.ui.showNotification('� +10.000 Schülling (MEGA)', 'success');
        window.app.router.render();
    }
};

window.devRemoveWallet = () => {
    if (window.app) {
        window.app.store.state.wallet = Math.max(0, window.app.store.state.wallet - 1000);
        window.app.store.saveState();
        window.app.ui.showNotification('💰 -1000 Schülling', 'warning');
        window.app.router.render();
    }
};

window.devRemoveWalletMax = () => {
    if (window.app) {
        window.app.store.state.wallet = Math.max(0, window.app.store.state.wallet - 10000);
        window.app.store.saveState();
        window.app.ui.showNotification('💰 -10.000 Schülling (MEGA)', 'warning');
        window.app.router.render();
    }
};

window.devAddPointsMax = () => {
    if (window.app) {
        window.app.store.state.points += 1000;
        window.app.store.saveState();
        window.app.ui.showNotification('⭐ +1000 Punkte (MEGA)', 'success');
        window.app.router.render();
    }
};

window.devRemovePoints = () => {
    if (window.app) {
        window.app.store.state.points = Math.max(0, window.app.store.state.points - 100);
        window.app.store.saveState();
        window.app.ui.showNotification('⭐ -100 Punkte', 'warning');
        window.app.router.render();
    }
};

window.devRemovePointsMax = () => {
    if (window.app) {
        window.app.store.state.points = Math.max(0, window.app.store.state.points - 1000);
        window.app.store.saveState();
        window.app.ui.showNotification('⭐ -1000 Punkte (MEGA)', 'warning');
        window.app.router.render();
    }
};

window.devMaxStreak = () => {
    if (window.app) {
        const content = `
            <div class="dev-modal-input-group">
                <label for="streak-input">Streak-Wert setzen (0-999):</label>
                <input type="number" id="streak-input" class="dev-input" min="0" max="999" placeholder="z.B. 50" value="99">
                <div class="dev-input-error" id="streak-error" style="display: none; color: #ff0033; font-size: 0.875rem; margin-top: 0.5rem;">
                    Ungültiger Wert! Bitte geben Sie eine Zahl zwischen 0 und 999 ein.
                </div>
            </div>
        `;

        const validateInput = () => {
            const input = document.getElementById('streak-input');
            const error = document.getElementById('streak-error');
            const okBtn = document.querySelector('[data-action="set-streak"]');
            const value = parseInt(input.value);

            if (isNaN(value) || value < 0 || value > 999) {
                input.classList.add('input-error');
                error.style.display = 'block';
                if (okBtn) okBtn.disabled = true;
                return false;
            } else {
                input.classList.remove('input-error');
                error.style.display = 'none';
                if (okBtn) okBtn.disabled = false;
                return true;
            }
        };

        window.app.ui.showModal('🔥 Streak setzen', content, [
            {
                label: 'Abbrechen',
                type: 'secondary',
                action: 'cancel'
            },
            {
                label: 'OK',
                type: 'primary',
                action: 'set-streak',
                callback: () => {
                    if (validateInput()) {
                        const value = parseInt(document.getElementById('streak-input').value);
                        window.app.store.state.stats.currentStreak = value;
                        window.app.store.state.stats.bestStreak = Math.max(window.app.store.state.stats.bestStreak, value);
                        window.app.store.saveState();
                        window.app.ui.showNotification(`🔥 Streak auf ${value} gesetzt!`, 'success');
                        window.app.router.render();
                    }
                }
            }
        ]);

        // Initiale Validierung
        setTimeout(() => {
            const input = document.getElementById('streak-input');
            const okBtn = document.querySelector('[data-action="set-streak"]');
            input.addEventListener('input', validateInput);
            input.addEventListener('change', validateInput);
            validateInput(); // Initial check
        }, 100);
    }
};

window.devWinAll = () => {
    if (window.app) {
        const content = `
            <div class="dev-modal-input-group">
                <label for="winrate-input">Win-Rate setzen (0-100%):</label>
                <input type="number" id="winrate-input" class="dev-input" min="0" max="100" placeholder="z.B. 85" value="100">
                <div class="dev-input-error" id="winrate-error" style="display: none; color: #ff0033; font-size: 0.875rem; margin-top: 0.5rem;">
                    Ungültiger Wert! Bitte geben Sie eine Zahl zwischen 0 und 100 ein.
                </div>
            </div>
        `;

        const validateInput = () => {
            const input = document.getElementById('winrate-input');
            const error = document.getElementById('winrate-error');
            const okBtn = document.querySelector('[data-action="set-winrate"]');
            const value = parseInt(input.value);

            if (isNaN(value) || value < 0 || value > 100) {
                input.classList.add('input-error');
                error.style.display = 'block';
                if (okBtn) okBtn.disabled = true;
                return false;
            } else {
                input.classList.remove('input-error');
                error.style.display = 'none';
                if (okBtn) okBtn.disabled = false;
                return true;
            }
        };

        window.app.ui.showModal('🏆 Win-Rate setzen', content, [
            {
                label: 'Abbrechen',
                type: 'secondary',
                action: 'cancel'
            },
            {
                label: 'OK',
                type: 'primary',
                action: 'set-winrate',
                callback: () => {
                    if (validateInput()) {
                        const percentage = parseInt(document.getElementById('winrate-input').value);
                        const stats = window.app.store.state.stats;

                        // Berechne die Anzahl der Spiele basierend auf dem Prozentsatz
                        // Nehmen wir an, es gibt mindestens 10 Spiele für eine aussagekräftige Statistik
                        const totalGames = Math.max(10, stats.gamesPlayed || 10);
                        const wonGames = Math.round(totalGames * percentage / 100);

                        stats.gamesPlayed = totalGames;
                        stats.gamesWon = wonGames;

                        // Setze auch die anderen Stats proportional
                        stats.capitalsCorrect = Math.round((stats.capitalsTotal || 100) * percentage / 100);
                        stats.populationCorrect = Math.round((stats.populationTotal || 100) * percentage / 100);

                        window.app.store.saveState();
                        window.app.ui.showNotification(`🏆 Win-Rate auf ${percentage}% gesetzt!`, 'success');
                        window.app.router.render();
                    }
                }
            }
        ]);

        // Initiale Validierung
        setTimeout(() => {
            const input = document.getElementById('winrate-input');
            const okBtn = document.querySelector('[data-action="set-winrate"]');
            input.addEventListener('input', validateInput);
            input.addEventListener('change', validateInput);
            validateInput(); // Initial check
        }, 100);
    }
};

window.devShowCacheBusterInfo = () => {
    if (window.app) {
        const content = `
            <div class="dev-info-content">
                <h4>🔄 Cachebuster - Cache-Busting System</h4>
                <p>Der Cachebuster verhindert Browser-Caching-Probleme während der Entwicklung:</p>

                <div class="dev-info-section">
                    <h5>🚀 Funktionen:</h5>
                    <ul>
                        <li><strong>Cache-Busting:</strong> Fügt Timestamp zu CSS/JS-URLs hinzu</li>
                        <li><strong>Auto-Clear:</strong> Löscht Browser-Caches bei jedem Reload</li>
                        <li><strong>Service Worker:</strong> Umgehung von Cache-Strategien</li>
                        <li><strong>Versionierung:</strong> Erzwingt frisches Laden von Assets</li>
                    </ul>
                </div>

                <div class="dev-info-section">
                    <h5>⚙️ Technische Details:</h5>
                    <ul>
                        <li><strong>Query-Parameter:</strong> <code>?v=${Date.now()}</code></li>
                        <li><strong>Cache-API:</strong> Automatische Löschung aller Caches</li>
                        <li><strong>Meta-Tags:</strong> HTTP Cache-Control Header</li>
                        <li><strong>Storage:</strong> localStorage-Schlüssel: 'cacheBusterEnabled'</li>
                    </ul>
                </div>

                <div class="dev-info-section">
                    <h5>💡 Empfehlung:</h5>
                    <p>Während der Entwicklung aktiviert lassen für sofortige Änderungsvorschau. Im Produktivbetrieb kann es deaktiviert werden.</p>
                </div>
            </div>
        `;

        window.app.ui.showModal('❓ Cachebuster Info', content, [
            {
                label: 'Verstanden',
                type: 'primary',
                action: 'ok'
            }
        ]);
    }
};
