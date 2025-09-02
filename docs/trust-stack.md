# Trust Stack Module Spezifikation (T2.7)

Ziel: Standardisierte, wiederverwendbare Darstellung von Vertrauenselementen (Siegel, Kennzahlen, Team, Garantien, Medienfeatures) als modulare Bausteine für Sections `TrustWall`, `Differentiators`, `CTAFinal`, `WhyUs`.

---
## 1. Trust Asset Kategorien

| Kategorie | Beschreibung | Token Prefix | Beispiel |
|-----------|--------------|--------------|----------|
| Zertifikate / Siegel | Offizielle Prüf- / Verbandslogos | `trust.cert.*` | `trust.cert.vde` |
| Auszeichnungen | Awards / Qualitätssiegel | `trust.award.*` | `trust.award.hwk` |
| Kennzahlen (KPIs) | Leistungs-/Serviceindikatoren | `stat.trust.*` | `stat.trust.installs` |
| Garantien / Risiko-Umkehr | Vertrauenssichernde Zusagen | `risk.*` | `risk.performance.guarantee` |
| Team / Expertise | Kernteam, Zertifizierungen | `trust.team.*` | `trust.team.engineer_lead` |
| Medien / Presse | Erwähnungen in Fachmedien | `trust.media.*` | `trust.media.trade_journal` |
| Kundenstimmen | Testimonials / Cases | `proof.testimonial.*` | `proof.testimonial.alpha.short` |
| Prozesse / Compliance | Audit / Monitoring Hinweise | `trust.process.*` | `trust.process.monitoring_24h` |

---
## 2. Datenstruktur (pro Namespace)

```ts
// trust/kpis.ts (oder JSON)
export const trustKPIs = [
  { key: 'stat.trust.installs', value: '{value}', label: 'installierte kWp', format: 'number_compact' },
  { key: 'stat.trust.avg_payback', value: '{value}', label: 'Ø Amortisation Jahre', format: 'number_1d' },
  { key: 'stat.trust.on_time_rate', value: '{value}%', label: 'Termintreue', format: 'percent_0d' }
];

// trust/certs.ts
export const trustCerts = [
  { key: 'trust.cert.vde', asset: '/public/auszeichnungen/-vde.png', alt: 'VDE geprüft' },
  { key: 'trust.cert.stromnetz_berlin', asset: '/public/auszeichnungen/-stromnetz_berlin.png', alt: 'Stromnetz Berlin' },
  { key: 'trust.cert.hwk', asset: '/public/auszeichnungen/-hwk.png', alt: 'Handwerkskammer' }
];
```

---
## 3. Layout Patterns

| Pattern | Beschreibung | Einsatz | Responsiv Verhalten |
|---------|--------------|---------|---------------------|
| KPI Row (Inline) | 3–4 Kennzahlen mit Icon/Divider | Hero, TrustWall Top | Wrap auf 2x2 bei <640px |
| Logo Grid | Zertifikate / Auszeichnungen (5–8) | WhyUs, Footer Pre-CTA | Auto-fit min 120px |
| Masonry Proof | Mix Testimonials + KPIs | TrustWall | 2 Col (mobil) / 3-4 Col (desktop) |
| Badge Strip | Kleine Logos inline scannbar | Pricing, CTAFinal | Horizontal Scroll mobil |
| Guarantee Block | Kombination Risiko-Umkehr + Icons | CTAFinal | Stack vertikal mobil |
| Media Bar | Monochrome Media Logos | WhyUs, About | Grau-Level Tokens |
| Team Spotlight | 1–3 Profile mit Kurzclaim | WhyUs | Cards stacken mobil |

---
## 4. Komponentengerüst

| Component | Zweck | Props |
|-----------|-------|-------|
| `TrustKPIList` | Rendert definierte KPI Items | `items`, `layout` |
| `TrustLogoGrid` | Logos / Siegel responsive | `items`, `maxRows?` |
| `TrustMasonry` | Mixed Proof (Testimonials + KPIs + Logos) | `entries` |
| `GuaranteeBundle` | Risiko-Umkehr Block | `items` (risk tokens) |
| `MediaBar` | Presselogos inline | `items` |
| `TeamSpotlight` | Teamprofile | `members` |
| `TrustWallSection` | Orchestrator (kombiniert Patterns) | `config` |

Konfigurationsobjekt Beispiel:
```json
{
  "kpis": ["stat.trust.installs", "stat.trust.avg_payback", "stat.trust.on_time_rate"],
  "logos": ["trust.cert.vde", "trust.cert.hwk", "trust.cert.stromnetz_berlin"],
  "testimonials": ["proof.testimonial.alpha.short", "proof.testimonial.beta.short"],
  "guarantees": ["risk.performance.guarantee", "risk.price.lock", "risk.service.sla"],
  "media": ["trust.media.trade_journal"],
  "team": ["trust.team.engineer_lead"],
  "layout": {
    "order": ["kpis","logos","testimonials","guarantees","media"],
    "theme": "balanced"
  }
}
```

---
## 5. Token Guidelines

| Kategorie | Beispiel Token | Stilrichtlinie |
|-----------|----------------|----------------|
| KPIs | `stat.trust.installs` | Zahl + Kontext, keine Floskeln |
| Guarantees | `risk.price.lock` | Klarer Nutzen + Sicherheit |
| Logos | `trust.cert.vde` | Alt-Text semantisch ("VDE geprüft") |
| Media | `trust.media.trade_journal` | Monochrom Darstellung (Neutral-500) |
| Team | `trust.team.engineer_lead` | Rolle + Kernkompetenz |

---
## 6. Barrierefreiheit
- Logos: `aria-hidden="true"` + Hidden Text Liste für Screenreader separate Section.
- KPIs: `<dl>` Struktur (Zahl = `<dt>` + Kontext `<dd>` semantisch umgekehrt für Stil möglich).
- Guarantees als Liste `<ul>` – keine reinen Icon-Bilder ohne Text.

---
## 7. Performance Hinweise
- Logos & Siegel auf ein moderates Farbspektrum (oder Grayscale) optimieren → bessere Kompression.
- Nutzung `loading="lazy"` für unterhalb der Falz.
- Kritische KPIs inline (kein Flash of empty) – statische Werte + später progressive Hydration für Live-Werte.

---
## 8. Datenaktualisierung (Optional)
Später Phase 7: kleines Endpoint `/api/stats` für aktualisierte KPIs; diff-basiertes Update (nur wenn Werte abweichen) → verhindert unnötige Re-Renders.

---
## 9. Tracking Events
| Event | Attribute |
|-------|-----------|
| `trust_impression` | `block` (kpis|logos|guarantees|media|team) |
| `trust_interact` | `type`, `id` (z.B. team member) |
| `guarantee_cta_click` | `token` |

Korrelieren mit Conversion Rate Variation (Phase 7 Experiments).

---
## 10. Qualitätskriterien T2.7
- [x] Kategorien definiert
- [x] Layout Patterns katalogisiert
- [x] Komponenten & Props spezifiziert
- [x] Token Guidelines formuliert
- [x] Accessibility & Performance berücksichtigt
- [x] Tracking Schema erstellt

Status: Fertig.

---
## 11. Nächste Schritte (T2.8 Preview – Micro Conversion Copy)
1. Button / CTA Text Inventur & Konsolidierung
2. Formular Feld- & Fehlertexte tokens
3. Inline Helper & Tooltip Patterns
