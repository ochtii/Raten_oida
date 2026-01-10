/* ========================================
   NAVIGATION.JS - Sandwich Menu & Bottom Nav Logic
   ======================================== */

import { $, toggleClass } from '../core/dom.js';
import { store } from '../core/store.js';

export class Navigation {
    constructor() {
        this.sandwichBtn = $('#sandwich-btn');
        this.sandwichMenu = $('#sandwich-menu');
        this.closeBtn = $('#close-sandwich');
        this.menuWallet = $('#menu-wallet');
        
        this.init();
    }

    init() {
        // Sandwich Button Click
        this.sandwichBtn?.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close Button Click
        this.closeBtn?.addEventListener('click', () => {
            this.closeMenu();
        });

        // Click außerhalb des Menüs
        this.sandwichMenu?.addEventListener('click', (e) => {
            if (e.target === this.sandwichMenu) {
                this.closeMenu();
            }
        });

        // ESC Taste
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sandwichMenu?.classList.contains('open')) {
                this.closeMenu();
            }
        });

        // Wallet Observer
        store.subscribe(() => {
            this.updateWallet();
        });

        // Initial Wallet Update
        this.updateWallet();
    }

    toggleMenu() {
        this.sandwichMenu?.classList.toggle('open');
        this.sandwichBtn?.classList.toggle('active');

        // Body Scroll verhindern wenn Menü offen
        if (this.sandwichMenu?.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    openMenu() {
        this.sandwichMenu?.classList.add('open');
        this.sandwichBtn?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.sandwichMenu?.classList.remove('open');
        this.sandwichBtn?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    updateWallet() {
        const wallet = store.getWallet();
        if (this.menuWallet) {
            this.menuWallet.textContent = wallet.toLocaleString('de-AT');
        }
    }
}
