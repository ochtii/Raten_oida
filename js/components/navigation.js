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

        // Overlay Click (schließt Menü)
        const overlay = $('#nav-overlay');
        overlay?.addEventListener('click', () => {
            this.closeMenu();
        });

        // Menu Links Click (schließt Menü nach Navigation)
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', () => {
                // Menü schließen nach kurzer Verzögerung (smooth UX)
                setTimeout(() => this.closeMenu(), 150);
            });
        });

        // Bottom Navigation Buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const route = btn.getAttribute('data-route');
                if (route) {
                    e.preventDefault();
                    // Router wird die Navigation übernehmen
                    // Active-States werden vom Router gesetzt
                }
            });
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
        
        // Menu Wallet
        if (this.menuWallet) {
            this.menuWallet.textContent = wallet.toLocaleString('de-AT');
        }
        
        // Header Wallet (falls vorhanden)
        const headerWallet = $('#header-wallet');
        if (headerWallet) {
            headerWallet.textContent = wallet.toLocaleString('de-AT');
        }
    }
}
