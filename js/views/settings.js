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

        <style>
            .settings-grid {
                display: grid;
                gap: var(--spacing-md);
                max-width: 800px;
                margin: 0 auto;
            }

            .setting-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: var(--spacing-md) 0;
                border-bottom: 1px solid rgba(0, 255, 136, 0.05);
                gap: var(--spacing-md);
            }

            .setting-item:last-child {
                border-bottom: none;
            }

            .setting-info {
                flex: 1;
            }

            .setting-label {
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            }

            .setting-desc {
                font-size: 0.875rem;
                color: var(--text-secondary);
            }

            .toggle {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 26px;
                flex-shrink: 0;
            }

            .toggle input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: var(--radius-full);
                transition: var(--transition-normal);
                border: 2px solid rgba(0, 255, 136, 0.2);
            }

            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 2px;
                bottom: 2px;
                background-color: var(--text-secondary);
                border-radius: 50%;
                transition: var(--transition-normal);
            }

            .toggle input:checked + .toggle-slider {
                background-color: var(--primary);
                border-color: var(--primary);
            }

            .toggle input:checked + .toggle-slider:before {
                transform: translateX(24px);
                background-color: white;
            }

            .toggle-slider:hover {
                box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
            }

            .select {
                padding: var(--spacing-xs) var(--spacing-sm);
                background: rgba(0, 255, 136, 0.05);
                border: 1px solid rgba(0, 255, 136, 0.2);
                border-radius: var(--radius-sm);
                color: var(--text-primary);
                font-size: 1rem;
                cursor: pointer;
                transition: var(--transition-fast);
            }

            .select:hover, .select:focus {
                background: rgba(0, 255, 136, 0.1);
                border-color: var(--primary);
                outline: none;
            }

            .volume-slider {
                flex: 1;
                margin-right: var(--spacing-sm);
            }

            .volume-value {
                min-width: 50px;
                text-align: right;
                color: var(--primary);
                font-weight: 600;
            }

            .wallet-display {
                text-align: center;
                padding: var(--spacing-lg);
                background: rgba(0, 255, 136, 0.05);
                border-radius: var(--radius-md);
                margin-bottom: var(--spacing-md);
            }

            .wallet-amount {
                font-size: 3rem;
                font-weight: 900;
                color: var(--primary);
                margin-bottom: var(--spacing-xs);
            }

            .wallet-currency {
                font-size: 1.125rem;
                color: var(--text-secondary);
            }

            .wallet-actions {
                text-align: center;
            }

            .info-list {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-sm);
            }

            .info-item {
                display: flex;
                justify-content: space-between;
                padding: var(--spacing-xs) 0;
                border-bottom: 1px solid rgba(0, 255, 136, 0.05);
            }

            .info-item:last-child {
                border-bottom: none;
            }

            .info-item span {
                color: var(--text-secondary);
            }

            .info-item strong {
                color: var(--primary);
                font-weight: 600;
            }

            .card-danger {
                border-color: rgba(255, 0, 51, 0.3);
            }

            .danger-warning {
                background: rgba(255, 0, 51, 0.1);
                border-left: 3px solid #ff0033;
                padding: var(--spacing-sm);
                border-radius: var(--radius-sm);
                color: #ff6b6b;
                margin-bottom: var(--spacing-md);
                font-size: 0.875rem;
            }

            .danger-actions {
                text-align: center;
            }

            @media (max-width: 640px) {
                .setting-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: var(--spacing-sm);
                }

                .wallet-amount {
                    font-size: 2rem;
                }
            }
        </style>
    `;
};

// Settings functions
window.toggleSetting = (settingName) => {
    if (window.app && window.app.store) {
        const settings = window.app.store.state.settings;
        settings[settingName] = !settings[settingName];
        window.app.store.saveState();
        
        // Apply animations setting immediately
        if (settingName === 'animations') {
            document.body.style.setProperty('--transition-fast', settings.animations ? '0.15s' : '0s');
            document.body.style.setProperty('--transition-normal', settings.animations ? '0.3s' : '0s');
            document.body.style.setProperty('--transition-slow', settings.animations ? '0.5s' : '0s');
        }

        window.app.ui.showNotification('Einstellung wurde aktualisiert', 'success');
    }
};

window.updateVolume = (value) => {
    if (window.app && window.app.store) {
        window.app.store.state.settings.volume = parseInt(value);
        window.app.store.saveState();
        
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
        window.app.store.saveState();
        
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
