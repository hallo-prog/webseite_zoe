# Objection Handling & FAQ Framework (T2.6)

Ziel: Systematische Entkräftung kaufkritischer Einwände mit strukturierter Copy & Proof Integration. Grundlage für ObjectionsFAQ Section & FAQ Page (Phase 3) + Microcopy Tokens.

---
## 1. Priorisierte Einwände (Top 8)

| Priorität | Einwand (Slug) | Kurzform Nutzerstimme | Kategorie |
|-----------|----------------|-----------------------|-----------|
| 1 | kosten | "Zu teuer / lohnt sich das?" | Wirtschaftlichkeit |
| 2 | amortisation | "Wie lange dauert die Amortisation?" | Wirtschaftlichkeit |
| 3 | bürokratie | "Zu viel Papierkram / Behörden" | Aufwand |
| 4 | wartung | "Was wenn etwas ausfällt?" | Risiko |
| 5 | förderung | "Verpasse ich Fördermittel?" | Finanzierung |
| 6 | ästhetik | "Sieht das nicht schlecht aus?" | Design |
| 7 | technologie | "Technik schnell veraltet?" | Zukunftssicherheit |
| 8 | speicher | "Lohnt Speicher jetzt schon?" | Erweiterbarkeit |

---
## 2. Struktur pro Einwand (Token Schema)

| Element | Token Pattern | Beschreibung |
|---------|---------------|--------------|
| Reframe Headline | `hl.obj.<slug>` | Anerkennt Einwand + reframed Perspektive |
| Empathie Satz | `txt.obj.<slug>.ack` | Kurz empathisch, kein Widerspruch |
| Fakt / Mechanism | `txt.obj.<slug>.fact` | Objektive Erklärung / Prozess |
| Proof | `proof.obj.<slug>` | KPI oder Testimonial Snippet |
| CTA | `cta.obj.<slug>` | Niedrige Barriere (Analyse / Guide) |

---
## 3. Draft Copy (Auswahl)

### Kosten (`kosten`)
- `hl.obj.kosten`: Investition steuert künftig Ihre Stromkosten – statt sie hinzunehmen.
- `txt.obj.kosten.ack`: Ja, der initiale Betrag wirkt hoch.
- `txt.obj.kosten.fact`: Durch Eigenverbrauch ersetzen Sie teureren Netzbezug und sichern sich langfristig gegen Preissteigerungen.
- `proof.obj.kosten`: "Unsere Prognose traf – Stromrechnung jetzt 41% niedriger." – Privatkunde
- `cta.obj.kosten`: Individuelle Kosten-Nutzen-Analyse starten

### Amortisation (`amortisation`)
- `hl.obj.amortisation`: Payback ist planbar – wichtiger ist der langfristige Cashflow.
- `txt.obj.amortisation.ack`: Verständlich, dass Sie den Zeitraum kennen wollen.
- `txt.obj.amortisation.fact`: Szenario-Modell zeigt konservativ vs. optimiert – häufig 8–11 Jahre beim EFH.
- `proof.obj.amortisation`: KPI: Ø Amortisation {stat.trust.avg_payback} Jahre.
- `cta.obj.amortisation`: Payback Szenario ansehen

### Bürokratie (`bürokratie`)
- `hl.obj.bürokratie`: Formalitäten delegieren statt stoppen lassen.
- `txt.obj.bürokratie.ack`: Genehmigungen & Netzanschluss wirken komplex.
- `txt.obj.bürokratie.fact`: Standardisierte Antragspakete & parallele Einreichung reduzieren Wartezeiten.
- `proof.obj.bürokratie`: Ø Zeit bis Netzanschluss {stat.process.avg_days_install} Tage nach Freigabe.
- `cta.obj.bürokratie`: Ablauf & Zuständigkeiten einsehen

### Wartung (`wartung`)
- `hl.obj.wartung`: Proaktives Monitoring statt reaktiver Störung.
- `txt.obj.wartung.ack`: Ausfallrisiko ist ein berechtigtes Thema.
- `txt.obj.wartung.fact`: Sensorik & Alerts melden Abweichungen >5% – Reaktionszeit <24h SLA.
- `proof.obj.wartung`: 0 ungeklärte Garantieansprüche aktuell.
- `cta.obj.wartung`: Monitoring-Prinzip verstehen

### Förderung (`förderung`)
- `hl.obj.förderung`: Förderchancen strukturiert nutzen – statt sie zu verpassen.
- `txt.obj.förderung.ack`: Förderangebote ändern sich dynamisch.
- `txt.obj.förderung.fact`: Wir prüfen passende Programme und priorisieren Fristen pro Bundesland.
- `proof.obj.förderung`: {value}% Kunden nutzen mindestens eine Förderung.
- `cta.obj.förderung`: Förder-Check durchführen

### Ästhetik (`ästhetik`)
- `hl.obj.ästhetik`: Integration statt Fremdkörper – Planung mit Gestaltungsfokus.
- `txt.obj.ästhetik.ack`: Optik am Dach ist Ihnen wichtig.
- `txt.obj.ästhetik.fact`: Farb- & Modul-Layout Varianten minimieren sichtbare Kabel & Brüche.
- `proof.obj.ästhetik`: Fotobeispiel Case EFH (Token später) `proof.case.design_ehf`.
- `cta.obj.ästhetik`: Design-Layout Vorschau erhalten

### Technologie (`technologie`)
- `hl.obj.technologie`: Zukunftsfähig durch modulare Erweiterbarkeit.
- `txt.obj.technologie.ack`: Sorge vor technischem Veralten ist verständlich.
- `txt.obj.technologie.fact`: Kompatible Schnittstellen & Software Updates halten System aktuell.
- `proof.obj.technologie`: Speicher & Wallbox Nachrüstung bei {value}% Kunden im 1. Jahr.
- `cta.obj.technologie`: Erweiterungsoptionen prüfen

### Speicher (`speicher`)
- `hl.obj.speicher`: Speicher lohnt – wenn Lastprofil passt.
- `txt.obj.speicher.ack`: Nicht jeder Speicher rechnet sich sofort.
- `txt.obj.speicher.fact`: Analyse segmentiert Verbrauch (Tag/Nacht) & simuliert Eigenverbrauchs-Steigerung.
- `proof.obj.speicher`: +{value}% Eigenverbrauch mit Speicher (Median analyzed).
- `cta.obj.speicher`: Speicher-Potenzial prüfen

---
## 4. Rendering Muster (Komponente ObjectionsFAQ)

```tsx
type ObjectionItem = {
  slug: string;
  hl: string;
  ack: string;
  fact: string;
  proof?: string;
  cta: { label: string; action: () => void };
};

// Darstellung: Accordion → collapsed by default (max 2 offen gleichzeitig)
```

Visual Elements:
- Icon Mapping per Kategorie (Economy, Time, Shield, Design, Future, Battery)
- Soft Accent Border, Focus Outline token-basiert

---
## 5. Token Liste Zusammenfassung

Pattern: `hl.obj.*`, `txt.obj.*.ack`, `txt.obj.*.fact`, `proof.obj.*`, `cta.obj.*`

---
## 6. Tracking Events Ergänzung

| Event | Attribute |
|-------|-----------|
| `obj_view` | `slug`, `order` |
| `obj_expand` | `slug`, `time_to_expand_ms` |
| `obj_cta_click` | `slug`, `cta_type` |

Korrelationsanalyse später: Reduziert Expansion spezifischer Einwand Bounce Rate? (Phase 7 Dashboard)

---
## 7. Qualitätskriterien T2.6
- [x] Priorisierte Liste vorhanden
- [x] Struktur Schema definiert
- [x] Draft Copy für alle priorisierten Einwände
- [x] Token Patterns konsistent
- [x] Tracking Schema definiert

Status: Fertig.

---
## 8. Nächste Schritte (T2.7 Preview – Trust Stack)
1. Trust Asset Kategorien (Zertifikate, Team, Garantien, Kennzahlen)
2. Standard Layouts (Grid, Carousel, Inline Badge Row)
3. Tokenisierung & Priorisierung Proof Assets
