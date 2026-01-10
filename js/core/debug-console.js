/* ==========================================
   DEBUG CONSOLE - Togglebare Debug-Konsole
   ========================================== */

export class DebugConsole {
    constructor() {
        this.isVisible = false;
        this.position = 'bottom'; // 'top' oder 'bottom'
        this.height = 300;
        this.isLocked = false;
        this.logs = [];
        this.maxLogs = 100;
        this.container = null;
        
        // Original console methods überschreiben
        this.originalLog = console.log;
        this.originalError = console.error;
        this.originalWarn = console.warn;
        this.originalInfo = console.info;
    }

    init() {
        this.createConsole();
        this.interceptConsoleLogs();
        this.setupEventListeners();
        
        // Keyboard shortcut: Ctrl + Shift + D
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    createConsole() {
        const html = `
            <div id="debugConsole" class="debug-console ${this.position}">
                <div class="debug-header">
                    <div class="debug-header-left">
                        <span class="debug-title">🐛 Debug Console</span>
                        <button class="debug-btn" id="debugClear" title="Clear Console">🗑️</button>
                    </div>
                    <div class="debug-header-right">
                        <button class="debug-btn" id="debugPosition" title="Position wechseln">
                            ${this.position === 'bottom' ? '⬆️' : '⬇️'}
                        </button>
                        <button class="debug-btn ${this.isLocked ? 'active' : ''}" id="debugLock" title="Höhe sperren">
                            ${this.isLocked ? '🔒' : '🔓'}
                        </button>
                        <button class="debug-btn" id="debugClose" title="Schließen">✖️</button>
                    </div>
                </div>
                <div class="debug-resize-handle" id="debugResizeHandle">
                    <div class="resize-indicator"></div>
                </div>
                <div class="debug-content" id="debugContent">
                    <div class="debug-welcome">
                        Debug Console bereit. Drücke <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd> zum Toggle.
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
        this.container = document.getElementById('debugConsole');
        this.container.style.height = `${this.height}px`;
        
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .debug-console {
                position: fixed;
                left: 0;
                right: 0;
                width: 100%;
                background: rgba(10, 14, 39, 0.98);
                border: 2px solid var(--primary);
                box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
                z-index: 10000;
                display: none;
                flex-direction: column;
                font-family: 'Courier New', monospace;
                backdrop-filter: blur(10px);
            }

            .debug-console.visible {
                display: flex;
            }

            .debug-console.top {
                top: 0;
                border-bottom: 2px solid var(--primary);
                border-top: none;
            }

            .debug-console.bottom {
                bottom: 0;
                border-top: 2px solid var(--primary);
                border-bottom: none;
            }

            .debug-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem 1rem;
                background: linear-gradient(135deg, var(--primary-dark), var(--bg-secondary));
                border-bottom: 1px solid var(--primary);
                user-select: none;
            }

            .debug-console.top .debug-header {
                border-bottom: 1px solid var(--primary);
                border-top: none;
            }

            .debug-console.bottom .debug-header {
                border-top: 1px solid var(--primary);
                border-bottom: none;
                order: -1;
            }

            .debug-header-left,
            .debug-header-right {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .debug-title {
                font-weight: bold;
                color: var(--primary);
                font-size: 0.875rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .debug-btn {
                background: transparent;
                border: 1px solid var(--primary);
                color: var(--primary);
                cursor: pointer;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 1rem;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 32px;
                height: 32px;
            }

            .debug-btn:hover {
                background: var(--primary);
                color: var(--bg-primary);
                box-shadow: 0 0 10px var(--primary);
            }

            .debug-btn.active {
                background: var(--primary);
                color: var(--bg-primary);
            }

            .debug-resize-handle {
                height: 8px;
                background: linear-gradient(to bottom, transparent, var(--primary-dark));
                cursor: ns-resize;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .debug-console.bottom .debug-resize-handle {
                order: -2;
                background: linear-gradient(to top, transparent, var(--primary-dark));
            }

            .debug-console.locked .debug-resize-handle {
                cursor: not-allowed;
                opacity: 0.5;
            }

            .resize-indicator {
                width: 40px;
                height: 3px;
                background: var(--primary);
                border-radius: 2px;
                opacity: 0.5;
            }

            .debug-content {
                flex: 1;
                overflow-y: auto;
                padding: 0.5rem;
                color: var(--text-primary);
                font-size: 0.875rem;
                line-height: 1.4;
            }

            .debug-log {
                padding: 0.25rem 0.5rem;
                border-left: 3px solid transparent;
                margin-bottom: 2px;
                word-wrap: break-word;
                font-family: 'Courier New', monospace;
            }

            .debug-log.log {
                border-left-color: var(--text-secondary);
                color: var(--text-primary);
            }

            .debug-log.error {
                border-left-color: var(--error);
                color: var(--error);
                background: rgba(255, 0, 100, 0.1);
            }

            .debug-log.warn {
                border-left-color: #ffa500;
                color: #ffa500;
                background: rgba(255, 165, 0, 0.1);
            }

            .debug-log.info {
                border-left-color: var(--accent);
                color: var(--accent);
                background: rgba(255, 0, 255, 0.1);
            }

            .debug-timestamp {
                color: var(--text-secondary);
                font-size: 0.75rem;
                margin-right: 0.5rem;
            }

            .debug-welcome {
                text-align: center;
                padding: 2rem;
                color: var(--text-secondary);
                font-style: italic;
            }

            .debug-welcome kbd {
                background: var(--bg-secondary);
                border: 1px solid var(--primary);
                border-radius: 3px;
                padding: 2px 6px;
                font-family: 'Courier New', monospace;
                color: var(--primary);
                font-size: 0.875rem;
            }

            @media (max-width: 640px) {
                .debug-console {
                    font-size: 0.75rem;
                }

                .debug-title {
                    font-size: 0.75rem;
                }

                .debug-btn {
                    min-width: 28px;
                    height: 28px;
                    font-size: 0.875rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        const closeBtn = document.getElementById('debugClose');
        const clearBtn = document.getElementById('debugClear');
        const positionBtn = document.getElementById('debugPosition');
        const lockBtn = document.getElementById('debugLock');
        const resizeHandle = document.getElementById('debugResizeHandle');

        closeBtn?.addEventListener('click', () => this.hide());
        clearBtn?.addEventListener('click', () => this.clear());
        positionBtn?.addEventListener('click', () => this.togglePosition());
        lockBtn?.addEventListener('click', () => this.toggleLock());

        // Resize functionality
        let isResizing = false;
        let startY = 0;
        let startHeight = 0;

        resizeHandle?.addEventListener('mousedown', (e) => {
            if (this.isLocked) return;
            isResizing = true;
            startY = e.clientY;
            startHeight = this.height;
            document.body.style.cursor = 'ns-resize';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing || this.isLocked) return;

            const deltaY = this.position === 'bottom' 
                ? startY - e.clientY 
                : e.clientY - startY;
            
            this.height = Math.max(150, Math.min(window.innerHeight - 100, startHeight + deltaY));
            this.container.style.height = `${this.height}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                document.body.style.cursor = '';
            }
        });
    }

    interceptConsoleLogs() {
        const self = this;

        console.log = function(...args) {
            self.originalLog.apply(console, args);
            self.addLog('log', args);
        };

        console.error = function(...args) {
            self.originalError.apply(console, args);
            self.addLog('error', args);
        };

        console.warn = function(...args) {
            self.originalWarn.apply(console, args);
            self.addLog('warn', args);
        };

        console.info = function(...args) {
            self.originalInfo.apply(console, args);
            self.addLog('info', args);
        };
    }

    addLog(type, args) {
        const timestamp = new Date().toLocaleTimeString('de-DE', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            fractionalSecondDigits: 3
        });

        const message = args.map(arg => {
            if (typeof arg === 'object') {
                try {
                    return JSON.stringify(arg, null, 2);
                } catch (e) {
                    return String(arg);
                }
            }
            return String(arg);
        }).join(' ');

        this.logs.push({ type, message, timestamp });

        // Limit logs
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        this.render();
    }

    render() {
        const content = document.getElementById('debugContent');
        if (!content) return;

        if (this.logs.length === 0) {
            content.innerHTML = `
                <div class="debug-welcome">
                    Keine Logs vorhanden. Console Ausgaben erscheinen hier.
                </div>
            `;
            return;
        }

        content.innerHTML = this.logs.map(log => `
            <div class="debug-log ${log.type}">
                <span class="debug-timestamp">[${log.timestamp}]</span>
                <span class="debug-message">${this.escapeHtml(log.message)}</span>
            </div>
        `).join('');

        // Auto-scroll to bottom
        content.scrollTop = content.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        this.isVisible = true;
        this.container?.classList.add('visible');
    }

    hide() {
        this.isVisible = false;
        this.container?.classList.remove('visible');
    }

    clear() {
        this.logs = [];
        this.render();
    }

    togglePosition() {
        this.position = this.position === 'bottom' ? 'top' : 'bottom';
        this.container?.classList.remove('top', 'bottom');
        this.container?.classList.add(this.position);
        
        const positionBtn = document.getElementById('debugPosition');
        if (positionBtn) {
            positionBtn.textContent = this.position === 'bottom' ? '⬆️' : '⬇️';
        }
    }

    toggleLock() {
        this.isLocked = !this.isLocked;
        this.container?.classList.toggle('locked', this.isLocked);
        
        const lockBtn = document.getElementById('debugLock');
        if (lockBtn) {
            lockBtn.textContent = this.isLocked ? '🔒' : '🔓';
            lockBtn.classList.toggle('active', this.isLocked);
        }
    }
}
