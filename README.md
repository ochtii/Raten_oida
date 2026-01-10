# 🎮 Raten OIDA

> Ein cyberpunkiges Quiz-Game mit österreichischem Charme und Schülling-Währung

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://ochtii.github.io/Raten_oida/)
[![GitHub Pages](https://github.com/ochtii/Raten_oida/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/ochtii/Raten_oida/actions)

## 🌟 Features

### 🎨 Design & Atmosphäre
- **Modern Gaming Style** mit Cyberpunk-Lite Ästhetik
- **Neon-Akzente** (Cyan, Magenta, Lime) auf dunklem Hintergrund
- **3 Theme-Modi**: Dark, Light & Auto (System-Präferenz)
- **Responsive Design**: Mobile-First, funktioniert auf allen Geräten
- **Framer Motion Animationen**: Smooth Übergänge und Mikrointeraktionen
- **Österreichischer Dialekt**: Authentische Wiener Wortspiele
- **PWA-Ready**: Installierbar als App, offline-fähig
- **Loading States**: Elegante Ladeanimation beim Start

### 💰 Wirtschaftssystem
- **Schülling-Währung**: Startwert 500 Schülling
- **Wetteinsätze**: Flexibel von 0-300 Schülling
- **Zeitbonus**: Schnelle Antworten bringen Extra-Schülling
- **Tipp-System**: Kaufe Hilfestellungen für strategische Vorteile
- **Highscore-Tracking**: Dein Rekord bleibt gespeichert
- **Persistent Storage**: Alles wird in localStorage gesichert

### 🎯 Spiel 1: Hauptstädte OIDA

**5 Modi verfügbar:**
- **Amateur**: 4 Antwortmöglichkeiten (Multiple Choice)
- **Homomode**: Texteingabe, optional 4 Antworten für 100 Schülling kaufbar
- **Pro**: Nur Texteingabe, keine Hilfen
- **Reverse**: Land → Hauptstadt ODER Hauptstadt → Land
- **National**: Fokus auf EU/Europa

**Verfügbare Tipps:**
- 💰 **50/50 Joker** (30 Schülling) – Reduziert auf 2 Antworten
- 💰 **Einen wegstreichen** (20 Schülling) – Eliminiert eine falsche Antwort
- 💰 **Wappen zeigen** (15 Schülling) – Zeigt Flaggen-Emoji
- 💰 **Erster Buchstabe** (10 Schülling)
- 💰 **Letzter Buchstabe** (10 Schülling)
- 💰 **Wortlänge** (12 Schülling)

**Daten:** 38+ Länder/Hauptstädte (Europa & Welt)

### 👥 Spiel 2: Einwohner Showdown

**2 Modi verfügbar:**
- **Schätzen**: Wer hat mehr Einwohner? (Multiple Choice)
- **VS Mode**: Direkter Vergleich zwischen Ländern & Städten

**Verfügbare Tipps:**
- 💰 **Fläche anzeigen** (15 Schülling) – Zeigt km² beider Optionen
- 💰 **Einwohnerzahl (blind)** (18 Schülling) – Zahlen ohne Zuordnung

**Daten:** 28+ Länder & Städte mit Einwohnerzahl & Fläche

### ⚙️ Einstellungen

- **Theme-Auswahl**: Dark / Light / Auto
- **Bottom Navigation**: Ein-/Ausblenden + Größen-Skalierung
- **Zeitlimit**: 10-60 Sekunden (Schieberegler)
- **Schwierigkeitsgrade**: Leiwand / Normal / Oasch schwer

### 🛠️ Dev Tools

- **Cheat-Modus**: +500 Schülling auf Knopfdruck
- **localStorage Viewer**: Echtzeit-Anzeige aller gespeicherten Daten
- **Reset-Funktion**: Kompletter Neustart (löscht alle Daten)

### 🔧 Technische Features

- **Service Worker**: Aktiver Cache Buster mit Auto-Update
- **Error Boundary**: Graceful Error Handling mit Reload-Option
- **Keyboard Navigation**: Enter-Taste zum Absenden von Antworten
- **ARIA Labels**: Screen-Reader kompatibel
- **Social Meta Tags**: Open Graph & Twitter Cards für Social Sharing
- **Auto-Save**: Alle Daten persistent in localStorage
- **Version Management**: Automatische Updates ohne manuelle Intervention
- **Feedback-Animationen**: Visuelle Bestätigung bei richtigen/falschen Antworten

### 📊 Statistik

- Anzahl gespielter Games
- Gewonnene Spiele
- Gesammelter Zeitbonus
- Highscore
- Letzter Gewinn (Timestamp)

## 🚀 Deployment

Die App ist automatisch auf GitHub Pages deployt:
```
https://ochtii.github.io/Raten_oida/
```

### Manuelles Deployment

1. **Lokaler Test:**
   ```bash
   # Einfach index.html im Browser öffnen
   open index.html
   # oder
   python -m http.server 8000
   ```

2. **GitHub Pages** (automatisch via Actions):
   - Push auf `main` triggert automatisches Deployment
   - Workflow: `.github/workflows/pages.yml`

3. **Andere Static Hosts:**
   - Vercel, Netlify, Cloudflare Pages: Einfach `index.html` hochladen
   - Keine Build-Steps nötig – pure HTML/JS/CSS

## 🏗️ Technologie-Stack

- **React 18** (UMD via CDN)
- **Tailwind CSS** (via CDN)
- **Framer Motion 11** (Animationen)
- **localStorage API** (Persistenz)
- **Google Fonts** (Orbitron + Inter)

**Single-File Architecture:**
- Gesamte App in einer `index.html` (908 Zeilen)
- Keine Dependencies, keine Build-Tools
- Läuft out-of-the-box in jedem Browser
- PWA Manifest inline als Base64
- Service Worker inline als Blob

## 📱 Browser-Kompatibilität

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Browsers (iOS Safari, Chrome Android)

## 🎮 Spielmechanik

1. **Spiel auswählen** (Hauptstädte oder Einwohner)
2. **Modus & Wetteinsatz** konfigurieren
3. **Spiel starten** → Frage erscheint
4. **Optional Tipps kaufen** (reduziert Gewinn)
5. **Antworten** via Multiple Choice oder Texteingabe
6. **Zeitbonus kassieren** bei schnellen Antworten
7. **Kontostand wächst** oder fällt

### Scoring-System

```
Basis-Gewinn = 100 + Wetteinsatz
- Jeder genutzte Tipp reduziert Wert um 20 Schülling
+ Zeitbonus: bis zu 40 Schülling (abhängig von Restzeit)
```

## 🗂️ Projekt-Struktur

```
Raten_oida/
├── index.html              # Gesamte App (SPA)
├── .github/
│   └── workflows/
│       └── pages.yml       # GitHub Pages Auto-Deploy
└── # 🎮 Raten OIDA - Vanilla JS Edition

Eine moderne Gaming Quiz-App im Cyberpunk-Style, komplett in Vanilla JavaScript entwickelt.

## 🚀 Features

### 🎯 Zwei Spielmodi
- **Hauptstädte OIDA**: Rate die richtigen Hauptstädte weltweit
- **Einwohner Battle**: Vergleiche Einwohnerzahlen von Städten

### 💰 Wirtschaftssystem
- Virtuelle Währung: **Schülling**
- Verdiene Schülling durch richtige Antworten
- Kaufe Tipps mit Schülling (50/50 Joker)

### 📊 Statistiken
- Detaillierte Spielstatistiken
- Highscores und Streaks
- Wirtschaftsübersicht

### 🎨 Design
- **Dark/Light Mode** mit CSS Variables
- Modern Gaming / Cyberpunk-Lite Ästhetik
- Neon-Akzente (Grün/Pink/Cyan)
- Responsive Layout (Mobile-First)

### ⚙️ Einstellungen
- Theme-Wechsel
- Sound-Einstellungen
- Schwierigkeitsgrade (Leicht/Mittel/Schwer)

## 📂 Projektstruktur

```
/projekt-root
  index.html
  /assets
    /css
      themes.css          # CSS Variables (Dark/Light Mode)
      main.css            # Reset, Typography
      layout.css          # Header, Navigation
      components.css      # Buttons, Cards, Modals
      utilities.css       # Helper-Klassen
  /js
    app.js                # Main Entry Point
    /core
      router.js           # View Management
      store.js            # State & LocalStorage
      dom.js              # DOM Helper Functions
    /components
      navigation.js       # Sandwich Menu
      modal.js            # Dialog System
    /data
      capitals.js         # Hauptstädte Daten
      population.js       # Einwohner Daten
    /games
      gameEngine.js       # Basis Spiellogik
      capitalsGame.js     # Hauptstädte Spiel
      populationGame.js   # Einwohner Spiel
```

## 🛠️ Tech Stack

- **HTML5** - Semantisches Markup
- **CSS3** - Modern CSS mit Variables, Flexbox, Grid
- **Vanilla JavaScript (ES6+)** - Modules, Classes, Async/Await
- **LocalStorage** - Persistente Datenhaltung
- **No Frameworks** - Komplett framework-frei!

## 🎮 Installation & Start

### Variante 1: Live Server (VS Code)
1. Installiere die Extension "Live Server" in VS Code
2. Rechtsklick auf `index.html` → "Open with Live Server"
3. App öffnet sich im Browser

### Variante 2: Python Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Dann öffne: `http://localhost:8000`

### Variante 3: Node.js (http-server)
```bash
npx http-server -p 8000
```

## 🎯 Spielanleitung

### Hauptstädte OIDA
1. Wähle Schwierigkeitsgrad
2. Rate die Hauptstadt des angezeigten Landes
3. Kaufe Tipps für 50 Schülling (entfernt falsche Antworten)
4. Verdiene Schülling für richtige Antworten
5. Baue Streaks auf für Bonuspunkte

### Einwohner Battle
1. Vergleiche zwei Städte
2. Wähle die Stadt mit MEHR Einwohnern
3. Verdiene Schülling für richtige Antworten
4. Baue Streaks auf für Bonuspunkte

## 💡 Architektur-Highlights

### State Management
- Eigenes Store-System mit Observer Pattern
- Automatische LocalStorage-Synchronisation
- Reactive Updates

### Routing
- Simuliertes Client-Side Routing
- History API Integration
- View-basierte Architektur

### Modular
- ES6 Modules (import/export)
- Klare Trennung von Concerns
- Wiederverwendbare Components

### Performance
- Keine externen Dependencies
- Minimale Bundle Size
- Native Browser APIs

## 🎨 Theming

Das Theming-System nutzt CSS Custom Properties:

```css
/* Dark Mode (Standard) */
--bg-primary: #1a1a1a;
--accent-primary: #00ff88;  /* Neon Grün */
--accent-secondary: #ff006e; /* Neon Pink */

/* Light Mode */
[data-theme="light"] {
  --bg-primary: #f5f5f5;
  /* ... */
}
```

Theme wechseln:
```javascript
store.toggleTheme();
```

## 🔧 Konfiguration

### Schwierigkeitsgrade
In `js/data/capitals.js` sind die Länder mit Schwierigkeitsgrad markiert:
- `easy`: Bekannte Länder
- `medium`: Mitteleuropäische Länder
- `hard`: Schwierigere Länder

### Spieleinstellungen
In `js/games/gameEngine.js`:
```javascript
this.maxRounds = 10;  // Anzahl Runden pro Spiel
```

### Wirtschaft
In `js/games/capitalsGame.js`:
```javascript
const hintCost = 50;  // Kosten für Tipps
```

## 📱 Responsive Design

- Mobile-First Ansatz
- Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

## 🎵 Sound (geplant)

Sound-System ist vorbereitet aber noch nicht implementiert.
Toggle in Settings verfügbar.

## 🚀 Erweiterungen

### Mögliche Features:
- [ ] PWA Support (Service Worker)
- [ ] Sound Effects
- [ ] Mehr Spielmodi
- [ ] Multiplayer (WebSocket)
- [ ] Achievements System
- [ ] Leaderboard
- [ ] Social Sharing

## 🐛 Debugging

Browser DevTools öffnen:
- Chrome/Edge: `F12` oder `Ctrl+Shift+I`
- Firefox: `F12`
- Safari: `Cmd+Option+I`

Console Logs:
```javascript
console.log('🎮 Raten OIDA wird initialisiert...');
```

## 📄 Lizenz

Open Source - Frei verwendbar für Lern- und Demozwecke.

## 🇦🇹 Österreichischer Charme

Die App nutzt bewusst österreichischen Dialekt und Humor:
- "OIDA" - Typisch österreichischer Ausruf
- "Schülling" - Anlehnung an alte österreichische Währung
- "Hau di über d'Häuser" - Wienerisch für "viel Erfolg"
- "Passt!" - Österreichisch für "OK/Gut"

---

**Entwickelt mit ❤️ und Vanilla JavaScript**

Hau di über d'Häuser! 🎯               # Diese Datei
```

## 🎨 Design-System

### Farben
```css
Neon Cyan:    #72f5ff
Magenta:      #ff2e88
Lime:         #9ef01a
Cyber Dark:   #0b1224
Cyber Slate:  #0f172a
```

### Typografie
- **Display**: Orbitron (Headlines, Logo)
- **Body**: Inter (Text, UI)

## 🧪 Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/ochtii/Raten_oida.git
cd Raten_oida

# Im Browser öffnen
open index.html

# Oder mit lokalem Server
python -m http.server 8000
# → http://localhost:8000
```

## 📝 Lizenz

MIT License - Erstellt mit ❤️ und KI

## 🤝 Contribution

Pull Requests willkommen! Bitte beachte:
- Code bleibt in einer Datei (Single-File SPA)
- Österreichischer Dialekt beibehalten
- Mobile-First Design
- Keine externen Dependencies (außer CDNs)

## 🐛 Known Issues

- localStorage kann in privaten Tabs limitiert sein
- Framer Motion animations können auf schwachen Geräten laggen
- Text-Eingabe ist case-insensitive, aber Rechtschreibung muss exakt sein

## ✨ Neue Features in v1.0.2

- 🔄 Aktiver Cache Buster mit Service Worker
- 🎨 PWA Manifest für App-Installation
- ♿ Accessibility-Verbesserungen (ARIA Labels)
- ⌨️ Tastatur-Navigation (Enter zum Absenden)
- 🎭 Error Boundary mit Fehlerbehandlung
- 📱 Social Sharing Meta Tags (Open Graph, Twitter)
- 🎬 Loading-Animation beim Start
- ✅ Zeigt korrekte Antwort bei Fehler an
- 🎯 Zeitbonus-Anzeige im Feedback
- 🚀 Auto-Update bei neuen Versionen

## 📞 Support

Issues & Feature Requests: [GitHub Issues](https://github.com/ochtii/Raten_oida/issues)

---

**Vü Spaß beim Zocken, oida!** 🎮🇦🇹