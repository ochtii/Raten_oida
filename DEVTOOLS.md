# 🛠️ Developer Tools Documentation

## Übersicht

Die **Raten OIDA Developer Tools** sind ein vollständiges Debug-Panel für die Entwicklung und das Testen der App. Sie bieten umfangreiche Funktionen zur Inspektion, Manipulation und Überwachung der Anwendung.

## Aktivierung

Die DevTools werden **automatisch aktiviert**, wenn die App auf localhost oder mit `?dev=true` Parameter läuft.

### Keyboard Shortcuts

- **`Ctrl + Shift + D`** - DevTools öffnen/schließen
- **`Ctrl + L`** - Console leeren (wenn DevTools offen)
- **`Ctrl + Shift + R`** - Hard Reset (Warnung!)

## Features

### 1. 📋 Console Tab

**Funktionen:**
- Echtzeit-Logging aller Console-Ausgaben
- Farbcodierte Log-Typen (Log, Success, Warning, Error)
- Zeitstempel für jeden Eintrag
- Maximale 100 Logs (automatisches Rotieren)
- Clear-Button zum Leeren

**Log-Typen:**
- `log` - Normale Logs (cyan)
- `success` - Erfolgreiche Aktionen (grün)
- `warning` - Warnungen (gelb)
- `error` - Fehler (rot)

**Verwendung:**
```javascript
console.log('Normal log');
console.error('Error message');
console.warn('Warning message');
// Oder direkt über DevTools:
window.devTools.log('Custom message', 'success');
```

### 2. 🔍 State Tab

**Funktionen:**
- Echtzeit-Ansicht des kompletten App-State
- Automatische Updates bei State-Änderungen
- JSON-formatierte Darstellung
- Export als JSON-Datei

**Buttons:**
- **Refresh** - State manuell aktualisieren
- **Export JSON** - State als `.json` Datei herunterladen

**State-Struktur:**
```json
{
  "wallet": 500,
  "settings": {
    "theme": "dark",
    "sound": true
  },
  "stats": {
    "capitals": {
      "played": 10,
      "won": 7,
      "highscore": 850
    },
    "population": {
      "played": 5,
      "won": 3,
      "highscore": 1200
    }
  }
}
```

### 3. 💾 Storage Tab

**Funktionen:**
- Übersicht aller localStorage Items
- Anzeige von Key, Value und Größe
- Clear All Storage Button (mit Confirmation)

**Warnung:**
- "Clear All Storage" löscht ALLE Daten und lädt die App neu!

### 4. ⚡ Performance Tab

**Metriken:**

| Metrik | Beschreibung |
|--------|--------------|
| **Uptime** | Zeit seit App-Start (HH:MM:SS) |
| **State Changes** | Anzahl der Store-Updates |
| **Memory Used** | JavaScript Heap Size |
| **FPS** | Frames per Second (ca.) |
| **localStorage Size** | Größe aller Storage Items |
| **Viewport** | Aktuelle Bildschirmgröße |

**Buttons:**
- **Reset Metrics** - Performance-Counter zurücksetzen

### 5. 🎮 Actions Tab

Schnellzugriff auf häufige Debug-Aktionen, organisiert in Cards:

#### 💰 Wallet Card
- **+1000 Sch** - 1.000 Schülling hinzufügen
- **+10000 Sch** - 10.000 Schülling hinzufügen
- **Reset** - Wallet auf 0 setzen

#### 📊 Stats Card
- **Win Game** - Spiel als gewonnen markieren (100 Punkte)
- **Reset Stats** - Alle Statistiken zurücksetzen

#### 🎨 Theme Card
- **Toggle Theme** - Zwischen Dark/Light wechseln
- **Dark** - Dark Mode aktivieren
- **Light** - Light Mode aktivieren

#### 🔄 App Card
- **Reload** - Seite neu laden
- **Hard Reset** - Kompletter Reset (localStorage + Reload)

#### 🧪 Test Data Card
- **Test Modal** - Modal-System testen
- **Test Notification** - Notification testen

#### 📱 Viewport Card
- **Mobile (375px)** - Hinweis für mobile Ansicht
- **Tablet (768px)** - Hinweis für Tablet
- **Desktop (1920px)** - Hinweis für Desktop

## Programmatische Nutzung

### Zugriff auf DevTools

```javascript
// DevTools sind global verfügbar
window.devTools

// DevTools öffnen/schließen
window.devTools.toggle();
window.devTools.open();
window.devTools.close();

// Logs hinzufügen
window.devTools.log('Message', 'success');
window.devTools.log('Warning!', 'warning');
window.devTools.log('Error!', 'error');

// State manipulieren
window.devTools.addMoney(5000);
window.devTools.resetWallet();
window.devTools.completeGame();

// Theme ändern
window.devTools.setTheme('light');
window.devTools.toggleTheme();

// Export
window.devTools.exportState();
```

### Custom Events

DevTools unterstützen Custom Events:

```javascript
// Modal-Test Event
window.addEventListener('dev-test-modal', (e) => {
    console.log('Modal test:', e.detail.message);
});
```

## Technische Details

### Architektur

```
devTools.js
├── Constructor
│   ├── logs[]              - Log-Array (max 100)
│   ├── performanceMetrics  - Performance-Daten
│   └── isOpen             - Status
├── Init
│   ├── createDevPanel()    - UI erstellen
│   ├── setupKeyboardShortcuts()
│   ├── setupConsoleProxy() - console.log hijacken
│   ├── setupPerformanceMonitor()
│   └── setupStateObserver()
├── Public Methods
│   ├── toggle/open/close()
│   ├── log()
│   ├── switchTab()
│   └── Quick Actions
└── Helper Methods
    ├── formatUptime()
    ├── formatBytes()
    └── calculateFPS()
```

### Console Proxy

Die DevTools fangen alle `console.log`, `console.error` und `console.warn` Aufrufe ab:

```javascript
// Original Console wird proxied
const originalLog = console.log;
console.log = (...args) => {
    originalLog.apply(console, args);
    this.log(args.join(' '), 'log');
};
```

### Performance Monitoring

Automatische Updates alle 2 Sekunden:
- Uptime-Counter (jede Sekunde)
- Performance-Metriken (alle 2 Sekunden)
- State Observer (bei jeder Änderung)

### Storage Management

LocalStorage wird analysiert und angezeigt:
```javascript
// Alle Keys durchlaufen
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const size = new Blob([value]).size;
}
```

## Best Practices

### 1. Entwicklung

```javascript
// In Development immer DevTools nutzen
if (window.devTools) {
    window.devTools.log('Feature X geladen', 'success');
}
```

### 2. Testing

```javascript
// Schnell Testdaten generieren
window.devTools.addMoney(10000);
window.devTools.completeGame();
```

### 3. Debugging

```javascript
// State inspizieren
window.devTools.open();
// → State Tab öffnen
// → JSON analysieren
```

### 4. Performance

```javascript
// Performance überwachen
window.devTools.resetMetrics();
// ... Tests durchführen ...
// → Performance Tab checken
```

## Sicherheit

⚠️ **Wichtig:** DevTools sind nur in Development verfügbar!

```javascript
// Automatische Aktivierung nur wenn:
const isDev = location.hostname === 'localhost' || 
              location.hostname === '127.0.0.1' ||
              location.search.includes('dev=true');
```

**In Production:**
- DevTools werden NICHT geladen
- Keine Performance-Overhead
- Keine Sicherheitsrisiken

## Troubleshooting

### DevTools öffnen nicht?

1. Prüfen ob auf localhost: `http://localhost:8000`
2. Oder URL-Parameter: `?dev=true`
3. Console checken: `window.devTools` sollte existieren

### Console-Logs fehlen?

- DevTools müssen VOR den Logs initialisiert werden
- Bei Bedarf Seite neu laden

### Performance langsam?

- DevTools verwenden Performance Monitoring
- Bei geschlossenem Panel minimal Overhead
- Reset Metrics hilft

## Erweiterungen

### Custom Tab hinzufügen

```javascript
// In devTools.js:
// 1. HTML für neuen Tab in createDevPanel()
// 2. Event Listener in setupEventListeners()
// 3. switchTab() Case hinzufügen
```

### Custom Metrics

```javascript
// Performance-Metriken erweitern
this.performanceMetrics.customMetric = 0;

// In updatePerformanceMetrics() anzeigen
```

## Changelog

### v1.0 (Initial Release)
- ✅ Console Tab mit Log-Proxy
- ✅ State Inspector mit JSON-Export
- ✅ Storage Manager
- ✅ Performance Monitoring
- ✅ Quick Actions (Wallet, Stats, Theme, etc.)
- ✅ Keyboard Shortcuts
- ✅ Auto-Init in Development
- ✅ Vollständiges Styling

## Support

Bei Fragen oder Feature-Requests:
- GitHub Issues: `ochtii/Raten_oida`
- DevTools sind Open Source!

---

**Happy Debugging! 🛠️✨**
