/* ==========================================
   DEBUG CONSOLE - Togglebare Debug-Konsole
   ========================================== */

export class DebugConsole {
    constructor() {
        this.isVisible = false;
        this.position = 'bottom';
        this.height = 300;
        this.isLocked = false;
        this.isMinimized = false;
        this.logs = [];
        this.maxLogs = 100;
        this.container = null;
        this.theme = localStorage.getItem('debugTheme') || 'default';
        
        // Original console methods
        this.originalLog = console.log;
        this.originalError = console.error;
        this.originalWarn = console.warn;
        this.originalInfo = console.info;
    }

    init() {
        // Load saved state from localStorage
        this.loadState();
        
        this.createConsole();
        this.interceptConsoleLogs();
        this.setupEventListeners();
        
        // Apply saved visibility state
        if (this.isVisible) {
            this.show();
        }
        
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
            <div id="debugConsole" class="debug-console ${this.position} ${this.isMinimized ? 'minimized' : ''}" data-debug-theme="${this.theme}">
                <div class="debug-header">
                    <div class="debug-header-left">
                        <span class="debug-title">🐛 Debug Console</span>
                        <button class="debug-btn" id="debugClear" title="Clear">🗑️</button>
                        <button class="debug-btn" id="debugTheme" title="Theme: ${this.theme}">
                            ${this.theme === 'matrix' ? '🟢' : this.theme === 'hacker' ? '🔴' : '🎨'}
                        </button>
                    </div>
                    <div class="debug-header-right">
                        <button class="debug-btn" id="debugMinimize" title="Minimize Header">
                            ${this.isMinimized ? '📐' : '📏'}
                        </button>
                        <button class="debug-btn" id="debugPosition" title="Position">
                            ${this.position === 'bottom' ? '⬆️' : '⬇️'}
                        </button>
                        <button class="debug-btn ${this.isLocked ? 'active' : ''}" id="debugLock" title="Lock">
                            ${this.isLocked ? '🔒' : '🔓'}
                        </button>
                        <button class="debug-btn" id="debugClose" title="Close">✖️</button>
                    </div>
                </div>
                <div class="debug-resize-handle" id="debugResizeHandle">
                    <div class="resize-indicator"></div>
                </div>
                <div class="debug-content" id="debugContent">
                    <div class="debug-welcome">Debug Console bereit. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> zum Toggle.</div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
        this.container = document.getElementById('debugConsole');
        this.container.style.height = `${this.height}px`;
    }

    setupEventListeners() {
        document.getElementById('debugClose')?.addEventListener('click', () => this.hide());
        document.getElementById('debugClear')?.addEventListener('click', () => this.clear());
        document.getElementById('debugPosition')?.addEventListener('click', () => this.togglePosition());
        document.getElementById('debugLock')?.addEventListener('click', () => this.toggleLock());
        document.getElementById('debugMinimize')?.addEventListener('click', () => this.toggleMinimize());
        document.getElementById('debugTheme')?.addEventListener('click', () => this.toggleTheme());

        // Resize
        const resizeHandle = document.getElementById('debugResizeHandle');
        let isResizing = false;
        let startY = 0;
        let startHeight = 0;

        resizeHandle?.addEventListener('mousedown', (e) => {
            if (this.isLocked) return;
            isResizing = true;
            startY = e.clientY;
            startHeight = this.height;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing || this.isLocked) return;
            const deltaY = this.position === 'bottom' ? startY - e.clientY : e.clientY - startY;
            this.height = Math.max(150, Math.min(window.innerHeight - 100, startHeight + deltaY));
            this.container.style.height = `${this.height}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isResizing) {
                this.saveState();
            }
            isResizing = false;
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

        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        this.render();
    }

    render() {
        const content = document.getElementById('debugContent');
        if (!content) return;

        if (this.logs.length === 0) {
            content.innerHTML = '<div class="debug-welcome">Keine Logs. Console-Ausgaben erscheinen hier.</div>';
            return;
        }

        content.innerHTML = this.logs.map(log => `
            <div class="debug-log ${log.type}">
                <span class="debug-timestamp">[${log.timestamp}]</span>
                <span class="debug-message">${this.escapeHtml(log.message)}</span>
            </div>
        `).join('');

        content.scrollTop = content.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    toggle() {
        this.isVisible ? this.hide() : this.show();
    }

    show() {
        this.isVisible = true;
        this.container?.classList.add('visible');
        document.body.classList.add('debug-console-visible');
        this.saveState();
    }

    hide() {
        this.isVisible = false;
        this.container?.classList.remove('visible');
        document.body.classList.remove('debug-console-visible');
        this.saveState();
    }

    clear() {
        this.logs = [];
        this.render();
    }

    togglePosition() {
        this.position = this.position === 'bottom' ? 'top' : 'bottom';
        this.container?.classList.remove('top', 'bottom');
        this.container?.classList.add(this.position);
        document.getElementById('debugPosition').textContent = this.position === 'bottom' ? '⬆️' : '⬇️';
        this.saveState();
    }

    toggleLock() {
        this.isLocked = !this.isLocked;
        this.container?.classList.toggle('locked', this.isLocked);
        const lockBtn = document.getElementById('debugLock');
        lockBtn.textContent = this.isLocked ? '🔒' : '🔓';
        lockBtn.classList.toggle('active', this.isLocked);
        this.saveState();
    }

    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        this.container?.classList.toggle('minimized', this.isMinimized);
        const minimizeBtn = document.getElementById('debugMinimize');
        minimizeBtn.textContent = this.isMinimized ? '📐' : '📏';
        this.saveState();
    }

    toggleTheme() {
        const themes = ['default', 'matrix', 'hacker'];
        const currentIndex = themes.indexOf(this.theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.theme = themes[nextIndex];
        
        // Update attribute
        this.container?.setAttribute('data-debug-theme', this.theme);
        
        // Save to localStorage
        localStorage.setItem('debugTheme', this.theme);
        
        // Update button
        const btn = document.getElementById('debugTheme');
        if (btn) {
            const icons = { default: '🎨', matrix: '🟢', hacker: '🔴' };
            btn.innerHTML = icons[this.theme];
            btn.title = `Theme: ${this.theme}`;
        }
        
        this.log('info', `Debug Console Theme: ${this.theme}`);
    }

    loadState() {
        try {
            const state = JSON.parse(localStorage.getItem('debugConsoleState') || '{}');
            this.isVisible = state.isVisible || false;
            this.position = state.position || 'bottom';
            this.height = state.height || 300;
            this.isLocked = state.isLocked || false;
            this.isMinimized = state.isMinimized || false;
        } catch (error) {
            console.warn('Failed to load debug console state:', error);
        }
    }

    saveState() {
        try {
            const state = {
                isVisible: this.isVisible,
                position: this.position,
                height: this.height,
                isLocked: this.isLocked,
                isMinimized: this.isMinimized
            };
            localStorage.setItem('debugConsoleState', JSON.stringify(state));
        } catch (error) {
            console.warn('Failed to save debug console state:', error);
        }
    }
}
