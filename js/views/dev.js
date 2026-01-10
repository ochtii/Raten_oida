/* ==========================================
   DEVELOPER VIEW - Dev Tools & Debug
   ========================================== */

export const devView = (store) => {
    const state = store.state;
    const savedData = localStorage.getItem('raten_oida_v2');
    const cacheBusterEnabled = localStorage.getItem('cacheBusterEnabled') !== 'false';
    
    // Bottom Nav Settings
    const bottomNavSettings = JSON.parse(localStorage.getItem('bottomNavSettings') || JSON.stringify({
        visible: true,
        opacity: 95,
        size: 100,
        items: {
            home: true,
            games: true,
            points: true,
            stats: true,
            settings: true,
            dev: true
        }
    }));
    
    return `
        <div class="dev-view">
            <h1 class="section-title">🛠️ Developer Tools</h1>
            
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
            
            <!-- Quick Actions -->
            <div class="dev-card">
                <h3>⚡ Quick Actions</h3>
                <div class="dev-actions">
                    <button class="btn btn-accent" onclick="window.toggleDebugConsole()">
                        🐛 Debug Console
                    </button>
                    <button class="btn ${cacheBusterEnabled ? 'btn-success' : 'btn-secondary'}" onclick="window.devToggleCacheBuster()">
                        ${cacheBusterEnabled ? '🔄' : '⏸️'} Cache-Buster ${cacheBusterEnabled ? 'AN' : 'AUS'}
                    </button>
                    <button class="btn btn-primary" onclick="window.devAddWallet()">
                        💰 +1000 Wallet
                    </button>
                    <button class="btn btn-primary" onclick="window.devAddPoints()">
                        ⭐ +100 Punkte
                    </button>
                    <button class="btn btn-secondary" onclick="window.devResetStats()">
                        📊 Stats Reset
                    </button>
                    <button class="btn btn-secondary" onclick="window.devGenerateTestData()">
                        🧪 Test-Daten
                    </button>
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
            
            <!-- Bottom Navigation Settings -->
            <div class="dev-card">
                <h3>📱 Bottom Navigation</h3>
                
                <div class="dev-form">
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="bottomNavVisible" ${bottomNavSettings.visible ? 'checked' : ''} onchange="window.devToggleBottomNav()">
                            Bottom-Nav anzeigen
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label>Transparenz: <strong id="opacityValue">${bottomNavSettings.opacity}%</strong></label>
                        <input type="range" id="bottomNavOpacity" min="10" max="100" value="${bottomNavSettings.opacity}" 
                               oninput="window.devUpdateBottomNavOpacity(this.value)" class="dev-slider">
                    </div>
                    
                    <div class="form-group">
                        <label>Höhe: <strong id="sizeValue">${bottomNavSettings.size}%</strong></label>
                        <input type="range" id="bottomNavSize" min="60" max="150" value="${bottomNavSettings.size}" 
                               oninput="window.devUpdateBottomNavSize(this.value)" class="dev-slider">
                        <small style="color: var(--text-muted); font-size: 0.75rem;">Ändert nur die Höhe der Navigation</small>
                    </div>
                    
                    <div class="form-group">
                        <label style="margin-bottom: var(--spacing-sm);">Sichtbare Elemente:</label>
                        <div class="bottom-nav-items">
                            <label class="nav-toggle">
                                <input type="checkbox" ${bottomNavSettings.items.home ? 'checked' : ''} onchange="window.devToggleNavItem('home')">
                                <span>🏠 Home</span>
                            </label>
                            <label class="nav-toggle">
                                <input type="checkbox" ${bottomNavSettings.items.games ? 'checked' : ''} onchange="window.devToggleNavItem('games')">
                                <span>🎮 Spiele</span>
                            </label>
                            <label class="nav-toggle">
                                <input type="checkbox" ${bottomNavSettings.items.points ? 'checked' : ''} onchange="window.devToggleNavItem('points')">
                                <span>⭐ Punkte</span>
                            </label>
                            <label class="nav-toggle">
                                <input type="checkbox" ${bottomNavSettings.items.stats ? 'checked' : ''} onchange="window.devToggleNavItem('stats')">
                                <span>📊 Stats</span>
                            </label>
                            <label class="nav-toggle">
                                <input type="checkbox" ${bottomNavSettings.items.settings ? 'checked' : ''} onchange="window.devToggleNavItem('settings')">
                                <span>⚙️ Settings</span>
                            </label>
                            <label class="nav-toggle">
                                <input type="checkbox" ${bottomNavSettings.items.dev ? 'checked' : ''} onchange="window.devToggleNavItem('dev')">
                                <span>🛠️ Dev</span>
                            </label>
                        </div>
                    </div>
                    
                    <button class="btn btn-secondary" onclick="window.devResetBottomNav()">
                        🔄 Zurücksetzen
                    </button>
                </div>
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
    
    // View neu rendern um Button-Status zu aktualisieren
    if (window.app && window.app.router) {
        setTimeout(() => window.app.router.render(), 500);
    }
};

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

// Bottom Nav Functions
window.devToggleBottomNav = () => {
    const settings = JSON.parse(localStorage.getItem('bottomNavSettings') || '{}');
    settings.visible = document.getElementById('bottomNavVisible').checked;
    localStorage.setItem('bottomNavSettings', JSON.stringify(settings));
    applyBottomNavSettings();
    window.app.ui.showNotification(settings.visible ? '📱 Bottom-Nav aktiviert' : '📱 Bottom-Nav deaktiviert', 'info');
};

window.devUpdateBottomNavOpacity = (value) => {
    const settings = JSON.parse(localStorage.getItem('bottomNavSettings') || '{}');
    settings.opacity = parseInt(value);
    localStorage.setItem('bottomNavSettings', JSON.stringify(settings));
    document.getElementById('opacityValue').textContent = value + '%';
    applyBottomNavSettings();
};

window.devUpdateBottomNavSize = (value) => {
    const settings = JSON.parse(localStorage.getItem('bottomNavSettings') || '{}');
    settings.size = parseInt(value);
    localStorage.setItem('bottomNavSettings', JSON.stringify(settings));
    document.getElementById('sizeValue').textContent = value + '%';
    applyBottomNavSettings();
};

window.devToggleNavItem = (item) => {
    const settings = JSON.parse(localStorage.getItem('bottomNavSettings') || '{}');
    if (!settings.items) settings.items = {};
    
    // Get current state from checkbox
    const checkbox = event.target;
    settings.items[item] = checkbox.checked;
    
    localStorage.setItem('bottomNavSettings', JSON.stringify(settings));
    applyBottomNavSettings();
    window.app.ui.showNotification(`${checkbox.checked ? '✅' : '❌'} ${item.toUpperCase()}`, 'info');
};

window.devResetBottomNav = () => {
    const defaultSettings = {
        visible: true,
        opacity: 95,
        size: 100,
        items: {
            home: true,
            games: true,
            points: true,
            stats: true,
            settings: true,
            dev: false
        }
    };
    localStorage.setItem('bottomNavSettings', JSON.stringify(defaultSettings));
    window.app.ui.showNotification('🔄 Bottom-Nav zurückgesetzt', 'success');
    window.app.router.render();
};

function applyBottomNavSettings() {
    const defaultSettings = {
        visible: true,
        opacity: 95,
        size: 100,
        items: {
            home: true,
            games: true,
            points: true,
            stats: true,
            settings: true,
            dev: true
        }
    };
    
    // Settings laden oder Defaults nutzen
    let settings;
    try {
        const stored = localStorage.getItem('bottomNavSettings');
        settings = stored ? JSON.parse(stored) : defaultSettings;
        
        // Merge mit defaults für fehlende Werte
        settings = {
            ...defaultSettings,
            ...settings,
            items: {
                ...defaultSettings.items,
                ...(settings.items || {})
            }
        };
    } catch (e) {
        console.error('Error loading bottom nav settings:', e);
        settings = defaultSettings;
    }
    
    const bottomNav = document.getElementById('bottomNav');
    
    if (!bottomNav) {
        console.warn('Bottom nav element not found, retrying...');
        return;
    }
    
    // Visibility
    bottomNav.style.display = settings.visible !== false ? 'flex' : 'none';
    
    // Opacity
    bottomNav.style.opacity = (settings.opacity || 95) / 100;
    
    // Height (Size only affects height, not scaling)
    const heightPercent = settings.size || 100;
    const baseHeight = 64; // var(--bottom-nav-height) default
    const newHeight = (baseHeight * heightPercent) / 100;
    bottomNav.style.height = `${newHeight}px`;
    bottomNav.style.transform = 'none'; // Remove scaling
    
    // Items visibility
    Object.keys(settings.items).forEach(item => {
        const navItem = bottomNav.querySelector(`[data-nav="${item}"]`);
        if (navItem) {
            navItem.style.display = settings.items[item] ? 'flex' : 'none';
        }
    });
}

// Apply settings on load mit besserem Timing
if (typeof window !== 'undefined') {
    // Sofort versuchen
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            applyBottomNavSettings();
        });
    } else {
        // DOM bereits geladen
        applyBottomNavSettings();
    }
    
    // Zusätzlich nach Router-Render
    document.addEventListener('routeChanged', () => {
        setTimeout(() => applyBottomNavSettings(), 50);
    });
}
