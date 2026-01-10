/* ========================================
   DOM.JS - DOM Helper Funktionen
   ======================================== */

// jQuery-like Selector
export const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

export const $$ = (selector, parent = document) => {
    return Array.from(parent.querySelectorAll(selector));
};

// Element erstellen mit Attributen und Kindern
export const createElement = (tag, attributes = {}, children = []) => {
    const element = document.createElement(tag);

    // Attribute setzen
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'class') {
            element.className = value;
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else if (key.startsWith('on') && typeof value === 'function') {
            const eventName = key.substring(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else {
            element.setAttribute(key, value);
        }
    });

    // Kinder hinzufügen
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
            element.appendChild(child);
        }
    });

    return element;
};

// HTML String zu Element konvertieren
export const htmlToElement = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
};

// HTML String zu NodeList konvertieren
export const htmlToElements = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return Array.from(template.content.childNodes);
};

// Element leeren
export const empty = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

// Element mit neuem Content ersetzen
export const render = (container, content) => {
    if (typeof container === 'string') {
        container = $(container);
    }

    if (!container) {
        console.error('Container nicht gefunden');
        return;
    }

    empty(container);

    if (typeof content === 'string') {
        container.innerHTML = content;
    } else if (content instanceof HTMLElement) {
        container.appendChild(content);
    } else if (Array.isArray(content)) {
        content.forEach(item => {
            if (typeof item === 'string') {
                container.innerHTML += item;
            } else if (item instanceof HTMLElement) {
                container.appendChild(item);
            }
        });
    }
};

// Klasse togglen
export const toggleClass = (element, className) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    element?.classList.toggle(className);
};

// Event Delegation
export const delegate = (parent, eventType, selector, handler) => {
    parent.addEventListener(eventType, (event) => {
        const target = event.target.closest(selector);
        if (target && parent.contains(target)) {
            handler.call(target, event);
        }
    });
};

// Debounce Funktion
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Animation Helper
export const animate = (element, className, duration = 300) => {
    return new Promise((resolve) => {
        element.classList.add(className);
        setTimeout(() => {
            element.classList.remove(className);
            resolve();
        }, duration);
    });
};

// Scroll to Top
export const scrollToTop = (smooth = true) => {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto'
    });
};

// Format Währung
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-AT').format(amount);
};

// Format Prozent
export const formatPercent = (value, total) => {
    if (total === 0) return '0%';
    return `${Math.round((value / total) * 100)}%`;
};

// Zufälliges Element aus Array
export const randomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

// Array mischen (Fisher-Yates)
export const shuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
