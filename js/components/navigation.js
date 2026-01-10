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
        const overlay = $('#nav-overlay');
        this.sandwichMenu?.classList.toggle('open');
        this.sandwichBtn?.classList.toggle('active');
        overlay?.classList.toggle('active');

        // WICHTIG: Body Scroll Management mit classList statt style
        if (this.sandwichMenu?.classList.contains('open')) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }

    openMenu() {
        const overlay = $('#nav-overlay');
        this.sandwichMenu?.classList.add('open');
        this.sandwichBtn?.classList.add('active');
        overlay?.classList.add('active');
        document.body.classList.add('menu-open');
    }

    closeMenu() {
        const overlay = $('#nav-overlay');
        this.sandwichMenu?.classList.remove('open');
        this.sandwichBtn?.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    updateWallet() {
        const wallet = store.getWallet();
        if (this.menuWallet) {
            this.menuWallet.textContent = wallet.toLocaleString('de-AT');
        }
    }
}
