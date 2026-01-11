/* ==========================================
   UI.JS - UI Components & Notifications
   ========================================== */

export class UI {
    constructor(store) {
        this.store = store;
        this.notificationQueue = [];
    }

    init() {
        console.log('🎨 UI initialisiert');
    }

    showNotification(message, type = 'info') {
        // Prüfe Benachrichtigungs-Einstellungen
        const settings = this.store.getSettings();
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
        
        // Speichere in Historie
        this.saveNotificationToHistory(message, type);
        
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
}
