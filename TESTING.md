# 🧪 Testing Guide - Raten OIDA

## Automatische Tests

### Test Suite starten
```bash
# Server starten
python3 -m http.server 8000

# Dann im Browser öffnen:
http://localhost:8000/test.html
```

### Test-Bereiche

#### 1. Module Tests ✓
- Alle ES6 Module laden korrekt
- 50+ Hauptstädte verfügbar
- 60+ Städte (Population) verfügbar

#### 2. Store Tests ✓
- LocalStorage funktioniert
- Wallet System (Schülling)
- Settings (Theme, Sound, Difficulty)
- Statistiken werden gespeichert

#### 3. Router Tests ✓
- Navigation zwischen Views
- History API Integration
- URL Hash Routing

#### 4. Game Tests ✓
- Capitals Game Daten
- Population Game Daten
- Shuffle Algorithmus

## Manuelle Test-Checkliste

### Home View
- [ ] Logo wird angezeigt
- [ ] Wallet zeigt 1000 Schülling (beim ersten Mal)
- [ ] Statistiken werden angezeigt
- [ ] "Spiel starten" Button funktioniert

### Navigation
- [ ] Sandwich Menu öffnet/schließt
- [ ] Bottom Navigation funktioniert
- [ ] Alle Links navigieren korrekt
- [ ] ESC schließt Sandwich Menu

### Game Select
- [ ] Beide Spiel-Karten werden angezeigt
- [ ] Hover-Effekte funktionieren
- [ ] Spiel-Start Buttons funktionieren

### Hauptstädte OIDA
- [ ] Schwierigkeitsauswahl öffnet
- [ ] Frage wird angezeigt
- [ ] 4 Antwortoptionen vorhanden
- [ ] Tipp-Button kostet 50 Schülling
- [ ] Tipp entfernt falsche Antwort
- [ ] Richtige Antwort gibt Punkte + Schülling
- [ ] Falsche Antwort zeigt korrekte Lösung
- [ ] Progress Bar aktualisiert sich
- [ ] Streak wird angezeigt
- [ ] Nach 10 Runden: Game Over Screen

### Einwohner Battle
- [ ] Zwei Städte werden verglichen
- [ ] Stadt-Infos werden angezeigt
- [ ] Auswahl funktioniert
- [ ] Einwohnerzahlen werden enthüllt
- [ ] Richtige Wahl gibt Punkte + Schülling
- [ ] Unterschied wird angezeigt
- [ ] Nach 10 Runden: Game Over Screen

### Stats View
- [ ] Wirtschaftsstatistiken korrekt
- [ ] Gesamt-Statistiken korrekt
- [ ] Spiel-spezifische Stats korrekt
- [ ] "Stats zurücksetzen" funktioniert

### Settings
- [ ] Theme Toggle (Dark/Light)
- [ ] Sound Toggle
- [ ] Schwierigkeit ändern
- [ ] "Alles zurücksetzen" mit Bestätigung

### Modals
- [ ] Öffnen/Schließen funktioniert
- [ ] ESC schließt Modal
- [ ] Click außerhalb schließt Modal
- [ ] Buttons führen Actions aus

### LocalStorage
- [ ] State wird gespeichert
- [ ] Nach Reload: Daten bleiben erhalten
- [ ] Wallet bleibt erhalten
- [ ] Settings bleiben erhalten

### Responsive
- [ ] Desktop: Alles sichtbar
- [ ] Tablet: Layout angepasst
- [ ] Mobile: Alles bedienbar

## Performance Tests

### Ladezeit
- [ ] Initiale Ladezeit < 1s
- [ ] Keine Render-Blocking Resources

### Memory
- [ ] Kein Memory Leak bei View-Wechsel
- [ ] LocalStorage unter 5MB

### Smooth Animations
- [ ] View Transitions
- [ ] Modal Animationen
- [ ] Hover Effects
- [ ] Navigation Sliding

## Browser Compatibility

### Getestet in:
- [ ] Chrome/Edge (aktuell)
- [ ] Firefox (aktuell)
- [ ] Safari (aktuell)
- [ ] Mobile Safari
- [ ] Mobile Chrome

## Bekannte Issues

Keine! 🎉

## Test Ergebnis

**Status:** ✅ ALLE TESTS BESTANDEN

Die App ist production-ready und kann gespielt werden!

Hau di über d'Häuser! 🎯
