/* ========================================
   DEVTOOLS.JS - Developer Tools & Debug Panel
   ======================================== */

import { $ } from '../core/dom.js';
import { store } from '../core/store.js';

export class DevTools {
    constructor() {
        this.isOpen = false;
        this.logs = [];
        this.maxLogs = 100;
        this.performanceMetrics = {
            startTime: performance.now(),
            renders: 0,
            stateChanges: 0,
            lastUpdate: Date.now()
        };
        
        this.init();
    }

    init() {
        this.createDevPanel();
        this.setupKeyboardShortcuts();
        this.setupConsoleProxy();
        this.setupPerformanceMonitor();
        this.setupStateObserver();
        
        // Initial log
        this.log('DevTools initialized', 'success');
    }

    createDevPanel() {
        const panel = document.createElement('div');
        panel.id = 'dev-panel';
        panel.className = 'dev-panel hidden';
        panel.innerHTML = `
            <div class="dev-panel-header">
                <div class="flex items-center gap-md">
                    <span class="dev-logo">🛠️</span>
                    <h3 class="m-0">Developer Tools</h3>
                    <span class="dev-badge">v1.0</span>
                </div>
                <button id="dev-close" class="dev-btn-icon" title="Close (Ctrl+Shift+D)">✕</button>
            </div>

            <div class="dev-tabs">
                <button class="dev-tab active" data-tab="console">
                    <span>📋</span> Console
                </button>
                <button class="dev-tab" data-tab="state">
                    <span>🔍</span> State
                </button>
                <button class="dev-tab" data-tab="storage">
                    <span>💾</span> Storage
                </button>
                <button class="dev-tab" data-tab="performance">
                    <span>⚡</span> Performance
                </button>
                <button class="dev-tab" data-tab="actions">
                    <span>🎮</span> Actions
                </button>
            </div>

            <div class="dev-content">
                <!-- Console Tab -->
                <div class="dev-tab-content active" data-content="console">
                    <div class="dev-toolbar">
                        <button id="dev-clear-console" class="dev-btn-sm">Clear</button>
                        <span class="dev-count">0 logs</span>
                    </div>
                    <div id="dev-console" class="dev-console"></div>
                </div>

                <!-- State Tab -->
                <div class="dev-tab-content" data-content="state">
                    <div class="dev-toolbar">
                        <button id="dev-refresh-state" class="dev-btn-sm">Refresh</button>
                        <button id="dev-export-state" class="dev-btn-sm">Export JSON</button>
                    </div>
                    <pre id="dev-state-viewer" class="dev-code-viewer"></pre>
                </div>

                <!-- Storage Tab -->
                <div class="dev-tab-content" data-content="storage">
                    <div class="dev-toolbar">
                        <button id="dev-clear-storage" class="dev-btn-sm dev-btn-danger">Clear All Storage</button>
                        <span class="dev-info">⚠️ This will reset the entire app</span>
                    </div>
                    <div id="dev-storage-list" class="dev-storage-list"></div>
                </div>

                <!-- Performance Tab -->
                <div class="dev-tab-content" data-content="performance">
                    <div class="dev-toolbar">
                        <button id="dev-reset-metrics" class="dev-btn-sm">Reset Metrics</button>
                    </div>
                    <div id="dev-performance" class="dev-stats-grid"></div>
                </div>

                <!-- Actions Tab -->
                <div class="dev-tab-content" data-content="actions">
                    <div class="dev-actions-grid">
                        <div class="dev-action-card">
                            <h4>💰 Wallet</h4>
                            <div class="flex gap-sm">
                                <button id="dev-add-1000" class="dev-btn-sm">+1000 Sch</button>
                                <button id="dev-add-10000" class="dev-btn-sm">+10000 Sch</button>
                                <button id="dev-reset-wallet" class="dev-btn-sm">Reset</button>
                            </div>
                        </div>

                        <div class="dev-action-card">
                            <h4>📊 Stats</h4>
                            <div class="flex gap-sm">
                                <button id="dev-complete-game" class="dev-btn-sm">Win Game</button>
                                <button id="dev-reset-stats" class="dev-btn-sm">Reset Stats</button>
                            </div>
                        </div>

                        <div class="dev-action-card">
                            <h4>🎨 Theme</h4>
                            <div class="flex gap-sm">
                                <button id="dev-toggle-theme" class="dev-btn-sm">Toggle Theme</button>
                                <button id="dev-dark-theme" class="dev-btn-sm">Dark</button>
                                <button id="dev-light-theme" class="dev-btn-sm">Light</button>
                            </div>
                        </div>

                        <div class="dev-action-card">
                            <h4>🔄 App</h4>
                            <div class="flex gap-sm">
                                <button id="dev-reload" class="dev-btn-sm">Reload</button>
                                <button id="dev-hard-reset" class="dev-btn-sm dev-btn-danger">Hard Reset</button>
                            </div>
                        </div>

                        <div class="dev-action-card">
                            <h4>🧪 Test Data</h4>
                            <div class="flex gap-sm">
                                <button id="dev-test-modal" class="dev-btn-sm">Test Modal</button>
                                <button id="dev-test-notification" class="dev-btn-sm">Test Notification</button>
                            </div>
                        </div>

                        <div class="dev-action-card">
                            <h4>📱 Viewport</h4>
                            <div class="flex gap-sm flex-col">
                                <button id="dev-mobile-view" class="dev-btn-sm">Mobile (375px)</button>
                                <button id="dev-tablet-view" class="dev-btn-sm">Tablet (768px)</button>
                                <button id="dev-desktop-view" class="dev-btn-sm">Desktop (1920px)</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dev-footer">
                <div class="dev-footer-info">
                    <span>🚀 Raten OIDA Dev Mode</span>
                    <span>•</span>
                    <span id="dev-uptime">00:00:00</span>
                </div>
                <div class="dev-footer-shortcuts">
                    <kbd>Ctrl+Shift+D</kbd> Toggle
                    <span>•</span>
                    <kbd>Ctrl+L</kbd> Clear Console
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        this.panel = panel;
        this.setupEventListeners();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+D - Toggle DevTools
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggle();
            }

            // Ctrl+L - Clear Console
            if (e.ctrlKey && e.key === 'l' && this.isOpen) {
                e.preventDefault();
                this.clearConsole();
            }

            // Ctrl+Shift+R - Hard Reload
            if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                e.preventDefault();
                this.hardReset();
            }
        });
    }

    setupEventListeners() {
        // Close button
        $('#dev-close')?.addEventListener('click', () => this.close());

        // Tab switching
        document.querySelectorAll('.dev-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Console actions
        $('#dev-clear-console')?.addEventListener('click', () => this.clearConsole());

        // State actions
        $('#dev-refresh-state')?.addEventListener('click', () => this.refreshState());
        $('#dev-export-state')?.addEventListener('click', () => this.exportState());

        // Storage actions
        $('#dev-clear-storage')?.addEventListener('click', () => this.clearStorage());

        // Performance actions
        $('#dev-reset-metrics')?.addEventListener('click', () => this.resetMetrics());

        // Quick actions - Wallet
        $('#dev-add-1000')?.addEventListener('click', () => this.addMoney(1000));
        $('#dev-add-10000')?.addEventListener('click', () => this.addMoney(10000));
        $('#dev-reset-wallet')?.addEventListener('click', () => this.resetWallet());

        // Quick actions - Stats
        $('#dev-complete-game')?.addEventListener('click', () => this.completeGame());
        $('#dev-reset-stats')?.addEventListener('click', () => this.resetStats());

        // Quick actions - Theme
        $('#dev-toggle-theme')?.addEventListener('click', () => this.toggleTheme());
        $('#dev-dark-theme')?.addEventListener('click', () => this.setTheme('dark'));
        $('#dev-light-theme')?.addEventListener('click', () => this.setTheme('light'));

        // Quick actions - App
        $('#dev-reload')?.addEventListener('click', () => location.reload());
        $('#dev-hard-reset')?.addEventListener('click', () => this.hardReset());

        // Quick actions - Test
        $('#dev-test-modal')?.addEventListener('click', () => this.testModal());
        $('#dev-test-notification')?.addEventListener('click', () => this.testNotification());

        // Quick actions - Viewport
        $('#dev-mobile-view')?.addEventListener('click', () => this.setViewport(375));
        $('#dev-tablet-view')?.addEventListener('click', () => this.setViewport(768));
        $('#dev-desktop-view')?.addEventListener('click', () => this.setViewport(1920));
    }

    setupConsoleProxy() {
        // Proxy console methods
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        console.log = (...args) => {
            originalLog.apply(console, args);
            this.log(args.join(' '), 'log');
        };

        console.error = (...args) => {
            originalError.apply(console, args);
            this.log(args.join(' '), 'error');
        };

        console.warn = (...args) => {
            originalWarn.apply(console, args);
            this.log(args.join(' '), 'warning');
        };
    }

    setupPerformanceMonitor() {
        // Update uptime every second
        setInterval(() => {
            const uptime = performance.now() - this.performanceMetrics.startTime;
            const uptimeEl = $('#dev-uptime');
            if (uptimeEl) {
                uptimeEl.textContent = this.formatUptime(uptime);
            }
        }, 1000);

        // Monitor performance
        setInterval(() => {
            if (this.isOpen) {
                this.updatePerformanceMetrics();
            }
        }, 2000);
    }

    setupStateObserver() {
        store.subscribe(() => {
            this.performanceMetrics.stateChanges++;
            this.performanceMetrics.lastUpdate = Date.now();
            if (this.isOpen) {
                this.refreshState();
            }
        });
    }

    // Public Methods
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.panel.classList.remove('hidden');
        this.isOpen = true;
        this.refreshState();
        this.updateStorageList();
        this.updatePerformanceMetrics();
        this.log('DevTools opened', 'success');
    }

    close() {
        this.panel.classList.add('hidden');
        this.isOpen = false;
        this.log('DevTools closed', 'success');
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.dev-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update tab content
        document.querySelectorAll('.dev-tab-content').forEach(content => {
            content.classList.toggle('active', content.dataset.content === tabName);
        });

        // Refresh content on tab switch
        switch (tabName) {
            case 'state':
                this.refreshState();
                break;
            case 'storage':
                this.updateStorageList();
                break;
            case 'performance':
                this.updatePerformanceMetrics();
                break;
        }
    }

    log(message, type = 'log') {
        const timestamp = new Date().toLocaleTimeString('de-AT');
        const logEntry = { message, type, timestamp };
        
        this.logs.push(logEntry);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        this.updateConsole();
    }

    updateConsole() {
        const consoleEl = $('#dev-console');
        if (!consoleEl) return;

        const logHTML = this.logs.map(log => `
            <div class="dev-log-entry dev-log-${log.type}">
                <span class="dev-log-time">${log.timestamp}</span>
                <span class="dev-log-type">[${log.type.toUpperCase()}]</span>
                <span class="dev-log-message">${log.message}</span>
            </div>
        `).reverse().join('');

        consoleEl.innerHTML = logHTML || '<div class="dev-empty">No logs yet</div>';

        // Update count
        const countEl = $('.dev-count');
        if (countEl) {
            countEl.textContent = `${this.logs.length} logs`;
        }
    }

    clearConsole() {
        this.logs = [];
        this.updateConsole();
        this.log('Console cleared', 'success');
    }

    refreshState() {
        const stateViewer = $('#dev-state-viewer');
        if (!stateViewer) return;

        const state = store.getState();
        stateViewer.textContent = JSON.stringify(state, null, 2);
    }

    exportState() {
        const state = store.getState();
        const json = JSON.stringify(state, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `raten-oida-state-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.log('State exported as JSON', 'success');
    }

    updateStorageList() {
        const listEl = $('#dev-storage-list');
        if (!listEl) return;

        const items = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            items.push({ key, value, size: new Blob([value]).size });
        }

        if (items.length === 0) {
            listEl.innerHTML = '<div class="dev-empty">No localStorage items</div>';
            return;
        }

        const itemsHTML = items.map(item => `
            <div class="dev-storage-item">
                <div class="dev-storage-key">${item.key}</div>
                <div class="dev-storage-value">${item.value.substring(0, 100)}${item.value.length > 100 ? '...' : ''}</div>
                <div class="dev-storage-size">${this.formatBytes(item.size)}</div>
            </div>
        `).join('');

        listEl.innerHTML = itemsHTML;
    }

    clearStorage() {
        if (confirm('⚠️ This will clear ALL localStorage and reset the app. Continue?')) {
            localStorage.clear();
            this.log('LocalStorage cleared', 'warning');
            setTimeout(() => location.reload(), 500);
        }
    }

    updatePerformanceMetrics() {
        const perfEl = $('#dev-performance');
        if (!perfEl) return;

        const uptime = performance.now() - this.performanceMetrics.startTime;
        const memory = performance.memory ? performance.memory.usedJSHeapSize : 0;
        const fps = this.calculateFPS();

        const metricsHTML = `
            <div class="dev-metric-card">
                <div class="dev-metric-label">Uptime</div>
                <div class="dev-metric-value">${this.formatUptime(uptime)}</div>
            </div>
            <div class="dev-metric-card">
                <div class="dev-metric-label">State Changes</div>
                <div class="dev-metric-value">${this.performanceMetrics.stateChanges}</div>
            </div>
            <div class="dev-metric-card">
                <div class="dev-metric-label">Memory Used</div>
                <div class="dev-metric-value">${this.formatBytes(memory)}</div>
            </div>
            <div class="dev-metric-card">
                <div class="dev-metric-label">FPS (approx)</div>
                <div class="dev-metric-value">${fps}</div>
            </div>
            <div class="dev-metric-card">
                <div class="dev-metric-label">localStorage Size</div>
                <div class="dev-metric-value">${this.getStorageSize()}</div>
            </div>
            <div class="dev-metric-card">
                <div class="dev-metric-label">Viewport</div>
                <div class="dev-metric-value">${window.innerWidth}x${window.innerHeight}</div>
            </div>
        `;

        perfEl.innerHTML = metricsHTML;
    }

    resetMetrics() {
        this.performanceMetrics = {
            startTime: performance.now(),
            renders: 0,
            stateChanges: 0,
            lastUpdate: Date.now()
        };
        this.updatePerformanceMetrics();
        this.log('Performance metrics reset', 'success');
    }

    // Quick Actions
    addMoney(amount) {
        store.addSchuelling(amount);
        this.log(`Added ${amount} Schülling to wallet`, 'success');
    }

    resetWallet() {
        const state = store.getState();
        state.wallet = 0;
        store.setState(state);
        this.log('Wallet reset to 0', 'warning');
    }

    completeGame() {
        store.updateGameStats('capitals', true, 100);
        this.log('Game completed with 100 points', 'success');
    }

    resetStats() {
        if (confirm('Reset all game statistics?')) {
            const state = store.getState();
            state.stats = {
                capitals: { played: 0, won: 0, highscore: 0 },
                population: { played: 0, won: 0, highscore: 0 }
            };
            store.setState(state);
            this.log('All stats reset', 'warning');
        }
    }

    toggleTheme() {
        const currentTheme = store.getSetting('theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        store.updateSetting('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        this.log(`Theme set to ${theme}`, 'success');
    }

    hardReset() {
        if (confirm('⚠️ HARD RESET: This will delete ALL data and reload the app. Continue?')) {
            localStorage.clear();
            sessionStorage.clear();
            this.log('Hard reset initiated...', 'error');
            setTimeout(() => location.reload(), 500);
        }
    }

    testModal() {
        // Dispatch custom event for modal test
        window.dispatchEvent(new CustomEvent('dev-test-modal', {
            detail: { message: 'This is a test modal from DevTools!' }
        }));
        this.log('Test modal triggered', 'success');
    }

    testNotification() {
        this.log('Test notification triggered', 'success');
        alert('🎮 Test Notification from DevTools!');
    }

    setViewport(width) {
        // This is a visual hint, actual resize depends on browser
        this.log(`Viewport hint: ${width}px (resize browser window manually)`, 'success');
        console.log(`💡 Tip: Open DevTools (F12) → Toggle Device Toolbar (Ctrl+Shift+M) → Set width to ${width}px`);
    }

    // Helper Methods
    formatUptime(ms) {
        const seconds = Math.floor(ms / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    calculateFPS() {
        // Simplified FPS calculation
        return '60'; // Placeholder - real FPS monitoring is complex
    }

    getStorageSize() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return this.formatBytes(total);
    }
}

// Auto-initialize in development
export function initDevTools() {
    // Check if in development mode
    const isDev = location.hostname === 'localhost' || 
                  location.hostname === '127.0.0.1' ||
                  location.hostname.includes('127.0.0.1') ||
                  location.hostname.includes('gitpod') ||
                  location.hostname.includes('codespaces') ||
                  location.hostname.includes('github.dev') ||
                  location.search.includes('dev=true') ||
                  location.protocol === 'file:';

    if (isDev) {
        window.devTools = new DevTools();
        console.log('🛠️ DevTools loaded! Press Ctrl+Shift+D to open.');
    } else {
        console.log('ℹ️ DevTools disabled in production. Add ?dev=true to enable.');
    }
}
