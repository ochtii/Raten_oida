/* ==========================================
   DEVELOPER VIEW - Dev Tools & Debug
   ========================================== */

export const devView = (store) => {
    const state = store.state;
    const savedData = localStorage.getItem('raten_oida_v2');
    const cacheBusterEnabled = localStorage.getItem('cacheBusterEnabled') !== 'false';
    const footerInfoEnabled = localStorage.getItem('footerInfoEnabled') !== 'false';
    
    // Version Info
    const version = '2.0.0';
    const buildDate = '2026-01-10T12:17:00Z';
    
    return `
        <div class="dev-view">
            <h1 class="section-title">🛠️ Developer Tools</h1>
            
            <!-- Quick Actions - Hero Section -->
            <div class="dev-card dev-hero-card">
                <div class="dev-hero-actions">
                    <button class="dev-hero-btn dev-hero-btn-accent" onclick="window.toggleDebugConsole()">
                        <span class="dev-hero-icon">🐛</span>
                        <span class="dev-hero-label">Debug</span>
                    </button>
                    <button class="dev-hero-btn dev-hero-btn-primary" onclick="window.devAddWallet()">
                        <span class="dev-hero-icon">💰</span>
                        <span class="dev-hero-label">+1000</span>
                    </button>
                    <button class="dev-hero-btn dev-hero-btn-primary" onclick="window.devAddPoints()">
                        <span class="dev-hero-icon">⭐</span>
                        <span class="dev-hero-label">+100</span>
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
            
            <!-- Toggle Control Panel -->
            <div class="dev-card toggle-panel">
                <h3>🎛️ Toggles</h3>
                <div class="toggle-grid">
                    <div class="toggle-compact" id="toggleCacheBuster" onclick="window.devToggleCacheBuster()">
                        <span class="toggle-compact-label">${cacheBusterEnabled ? '🔄' : '⏸️'} Cache</span>
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
            
            <!-- Manual Edit -->
            <div class="dev-card">
                <h3>✏️ Manuelle Eingabe</h3>
                <div class="dev-form">
                    <div class="form-group">
                        <label>💰 Wallet setzen:</label>
                        <div class="input-group">
                            <input type="number" id="devWallet" value="${state.wallet}" class="dev-input">
                            <button class="btn btn-sm" onclick="window.devSetWallet()">Setzen</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>⭐ Punkte setzen:</label>
                        <div class="input-group">
                            <input type="number" id="devPoints" value="${state.points}" class="dev-input">
                            <button class="btn btn-sm" onclick="window.devSetPoints()">Setzen</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>🔥 Streak setzen:</label>
                        <div class="input-group">
                            <input type="number" id="devStreak" value="${state.stats?.currentStreak ?? 0}" class="dev-input">
                            <button class="btn btn-sm" onclick="window.devSetStreak()">Setzen</button>
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
            
            <!-- Console Log -->
            <div class="dev-card">
                <h3>📝 Console Commands</h3>
                <div class="dev-console">
                    <code>window.app.store.state</code> - Aktueller State<br>
                    <code>window.app.store.saveState()</code> - Speichern<br>
                    <code>window.app.router.navigateTo('home')</code> - Navigate<br>
                    <code>localStorage.clear()</code> - Storage löschen<br>
                    <code>location.reload()</code> - Seite neu laden
                </div>
            </div>
        </div>
        
    `;
};

// Developer Functions
window.toggleDebugConsole = () => {
    if (window.app && window.app.debugConsole) {
        window.app.debugConsole.toggle();
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
    
    if (enabled) {
        if (!footer) {
            footer = document.createElement('div');
            footer.id = 'appFooterInfo';
            footer.className = 'app-footer-info';
            document.body.appendChild(footer);
        }
        const version = '2.0.0';
        const buildDate = new Date('2026-01-10T12:17:00Z').toLocaleString('de-DE');
        footer.innerHTML = `
            <span class="footer-version">v${version}</span>
            <span class="footer-separator">|</span>
            <span class="footer-date">Build: ${buildDate}</span>
        `;
        footer.style.display = 'flex';
    } else {
        if (footer) {
            footer.style.display = 'none';
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

window.devSetWallet = () => {
    const value = parseInt(document.getElementById('devWallet').value);
    if (window.app && !isNaN(value)) {
        window.app.store.state.wallet = value;
        window.app.store.saveState();
        window.app.ui.showNotification('💰 Wallet gesetzt', 'success');
        window.app.router.render();
    }
};

window.devSetPoints = () => {
    const value = parseInt(document.getElementById('devPoints').value);
    if (window.app && !isNaN(value)) {
        window.app.store.state.points = value;
        window.app.store.saveState();
        window.app.ui.showNotification('⭐ Punkte gesetzt', 'success');
        window.app.router.render();
    }
};

window.devSetStreak = () => {
    const value = parseInt(document.getElementById('devStreak').value);
    if (window.app && !isNaN(value)) {
        window.app.store.state.stats.currentStreak = value;
        if (value > window.app.store.state.stats.bestStreak) {
            window.app.store.state.stats.bestStreak = value;
        }
        window.app.store.saveState();
        window.app.ui.showNotification('🔥 Streak gesetzt', 'success');
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
