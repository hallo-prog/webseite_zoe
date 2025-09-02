# Messaging-Hierarchie & Copy Framework (T2.2)

Ziel: Einheitliches, konvertierendes Narrativ über alle Seiten & Sektionen – wiederverwendbare Copy-Blöcke ("Copy Tokens") für skalierbaren Neuaufbau (Phase 3).

---
## 1. Core Narrative Sequence (Macro)

1. Pain (aktueller Zustand, Schmerz, versteckte Kosten)
2. Cost of Inaction (Opportunitätsverlust, Risikoaufschub)
3. Lösung (System / Plattform / Prozess – nicht nur Produkt)
4. Differenzierung (Unique Mechanism, USP Cluster, Qualitätshebel)
5. Proof (Social Proof, Zahlen, Zertifikate, Case Snippets)
6. Value Amplifier (ROI, Einsparung, Sicherheit, Zukunftsfähigkeit)
7. Risk Reversal (Garantien, Service, Support, Transparenz)
8. CTA (Niedrige Barriere → Höhere Commitment-Stufen gestaffelt)
9. Secondary Engagement (Lead Magnet Alternativen / Blog / Guide)

Jede Seite variiert Tiefe & Gewichtung der Blöcke je nach Funnel-Stufe (Siehe `aida-mapping.md`).

---
## 2. Copy Tokens (strukturierte Variablen)

Alle Copy-Bausteine erhalten Schlüssel, die in Komponenten gemappt werden.

Kategorie Prefixe:
- `hl.` Headline / Subheadline
- `txt.` Body / Fließtext / Paragraph
- `stat.` Zahl / KPI / Kennzahl Claim
- `proof.` Testimonial / Quote / Kundenbezug
- `usp.` Differenzierungs-Item
- `risk.` Risiko-Umkehr / Garantie
- `cta.` Call-To-Action Texte
- `micro.` Microcopy (Form, Buttons, Placeholders, Validierungen)
- `badge.` kurze Label Marker

Namenskonvention: `bereich.ebene.variante` z.B. `hl.hero.primary`, `usp.installation.speed`, `proof.case.alpha.short`.

---
## 3. Messaging Layer Mapping (Section Archetypen)

| Section Archetyp | Zweck | Primärer Hook | Emotionaler Hebel | Proof Slot | CTA Typ |
|------------------|-------|--------------|-------------------|-----------|--------|
| Hero | Aufmerksamkeit, Qualifizierung | `hl.hero.primary` | Sicherheit + Zukunft | `stat.hero.savings` (optional) | High-Level (Analyse anfordern) |
| PainIntro | Problem-Verstärkung | `hl.pain.core` | Verlustangst | - | Scroll / Sekundär CTA |
| CostInaction | Kosten des Nicht-Handelns | `hl.coi.calc` | Dringlichkeit | `stat.coi.loss_per_year` | Lead Magnet (E-Book) |
| SolutionArchitecture | System-Logik / Plattform | `hl.solution.framework` | Klarheit / Kontrolle | `stat.solution.performance` | Beratung |
| Differentiators | USP Cluster | `hl.usp.set` | Vertrauen / Kompetenz | `proof.cert.list` | Analyse / Demo |
| SavingsCalculatorTeaser | Interaktivität / Engagement | `hl.calc.invite` | Neugier / Ownership | `stat.calc.avg_roi` | Rechner starten |
| TrustWall | Massive Social Proof Aggregation | `hl.trust.overview` | Bestätigung | `proof.testimonial.rotation` | Beratung |
| ProcessSteps | Sicherheit durch Transparenz | `hl.process.steps` | Kontrolle | - | Call / Termin |
| LeadMagnetStack | Niedrige Barriere Eintritt | `hl.lm.bundle` | Nutzen | `proof.lm.downloads` | Download / Signup |
| ObjectionsFAQ | Einwände entkräften | `hl.objections.core` | Sicherheit | `proof.objections.quote` | Beratung |
| PricingTeaser | Preisanker / Frame | `hl.pricing.anchor` | Wert | `stat.pricing.avg_payback` | Angebot anfordern |
| CTAFinal | Letzter Push / Risiko-Minimierung | `hl.final.call` | Sicherheit + Momentum | `proof.final.short` | Haupt-CTA |

---
## 4. Persona & Kontext-Personalisierung (Light Rules)

Attribute (aus späterem Formular / Tracking ableitbar):
- Persona: Privat | Gewerbe | Landwirt
- Motivation Primär: Kosten senken | Nachhaltigkeit | Unabhängigkeit
- Gebäudetyp: EFH | MFH | Gewerbehalle

Regel-Beispiele:
- `hl.hero.primary`: Wenn Motivation = Unabhängigkeit → Version B, sonst Basis Version A.
- `usp.installation.speed`: Gewerbe erhält Variation mit Betriebsunterbrechungs-Minimierung.
- `stat.solution.performance`: Landwirt Variation mit Dachflächen-Auslastung.

Implementation später: Variation Keys `...variant_a`, `...variant_b` + Auswahlfunktion (Phase 5/7 Experiment Framework). Jetzt nur Design der Schlüssel vorbereiten.

---
## 5. Headline Formeln & Patterns

| Pattern | Formel | Einsatz |
|---------|--------|---------|
| Outcome + Timeframe | "Bis zu {X}% Stromkosten einsparen in nur {Y} Monaten" | Hero / Calculator |
| Frage Provokation | "Warum jedes weitere Jahr Warten Ihre Rendite schmälert" | CostInaction |
| Mechanism Spotlight | "Das {UniqueMechanism} System: Mehr Ertrag aus jedem Sonnenstundenfenster" | Solution |
| Risiko-Umkehr | "Investieren ohne Unsicherheit – {GarantieClaim}" | Risk / CTA Final |
| Social Proof Anchor | "Über {stat.trust.installs}+ installierte Anlagen – geprüft & zertifiziert" | TrustWall |
| Differenzierer Liste | "5 Gründe, warum {Brand} anders liefert" | Differentiators |

---
## 6. Differenzierungs-Cluster (USP Matrix)

| Cluster | Kurzbeschreibung | Copy Token Prefix |
|---------|------------------|-------------------|
| Engineering Qualität | Premium Komponenten, Monitoring, Auslegung | `usp.engineering.*` |
| Geschwindigkeit & Prozess | Schnelle Analyse → Planung → Installation | `usp.process.*` |
| Transparenz & Garantie | Klare Kosten, Leistungs-Garantie, Service SLA | `usp.trust.*` |
| Optimierungs-Intelligenz | Smart Planner / Monitoring / Performance Alerts | `usp.intelligence.*` |
| Ganzheitliches Ökosystem | Speicher, Wallbox, Lastmanagement | `usp.ecosystem.*` |

Jeder Cluster erhält: Headline (`usp.<cluster>.hl`), Kurzsatz (`usp.<cluster>.one`), Bullet Trio (`usp.<cluster>.b1/2/3`).

---
## 7. Proof Assets Typologie

| Typ | Beschreibung | Token Beispiel |
|-----|--------------|----------------|
| Testimonial Kurz | 1-2 Zeilen Zitat | `proof.testimonial.alpha.short` |
| Testimonial Lang | Absatz + Outcome KPI | `proof.testimonial.alpha.long` |
| Zertifikat | Siegel / Logo + Label | `proof.cert.vde` |
| KPI Zahl | Kennzahl mit Kontext | `stat.trust.installs` |
| Case Snippet | Mini-Case: Herausforderung→Ergebnis | `proof.case.roi_farm` |
| Medien Feature | Presse/Blog Nennung | `proof.media.trade_journal` |

Rotationslogik (später): Gewicht (`proof.weight.*`) + Kategorie für dynamischen Shuffle (T5.3).

---
## 8. Risk Reversal Elemente

| Element | Token | Beispielinhalt |
|---------|-------|----------------|
| Leistungs-Garantie | `risk.performance.guarantee` | "Leistungsmonitoring & schriftliche Ertragsprognose" |
| Fixpreis Zusage | `risk.price.lock` | "Festpreis nach technischer Vor-Ort-Prüfung – keine Nachkalkulation" |
| Service SLA | `risk.service.sla` | "Reaktionszeit unter 24h bei Störungen" |
| Qualitätsprüfung | `risk.quality.audit` | "4-stufige Qualitätskontrolle vor Inbetriebnahme" |
| Rücktrittsfenster | `risk.cancel.window` | "14 Tage Rücktritt nach Planungsfreigabe" |

CTAFinal kombiniert 2–3 dieser Elemente → Risiko-Minimierungs-Block.

---
## 9. Objection Handling Struktur

Standard Struktur pro Einwand:
1. Reframing Headline (`hl.obj.<slug>`) – bestätigt & umdeutet
2. Kurzer Empathie-Satz (`txt.obj.<slug>.ack`)
3. Fakten / Mechanism (`txt.obj.<slug>.fact`)
4. Proof (`proof.obj.<slug>`) – Testimonial oder KPI
5. Mikro-CTA (`cta.obj.<slug>`) – z.B. "Individuelle Ertragsanalyse anfordern"

Beispiel Slugs: `kosten`, `amortisation`, `wartung`, `bürokratie`, `ästhetik`, `förderung`.

FAQ Page bündelt diese als strukturierte Daten (Phase 3 + 6).

---
## 10. Microcopy Konventionen

| Kontext | Prinzip |
|---------|---------|
| Buttons Primär | Verb + konkreter Nutzen: "Analyse starten" |
| Buttons Sekundär | Niedrigeres Commitment: "Mehr erfahren" |
| Form Labels | Klar + ohne Marketing-Fluff: "Postleitzahl" |
| Placeholders | Beispiel-Format statt generisch: "z.B. 12345" |
| Fehlertexte | Handlung + Ursache kurz: "Bitte gültige E-Mail eingeben" |
| Progress Steps | "Schritt {n} von {total}" |
| Datenschutz Hinweis | Transparent + Nutzen: "Wir nutzen Daten ausschließlich zur Potentialanalyse" |

Tokens: `micro.form.error.email`, `micro.form.placeholder.zip`, `micro.btn.primary.analyse`, etc.

---
## 11. Sequenzierung innerhalb einer Seite (Guideline)

1. Hero (Outcome + Differenzierungs-Andeutung + primäre CTA + Sekundär CTA Lead Magnet)
2. PainIntro (3–5 präzise Problemstatements, visuell leicht)
3. CostInaction (monetäre & strategische Verluste, 1 KPI Zahl prominent)
4. SolutionArchitecture (Mechanism Visual, 3 Benefit Bullets)
5. Differentiators (USP Grid, Scroll Snap, Badges)
6. SavingsCalculatorTeaser (Interaktive Engagement Spike)
7. TrustWall (Testimonial + Metrics Mix – horizontale / Masonry)
8. ProcessSteps (Sicherheit & Transparenz, 4–6 Schritte)
9. ObjectionsFAQ (Top 4 Einwände kondensiert + expandierbar)
10. PricingTeaser (Frame + Payback + Finanzierung Hinweis)
11. LeadMagnetStack (Alternative Einstiege)
12. CTAFinal (Risk Reversal + FOMO Light + klare Aktion)

Nicht jede Seite benötigt alle; Tiefe nach Funnel Stage modulieren.

---
## 12. Content Density & Scannability Regeln

- Max Headline Länge Hero: 68 Zeichen (Mobil Priorität)
- Paragraph Länge: ≤ 420 Zeichen (Desktop), für Mobil splitten
- Bullet Blocks: 3 oder 5 Items – niemals 4 (psychologisch ungerade Anzahl bevorzugt)
- KPI Format: Zahl + Kontext + Zeitraum ("12.4% mehr Eigenverbrauch im 1. Jahr")
- Testimonial Kürze (Kurzform): ≤ 140 Zeichen

---
## 13. Stil & Tonalität Leitplanken

Attribute: Klar, technisch kompetent, ruhig, verlässlich, kein Hype.
Vermeiden: Übertriebene Superlative ohne Proof, Füllwörter, generische Versprechen.
Verben bevorzugt: optimieren, sichern, beschleunigen, vereinfachen, überwachen, skalieren.

Pronomen: "Sie" (formell) – konsistent. Interne Variablen für Lockere Tests (später A/B) vorbereiten: `voice.formal=true`.

---
## 14. Lokalisierung & Internationalisierung Hinweise

- Copy Tokens bleiben sprachneutral im Key; Übersetzungen in `locales/<lang>.json`.
- Vermeiden fest kodierte Zahl-Formatierungen – nutzen später Utility (z.B. Intl.NumberFormat) – Platzhalter `{value}`.
- Kulturspezifische Einwände pro Markt als Erweiterungs-Slug: `bürokratie_es`, `förderung_it` etc.

---
## 15. Implementierungs-Backlog (Übergang zu Phase 3)

To Map in Code (Phase 3 Start):
1. Section Komponenten erhalten Prop `copy` (Objekt) + Fallback auf globalen Copy Store.
2. Aufbau eines `src/copy/` Verzeichnisses mit namespace Dateien: `hero.json`, `usp.json`, `proof.json`, ...
3. Simple Resolver Utility: `getCopy(key, locale, variant?)`.
4. Experiment Hook Wrapper (später): Variation Auswahl → Key Suffix.

---
## 16. Qualitätskriterien Abnahme T2.2

Checklist:
- [x] Sequenz & Archetypen definiert
- [x] Copy Token System beschrieben
- [x] Persona / Variation Regeln skizziert
- [x] Headline Patterns dokumentiert
- [x] Differenzierungs- & Proof-Struktur vorhanden
- [x] Objection Handling Framework
- [x] Microcopy Leitlinien
- [x] Übergabeanforderungen für Phase 3 klar

Status: Fertig.

---
## 17. Nächste direkte Schritte (T2.3 Preview)

1. Ausformulierung / Draft der Value Props (`usp.*` Cluster) – mindestens je Cluster HL + 3 Bullets
2. Ersten Satz Testimonial Snippets sammeln (Platzhalter Struktur, noch keine finalen Namen)
3. KPI Liste initialisieren (Installationen, kWh optimiert, durchschnittliche Payback Zeit)

Diese Ergebnisse fließen in `value-props.md` (T2.3).
