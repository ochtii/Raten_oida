/* ==========================================
   DEVELOPER VIEW - Dev Tools & Debug
   ========================================== */

export const devView = (store) => {
    const state = store.state;
    const savedData = localStorage.getItem('raten_oida_v2');
    const cacheBusterEnabled = localStorage.getItem('cacheBusterEnabled') !== 'false';
    const footerInfoEnabled = localStorage.getItem('footerInfoEnabled') !== 'false';    const autoReloadEnabled = localStorage.getItem('autoReloadEnabled') === 'true';
    const autoReloadInterval = parseInt(localStorage.getItem('autoReloadInterval') || '5');    
    // Version Info
    const version = '1.0.8.5';
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
                    
                    ${cacheBusterEnabled ? `
                    <div class="toggle-compact granular-toggle" id="toggleCacheBusterHTML" onclick="window.devToggleCacheBusterType('html')">
                        <span class="toggle-compact-label">📄 HTML</span>
                        <div class="toggle-switch ${localStorage.getItem('cacheBusterHTML') !== 'false' ? 'on' : 'off'}"></div>
                    </div>
                    <div class="toggle-compact granular-toggle" id="toggleCacheBusterCSS" onclick="window.devToggleCacheBusterType('css')">
                        <span class="toggle-compact-label">🎨 CSS</span>
                        <div class="toggle-switch ${localStorage.getItem('cacheBusterCSS') !== 'false' ? 'on' : 'off'}"></div>
                    </div>
                    <div class="toggle-compact granular-toggle" id="toggleCacheBusterJS" onclick="window.devToggleCacheBusterType('js')">
                        <span class="toggle-compact-label">⚙️ JS</span>
                        <div class="toggle-switch ${localStorage.getItem('cacheBusterJS') !== 'false' ? 'on' : 'off'}"></div>
                    </div>
                    ` : ''}
                    
                    <div class="toggle-compact" id="toggleFooterInfo" onclick="window.devToggleFooterInfo()">
                        <span class="toggle-compact-label">📋 Footer</span>
                        <div class="toggle-switch ${footerInfoEnabled ? 'on' : 'off'}"></div>
                    </div>
                    
                    <div class="toggle-compact" id="toggleAutoReload" onclick="window.devToggleAutoReload()">
                        <span class="toggle-compact-label">${autoReloadEnabled ? '🔄' : '⏸️'} Auto Reload</span>
                        <button type="button" class="toggle-info-btn" onclick="event.stopPropagation(); window.devShowAutoReloadInfo()" title="Info">❓</button>
                        <div class="toggle-switch ${autoReloadEnabled ? 'on' : 'off'}"></div>
                    </div>
                </div>
                
                ${autoReloadEnabled ? `
                <div class="auto-reload-settings">
                    <div class="auto-reload-setting-item">
                        <label for="autoReloadIntervalSlider">
                            <span class="setting-label">⏱️ Intervall:</span>
                            <span class="setting-value" id="autoReloadIntervalValue">${autoReloadInterval}s</span>
                        </label>
                        <input 
                            type="range" 
                            id="autoReloadIntervalSlider" 
                            class="modern-slider" 
                            min="1" 
                            max="600" 
                            value="${autoReloadInterval}"
                            oninput="window.devUpdateAutoReloadInterval(this.value)"
                        >
                        <div class="interval-hints">
                            <span>1s</span>
                            <span>60s</span>
                            <span>600s</span>
                        </div>
                    </div>
                </div>
                ` : ''}
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
    if (!window.cacheBuster) return;
    
    const newState = window.cacheBuster.toggle();
    
    if (window.app && window.app.ui) {
        window.app.ui.showNotification(
            `🔄 Cache-Buster ${newState ? 'aktiviert' : 'deaktiviert'} - Seite neu laden!`,
            'info'
        );
    }
    
    // View neu rendern für granulare Toggles
    if (window.app && window.app.router) {
        window.app.router.render();
    }
};

window.devToggleCacheBusterType = (type) => {
    if (!window.cacheBuster) return;
    
    const newState = window.cacheBuster.toggleType(type);
    
    if (window.app && window.app.ui) {
        const typeNames = { html: 'HTML', css: 'CSS', js: 'JS' };
        window.app.ui.showNotification(
            `${newState ? '✅' : '⏸️'} ${typeNames[type]}-Cachebuster ${newState ? 'aktiviert' : 'deaktiviert'}`,
            'info'
        );
    }
    
    // Toggle-Switch aktualisieren
    setTimeout(() => {
        const toggleSwitch = document.querySelector(`#toggleCacheBuster${type.toUpperCase()} .toggle-switch`);
        if (toggleSwitch) {
            toggleSwitch.className = `toggle-switch ${newState ? 'on' : 'off'}`;
        }
    }, 50);
};

// Auto Reload Functions
window.devToggleAutoReload = () => {
    const currentState = localStorage.getItem('autoReloadEnabled') === 'true';
    const newState = !currentState;
    localStorage.setItem('autoReloadEnabled', newState.toString());
    
    if (newState) {
        window.startAutoReload();
    } else {
        window.stopAutoReload();
    }
    
    if (window.app && window.app.ui) {
        window.app.ui.showNotification(
            `🔄 Auto Reload ${newState ? 'aktiviert' : 'deaktiviert'}`,
            'info'
        );
    }
    
    // View neu rendern für Intervall-Einstellungen
    if (window.app && window.app.router) {
        window.app.router.render();
    }
};

window.devUpdateAutoReloadInterval = (value) => {
    localStorage.setItem('autoReloadInterval', value);
    document.getElementById('autoReloadIntervalValue').textContent = `${value}s`;
    
    // Restart auto reload mit neuem Intervall
    if (localStorage.getItem('autoReloadEnabled') === 'true') {
        window.stopAutoReload();
        window.startAutoReload();
    }
};

window.startAutoReload = () => {
    if (window.autoReloadTimer) return;
    
    const interval = parseInt(localStorage.getItem('autoReloadInterval') || '5') * 1000;
    let countdown = interval / 1000;
    
    // Hole aktuelle Version und Hashes
    window.autoReloadState = {
        version: document.querySelector('meta[name="app-version"]')?.content || '1.0.7.2',
        cssHash: '',
        jsHash: '',
        lastCheck: Date.now()
    };
    
    // Berechne CSS Hash
    fetch('/css/app.css').then(r => r.text()).then(text => {
        window.autoReloadState.cssHash = window.simpleHash(text);
    });
    
    // Berechne JS Hash (app.js)
    fetch('/js/app.js').then(r => r.text()).then(text => {
        window.autoReloadState.jsHash = window.simpleHash(text);
    });
    
    // Banner anzeigen
    window.showAutoReloadBanner();
    
    // Countdown Timer
    window.autoReloadCountdown = setInterval(() => {
        countdown--;
        const banner = document.getElementById('auto-reload-banner');
        if (banner) {
            const timerEl = banner.querySelector('.auto-reload-timer');
            if (timerEl) {
                timerEl.textContent = `${countdown}s`;
            }
        }
        
        if (countdown <= 0) {
            countdown = interval / 1000;
        }
    }, 1000);
    
    // Haupttimer - prüft auf Änderungen
    window.autoReloadTimer = setInterval(async () => {
        const hasChanges = await window.checkForChanges();
        
        if (hasChanges) {
            window.app.ui.showNotification('🔄 Änderungen erkannt - Seite wird neu geladen...', 'info');
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
        
        // Reset countdown
        countdown = interval / 1000;
    }, interval);
};

window.stopAutoReload = () => {
    if (window.autoReloadTimer) {
        clearInterval(window.autoReloadTimer);
        window.autoReloadTimer = null;
    }
    
    if (window.autoReloadCountdown) {
        clearInterval(window.autoReloadCountdown);
        window.autoReloadCountdown = null;
    }
    
    window.hideAutoReloadBanner();
};

window.checkForChanges = async () => {
    if (!window.autoReloadState) return false;
    
    try {
        // Prüfe Version
        const versionResp = await fetch('/version.json?_=' + Date.now());
        const versionData = await versionResp.json();
        
        if (versionData.version !== window.autoReloadState.version) {
            console.log('🔄 Version changed:', window.autoReloadState.version, '->', versionData.version);
            return true;
        }
        
        // Prüfe CSS Hash
        const cssResp = await fetch('/css/app.css?_=' + Date.now());
        const cssText = await cssResp.text();
        const cssHash = window.simpleHash(cssText);
        
        if (cssHash !== window.autoReloadState.cssHash && window.autoReloadState.cssHash !== '') {
            console.log('🔄 CSS changed');
            return true;
        }
        
        // Prüfe JS Hash
        const jsResp = await fetch('/js/app.js?_=' + Date.now());
        const jsText = await jsResp.text();
        const jsHash = window.simpleHash(jsText);
        
        if (jsHash !== window.autoReloadState.jsHash && window.autoReloadState.jsHash !== '') {
            console.log('🔄 JS changed');
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error checking for changes:', error);
        return false;
    }
};

window.simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
};

window.showAutoReloadBanner = () => {
    const existing = document.getElementById('auto-reload-banner');
    if (existing) return;
    
    const interval = parseInt(localStorage.getItem('autoReloadInterval') || '5');
    
    const banner = document.createElement('div');
    banner.id = 'auto-reload-banner';
    banner.className = 'auto-reload-banner';
    banner.innerHTML = `
        <div class="auto-reload-content">
            <div class="auto-reload-icon">🔄</div>
            <div class="auto-reload-info">
                <div class="auto-reload-title">Auto Reload Aktiv</div>
                <div class="auto-reload-details">
                    <span class="auto-reload-interval">Intervall: ${interval}s</span>
                    <span class="auto-reload-separator">|</span>
                    <span class="auto-reload-timer">${interval}s</span>
                    <span class="auto-reload-separator">|</span>
                    <span class="auto-reload-status">Warte auf Änderungen...</span>
                </div>
            </div>
            <button class="auto-reload-close" onclick="window.devToggleAutoReload()" title="Deaktivieren">✕</button>
        </div>
    `;
    
    document.body.insertBefore(banner, document.body.firstChild);
};

window.hideAutoReloadBanner = () => {
    const banner = document.getElementById('auto-reload-banner');
    if (banner) {
        banner.style.animation = 'slideOutTop 0.3s ease-out';
        setTimeout(() => banner.remove(), 300);
    }
};

window.devShowAutoReloadInfo = () => {
    if (!window.app) return;
    
    const content = `
        <div class="dev-info-content">
            <h4>🔄 Auto Reload - Automatisches Neu-Laden</h4>
            <p>Lädt die Anwendung automatisch neu, wenn Änderungen erkannt werden.</p>

            <div class="dev-info-section">
                <h5>🚀 Funktionen:</h5>
                <ul>
                    <li><strong>Automatische Erkennung:</strong> Prüft auf Änderungen an Version, CSS und JS</li>
                    <li><strong>Einstellbares Intervall:</strong> 1-600 Sekunden Prüf-Intervall</li>
                    <li><strong>Live Countdown:</strong> Zeigt verbleibende Zeit bis zum nächsten Check</li>
                    <li><strong>Intelligente Hashes:</strong> Erkennt Dateiänderungen durch Hash-Vergleich</li>
                    <li><strong>Banner-Anzeige:</strong> Visuelles Feedback im Header</li>
                </ul>
            </div>

            <div class="dev-info-section">
                <h5>🎯 Verwendung:</h5>
                <ul>
                    <li><strong>Aktivieren:</strong> Toggle anklicken zum Starten</li>
                    <li><strong>Intervall:</strong> Slider für Prüf-Intervall (1-600s)</li>
                    <li><strong>Manueller Modus:</strong> Bleibt aktiv bis manuell deaktiviert</li>
                    <li><strong>Live Timer:</strong> Banner zeigt Countdown bis zum nächsten Check</li>
                </ul>
            </div>

            <div class="dev-info-section">
                <h5>⚡ Erkannte Änderungen:</h5>
                <ul>
                    <li><strong>Version:</strong> Prüft version.json auf neue Versionsnummer</li>
                    <li><strong>CSS:</strong> Hash-Vergleich von app.css</li>
                    <li><strong>JavaScript:</strong> Hash-Vergleich von app.js</li>
                    <li><strong>Bei Änderung:</strong> Automatischer Reload nach 1 Sekunde</li>
                </ul>
            </div>

            <div class="dev-info-section">
                <h5>⚠️ Wichtig:</h5>
                <ul>
                    <li>Nur für Entwicklung gedacht!</li>
                    <li>Niemals in Production verwenden!</li>
                    <li>Erhöhter Netzwerk-Traffic durch ständige Prüfungen</li>
                    <li>Kurze Intervalle (< 5s) können Performance beeinträchtigen</li>
                </ul>
            </div>
        </div>
        
        <style>
            .dev-info-content { 
                padding: 1rem; 
                max-width: 600px;
            }
            .dev-info-content h4 {
                margin-top: 0;
                color: var(--primary);
                font-size: 1.3rem;
            }
            .dev-info-content h5 {
                color: var(--secondary);
                margin: 1.5rem 0 0.75rem 0;
                font-size: 1.1rem;
            }
            .dev-info-content p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 1rem;
            }
            .dev-info-content ul {
                margin: 0.5rem 0;
                padding-left: 1.5rem;
            }
            .dev-info-content li {
                margin: 0.5rem 0;
                line-height: 1.5;
                color: var(--text-secondary);
            }
            .dev-info-content li strong {
                color: var(--text-primary);
            }
            .dev-info-section {
                background: rgba(255, 255, 255, 0.02);
                padding: 1rem;
                border-radius: var(--radius-md);
                margin: 1rem 0;
                border: 1px solid rgba(0, 255, 136, 0.1);
            }
        </style>
    `;

    window.app.ui.showModal('Auto Reload Info', content, [{
        label: 'Schließen',
        type: 'primary',
        action: 'close'
    }]);
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
    if (!window.app || !window.cacheBuster) return;
    
    const status = window.cacheBuster.getStatus();
    const activeTypes = [];
    if (status.html) activeTypes.push('HTML');
    if (status.css) activeTypes.push('CSS');
    if (status.js) activeTypes.push('JS');
    
    const content = `
        <div class="dev-info-content">
            <h4>🔄 Cachebuster - Cache-Busting System</h4>
            <p>Der Cachebuster verhindert Browser-Caching-Probleme während der Entwicklung:</p>

            <div class="dev-info-section">
                <h5>📊 Aktueller Status:</h5>
                <div class="dev-info-grid">
                    <div class="dev-info-item">
                        <span class="dev-info-label">Status:</span>
                        <strong style="color: ${status.enabled ? 'var(--primary)' : 'var(--accent)'}">
                            ${status.enabled ? '✅ Aktiviert' : '⏸️ Deaktiviert'}
                        </strong>
                    </div>
                    <div class="dev-info-item">
                        <span class="dev-info-label">Build ID:</span>
                        <code>${status.buildId.split('-')[1]}</code>
                    </div>
                    <div class="dev-info-item">
                        <span class="dev-info-label">Zeitstempel:</span>
                        <code>${new Date(status.timestamp).toLocaleString('de-DE')}</code>
                    </div>
                    <div class="dev-info-item">
                        <span class="dev-info-label">Aktive Typen:</span>
                        <strong style="color: var(--primary)">${activeTypes.join(', ') || 'Keine'}</strong>
                    </div>
                </div>
            </div>

            <div class="dev-info-section">
                <h5>🚀 Funktionen:</h5>
                <ul>
                    <li><strong>Granulare Kontrolle:</strong> HTML, CSS und JS separat steuerbar</li>
                    <li><strong>Auto-Versioning:</strong> Eindeutige Build-IDs für jede Änderung</li>
                    <li><strong>Service Worker:</strong> Umgehung von Cache-Strategien</li>
                    <li><strong>Visual Feedback:</strong> Banner zeigt aktiven Status</li>
                    <li><strong>Cache-Clear:</strong> Automatisches Löschen bei Reload</li>
                </ul>
            </div>

            <div class="dev-info-section">
                <h5>🎯 Verwendung:</h5>
                <ul>
                    <li><strong>Master-Toggle:</strong> Aktiviert/Deaktiviert das gesamte System</li>
                    <li><strong>HTML-Toggle:</strong> Steuert HTML-View Caching</li>
                    <li><strong>CSS-Toggle:</strong> Steuert Stylesheet Caching (app.css)</li>
                    <li><strong>JS-Toggle:</strong> Steuert JavaScript Module Caching</li>
                    <li><strong>Banner:</strong> Wird automatisch angezeigt wenn aktiv</li>
                </ul>
            </div>

            <div class="dev-info-section">
                <h5>⚠️ Wichtig:</h5>
                <ul>
                    <li>Nur für Entwicklung gedacht - niemals in Production!</li>
                    <li>Erhöhter Netzwerk-Traffic durch ständiges Neu-Laden</li>
                    <li>Nach Änderungen Seite neu laden für vollständige Wirkung</li>
                    <li>Granulare Toggles nur sichtbar wenn Master aktiv ist</li>
                </ul>
            </div>
        </div>
        
        <style>
            .dev-info-content { 
                padding: 1rem; 
                max-width: 600px;
            }
            .dev-info-content h4 {
                margin-top: 0;
                color: var(--primary);
                font-size: 1.3rem;
            }
            .dev-info-content h5 {
                color: var(--secondary);
                margin: 1.5rem 0 0.75rem 0;
                font-size: 1.1rem;
            }
            .dev-info-content p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 1rem;
            }
            .dev-info-content ul {
                margin: 0.5rem 0;
                padding-left: 1.5rem;
            }
            .dev-info-content li {
                margin: 0.5rem 0;
                line-height: 1.5;
                color: var(--text-secondary);
            }
            .dev-info-content li strong {
                color: var(--text-primary);
            }
            .dev-info-section {
                background: rgba(255, 255, 255, 0.02);
                padding: 1rem;
                border-radius: var(--radius-md);
                margin: 1rem 0;
                border: 1px solid rgba(0, 255, 136, 0.1);
            }
            .dev-info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-top: 0.75rem;
            }
            .dev-info-item {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            .dev-info-label {
                font-size: 0.85rem;
                color: var(--text-muted);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .dev-info-item code {
                background: rgba(0, 255, 136, 0.1);
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius-sm);
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                color: var(--primary);
            }
        </style>
    `;

    window.app.ui.showModal('Cachebuster Info', content, [{
        label: 'Schließen',
        type: 'primary',
        action: 'close'
    }]);
};
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
