/* ==========================================
   SETTINGS VIEW
   ========================================== */

// Toggle-Style wechseln
window.setToggleStyle = (style) => {
    localStorage.setItem('toggleStyle', style);
    document.body.setAttribute('data-toggle-style', style);
    
    // Aktualisiere visuelle Auswahl
    document.querySelectorAll('.toggle-style-option').forEach(option => {
        option.classList.toggle('active', option.dataset.style === style);
    });
    
    window.ui.showNotification('Toggle-Style geändert zu: ' + style, 'success');
};

export const settingsView = (store) => {
    const settings = store.getSettings();
    const wallet = store.getWallet();
    
    // Toggle-Style initialisieren
    setTimeout(() => {
        const savedStyle = localStorage.getItem('toggleStyle') || 'classic';
        document.body.setAttribute('data-toggle-style', savedStyle);
        document.querySelectorAll('.toggle-style-option').forEach(option => {
            option.classList.toggle('active', option.dataset.style === savedStyle);
        });
    }, 100);
    
    // Version dynamisch laden
    let version = '1.0.3.0'; // Fallback
    fetch('./version.json')
        .then(response => response.json())
        .then(data => {
            const versionElements = document.querySelectorAll('.settings-version-display');
            versionElements.forEach(el => el.textContent = data.version);
        })
        .catch(() => {});
    
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
        <div class="settings-view">
            <h1 class="section-title">⚙️ Einstellungen</h1>

            <div class="settings-grid">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">🎨 Design</h2>
                    </div>
                    <div class="card-body">
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Toggle-Style</div>
                                <div class="setting-desc">Wähle deinen bevorzugten Toggle-Style</div>
                            </div>
                            <div class="toggle-style-picker">
                                <div class="toggle-style-option" data-style="classic" onclick="window.setToggleStyle('classic')">
                                    <div class="toggle-preview">
                                        <label class="toggle toggle-classic">
                                            <input type="checkbox" checked disabled>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <span class="toggle-style-name">Classic</span>
                                </div>
                                <div class="toggle-style-option" data-style="ios" onclick="window.setToggleStyle('ios')">
                                    <div class="toggle-preview">
                                        <label class="toggle toggle-ios">
                                            <input type="checkbox" checked disabled>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <span class="toggle-style-name">iOS</span>
                                </div>
                                <div class="toggle-style-option" data-style="material" onclick="window.setToggleStyle('material')">
                                    <div class="toggle-preview">
                                        <label class="toggle toggle-material">
                                            <input type="checkbox" checked disabled>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <span class="toggle-style-name">Material</span>
                                </div>
                                <div class="toggle-style-option" data-style="neon" onclick="window.setToggleStyle('neon')">
                                    <div class="toggle-preview">
                                        <label class="toggle toggle-neon">
                                            <input type="checkbox" checked disabled>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <span class="toggle-style-name">Neon</span>
                                </div>
                                <div class="toggle-style-option" data-style="minimal" onclick="window.setToggleStyle('minimal')">
                                    <div class="toggle-preview">
                                        <label class="toggle toggle-minimal">
                                            <input type="checkbox" checked disabled>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <span class="toggle-style-name">Minimal</span>
                                </div>
                            </div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Dark Mode</div>
                                <div class="setting-desc">Dunkles Design für bessere Lesbarkeit</div>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" ${settings.darkMode ? 'checked' : ''} 
                                    onchange="window.toggleSetting('darkMode')">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Animationen</div>
                                <div class="setting-desc">Aktiviere oder deaktiviere Animationen</div>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" ${settings.animations ? 'checked' : ''} 
                                    onchange="window.toggleSetting('animations')">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">📱 Bottom Navigation</h2>
                    </div>
                    <div class="card-body">
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Navigation anzeigen</div>
                                <div class="setting-desc">Bottom-Navigation ein- oder ausblenden</div>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" id="bottomNavVisible" ${bottomNavSettings.visible ? 'checked' : ''} 
                                    onchange="window.settingsToggleBottomNav()">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        
                        <div class="setting-item setting-item-slider">
                            <div class="setting-info">
                                <div class="setting-label">Transparenz</div>
                                <div class="setting-desc">Deckkraft der Navigation</div>
                            </div>
                            <div class="slider-container">
                                <input type="range" class="modern-slider" id="bottomNavOpacity" min="10" max="100" value="${bottomNavSettings.opacity}" 
                                       oninput="window.settingsUpdateBottomNavOpacity(this.value)">
                                <div class="slider-value" id="opacityValue">${bottomNavSettings.opacity}%</div>
                            </div>
                        </div>
                        
                        <div class="setting-item setting-item-slider">
                            <div class="setting-info">
                                <div class="setting-label">Höhe</div>
                                <div class="setting-desc">Größe der Navigation</div>
                            </div>
                            <div class="slider-container">
                                <input type="range" class="modern-slider" id="bottomNavSize" min="60" max="150" value="${bottomNavSettings.size}" 
                                       oninput="window.settingsUpdateBottomNavSize(this.value)">
                                <div class="slider-value" id="sizeValue">${bottomNavSettings.size}%</div>
                            </div>
                        </div>
                        
                        <div class="setting-item" style="flex-direction: column; align-items: flex-start;">
                            <div class="setting-info" style="margin-bottom: var(--spacing-sm);">
                                <div class="setting-label">Sichtbare Elemente</div>
                                <div class="setting-desc">Wähle welche Tabs angezeigt werden</div>
                            </div>
                            <div class="bottom-nav-items" style="width: 100%;">
                                <label class="nav-toggle">
                                    <input type="checkbox" ${bottomNavSettings.items.home ? 'checked' : ''} onchange="window.settingsToggleNavItem('home')">
                                    <span>🏠 Home</span>
                                </label>
                                <label class="nav-toggle">
                                    <input type="checkbox" ${bottomNavSettings.items.games ? 'checked' : ''} onchange="window.settingsToggleNavItem('games')">
                                    <span>🎮 Spiele</span>
                                </label>
                                <label class="nav-toggle">
                                    <input type="checkbox" ${bottomNavSettings.items.points ? 'checked' : ''} onchange="window.settingsToggleNavItem('points')">
                                    <span>⭐ Punkte</span>
                                </label>
                                <label class="nav-toggle">
                                    <input type="checkbox" ${bottomNavSettings.items.stats ? 'checked' : ''} onchange="window.settingsToggleNavItem('stats')">
                                    <span>📊 Stats</span>
                                </label>
                                <label class="nav-toggle">
                                    <input type="checkbox" ${bottomNavSettings.items.settings ? 'checked' : ''} onchange="window.settingsToggleNavItem('settings')">
                                    <span>⚙️ Settings</span>
                                </label>
                                <label class="nav-toggle">
                                    <input type="checkbox" ${bottomNavSettings.items.dev ? 'checked' : ''} onchange="window.settingsToggleNavItem('dev')">
                                    <span>🛠️ Dev</span>
                                </label>
                            </div>
                        </div>
                        
                        <div style="margin-top: var(--spacing-md);">
                            <button class="btn btn-secondary btn-sm" onclick="window.settingsResetBottomNav()">
                                🔄 Zurücksetzen
                            </button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">🔊 Audio</h2>
                    </div>
                    <div class="card-body">
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Sound-Effekte</div>
                                <div class="setting-desc">Spiele Sound-Effekte bei Aktionen</div>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" ${settings.soundEffects ? 'checked' : ''} 
                                    onchange="window.toggleSetting('soundEffects')">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>

                        <div class="setting-item setting-item-slider">
                            <div class="setting-info">
                                <div class="setting-label">Lautstärke</div>
                                <div class="setting-desc">Stelle die Lautstärke ein</div>
                            </div>
                            <div class="slider-container">
                                <input type="range" class="modern-slider" min="0" max="100" 
                                    value="${settings.volume}" 
                                    oninput="window.updateVolume(this.value)">
                                <div class="slider-value" id="volumeValue">${settings.volume}%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">🎮 Spiel</h2>
                    </div>
                    <div class="card-body">
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Schwierigkeitsgrad</div>
                                <div class="setting-desc">Wähle den Schwierigkeitsgrad</div>
                            </div>
                            <select class="select" onchange="window.updateDifficulty(this.value)">
                                <option value="easy" ${settings.difficulty === 'easy' ? 'selected' : ''}>
                                    Einfach
                                </option>
                                <option value="medium" ${settings.difficulty === 'medium' ? 'selected' : ''}>
                                    Mittel
                                </option>
                                <option value="hard" ${settings.difficulty === 'hard' ? 'selected' : ''}>
                                    Schwer
                                </option>
                            </select>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Zeitlimit</div>
                                <div class="setting-desc">Aktiviere Zeitlimit für Fragen</div>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" ${settings.timeLimit ? 'checked' : ''} 
                                    onchange="window.toggleSetting('timeLimit')">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">� Benachrichtigungen</h2>
                    </div>
                    <div class="card-body">
                        <div class="setting-item-compact">
                            <div class="setting-row">
                                <div class="setting-label">Benachrichtigungen aktivieren</div>
                                <label class="toggle">
                                    <input type="checkbox" id="notificationsEnabled" ${settings.notifications?.enabled !== false ? 'checked' : ''} 
                                        onchange="window.settingsToggleNotifications()">
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            <div class="setting-desc">Zeige Toast-Benachrichtigungen an</div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Erfolgsmeldungen</div>
                                <div class="setting-desc">Zeige Erfolgs-Benachrichtigungen</div>
                            </div>
                            <div class="setting-controls">
                                <label class="toggle">
                                    <input type="checkbox" id="notificationsSuccess" ${settings.notifications?.types?.success !== false ? 'checked' : ''} 
                                        onchange="window.settingsToggleNotificationType('success')">
                                    <span class="toggle-slider"></span>
                                </label>
                                <button class="btn btn-success btn-xs" onclick="window.settingsTestNotification('success')">
                                    Test
                                </button>
                            </div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Fehlermeldungen</div>
                                <div class="setting-desc">Zeige Fehler-Benachrichtigungen</div>
                            </div>
                            <div class="setting-controls">
                                <label class="toggle">
                                    <input type="checkbox" id="notificationsError" ${settings.notifications?.types?.error !== false ? 'checked' : ''} 
                                        onchange="window.settingsToggleNotificationType('error')">
                                    <span class="toggle-slider"></span>
                                </label>
                                <button class="btn btn-danger btn-xs" onclick="window.settingsTestNotification('error')">
                                    Test
                                </button>
                            </div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Warnungen</div>
                                <div class="setting-desc">Zeige Warnungs-Benachrichtigungen</div>
                            </div>
                            <div class="setting-controls">
                                <label class="toggle">
                                    <input type="checkbox" id="notificationsWarning" ${settings.notifications?.types?.warning !== false ? 'checked' : ''} 
                                        onchange="window.settingsToggleNotificationType('warning')">
                                    <span class="toggle-slider"></span>
                                </label>
                                <button class="btn btn-warning btn-xs" onclick="window.settingsTestNotification('warning')">
                                    Test
                                </button>
                            </div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">LocalStorage Events</div>
                                <div class="setting-desc">Zeige Benachrichtigungen bei localStorage Operationen</div>
                            </div>
                            <div class="setting-controls">
                                <label class="toggle">
                                    <input type="checkbox" id="notificationsLocalStorage" ${settings.notifications?.types?.localstorage !== false ? 'checked' : ''} 
                                        onchange="window.settingsToggleNotificationType('localstorage')">
                                    <span class="toggle-slider"></span>
                                </label>
                                <button class="btn btn-secondary btn-xs" onclick="window.settingsTestNotification('localstorage')">
                                    Test
                                </button>
                            </div>
                        </div>

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Position</div>
                                <div class="setting-desc">Wähle die Position der Benachrichtigungen</div>
                            </div>
                            <select class="select" id="notificationPosition" onchange="window.settingsChangeNotificationPosition(this.value)">
                                <option value="top-right" ${settings.notifications?.position === 'top-right' ? 'selected' : ''}>Oben rechts</option>
                                <option value="top-left" ${settings.notifications?.position === 'top-left' ? 'selected' : ''}>Oben links</option>
                                <option value="bottom-right" ${settings.notifications?.position === 'bottom-right' || !settings.notifications?.position ? 'selected' : ''}>Unten rechts</option>
                                <option value="bottom-left" ${settings.notifications?.position === 'bottom-left' ? 'selected' : ''}>Unten links</option>
                                <option value="top-center" ${settings.notifications?.position === 'top-center' ? 'selected' : ''}>Oben zentriert</option>
                                <option value="bottom-center" ${settings.notifications?.position === 'bottom-center' ? 'selected' : ''}>Unten zentriert</option>
                            </select>
                        </div>

                        <div class="setting-item setting-item-slider">
                            <div class="setting-info">
                                <div class="setting-label">Anzeigedauer</div>
                                <div class="setting-desc">Dauer in Sekunden</div>
                            </div>
                            <div class="slider-container">
                                <input type="range" class="modern-slider" id="notificationDuration" min="1" max="10" value="${settings.notifications?.duration || 3}" 
                                       oninput="window.settingsChangeNotificationDuration(this.value)">
                                <div class="slider-value" id="durationValue">${settings.notifications?.duration || 3}s</div>
                            </div>
                        </div>

                        <div style="margin-top: var(--spacing-md);">
                            <button class="btn btn-primary btn-sm" onclick="window.settingsShowNotificationHistory()">
                                📋 Benachrichtigungs-Historie
                            </button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">�💰 Wallet</h2>
                    </div>
                    <div class="card-body">
                        <div class="wallet-display">
                            <div class="wallet-amount">${wallet.toLocaleString('de-DE')}</div>
                            <div class="wallet-currency">Schülling</div>
                        </div>
                        <div class="wallet-actions">
                            <button class="btn btn-outline" onclick="window.resetWallet()">
                                🔄 Wallet zurücksetzen
                            </button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">ℹ️ Info</h2>
                    </div>
                    <div class="card-body">
                        <div class="info-list">
                            <div class="info-item">
                                <span>Version:</span>
                                <strong><a href="#changelog" data-route="changelog" class="version-link settings-version-display">${version}</a></strong>
                            </div>
                            <div class="info-item">
                                <span>Entwickler:</span>
                                <strong>RATEN OIDA Team</strong>
                            </div>
                            <div class="info-item">
                                <span>Letzte Aktualisierung:</span>
                                <strong>${new Date().toLocaleDateString('de-DE')}</strong>
                            </div>
                        </div>
                        <div style="margin-top: var(--spacing-md);">
                            <a href="#changelog" data-route="changelog" class="btn btn-secondary btn-sm">
                                📜 Changelog anzeigen
                            </a>
                        </div>
                    </div>
                </div>

                <div class="card card-danger">
                    <div class="card-header">
                        <h2 class="card-title">⚠️ Gefahrenzone</h2>
                    </div>
                    <div class="card-body">
                        <div class="danger-warning">
                            Diese Aktionen können nicht rückgängig gemacht werden!
                        </div>
                        <div class="danger-actions">
                            <button class="btn btn-danger" onclick="window.resetAll()">
                                🗑️ Alle Daten löschen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    `;
};

// Settings functions - DIREKT in localStorage speichern
window.toggleSetting = (settingName) => {
    if (window.app && window.app.store) {
        // Setting umschalten
        const currentValue = window.app.store.state.settings[settingName];
        window.app.store.state.settings[settingName] = !currentValue;
        
        // SOFORT in localStorage speichern
        localStorage.setItem('raten_oida_v2', JSON.stringify(window.app.store.state));
        
        // UI aktualisieren
        window.app.store.notify();
        
        // Spezial-Handling für Animationen
        if (settingName === 'animations') {
            const animations = window.app.store.state.settings.animations;
            document.body.style.setProperty('--transition-fast', animations ? '0.2s' : '0s');
            document.body.style.setProperty('--transition-normal', animations ? '0.3s' : '0s');
            document.body.style.setProperty('--transition-slow', animations ? '0.5s' : '0s');
        }

        window.app.ui.showNotification('✓ Gespeichert', 'success');
    }
};

window.updateVolume = (value) => {
    if (window.app && window.app.store) {
        window.app.store.state.settings.volume = parseInt(value);
        
        // SOFORT in localStorage speichern
        localStorage.setItem('raten_oida_v2', JSON.stringify(window.app.store.state));
        
        // Update volume display
        const volumeValue = document.querySelector('.volume-value');
        if (volumeValue) {
            volumeValue.textContent = `${value}%`;
        }
    }
};

window.updateDifficulty = (value) => {
    if (window.app && window.app.store) {
        window.app.store.state.settings.difficulty = value;
        
        // SOFORT in localStorage speichern
        localStorage.setItem('raten_oida_v2', JSON.stringify(window.app.store.state));
        
        window.app.ui.showNotification(`Schwierigkeitsgrad: ${value}`, 'info');
    }
};

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
                    <button class="btn btn-outline" onclick="window.closeModal()">
                        Abbrechen
                    </button>
                    <button class="btn btn-primary" onclick="window.confirmResetWallet()">
                        Zurücksetzen
                    </button>
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
                    <button class="btn btn-outline" onclick="window.closeModal()">
                        Abbrechen
                    </button>
                    <button class="btn btn-danger" onclick="window.confirmResetAll()">
                        Alles löschen
                    </button>
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
        
        // Reload page after short delay
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
};

// Bottom Navigation Settings Functions
window.settingsToggleBottomNav = () => {
    const settings = JSON.parse(localStorage.getItem('bottomNavSettings') || '{}');
    settings.visible = document.getElementById('bottomNavVisible').checked;
    localStorage.setItem('bottomNavSettings', JSON.stringify(settings));
    window.applyBottomNavSettings();
    window.app.ui.showNotification(settings.visible ? '📱 Navigation aktiviert' : '📱 Navigation deaktiviert', 'info');
};

window.settingsUpdateBottomNavOpacity = (value) => {
    const settings = JSON.parse(localStorage.getItem('bottomNavSettings') || '{}');
    settings.opacity = parseInt(value);
    localStorage.setItem('bottomNavSettings', JSON.stringify(settings));
    document.getElementById('opacityValue').textContent = value + '%';
    window.applyBottomNavSettings();
};

window.settingsUpdateBottomNavSize = (value) => {
    const settings = JSON.parse(localStorage.getItem('bottomNavSettings') || '{}');
    settings.size = parseInt(value);
    localStorage.setItem('bottomNavSettings', JSON.stringify(settings));
    document.getElementById('sizeValue').textContent = value + '%';
    window.applyBottomNavSettings();
};

window.settingsToggleNavItem = (item) => {
    const settings = JSON.parse(localStorage.getItem('bottomNavSettings') || '{}');
    if (!settings.items) settings.items = {};
    
    const checkbox = event.target;
    settings.items[item] = checkbox.checked;
    
    localStorage.setItem('bottomNavSettings', JSON.stringify(settings));
    window.applyBottomNavSettings();
    window.app.ui.showNotification(`${checkbox.checked ? '✅' : '❌'} ${item.toUpperCase()}`, 'info');
};

window.settingsResetBottomNav = () => {
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
    window.applyBottomNavSettings();
    window.app.ui.showNotification('🔄 Navigation zurückgesetzt', 'success');
    window.app.router.render();
};

// === NOTIFICATION SETTINGS ===

window.settingsToggleNotifications = () => {
    const settings = window.app.store.getSettings();
    const enabled = document.getElementById('notificationsEnabled').checked;
    
    if (!settings.notifications) settings.notifications = {};
    settings.notifications.enabled = enabled;
    
    window.app.store.saveSettings(settings);
    window.app.ui.showNotification(`${enabled ? '✅' : '❌'} Benachrichtigungen ${enabled ? 'aktiviert' : 'deaktiviert'}`, 'info');
};

window.settingsToggleNotificationType = (type) => {
    const settings = window.app.store.getSettings();
    const enabled = event.target.checked;
    
    if (!settings.notifications) settings.notifications = {};
    if (!settings.notifications.types) settings.notifications.types = {};
    settings.notifications.types[type] = enabled;
    
    window.app.store.saveSettings(settings);
    
    // Spezielle Behandlung für localStorage Events
    if (type === 'localstorage') {
        window.app.ui.enableLocalStorageEvents(enabled);
    }
    
    window.app.ui.showNotification(`${enabled ? '✅' : '❌'} ${type.toUpperCase()}-Benachrichtigungen ${enabled ? 'aktiviert' : 'deaktiviert'}`, 'info');
};

window.settingsChangeNotificationPosition = (position) => {
    const settings = window.app.store.getSettings();
    
    if (!settings.notifications) settings.notifications = {};
    settings.notifications.position = position;
    
    window.app.store.saveSettings(settings);
    window.app.ui.showNotification(`📍 Position: ${position.replace('-', ' ').toUpperCase()}`, 'info');
};

window.settingsChangeNotificationDuration = (duration) => {
    const settings = window.app.store.getSettings();
    
    if (!settings.notifications) settings.notifications = {};
    settings.notifications.duration = parseInt(duration);
    
    window.app.store.saveSettings(settings);
    document.getElementById('durationValue').textContent = duration + 's';
    window.app.ui.showNotification(`⏱️ Dauer: ${duration}s`, 'info');
};

window.settingsShowNotificationHistory = () => {
    const history = JSON.parse(localStorage.getItem('notificationHistory') || '[]');
    
    const typeIcons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
        localstorage: '💾'
    };
    
    const typeLabels = {
        success: 'Erfolg',
        error: 'Fehler',
        warning: 'Warnung',
        info: 'Info',
        localstorage: 'LocalStorage'
    };
    
    const modalContent = `
        <div class="notification-history-container">
            ${history.length === 0 ? 
                '<div class="empty-state">📭 Keine Benachrichtigungen in der Historie</div>' :
                `<div class="history-stats">
                    <div class="stat-badge">📊 Gesamt: ${history.length}</div>
                    <div class="stat-badge">📋 Angezeigt: ${Math.min(50, history.length)}</div>
                </div>
                <div class="notification-history-list">
                    ${history.slice(-50).reverse().map((item, index) => {
                        const date = new Date(item.timestamp);
                        const timeStr = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                        const dateStr = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
                        const icon = typeIcons[item.type] || '📢';
                        const label = typeLabels[item.type] || item.type;
                        
                        return `
                            <div class="history-item history-item-${item.type}">
                                <div class="history-icon">${icon}</div>
                                <div class="history-content">
                                    <div class="history-header">
                                        <span class="history-type-badge badge-${item.type}">${label}</span>
                                    </div>
                                    <div class="history-message">${item.message}</div>
                                    <div class="history-footer">
                                        <span class="history-date">${dateStr}</span>
                                        <span class="history-time">${timeStr}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>`
            }
        </div>
    `;
    
    window.app.ui.showModal('📋 Benachrichtigungs-Historie', modalContent, [
        { label: '🗑️ Alle löschen', type: 'danger', action: 'clear', callback: () => {
            if (confirm('Möchten Sie wirklich die gesamte Benachrichtigungs-Historie löschen?')) {
                localStorage.removeItem('notificationHistory');
                window.app.ui.showNotification('🗑️ Historie gelöscht', 'info');
                window.settingsShowNotificationHistory();
            }
        }},
        { label: '✕ Schließen', type: 'secondary', action: 'close' }
    ]);
};

window.settingsTestNotification = (type) => {
    const messages = {
        success: '✅ Test-Erfolgsmeldung',
        error: '❌ Test-Fehlermeldung', 
        warning: '⚠️ Test-Warnung',
        info: 'ℹ️ Test-Info-Meldung',
        localstorage: '💾 local storage event - Type: testen'
    };
    
    window.app.ui.showNotification(messages[type], type);
};
