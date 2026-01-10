/* ==========================================
   UI.JS - UI Helper Functions
   ========================================== */

export class UI {
    constructor(store) {
        this.store = store;
    }

    init() {
        console.log('🎨 UI initialisiert');
        this.updateWallet();
    }

    updateWallet() {
        const walletDisplay = document.getElementById('walletDisplay');
        if (walletDisplay) {
            walletDisplay.textContent = this.store.getWallet().toLocaleString('de-DE');
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: calc(var(--header-height) + 1rem);
            right: 1rem;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'var(--primary)' : 'var(--accent)'};
            color: var(--bg-primary);
            border-radius: var(--radius-md);
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            box-shadow: var(--shadow-lg);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showModal(content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <button class="modal-close">&times;</button>
                <div class="modal-content">
                    ${content}
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
            z-index: 1000;
            animation: fadeIn 0.2s ease-out;
        `;

        const modalBox = modal.querySelector('.modal');
        modalBox.style.cssText = `
            background: var(--bg-card);
            border: 1px solid rgba(0, 255, 136, 0.2);
            border-radius: var(--radius-lg);
            padding: var(--spacing-lg);
            max-width: 90%;
            max-height: 90%;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.3s ease-out;
        `;

        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 36px;
            height: 36px;
            background: transparent;
            border: 1px solid rgba(0, 255, 136, 0.2);
            border-radius: 50%;
            color: var(--primary);
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.2s ease-in';
            setTimeout(() => modal.remove(), 200);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeBtn.click();
            }
        });

        document.body.appendChild(modal);
        return modal;
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
