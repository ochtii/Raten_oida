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
            
            <!-- Quick Actions - Debug & Utility -->
            <div class="dev-card dev-hero-card">
                <h3>🛠️ Debug & Utility</h3>
                <div class="dev-hero-actions">
                    <button class="dev-hero-btn dev-hero-btn-accent" onclick="window.toggleDebugConsole()">
                        <span class="dev-hero-icon">🐛</span>
                        <span class="dev-hero-label">Debug</span>
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
                            <button class="dev-split-btn-minus" onclick="event.preventDefault(); window.devChangeWallet(-window.devCheatStep, this)">-</button>
                            <button class="dev-split-btn-plus" onclick="event.preventDefault(); window.devChangeWallet(window.devCheatStep, this)">+</button>
                        </div>
                    </div>
                    <div class="dev-cheat-group">
                        <span class="dev-cheat-label">⭐ Punkte:</span>
                        <div class="dev-split-btn">
                            <button class="dev-split-btn-minus" onclick="event.preventDefault(); window.devChangePoints(-window.devCheatStep, this)">-</button>
                            <button class="dev-split-btn-plus" onclick="event.preventDefault(); window.devChangePoints(window.devCheatStep, this)">+</button>
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
        window.app.ui.showNotification(`💰 ${amount > 0 ? '+' : ''}${amount} Schülling`, amount > 0 ? 'success' : 'warning');
        window.app.router.render();
        devAnimateBtn(btn);
    }
};

window.devChangePoints = (amount, btn) => {
    if (window.app) {
        const state = window.app.store.state;
        state.points = Math.max(0, (state.points ?? 0) + amount);
        window.app.store.saveState();
        window.app.ui.showNotification(`⭐ ${amount > 0 ? '+' : ''}${amount} Punkte`, amount > 0 ? 'success' : 'warning');
        window.app.router.render();
        devAnimateBtn(btn);
    }
};

function devAnimateBtn(btn) {
    btn.classList.add('dev-split-btn-animate');
    setTimeout(() => btn.classList.remove('dev-split-btn-animate'), 180);
}

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
        window.app.store.state.stats.currentStreak = 99;
        window.app.store.state.stats.bestStreak = 99;
        window.app.store.saveState();
        window.app.ui.showNotification('🔥 Streak auf 99 gesetzt!', 'success');
        window.app.router.render();
    }
};

window.devWinAll = () => {
    if (window.app) {
        const stats = window.app.store.state.stats;
        stats.gamesPlayed = 100;
        stats.gamesWon = 100;
        stats.capitalsCorrect = 100;
        stats.capitalsTotal = 100;
        stats.populationCorrect = 100;
        stats.populationTotal = 100;
        window.app.store.saveState();
        window.app.ui.showNotification('🏆 100% Win-Rate aktiviert!', 'success');
        window.app.router.render();
    }
};
