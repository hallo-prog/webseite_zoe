# Lead Magnets & Trigger Architektur (T2.4)

Ziel: Struktur & Copy Tokens für skalierbare, niedrige Commitment-Einstiege zur Lead-Generierung entlang Funnel & Scroll-Tiefe.

---
## 1. Lead Magnet Typen & Tokens

| Typ | Zweck | Primäres Value Versprechen | Token Prefix |
|-----|-------|----------------------------|--------------|
| Analyse (Potenzialanalyse) | Qualifizierung + Daten-Erfassung | Individuelle Ertrags-/Amortisations-Prognose | `lm.analysis.*` |
| E-Book / Guide | Bildung / Vertrauen | Kompakter Entscheidungs-Guide (Förderung, ROI) | `lm.guide.*` |
| (entfernt) |  |  |  |
| Beratungstermin | High-Commitment | Persönliche Planung & Investitionssicherheit | `lm.consult.*` |

Tokens je Typ:
- Headline: `lm.<type>.hl`
- Subline: `lm.<type>.sub`
- Bullets (max 3): `lm.<type>.b1/2/3`
- CTA Primär: `cta.lm.<type>.primary`
- CTA Sekundär (niedriger): `cta.lm.<type>.secondary`

---
## 2. Draft Copy

### Analyse (`lm.analysis.*`)
- `lm.analysis.hl`: Ihre individuelle Solar-Potenzialanalyse
- `lm.analysis.sub`: Kennzahlen zu Ertrag, Eigenverbrauch & Amortisation – belastbar & schriftlich.
- `lm.analysis.b1`: Dach- & Verbrauchsprofil berücksichtigt (kein Standardrechner)
- `lm.analysis.b2`: Ertragsszenarien (Basis / Wetterabweichung / Optimiert)
- `lm.analysis.b3`: Payback & Cashflow-Kurven Vorschau
- `cta.lm.analysis.primary`: Analyse starten
- `cta.lm.analysis.secondary`: Mehr erfahren

### Guide (`lm.guide.*`)
- `lm.guide.hl`: Entscheidungs-Guide Solar 2025
- `lm.guide.sub`: Förderung, Wirtschaftlichkeit, Technik – kompakt in 15 Minuten.
- `lm.guide.b1`: Aktuelle Förderlandschaft verständlich
- `lm.guide.b2`: ROI Checklisten & Vergleichsfaktoren
- `lm.guide.b3`: Fehler vermeiden: typische Planungsfallen
- `cta.lm.guide.primary`: PDF herunterladen
- `cta.lm.guide.secondary`: Inhalt ansehen

<!-- Webinar Typ vollständig entfernt -->

### Beratung (`lm.consult.*`)
- `lm.consult.hl`: Kostenfreie Erstberatung
- `lm.consult.sub`: Individuelle Planung & Wirtschaftlichkeits-Abgleich in einem Gespräch.
- `lm.consult.b1`: Bedarfserfassung strukturiert
- `lm.consult.b2`: Gegenüberstellung Optionen & Erweiterbarkeit
- `lm.consult.b3`: Klare nächste Schritte & Zeitplan
- `cta.lm.consult.primary`: Termin anfragen
- `cta.lm.consult.secondary`: Ablauf ansehen

---
## 3. Platzierungs-Matrix (High Level)

| Page / Kontext | Above Fold | Mid Content | Scroll 75% | Exit Intent | Sticky / Inline |
|----------------|------------|-------------|------------|-------------|-----------------|
| Home | Analyse | Guide | Analyse | Analyse | Beratung (Sticky Button) |
| Pricing | Analyse | Beratung | Guide | Analyse | Beratung |
| WhyUs | Guide | Analyse | Analyse | Guide | Beratung |
| Technology | Guide | Analyse | Analyse | Guide | Analyse |
| Blog Post | Guide | Analyse | Guide | Guide | Analyse Inline |
| Calculator | Beratung | Analyse | Guide | Analyse | Analyse |

Regeln (Pseudo):
```
// Webinar Trigger entfernt
if (exitIntent && !leadCaptured) show(exitModal=analysis)
if (pageType==='blog' && paragraphIndex===3 && !guideTeaserShown) inject(guideInline)
```

---
## 4. Trigger & Zustandslogik

State Keys (lokal Storage / In-Memory):
- `lead.status` = none | partial | qualified
- `lm.dismissed.<type>` Timestamp
// Webinar Slot State entfernt
- `guide.downloaded` Boolean

Cooldowns:
- Inline Teaser Re-Show frühestens nach 24h (`dismissed + 86400000`)
- Exit Intent nur 1× pro Session

Priorisierung (wenn mehrere auslösen): Analyse > Guide > Beratung.

---
## 5. Komponenten Entwurf

| Component | Zweck | Wichtige Props |
|-----------|-------|----------------|
| `LeadMagnetCard` | Standard Card Darstellung | `type`, `variant`, `onPrimary`, `onSecondary` |
| `LeadMagnetInline` | Inline Einbettung im Text | `type`, `compact` |
| `LeadMagnetModal` | Overlay (Exit / Deep Info) | `type`, `reason` |
| `LeadMagnetSlideIn` | Scroll-basiertes Slide In | `type`, `delay`, `side` |
| `LeadMagnetTriggerEngine` | Orchestrierung Trigger | (intern) |

`LeadMagnetTriggerEngine` Responsibilities:
1. Scroll Listener → Schwellen
2. Exit Intent Listener
3. Cooldown Verwaltung
4. Prioritäts-Queue
5. Event Dispatch (für Tracking `lm_impression`, `lm_interact`, `lm_submit`)

---
## 6. Tracking Event Schema (Vorschlag)

| Event | Eigenschaften |
|-------|---------------|
| `lm_impression` | `type`, `placement`, `variant` |
| `lm_interact` | `type`, `action` (primary|secondary) |
| `lm_start` | `type` |
| `lm_submit` | `type`, `status` (success|error) |
| `lm_dismiss` | `type`, `placement` |

Mapping später in `tracking.js` (Phase 7).

---
## 7. Copy Quality Constraints
- Headline ≤ 60 Zeichen (Guide/E-Book ≤ 55)
- Bullets: verb-first, kein Marketing-Füllwort
- Keine Doppelungen von Nutzen innerhalb Seite

---
## 8. Implementierung To-Do Übergang Phase 3/4
1. Verzeichnis `src/components/lead/` anlegen (Cards, Modal, SlideIn, Engine)
2. Copy Source `src/copy/lead-magnets.json`
3. State & Trigger Utility `useLeadMagnetEngine.ts(x)`
4. Tracking Hook `useLeadMagnetTracking.ts`

---
## 9. Qualitätskriterien T2.4
- [x] Typen + Tokens definiert
- [x] Draft Copy vorhanden
- [x] Platzierungs-Matrix erstellt
- [x] Trigger / State Logik umrissen
- [x] Komponenten Entwurf spezifiziert
- [x] Event Schema vorbereitet

Status: Fertig.

---
## 10. Nächste Schritte (T2.5 Preview – Scarcity & Urgency)
1. Dynamische Kapazitäts-Slots definieren (Installationen / Monat)
2. Countdown / Rolling Window Varianten
3. Copy Tokens für FOMO Light vs. Hard Scarcity
