/* ==========================================
   MODERN MOBILE SETTINGS VIEW
   ========================================== */

// Live-Suche für Einstellungen
window.searchSettings = (query) => {
    const searchTerm = query.toLowerCase().trim();
    
    // Erst ab 2 Buchstaben filtern
    if (searchTerm.length < 2 && searchTerm.length > 0) {
        return;
    }
    
    const sections = document.querySelectorAll('.settings-section');
    const settingItems = document.querySelectorAll('.setting-item-wrapper');
    let visibleCount = 0;
    
    if (searchTerm.length === 0) {
        // Alle anzeigen
        sections.forEach(section => section.style.display = 'block');
        settingItems.forEach(item => item.style.display = 'flex');
        document.getElementById('searchResults')?.remove();
        return;
    }
    
    // Durchsuche alle Einstellungen
    settingItems.forEach(item => {
        const label = item.querySelector('.setting-label')?.textContent.toLowerCase() || '';
        const desc = item.querySelector('.setting-desc')?.textContent.toLowerCase() || '';
        const section = item.closest('.settings-section');
        
        if (label.includes(searchTerm) || desc.includes(searchTerm)) {
            item.style.display = 'flex';
            section.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Verstecke leere Sections
    sections.forEach(section => {
        const visibleItems = section.querySelectorAll('.setting-item-wrapper[style*="display: flex"]');
        if (visibleItems.length === 0) {
            section.style.display = 'none';
        }
    });
    
    // Zeige Suchergebnis
    let resultEl = document.getElementById('searchResults');
    if (!resultEl) {
        resultEl = document.createElement('div');
        resultEl.id = 'searchResults';
        resultEl.className = 'search-results-info';
        document.querySelector('.settings-content')?.prepend(resultEl);
    }
    
    resultEl.innerHTML = `
        <span class="result-count">${visibleCount}</span> Ergebnis${visibleCount !== 1 ? 'se' : ''} 
        für "<span class="result-query">${query}</span>"
    `;
};

// Navigiere zu Section
window.navigateToSection = (sectionId) => {
    // Entferne active von allen
    document.querySelectorAll('.section-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Setze active
    document.querySelector(`[data-section="${sectionId}"]`)?.classList.add('active');
    
    // Verstecke alle Sections
    document.querySelectorAll('.settings-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Zeige ausgewählte Section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Scrolle zu Top
    const contentContainer = document.querySelector('.settings-content');
    if (contentContainer) {
        contentContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Speichere letzte Section
    localStorage.setItem('lastSettingsSection', sectionId);
};

// Accessibility Functions
window.setFontSize = (size) => {
    localStorage.setItem('fontSize', size);
    document.body.setAttribute('data-font-size', size);
    
    // Update active button
    document.querySelectorAll('.font-size-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.size === size);
    });
    
    window.app.ui.showNotification(`Schriftgröße: ${size}`, 'success');
};

window.toggleHighContrast = (enabled) => {
    localStorage.setItem('highContrast', enabled);
    document.body.setAttribute('data-high-contrast', enabled);
    window.app.ui.showNotification(`Hoher Kontrast: ${enabled ? 'Ein' : 'Aus'}`, 'success');
};

window.toggleReducedMotion = (enabled) => {
    localStorage.setItem('reducedMotion', enabled);
    document.body.setAttribute('data-reduced-motion', enabled);
    window.app.ui.showNotification(`Reduzierte Bewegung: ${enabled ? 'Ein' : 'Aus'}`, 'success');
};

window.toggleScreenReader = (enabled) => {
    localStorage.setItem('screenReaderMode', enabled);
    document.body.setAttribute('data-screen-reader', enabled);
    window.app.ui.showNotification(`Screen Reader Modus: ${enabled ? 'Ein' : 'Aus'}`, 'success');
};

window.setColorBlindMode = (mode) => {
    localStorage.setItem('colorBlindMode', mode);
    document.body.setAttribute('data-colorblind', mode);
    
    const modes = {
        'none': 'Normal',
        'protanopia': 'Protanopie (Rot-Schwäche)',
        'deuteranopia': 'Deuteranopie (Grün-Schwäche)',
        'tritanopia': 'Tritanopie (Blau-Schwäche)'
    };
    
    window.app.ui.showNotification(`Farbmodus: ${modes[mode]}`, 'success');
};

// === GAMEPLAY SETTINGS ===
window.toggleSetting = (settingName) => {
    if (window.app && window.app.store) {
        const currentValue = window.app.store.state.settings[settingName];
        window.app.store.state.settings[settingName] = !currentValue;
        window.app.store.saveState();
        window.app.store.notify();
        
        if (settingName === 'animations') {
            const animations = window.app.store.state.settings.animations;
            document.body.style.setProperty('--transition-fast', animations ? '0.2s' : '0s');
            document.body.style.setProperty('--transition-normal', animations ? '0.3s' : '0s');
            document.body.style.setProperty('--transition-slow', animations ? '0.5s' : '0s');
        }

        window.app.ui.showNotification('Gespeichert', 'success');
    }
};

window.updateVolume = (value) => {
    if (window.app && window.app.store) {
        window.app.store.state.settings.volume = parseInt(value);
        localStorage.setItem('raten_oida_v2', JSON.stringify(window.app.store.state));
    }
};

window.updateDifficulty = (value) => {
    if (window.app && window.app.store) {
        window.app.store.state.settings.difficulty = value;
        localStorage.setItem('raten_oida_v2', JSON.stringify(window.app.store.state));
        window.app.ui.showNotification(`Schwierigkeitsgrad: ${value}`, 'info');
    }
};

// === WALLET & DATA FUNCTIONS ===
window.resetWallet = () => {
    if (window.app && window.app.ui) {
        window.app.ui.showModal(`
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">💰</div>
                <h2 style="margin-bottom: 1rem;">Wallet zurücksetzen?</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                    Dein Wallet wird auf 1000 Schülling zurückgesetzt.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn btn-outline" onclick="window.closeModal()">Abbrechen</button>
                    <button class="btn btn-primary" onclick="window.confirmResetWallet()">Zurücksetzen</button>
                </div>
            </div>
        `);
    }
};

window.confirmResetWallet = () => {
    if (window.app && window.app.store) {
        window.app.store.state.wallet = 1000;
        window.app.store.saveState();
        window.closeModal();
        window.app.ui.showNotification('Wallet wurde zurückgesetzt', 'success');
    }
};

window.resetAll = () => {
    if (window.app && window.app.ui) {
        window.app.ui.showModal(`
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                <h2 style="margin-bottom: 1rem; color: #ff0033;">Alle Daten löschen?</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                    <strong>WARNUNG:</strong> Alle deine Daten werden unwiderruflich gelöscht!<br>
                    Das beinhaltet Wallet, Punkte, Statistiken und Einstellungen.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn btn-outline" onclick="window.closeModal()">Abbrechen</button>
                    <button class="btn btn-danger" onclick="window.confirmResetAll()">Alles löschen</button>
                </div>
            </div>
        `);
    }
};

window.confirmResetAll = () => {
    if (window.app && window.app.store) {
        localStorage.removeItem('raten_oida_v2');
        window.closeModal();
        window.app.ui.showNotification('Alle Daten wurden gelöscht', 'info');
        setTimeout(() => window.location.reload(), 1500);
    }
};

// === BOTTOM NAVIGATION SETTINGS ===
window.settingsToggleBottomNav = (checkbox) => {
    const settings = JSON.parse(localStorage.getItem('bottomNavSettings') || '{}');
    settings.visible = checkbox.checked;
    localStorage.setItem('bottomNavSettings', JSON.stringify(settings));
    window.applyBottomNavSettings();
    window.app.ui.showNotification(settings.visible ? 'Navigation aktiviert' : 'Navigation deaktiviert', 'info');
};

window.settingsUpdateBottomNavOpacity = (value) => {
    const settings = JSON.parse(localStorage.getItem('bottomNavSettings') || '{}');
    settings.opacity = parseInt(value);
    localStorage.setItem('bottomNavSettings', JSON.stringify(settings));
    window.applyBottomNavSettings();
};

window.settingsUpdateBottomNavSize = (value) => {
    const settings = JSON.parse(localStorage.getItem('bottomNavSettings') || '{}');
    settings.size = parseInt(value);
    localStorage.setItem('bottomNavSettings', JSON.stringify(settings));
    window.applyBottomNavSettings();
};

// === NOTIFICATION SETTINGS ===
window.settingsToggleNotifications = (checkbox) => {
    const settings = window.app.store.getSettings();
    const enabled = checkbox.checked;
    
    if (!settings.notifications) settings.notifications = {};
    settings.notifications.enabled = enabled;
    
    window.app.store.saveSettings(settings);
    window.app.ui.showNotification(`Benachrichtigungen ${enabled ? 'aktiviert' : 'deaktiviert'}`, 'info');
};

window.settingsChangeNotificationPosition = (position) => {
    const settings = window.app.store.getSettings();
    
    if (!settings.notifications) settings.notifications = {};
    settings.notifications.position = position;
    
    window.app.store.saveSettings(settings);
    window.app.ui.showNotification(`Position: ${position.replace('-', ' ')}`, 'info');
};

window.settingsChangeNotificationDuration = (duration) => {
    const settings = window.app.store.getSettings();
    
    if (!settings.notifications) settings.notifications = {};
    settings.notifications.duration = parseInt(duration);
    
    window.app.store.saveSettings(settings);
    window.app.ui.showNotification(`Dauer: ${duration}s`, 'info');
};

window.settingsShowNotificationHistory = () => {
    const history = JSON.parse(localStorage.getItem('notificationHistory') || '[]');
    
    const typeIcons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const typeLabels = { success: 'Erfolg', error: 'Fehler', warning: 'Warnung', info: 'Info' };
    
    const modalContent = history.length === 0 ? 
        '<div style="text-align:center;padding:2rem;">📭 Keine Benachrichtigungen in der Historie</div>' :
        `<div style="max-height:400px;overflow-y:auto;">
            ${history.slice(-50).reverse().map(item => {
                const date = new Date(item.timestamp);
                const timeStr = date.toLocaleTimeString('de-DE');
                const icon = typeIcons[item.type] || '📢';
                return `
                    <div style="padding:0.75rem;margin-bottom:0.5rem;background:var(--bg-secondary);border-radius:8px;">
                        <div style="display:flex;gap:0.5rem;align-items:center;">
                            <span style="font-size:1.5rem;">${icon}</span>
                            <div style="flex:1;">
                                <div style="font-weight:600;">${item.message}</div>
                                <div style="font-size:0.8rem;color:var(--text-secondary);">${timeStr}</div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>`;
    
    window.app.ui.showModal('📋 Benachrichtigungs-Historie', modalContent, [
        { label: 'Schließen', type: 'secondary', action: 'close' }
    ]);
};

// Toggle-Style wechseln
window.setToggleStyle = (style) => {
    localStorage.setItem('toggleStyle', style);
    document.body.setAttribute('data-toggle-style', style);
    
    document.querySelectorAll('.toggle-option-modern').forEach(option => {
        option.classList.toggle('active', option.dataset.style === style);
    });
    
    window.app.ui.showNotification(`Toggle-Style: ${style}`, 'success');
};

// Theme wechseln
window.setTheme = (theme) => {
    localStorage.setItem('appTheme', theme);
    
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.body.setAttribute('data-theme', theme);
    }
    
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('active', option.dataset.theme === theme);
    });
    
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'appTheme',
        newValue: theme
    }));
    
    window.app.ui.showNotification(`Theme: ${theme}`, 'success');
};

export const settingsView = (store) => {
    const settings = store.getSettings();
    const wallet = store.getWallet();
    
    // Load accessibility settings
    const fontSize = localStorage.getItem('fontSize') || 'normal';
    const highContrast = localStorage.getItem('highContrast') === 'true';
    const reducedMotion = localStorage.getItem('reducedMotion') === 'true';
    const screenReader = localStorage.getItem('screenReaderMode') === 'true';
    const colorBlindMode = localStorage.getItem('colorBlindMode') || 'none';
    
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
    
    // Load notification settings
    const notificationSettings = settings.notifications || {
        enabled: true,
        types: { success: true, error: true, warning: true, info: true },
        position: 'bottom-right',
        duration: 3
    };
    
    return `
        <div class="modern-settings-view">
            <!-- Header mit Suche -->
            <div class="modern-settings-header">
                <h1 class="modern-settings-title">⚙️ Einstellungen</h1>
                <div class="modern-search-container">
                    <div class="search-icon">🔍</div>
                    <input 
                        type="search" 
                        class="modern-search-input" 
                        placeholder="Suche Einstellungen (min. 2 Zeichen)..."
                        oninput="window.searchSettings(this.value)"
                        autocomplete="off"
                    >
                    <div class="search-hint">Ab 2 Buchstaben wird gefiltert</div>
                </div>
            </div>
            
            <!-- Navigation Tabs -->
            <div class="modern-section-nav">
                <button class="section-nav-item active" data-section="appearance" onclick="window.navigateToSection('appearance')">
                    <span class="nav-icon">🎨</span>
                    <span class="nav-label">Darstellung</span>
                </button>
                <button class="section-nav-item" data-section="accessibility" onclick="window.navigateToSection('accessibility')">
                    <span class="nav-icon">♿</span>
                    <span class="nav-label">Barrierefrei</span>
                </button>
                <button class="section-nav-item" data-section="interface" onclick="window.navigateToSection('interface')">
                    <span class="nav-icon">📱</span>
                    <span class="nav-label">Interface</span>
                </button>
                <button class="section-nav-item" data-section="gameplay" onclick="window.navigateToSection('gameplay')">
                    <span class="nav-icon">🎮</span>
                    <span class="nav-label">Gameplay</span>
                </button>
                <button class="section-nav-item" data-section="notifications" onclick="window.navigateToSection('notifications')">
                    <span class="nav-icon">🔔</span>
                    <span class="nav-label">Mitteilungen</span>
                </button>
                <button class="section-nav-item" data-section="data" onclick="window.navigateToSection('data')">
                    <span class="nav-icon">💾</span>
                    <span class="nav-label">Daten</span>
                </button>
            </div>
            
            <!-- Content -->
            <div class="settings-content">
                
                <!-- APPEARANCE SECTION -->
                <div id="appearance" class="settings-section">
                    <h2 class="section-header">🎨 Darstellung</h2>
                    
                    <!-- Theme Picker -->
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">App-Theme</div>
                            <div class="setting-desc">Wähle dein bevorzugtes Farbschema</div>
                        </div>
                        <div class="theme-picker-modern">
                            <div class="theme-option-modern" data-theme="auto" onclick="window.setTheme('auto')">
                                <div class="theme-preview auto-preview">
                                    <div class="auto-icon">🌓</div>
                                </div>
                                <span class="theme-name">Auto</span>
                            </div>
                            <div class="theme-option-modern" data-theme="light" onclick="window.setTheme('light')">
                                <div class="theme-preview" style="background: linear-gradient(135deg, #fff 50%, #f5f5f5 50%);"></div>
                                <span class="theme-name">Hell</span>
                            </div>
                            <div class="theme-option-modern" data-theme="dark" onclick="window.setTheme('dark')">
                                <div class="theme-preview" style="background: linear-gradient(135deg, #0a0e27 50%, #00ff88 50%);"></div>
                                <span class="theme-name">Dunkel</span>
                            </div>
                            <div class="theme-option-modern" data-theme="metal" onclick="window.setTheme('metal')">
                                <div class="theme-preview" style="background: linear-gradient(135deg, #2a2a2a 0%, #c0c0c0 100%);"></div>
                                <span class="theme-name">Metal</span>
                            </div>
                            <div class="theme-option-modern" data-theme="rapid" onclick="window.setTheme('rapid')">
                                <div class="theme-preview" style="background: linear-gradient(135deg, #00a64f 50%, #fff 50%);"></div>
                                <span class="theme-name">Rapid</span>
                            </div>
                            <div class="theme-option-modern" data-theme="gaylord" onclick="window.setTheme('gaylord')">
                                <div class="theme-preview rainbow-preview"></div>
                                <span class="theme-name">Rainbow</span>
                            </div>
                            <div class="theme-option-modern" data-theme="spritzkack" onclick="window.setTheme('spritzkack')">
                                <div class="theme-preview" style="background: linear-gradient(135deg, #8b6f47 0%, #3d2817 100%);"></div>
                                <span class="theme-name">Braun</span>
                            </div>
                            <div class="theme-option-modern" data-theme="spongebob" onclick="window.setTheme('spongebob')">
                                <div class="theme-preview" style="background: linear-gradient(135deg, #ffcc00 50%, #00b8d4 50%);"></div>
                                <span class="theme-name">Spongebob</span>
                            </div>
                            <div class="theme-option-modern" data-theme="420" onclick="window.setTheme('420')">
                                <div class="theme-preview" style="background: linear-gradient(135deg, #32cd32 0%, #228b22 100%);"></div>
                                <span class="theme-name">420</span>
                            </div>
                            <div class="theme-option-modern" data-theme="acid" onclick="window.setTheme('acid')">
                                <div class="theme-preview acid-preview"></div>
                                <span class="theme-name">Acid</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Toggle Style -->
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">Toggle-Design</div>
                            <div class="setting-desc">Stil der Schalter-Elemente</div>
                        </div>
                        <div class="toggle-grid-modern">
                            ${['classic', 'ios', 'material', 'neon', 'minimal', 'skeleton', 'flip', 'liquid', 'gear', 'pulse'].map(style => `
                                <div class="toggle-option-modern" data-style="${style}" onclick="window.setToggleStyle('${style}')">
                                    <div class="toggle-preview-modern">
                                        <label class="toggle toggle-${style}">
                                            <input type="checkbox" checked disabled>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <span class="toggle-name">${style.charAt(0).toUpperCase() + style.slice(1)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- ACCESSIBILITY SECTION -->
                <div id="accessibility" class="settings-section" style="display: none;">
                    <h2 class="section-header">♿ Barrierefreiheit</h2>
                    
                    <!-- Schriftgröße -->
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">Schriftgröße</div>
                            <div class="setting-desc">Passe die Textgröße an deine Bedürfnisse an</div>
                        </div>
                        <div class="font-size-controls">
                            <button class="font-size-btn ${fontSize === 'small' ? 'active' : ''}" data-size="small" onclick="window.setFontSize('small')">
                                <span class="size-icon">A</span>
                                <span class="size-label">Klein</span>
                            </button>
                            <button class="font-size-btn ${fontSize === 'normal' ? 'active' : ''}" data-size="normal" onclick="window.setFontSize('normal')">
                                <span class="size-icon" style="font-size: 1.2em;">A</span>
                                <span class="size-label">Normal</span>
                            </button>
                            <button class="font-size-btn ${fontSize === 'large' ? 'active' : ''}" data-size="large" onclick="window.setFontSize('large')">
                                <span class="size-icon" style="font-size: 1.4em;">A</span>
                                <span class="size-label">Groß</span>
                            </button>
                            <button class="font-size-btn ${fontSize === 'xlarge' ? 'active' : ''}" data-size="xlarge" onclick="window.setFontSize('xlarge')">
                                <span class="size-icon" style="font-size: 1.6em;">A</span>
                                <span class="size-label">Sehr Groß</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Hoher Kontrast -->
                    <div class="setting-item-wrapper">
                        <div class="setting-item-inline">
                            <div class="setting-info">
                                <div class="setting-label">🔆 Hoher Kontrast</div>
                                <div class="setting-desc">Erhöht den Kontrast für bessere Lesbarkeit</div>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" ${highContrast ? 'checked' : ''} onchange="window.toggleHighContrast(this.checked)">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Reduzierte Bewegung -->
                    <div class="setting-item-wrapper">
                        <div class="setting-item-inline">
                            <div class="setting-info">
                                <div class="setting-label">🎭 Reduzierte Bewegung</div>
                                <div class="setting-desc">Minimiert Animationen und Bewegungen</div>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" ${reducedMotion ? 'checked' : ''} onchange="window.toggleReducedMotion(this.checked)">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Screen Reader -->
                    <div class="setting-item-wrapper">
                        <div class="setting-item-inline">
                            <div class="setting-info">
                                <div class="setting-label">🔊 Screen Reader Modus</div>
                                <div class="setting-desc">Optimiert für Bildschirmlesegeräte</div>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" ${screenReader ? 'checked' : ''} onchange="window.toggleScreenReader(this.checked)">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Farbenblindheit -->
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">🎨 Farbanpassung</div>
                            <div class="setting-desc">Anpassungen für Farbenblindheit</div>
                        </div>
                        <select class="modern-select" onchange="window.setColorBlindMode(this.value)">
                            <option value="none" ${colorBlindMode === 'none' ? 'selected' : ''}>Keine Anpassung</option>
                            <option value="protanopia" ${colorBlindMode === 'protanopia' ? 'selected' : ''}>Protanopie (Rot-Schwäche)</option>
                            <option value="deuteranopia" ${colorBlindMode === 'deuteranopia' ? 'selected' : ''}>Deuteranopie (Grün-Schwäche)</option>
                            <option value="tritanopia" ${colorBlindMode === 'tritanopia' ? 'selected' : ''}>Tritanopie (Blau-Schwäche)</option>
                        </select>
                    </div>
                </div>
                
                <!-- INTERFACE SECTION -->
                <div id="interface" class="settings-section" style="display: none;">
                    <h2 class="section-header">📱 Interface</h2>
                    
                    <!-- Bottom Nav -->
                    <div class="setting-item-wrapper">
                        <div class="setting-item-inline">
                            <div class="setting-info">
                                <div class="setting-label">📊 Navigation anzeigen</div>
                                <div class="setting-desc">Untere Navigationsleiste</div>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" ${bottomNavSettings.visible ? 'checked' : ''} onchange="window.settingsToggleBottomNav(this)">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">Transparenz</div>
                            <div class="setting-desc">Navigation Deckkraft: <span id="navOpacityValue">${bottomNavSettings.opacity}%</span></div>
                        </div>
                        <input type="range" class="modern-slider" min="50" max="100" value="${bottomNavSettings.opacity}" 
                            oninput="window.settingsUpdateBottomNavOpacity(this.value); document.getElementById('navOpacityValue').textContent = this.value + '%'">
                    </div>
                    
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">Größe</div>
                            <div class="setting-desc">Navigation Größe: <span id="navSizeValue">${bottomNavSettings.size}%</span></div>
                        </div>
                        <input type="range" class="modern-slider" min="80" max="120" value="${bottomNavSettings.size}" 
                            oninput="window.settingsUpdateBottomNavSize(this.value); document.getElementById('navSizeValue').textContent = this.value + '%'">
                    </div>
                </div>
                
                <!-- GAMEPLAY SECTION -->
                <div id="gameplay" class="settings-section" style="display: none;">
                    <h2 class="section-header">🎮 Gameplay</h2>
                    
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">Schwierigkeitsgrad</div>
                            <div class="setting-desc">Wähle den Spielschwierigkeitsgrad</div>
                        </div>
                        <select class="modern-select" onchange="window.updateDifficulty(this.value)">
                            <option value="easy" ${settings.difficulty === 'easy' ? 'selected' : ''}>😊 Einfach</option>
                            <option value="medium" ${settings.difficulty === 'medium' ? 'selected' : ''}>😐 Mittel</option>
                            <option value="hard" ${settings.difficulty === 'hard' ? 'selected' : ''}>😤 Schwer</option>
                        </select>
                    </div>
                    
                    <div class="setting-item-wrapper">
                        <div class="setting-item-inline">
                            <div class="setting-info">
                                <div class="setting-label">⏱️ Zeitlimit</div>
                                <div class="setting-desc">Aktiviere Zeitlimit für Fragen</div>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" ${settings.timeLimit ? 'checked' : ''} onchange="window.toggleSetting('timeLimit')">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="setting-item-wrapper">
                        <div class="setting-item-inline">
                            <div class="setting-info">
                                <div class="setting-label">🔊 Sound-Effekte</div>
                                <div class="setting-desc">Spiele Sound-Effekte bei Aktionen</div>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" ${settings.soundEffects ? 'checked' : ''} onchange="window.toggleSetting('soundEffects')">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">Lautstärke</div>
                            <div class="setting-desc">Stelle die Lautstärke ein: <span id="volumeValue">${settings.volume}%</span></div>
                        </div>
                        <input type="range" class="modern-slider" min="0" max="100" value="${settings.volume}" 
                            oninput="window.updateVolume(this.value); document.getElementById('volumeValue').textContent = this.value + '%'">
                    </div>
                </div>
                
                <!-- NOTIFICATIONS SECTION -->
                <div id="notifications" class="settings-section" style="display: none;">
                    <h2 class="section-header">🔔 Mitteilungen</h2>
                    
                    <div class="setting-item-wrapper">
                        <div class="setting-item-inline">
                            <div class="setting-info">
                                <div class="setting-label">🔔 Benachrichtigungen</div>
                                <div class="setting-desc">Aktiviere Benachrichtigungen</div>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" ${notificationSettings.enabled ? 'checked' : ''} onchange="window.settingsToggleNotifications(this)">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">Position</div>
                            <div class="setting-desc">Wo sollen Benachrichtigungen erscheinen?</div>
                        </div>
                        <select class="modern-select" onchange="window.settingsChangeNotificationPosition(this.value)">
                            <option value="top-right" ${notificationSettings.position === 'top-right' ? 'selected' : ''}>↗️ Oben Rechts</option>
                            <option value="top-left" ${notificationSettings.position === 'top-left' ? 'selected' : ''}>↖️ Oben Links</option>
                            <option value="top-center" ${notificationSettings.position === 'top-center' ? 'selected' : ''}>⬆️ Oben Mitte</option>
                            <option value="bottom-right" ${notificationSettings.position === 'bottom-right' ? 'selected' : ''}>↘️ Unten Rechts</option>
                            <option value="bottom-left" ${notificationSettings.position === 'bottom-left' ? 'selected' : ''}>↙️ Unten Links</option>
                            <option value="bottom-center" ${notificationSettings.position === 'bottom-center' ? 'selected' : ''}>⬇️ Unten Mitte</option>
                        </select>
                    </div>
                    
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">Anzeigedauer</div>
                            <div class="setting-desc">${notificationSettings.duration} Sekunden</div>
                        </div>
                        <input type="range" class="modern-slider" min="2" max="10" value="${notificationSettings.duration}" 
                            oninput="this.previousElementSibling.querySelector('.setting-desc').textContent = this.value + ' Sekunden'; window.settingsChangeNotificationDuration(this.value)">
                    </div>
                    
                    <div class="setting-item-wrapper">
                        <button class="btn-modern btn-primary" onclick="window.settingsShowNotificationHistory()">
                            📜 Benachrichtigungs-Historie
                        </button>
                    </div>
                </div>
                
                <!-- DATA SECTION -->
                <div id="data" class="settings-section" style="display: none;">
                    <h2 class="section-header">💾 Daten & Speicher</h2>
                    
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">💰 Aktuelles Guthaben</div>
                            <div class="setting-desc">${wallet} Credits</div>
                        </div>
                        <button class="btn-modern btn-danger" onclick="window.resetWallet()">
                            🗑️ Guthaben zurücksetzen
                        </button>
                    </div>
                    
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">⚠️ Alle Daten löschen</div>
                            <div class="setting-desc">Setzt alle Einstellungen und Fortschritt zurück</div>
                        </div>
                        <button class="btn-modern btn-danger" onclick="window.resetAll()">
                            💣 Alles zurücksetzen
                        </button>
                    </div>
                    
                    <div class="setting-item-wrapper">
                        <div class="setting-item-header">
                            <div class="setting-label">ℹ️ App-Version</div>
                            <div class="setting-desc settings-version-display">1.3.3.7</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    `;
};

// Initialisiere beim Laden
setTimeout(() => {
    // Theme initialisieren
    const savedTheme = localStorage.getItem('appTheme') || 'dark';
    document.querySelectorAll('.theme-option-modern').forEach(option => {
        option.classList.toggle('active', option.dataset.theme === savedTheme);
    });
    
    // Toggle Style initialisieren
    const savedStyle = localStorage.getItem('toggleStyle') || 'classic';
    document.body.setAttribute('data-toggle-style', savedStyle);
    document.querySelectorAll('.toggle-option-modern').forEach(option => {
        option.classList.toggle('active', option.dataset.style === savedStyle);
    });
    
    // Accessibility initialisieren
    const fontSize = localStorage.getItem('fontSize') || 'normal';
    const highContrast = localStorage.getItem('highContrast') === 'true';
    const reducedMotion = localStorage.getItem('reducedMotion') === 'true';
    const screenReader = localStorage.getItem('screenReaderMode') === 'true';
    const colorBlindMode = localStorage.getItem('colorBlindMode') || 'none';
    
    document.body.setAttribute('data-font-size', fontSize);
    document.body.setAttribute('data-high-contrast', highContrast);
    document.body.setAttribute('data-reduced-motion', reducedMotion);
    document.body.setAttribute('data-screen-reader', screenReader);
    document.body.setAttribute('data-colorblind', colorBlindMode);
    
    // Letzte Section wiederherstellen
    const lastSection = localStorage.getItem('lastSettingsSection') || 'appearance';
    window.navigateToSection(lastSection);
    
    // Version laden
    fetch('./version.json')
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('.settings-version-display').forEach(el => {
                el.textContent = data.version;
            });
        })
        .catch(() => {});
}, 200);
