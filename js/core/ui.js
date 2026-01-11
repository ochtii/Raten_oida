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
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Berechne vertikale Position basierend auf vorhandenen Benachrichtigungen
        const existingNotifications = document.querySelectorAll('.notification');
        const baseTop = 20;
        const notificationHeight = 80; // Geschätzte Höhe inkl. Padding
        const top = baseTop + (existingNotifications.length * notificationHeight);
        
        notification.style.cssText = `
            position: fixed;
            top: ${top}px;
            right: 20px;
            background: var(--bg-card);
            border: 2px solid var(--${type === 'error' ? 'accent' : type === 'success' ? 'primary' : type === 'warning' ? 'warning' : 'secondary'});
            border-radius: var(--radius-md);
            padding: 1rem 1.5rem;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            pointer-events: none;
        `;
        
        document.body.appendChild(notification);
        
        // Entferne Benachrichtigung nach Timeout
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
                // Verschiebe verbleibende Benachrichtigungen nach oben
                this.adjustNotificationPositions();
            }, 300);
        }, 3000);
    }

    adjustNotificationPositions() {
        const notifications = document.querySelectorAll('.notification');
        const baseTop = 20;
        const notificationHeight = 80;
        
        notifications.forEach((notification, index) => {
            notification.style.top = `${baseTop + (index * notificationHeight)}px`;
        });
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
