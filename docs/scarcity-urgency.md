# Scarcity & Urgency Modules (T2.5)

Ziel: Glaubwürdige, nicht manipulative Verknappungs- & Dringlichkeitsmechanik zur Conversion-Steigerung ohne Vertrauensverlust.

---
## 1. Mechanik-Typen

| Typ | Beschreibung | Einsatzkontext | Token Prefix |
|-----|--------------|----------------|--------------|
| Kapazitäts-Slots | Verfügbare Installations-Slots pro Monat | Pricing, Home, CTA Final | `sc.capacity.*` |
| Rolling Window Countdown | Zeitfenster für garantierten Installationstermin | Hero / Mid Page | `sc.window.*` |
| Nachfrage-Indikator | Live-Indikator (leichte Variation) | LeadMagnetStack, SlideIn | `sc.demand.*` |
| Ressourcen-Begrenzung | Limitierte kostenfreie Analysen / Woche | Analyse CTA | `sc.analysis.*` |
| Event Countdown | Termin nächste Aktionsfrist / Analyse-Deadline | Analyse Teaser | `sc.event.*` |

---
## 2. Token Struktur Beispiele

- `sc.capacity.month.current` → "Verfügbare Installationsplätze {value} für {monthName}"
- `sc.capacity.month.low` → "Nur noch {value} freie Plätze im {monthName}!"
- `sc.window.deadline` → "Sichern Sie sich Ihren garantierten Installationstermin bis {date}"
- `sc.demand.trend.up` → "Hohe Nachfrage – Anfragen +{value}% diese Woche"
- `sc.analysis.remaining` → "Noch {value} kostenfreie Analysen diese Woche"
- `sc.event.countdown.hl` → "Aktionsfenster endet in {hh}:{mm}:{ss}"

---
## 3. Datenquellen & Fallbacks

| Quelle | Primär | Fallback | Datenformat |
|--------|--------|----------|-------------|
| Kapazitäten | API `/api/capacity` | Statisches JSON (Build) | `{ month, freeSlots }[]` |
| Nachfrage | API `/api/demand` | Heuristik (random range) | `{ deltaPercent }` |
| Analysen Count | Memory/DB Count | Statisch (z.B. 20) | `{ remaining }` |
| Aktionsfrist | CMS / Static Config | Statisches Datum | ISO Timestamp |

Fallback Regeln: Wenn API Fehler -> Anzeige Soft Scarcity Text ohne konkrete Zahl (`sc.capacity.generic`: "Installationskalender füllt sich – früh anfragen sichert Termin").

---
## 4. Komponenten Entwurf

| Component | Aufgabe | Props |
|-----------|---------|-------|
| `ScarcityBar` | Inline Hinweis (ober/unter Section) | `type`, `variant`, `data` |
| `CapacityBadge` | Kleine Zahl / Status | `slots`, `month` |
| `CountdownTimer` | Ticking Countdown | `endTime`, `onEnd` |
| `DemandPulse` | Subtle Nachfrage-Indicator | `deltaPercent` |
| `AnalysisRemaining` | Restanzahl Anzeige | `remaining` |

State Hook: `useScarcityData()` – orchestriert Abrufe & Fallbacks.

---
## 5. Logik & Pseudocode

```ts
// capacity.ts
export async function getCapacity() {
  try {
    const r = await fetch('/api/capacity');
    if(!r.ok) throw new Error('net');
    return await r.json();
  } catch(e) {
    return fallbackCapacity; // build-time import
  }
}

export function selectCurrentMonth(capacity) {
  const now = new Date();
  return capacity.find(c => c.month === (now.getMonth()+1)) || null;
}
```

Threshold Darstellung:
```
if (freeSlots <= 3) variant = 'low';
else if (freeSlots <= 7) variant = 'medium';
else variant = 'normal';
```

Countdown Rolling Window (z.B. wöchentlicher Reset):
```
// window resets Monday 00:00 local
const nextDeadline = nextMondayMidnight();
```

---
## 6. Copy Guidelines
- Nie Fake-Zahlen – Fallback = generischer Hinweis ohne konkrete Werte.
- Keine extremen roten Warnfarben – nutzen Brand Amber Light für moderate Dringlichkeit.
- Max. 1 harte Scarcity pro viewport gleichzeitig.
- Soft vs. Hard: Soft = Trend / generisch, Hard = konkrete Rest-Slots.

---
## 7. Tracking Events (Erweiterung)
| Event | Eigenschaften |
|-------|---------------|
| `sc_impression` | `type`, `variant` |
| `sc_interact` | `type`, `action` |
| `sc_countdown_end` | `type` |

Aggregation später in Dashboard (Phase 7) zur Bewertung ob Scarcity Variation Impact hat.

---
## 8. Risiko & Compliance
- Transparenz: Aktualisierungsintervall / Quelle in Tooltip `(i)` optional.
- Logging: (Phase 7) Veränderungen an Basiswerten auditierbar speichern.
- Vermeidung: Kein künstliches Runterzählen ohne reale Datenquelle.

---
## 9. Implementierungs-Backlog (Phase 3/5 Übergang)
1. Hooks `useScarcityData`, `useCountdown` erstellen
2. Platzhalter API Routen (dummy) in `api/` (oder Mock im Dev)
3. Komponenten Grundgerüst in `src/components/scarcity/`
4. Einbindung in Section `PricingTeaser`, `CTAFinal`, `LeadMagnetStack`

---
## 10. Qualitätskriterien T2.5
- [x] Mechaniken typisiert
- [x] Token Beispiele vorhanden
- [x] Datenquellen + Fallbacks definiert
- [x] Komponenten & Hooks umrissen
- [x] Pseudocode Kernlogik skizziert
- [x] Copy & Compliance Richtlinien

Status: Fertig.

---
## 11. Nächste Schritte (T2.6 Preview – Objection Handling)
1. Einwand-Sammlung & Priorisierung
2. Struktur pro Einwand (Reframe, Empathie, Fakt, Proof, CTA)
3. Tokenisierung & Draft Copy
