/* ==========================================
   UI.JS - UI Components & Notifications
   ========================================== */

export class UI {
    constructor(store) {
        this.store = store;
        this.notificationQueue = [];
        this.localStorageEventsEnabled = false;
        this.originalLocalStorage = { ...localStorage };
        this.initLocalStorageTracking();
    }

    init() {
        console.log('🎨 UI initialisiert');
    }

    showNotificationWithHTML(html, type = 'info') {
        // Verwende cached settings um infinite loop zu vermeiden
        if (this.isTrackingLS) return;
        
        const settings = this.cachedSettings || this.store.getSettings();
        const notifications = settings.notifications || {};
        
        // Prüfe ob Benachrichtigungen aktiviert sind
        if (notifications.enabled === false) return;
        
        // Prüfe ob dieser Typ aktiviert ist
        if (notifications.types && notifications.types[type] === false) return;
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = html;
        
        this.displayNotification(notification, notifications, type);
    }
    
    showNotification(message, type = 'info') {
        // Prüfe Benachrichtigungs-Einstellungen
        const settings = this.cachedSettings || this.store.getSettings();
        const notifications = settings.notifications || {};
        
        // Prüfe ob Benachrichtigungen aktiviert sind
        if (notifications.enabled === false) return;
        
        // Prüfe ob dieser Typ aktiviert ist
        if (notifications.types && notifications.types[type] === false) return;
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Bestimme Position
        const position = notifications.position || 'bottom-right';
        let positionStyles = '';
        
        switch (position) {
            case 'top-right':
                positionStyles = 'top: 20px; right: 20px;';
                break;
            case 'top-left':
                positionStyles = 'top: 20px; left: 20px;';
                break;
            case 'bottom-left':
                positionStyles = 'bottom: 20px; left: 20px;';
                break;
            case 'top-center':
                positionStyles = 'top: 20px; left: 50%; transform: translateX(-50%);';
                break;
            case 'bottom-center':
                positionStyles = 'bottom: 20px; left: 50%; transform: translateX(-50%);';
                break;
            default: // bottom-right
                positionStyles = 'bottom: 20px; right: 20px;';
        }
        
        // Berechne vertikale Position basierend auf vorhandenen Benachrichtigungen
        const existingNotifications = document.querySelectorAll('.notification');
        const notificationHeight = 80;
        let offset = 0;
        
        if (position.includes('top')) {
            offset = existingNotifications.length * notificationHeight;
        } else {
            offset = -(existingNotifications.length * notificationHeight);
        }
        
        this.displayNotification(notification, notifications, type);
    }
    
    displayNotification(notification, notifications, type) {
        const position = notifications.position || 'bottom-right';
        let positionStyles = '';
        
        switch (position) {
            case 'top-right':
                positionStyles = 'top: 20px; right: 20px;';
                break;
            case 'top-left':
                positionStyles = 'top: 20px; left: 20px;';
                break;
            case 'bottom-left':
                positionStyles = 'bottom: 20px; left: 20px;';
                break;
            case 'top-center':
                positionStyles = 'top: 20px; left: 50%; transform: translateX(-50%);';
                break;
            case 'bottom-center':
                positionStyles = 'bottom: 20px; left: 50%; transform: translateX(-50%);';
                break;
            default: // bottom-right
                positionStyles = 'bottom: 20px; right: 20px;';
        }
        
        const existingNotifications = document.querySelectorAll('.notification');
        const notificationHeight = 80;
        let offset = 0;
        
        if (position.includes('top')) {
            offset = existingNotifications.length * notificationHeight;
        } else {
            offset = -(existingNotifications.length * notificationHeight);
        }
        
        notification.style.cssText = `
            position: fixed;
            ${positionStyles}
            ${position.includes('top') ? `top: ${20 + offset}px;` : `bottom: ${20 - offset}px;`}
            background: var(--bg-card);
            border: 2px solid var(--${type === 'error' ? 'accent' : type === 'success' ? 'primary' : type === 'warning' ? 'warning' : 'secondary'});
            border-radius: var(--radius-md);
            padding: 1rem 1.5rem;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideIn${position.includes('right') ? 'Right' : position.includes('left') ? 'Left' : 'Down'} 0.3s ease-out;
            max-width: 300px;
            pointer-events: none;
        `;
        
        document.body.appendChild(notification);
        
        // Speichere in Historie (nur wenn nicht schon im tracking)
        if (!this.isTrackingLS) {
            const message = notification.textContent || notification.innerText;
            this.saveNotificationToHistory(message, type);
        }
        
        // Bestimme Dauer
        const duration = (notifications.duration || 3) * 1000;
        
        // Entferne Benachrichtigung nach Timeout
        setTimeout(() => {
            notification.style.animation = `slideOut${position.includes('right') ? 'Right' : position.includes('left') ? 'Left' : 'Up'} 0.3s ease-in`;
            setTimeout(() => {
                notification.remove();
                this.adjustNotificationPositions(position);
            }, 300);
        }, duration);
    }

    adjustNotificationPositions(position = 'bottom-right') {
        const notifications = document.querySelectorAll('.notification');
        const notificationHeight = 80;
        
        notifications.forEach((notification, index) => {
            let offset = 0;
            
            if (position.includes('top')) {
                offset = index * notificationHeight;
                notification.style.top = `${20 + offset}px`;
            } else {
                offset = index * notificationHeight;
                notification.style.bottom = `${20 + offset}px`;
            }
        });
    }

    saveNotificationToHistory(message, type) {
        try {
            const history = JSON.parse(localStorage.getItem('notificationHistory') || '[]');
            history.push({
                message,
                type,
                timestamp: new Date().toISOString()
            });
            
            // Behalte nur die letzten 100 Einträge
            if (history.length > 100) {
                history.splice(0, history.length - 100);
            }
            
            localStorage.setItem('notificationHistory', JSON.stringify(history));
        } catch (error) {
            console.warn('Failed to save notification to history:', error);
        }
    }

    showModal(title, content, buttons = []) {
        const modal = document.createElement('div');
        modal.className = 'modal-backdrop';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
                <div class="modal-footer">
                    ${buttons.map(btn => `
                        <button class="btn btn-${btn.type || 'secondary'}" data-action="${btn.action}">
                            ${btn.label}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            animation: fadeIn 0.3s ease-out;
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        buttons.forEach(btn => {
            modal.querySelector(`[data-action="${btn.action}"]`).addEventListener('click', () => {
                if (btn.callback) btn.callback();
                modal.remove();
            });
        });
    }

    initLocalStorageTracking() {
        // Überschreibe localStorage Methoden um Events zu tracken
        const self = this;
        this.isTrackingLS = false; // Verhindere rekursive Aufrufe
        
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            const oldValue = localStorage.getItem(key);
            try {
                originalSetItem.call(this, key, value);
                self.trackLocalStorageEvent('schreiben', key, true, oldValue, value);
            } catch (error) {
                self.trackLocalStorageEvent('schreiben', key, false, oldValue, value, error.message);
                throw error;
            }
        };
        
        const originalGetItem = localStorage.getItem;
        localStorage.getItem = function(key) {
            try {
                const result = originalGetItem.call(this, key);
                self.trackLocalStorageEvent('lesen', key, true, null, result);
                return result;
            } catch (error) {
                self.trackLocalStorageEvent('lesen', key, false, null, null, error.message);
                throw error;
            }
        };
        
        const originalRemoveItem = localStorage.removeItem;
        localStorage.removeItem = function(key) {
            const oldValue = localStorage.getItem(key);
            try {
                originalRemoveItem.call(this, key);
                self.trackLocalStorageEvent('löschen', key, true, oldValue, null);
            } catch (error) {
                self.trackLocalStorageEvent('löschen', key, false, oldValue, null, error.message);
                throw error;
            }
        };
        
        const originalClear = localStorage.clear;
        localStorage.clear = function() {
            try {
                originalClear.call(this);
                self.trackLocalStorageEvent('leeren', 'all', true, null, null);
            } catch (error) {
                self.trackLocalStorageEvent('leeren', 'all', false, null, null, error.message);
                throw error;
            }
        };
    }

    trackLocalStorageEvent(operation, key, success, oldValue = null, newValue = null, errorMessage = null) {
        if (!this.localStorageEventsEnabled || this.isTrackingLS) return;
        
        // Verhindere Tracking während wir tracken (verhindert infinite loop)
        this.isTrackingLS = true;
        
        try {
            let message = `local storage event - Type: ${operation}`;
            
            // Zweite Zeile mit Variable und Werten
            if (key !== 'all') {
                message += `<br><span style="font-size: 0.85em; color: var(--text-muted);">${key}: `;
                
                if (operation === 'schreiben' && oldValue !== null) {
                    message += `<span style="color: #ff4444;">${this.truncateValue(oldValue)}</span> → `;
                    message += `<span style="color: #00ff88;">${this.truncateValue(newValue)}</span>`;
                } else if (operation === 'lesen') {
                    message += `<span style="color: #00f0ff;">${this.truncateValue(newValue)}</span>`;
                } else if (operation === 'löschen') {
                    message += `<span style="color: #ff4444;">${this.truncateValue(oldValue)}</span>`;
                }
                
                message += `</span>`;
            }
            
            const type = success ? 'info' : 'error';
            
            if (!success && errorMessage) {
                this.showNotificationWithHTML(`${message}<br><span style="color: var(--accent);">Fehler: ${errorMessage}</span>`, type);
            } else {
                this.showNotificationWithHTML(message, type);
            }
        } finally {
            this.isTrackingLS = false;
        }
    }
    
    truncateValue(value) {
        if (value === null || value === undefined) return 'null';
        const str = String(value);
        return str.length > 30 ? str.substring(0, 30) + '...' : str;
    }

    enableLocalStorageEvents(enabled) {
        this.localStorageEventsEnabled = enabled;
    }

    syncSettings() {
        // Synchronisiere Einstellungen beim Laden der Seite
        this.isTrackingLS = true; // Verhindere Tracking während Sync
        const settings = this.store.getSettings();
        this.cachedSettings = settings; // Cache für spätere Verwendung
        this.isTrackingLS = false;
        
        this.enableLocalStorageEvents(settings.notifications?.types?.localstorage === true);
        
        // Zeige Synchronisations-Benachrichtigung
        setTimeout(() => {
            this.showNotification('Einstellungen erfolgreich synchronisiert', 'success');
        }, 100);
    }
}
