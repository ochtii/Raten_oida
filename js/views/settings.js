/* ==========================================
   SETTINGS VIEW
   ========================================== */

export const settingsView = (store) => {
    const settings = store.getSettings();
    const wallet = store.getWallet();
    const version = '2.0.0';

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

                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Lautstärke</div>
                                <div class="setting-desc">Stelle die Lautstärke ein</div>
                            </div>
                            <input type="range" class="volume-slider" min="0" max="100" 
                                value="${settings.volume}" 
                                onchange="window.updateVolume(this.value)">
                            <span class="volume-value">${settings.volume}%</span>
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
                        <h2 class="card-title">💰 Wallet</h2>
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
                                <strong>${version}</strong>
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
