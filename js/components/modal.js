/* ========================================
   MODAL.JS - Modal/Dialog System
   ======================================== */

import { $, render, htmlToElement } from '../core/dom.js';

export class Modal {
    constructor() {
        this.container = $('#modal-container');
        this.currentModal = null;
    }

    // Modal öffnen
    open(options) {
        const {
            title = 'Dialog',
            content = '',
            buttons = [],
            onClose = null
        } = options;

        const modalHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2 class="modal-title">${title}</h2>
                    <button class="modal-close" data-modal-close>&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${buttons.length > 0 ? `
                    <div class="modal-footer">
                        ${buttons.map(btn => `
                            <button 
                                class="btn ${btn.class || 'btn-outline'}" 
                                data-modal-action="${btn.action || ''}"
                            >
                                ${btn.text}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;

        render(this.container, modalHTML);
        this.container.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Event Listener
        this.setupEventListeners(buttons, onClose);

        return this;
    }

    setupEventListeners(buttons, onClose) {
        // Close Button
        const closeBtn = $('.modal-close', this.container);
        closeBtn?.addEventListener('click', () => {
            this.close();
            if (onClose) onClose();
        });

        // Click außerhalb Modal
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.close();
                if (onClose) onClose();
            }
        });

        // Button Actions
        buttons.forEach(btn => {
            if (btn.action) {
                const buttonEl = $(`[data-modal-action="${btn.action}"]`, this.container);
                buttonEl?.addEventListener('click', () => {
                    if (btn.onClick) {
                        btn.onClick();
                    }
                    if (btn.closeOnClick !== false) {
                        this.close();
                    }
                });
            }
        });

        // ESC Taste
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
                if (onClose) onClose();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    // Modal schließen
    close() {
        this.container.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => {
            this.container.innerHTML = '';
        }, 300);
    }

    // Confirm Dialog
    confirm(options) {
        return new Promise((resolve) => {
            this.open({
                title: options.title || 'Bestätigung',
                content: options.message || 'Bist du sicher?',
                buttons: [
                    {
                        text: options.cancelText || 'Abbrechen',
                        class: 'btn-outline',
                        action: 'cancel',
                        onClick: () => resolve(false)
                    },
                    {
                        text: options.confirmText || 'Bestätigen',
                        class: 'btn-primary',
                        action: 'confirm',
                        onClick: () => resolve(true)
                    }
                ]
            });
        });
    }

    // Alert Dialog
    alert(options) {
        return new Promise((resolve) => {
            this.open({
                title: options.title || 'Hinweis',
                content: options.message || '',
                buttons: [
                    {
                        text: options.buttonText || 'OK',
                        class: 'btn-primary',
                        action: 'ok',
                        onClick: () => resolve()
                    }
                ]
            });
        });
    }

    // Custom Input Modal
    prompt(options) {
        return new Promise((resolve) => {
            const inputId = 'modal-prompt-input';
            this.open({
                title: options.title || 'Eingabe',
                content: `
                    <p class="mb-md">${options.message || ''}</p>
                    <input 
                        type="text" 
                        id="${inputId}"
                        class="w-full p-md rounded border text-primary"
                        style="background: var(--bg-tertiary); border-color: var(--border-color);"
                        placeholder="${options.placeholder || ''}"
                        value="${options.defaultValue || ''}"
                    />
                `,
                buttons: [
                    {
                        text: options.cancelText || 'Abbrechen',
                        class: 'btn-outline',
                        action: 'cancel',
                        onClick: () => resolve(null)
                    },
                    {
                        text: options.confirmText || 'OK',
                        class: 'btn-primary',
                        action: 'confirm',
                        onClick: () => {
                            const input = $(`#${inputId}`);
                            resolve(input?.value || '');
                        }
                    }
                ]
            });

            // Focus auf Input
            setTimeout(() => {
                $(`#${inputId}`)?.focus();
            }, 100);
        });
    }
}

// Singleton Instance
export const modal = new Modal();
