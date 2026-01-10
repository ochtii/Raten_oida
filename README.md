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
- Gesamte App in einer `index.html` (795 Zeilen)
- Keine Dependencies, keine Build-Tools
- Läuft out-of-the-box in jedem Browser

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
└── README.md               # Diese Datei
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

## 📞 Support

Issues & Feature Requests: [GitHub Issues](https://github.com/ochtii/Raten_oida/issues)

---

**Vü Spaß beim Zocken, oida!** 🎮🇦🇹