# Styleguide v3.3 (Minimal + Card Primitives)

## Änderungsüberblick v3.3
| Änderung | Beschreibung | Motivation |
|----------|--------------|-----------|
| UI Primitives konsolidiert | Einführung der React Komponenten `Card`, `Heading`, `Metric`, `Field` als zentrale Abstraktion | Einheitliche Semantik + Reduktion von Stil-Divergenzen |
| Entfernt: `.value-card`, `.value-card.cinematic` | Legacy Klassen vollständig eliminiert (Code + CSS) | Vereinfachung & Purge-Effizienz, klare API |
| Heading Klassen entfernt | `h1.heading-1`, `h2.heading-2` → ersetzt durch `<Heading level={1|2|...} size="..." />` | Semantik + responsive Skala ohne Klassenspaghetti |
| Form Vereinheitlichung | Alle Lead-Form Felder über `<Field>` Wrapper (Label, Hint, Error) | Konsistentes Spacing & A11y |
| Card Variants | Neue Prop API: `variant="subtle|solid|outline"`, `elevation="0|sm|md|lg"` | Klar definierte Tiefen & Tonalität |
| Tracking Empfehlung | Neues Event `design_migration_complete` (version:'v3.3') | Messbarkeit Abschluss Refactor |
| Doku bereinigt | Deprecation-Hinweise für Solar & Value Pattern aktualisiert | Vermeidung veralteter Referenzen |

## 1. Farben (Brand & Semantic) – Minimal Futurist Palette v3.1
Primäres Ziel: Reduktion von Wärme/Orange → kühle, präzise, vertrauensvolle Oberfläche mit warm-freundlicher Grundnote über dezente Grüntöne für positive Zustände.

| Token | Wert | Verwendung |
|-------|------|-----------|
| --color-brand-navy | #0d2a33 | Primärer Hintergrund, Headings, Primär-CTA Fläche |
| --color-brand-accent | #12b3c7 | Links, Fokus, Key Icons, Akzentlinien |
| --color-brand-accent-soft | #0fa5b3 | Hover States, weiche Gradients, Inline-Highlights |
| --color-brand-green | #18b364 | Success States, alternative positive CTA, KPIs positiv |
| --color-brand-green-dark | #128a4d | Active/Pressed Variation Grün |
| --color-brand-green-soft | #d7f5e6 | Hintergrund Soft Badges / Positive Panels |
| --color-brand-green-pale | #eefaf3 | Sehr dezente Section Tönung / Separation |
| --color-success | #18b364 | Erfolgsmeldungen / Toasts |
| --color-warning | #d6a500 | Knappheit / Limit Hinweis (entsättigt für Seriosität) |
| --color-danger | #dc2626 | Fehler States / Validierung |
| --color-info | #0fa5b3 | Info Bubbles / Hinweisflächen |

Ergänzende Neutrals (Cool-Gray Scale): 50:#f5f7f9 · 100:#e9edf0 · 150:#dde3e7 · 200:#d1d9de · 300:#b8c3c9 · 400:#96a3ab · 500:#6d7c85 · 600:#516067 · 700:#304048 · 800:#1d2d34 · 900:#0d1b21.

Design-Prinzipien Farbgebung:
1. Funktion vor Dekoration: Farbe nur zur Bedeutung (Zustand, Interaktion, Hierarchie) – kein rein ornamental warmer Glow.
2. Navy als ruhige Ankerfläche; Accent Türkis für progressive Tech-Kompetenz; Grün nur für positives Feedback.
3. Hoher Kontrast für Kerninteraktionen (≥ 4.5:1) – weiche Zwischenflächen mit Neutral 50–150 zur Tiefenstaffelung.
4. Keine Vollflächen-Verläufe im Standard; nur subtile radiale Lichtakzente bei `.cinematic` Varianten < 12% Sättigung.

## 2. Typografie (Fluid Scale)
| Token | Definition (clamp) | Primäre Nutzung |
|-------|--------------------|-----------------|
| --font-size-2xs | 11px | Micro Meta / Badge |
| --font-size-xs | 12.5px | Meta Info |
| --font-size-sm | 14.5px | Sekundärtext |
| --font-size-base | clamp(16.5px,0.9vw+14px,18.25px) | Body Base / längere Fließtexte |
| --font-size-lg | clamp(18px,1vw+15px,20px) | Lead / UI Key Labels |
| --font-size-xl | clamp(20px,1.2vw+16px,24px) | Subheadline |
| --font-size-2xl | clamp(24px,1.6vw+18px,30px) | H3 / Mobile H2 |
| --font-size-3xl | clamp(30px,2vw+20px,40px) | H2 Desktop |
| --font-size-4xl | clamp(38px,3vw+22px,52px) | H1 Mobile / Bold Statements |
| --font-size-5xl | clamp(48px,4.2vw+24px,68px) | H1 Desktop |
| --font-size-display-1 | clamp(56px,6vw+20px,84px) | Hero Primär Claim |
| --font-size-display-2 | clamp(72px,8vw+24px,108px) | Sonderkampagnen / Launch |

Line Heights: `--line-tight:1.08`, `--line-snug:1.18`, `--line-relaxed:1.45` – straffere Headlines, entspannte Lesetypografie.
Max Content Breiten: `--max-w-measure:68ch` (optimale Leselänge), `--max-w-content:72rem` (Page Container), `--max-w-wide:88rem` (Hero / Gallery).

## 3. Spacing
`--space-1..10` (4px Raster) – Nutzen statt ad-hoc Pixel bei Custom Components.

## 4. Radius
| Token | Wert |
|-------|------|
| --radius-sm | 4px |
| --radius-md | 8px |
| --radius-lg | 12px |
| --radius-xl | 20px |
| --radius-pill | 9999px |

## 5. Shadow
| Token | Definition |
|-------|------------|
| --shadow-sm | 0 1px 2px rgba(0,0,0,0.06) |
| --shadow-md | 0 4px 12px rgba(0,0,0,0.08) |
| --shadow-lg | 0 8px 28px rgba(0,0,0,0.12) |

## 6. Buttons (Minimal Interaction)
| Klasse | Zweck | Aufbau / Wirkung |
|--------|-------|------------------|
| .btn-primary | Haupt-Conversion | Flache, dunkle Fläche (#0d2a33), dezenter Hover-Dunkelton, klare Fokus-Ring-Lösung |
| .btn-outline-primary | Sekundäre Aktion | Weißer Hintergrund, neutrale Border, minimaler Hover-Hintergrund (#f5f7f9) |
| .btn-secondary | Zusatz / Folge | Sehr leichte Fläche (#f5f7f9), kaum visuelle Dominanz |

Prinzipien:
- Keine Farbverläufe / keine starken Schatten → kognitive Klarheit.
- Tabular Numbers für KPIs (Klasse `tabular-nums`).
- Ein Primär-CTA pro Fold.

## 7. Badges & Meta Chips
| Klasse | Funktion | Notiz |
|--------|---------|-------|
| .badge | Basis Container (Weight 600, Upper optional) | Micro Cognitive Anchor |
| .badge-soft | Positive Kontextflächierung | Für „neu“, „aktualisiert“, „zertifiziert“ |
| .badge-outline | Neutrale Markierung | Z.B. Filter Tags |
| .badge-invert | Dunkler Kontrast | Auf hellen Hero / KPI Panels |

Chips vs. Badges: Chips (Listen / Filter) → lowercase, Badges (Status / Qualifier) → optional uppercase.

## 8. Struktur & Container System (v3.3 Aktualisierung)
Utility Klassen:
| Klasse / Komponente | Zweck |
|----------------------|------|
| .pro-container | Horizontale Max-Breite + Padding responsive |
| <Section /> | React Primitive für Sektionen (Padding, Variant, Container) |
| .section (legacy util) | Standard vertikale Rhythmik (clamp basiert) – intern nun durch `<Section>` ersetzt |
| .section-tight | Dichtere Sektionen für Sequenzen (kann via `<Section padding="tight"/>` abgebildet werden) |
| .measure | Begrenzung Fließtext (Lesekomfort) |
| .elev-[0-4] | Definierte Tiefestufen / Schattenkonsistenz |
| .hero-shell | Sehr dezente radiale Akzente, kein sichtbarer Gradient |

### 8.1 Section Component Variants (Erweiterung v3.3)
`<Section variant="..." padding="..." size="..." contain />`

Varianten Palette (visuelle Tonalität / Hintergrund):
- default: transparent / inherits
- warm: leichte Wärme (`.section-warm` Layer)
- neutral: dezente neutrale Tönung (Neutral 50)
- plain: Weißfläche (Content Blocks, neutrale Karten-Umgebung)
- gradient: Weiß → Neutral 50 weich (dezente Tiefenstaffelung)
- gradientSoft: Amber sehr leicht → Weiß (sanfter Attention Funnel / Ladder)
- gridSlate: Neutral 50 + subtiler Grid Overlay (Vergleich / strukturierte Daten)
- gradientAmber: Amber Soft Verlauf (Sequenz Einleitung / Prozess)
- gradientCyan: Cyan Soft Verlauf (Impact / ökonomische Vorteile)

Sizing (`size`):
- base: Standard Container Breite
- narrow: Lesefluss / längere Copy Bereiche
- wide: Breitere Grids / KPI Cluster
- full: Bewusster Max-Breite Override (Hero / Gallery)

Padding (`padding`): none | tight | normal | loose → ersetzt frühere `.section`, `.section-tight` Utilities.

Richtlinien:
- Max 2 dekorative Gradients pro Seite (Performance + visuelle Ruhe)
- Grid-Hintergrund (`gridSlate`) nur für Vergleich / Tabellenartige Grids nutzen
- Amber vs. Cyan: Nie direkt hintereinander (Kontrast ermüdet). Zwischenraum mit neutral/plain.

Status: Alle Marketing Sektionen auf `<Section>` migriert (inkl. Differentiation, UVPGuarantee) – Legacy `<section class="py-24 ...">` Muster entfernt.
Update v3.3.1: Vollständige Seitenmigration abgeschlossen (Home, Pricing, Contact, FAQ, Projects, SuccessStories, Financing, Service, About). Numerische Ausrichtung (`tabular-nums`) auf Primär-KPIs ausgerollt; verbleibend: Legal/Imprint ohne KPIs.

Deprecated (entfernt in v3.3 – nicht mehr im CSS vorhanden): `.value-grid`, `.value-card`, `.value-card.cinematic`. Ersetzt durch `<Card>` Komponente. Grid-Layouts jetzt via generische CSS Grid / Flex Utilities + `<Card>` Instanzen.

Spacing Rhythmus: Sektionen nutzen clamp(3.5rem,7vw,6.5rem) statt fixer px – Skalierung sorgt für „atmendes“ Layout.

### 8.2 Vertikaler Rhythmus (Neu v3.3.2 Draft)
Ziel: Gleichmäßige, vorhersehbare Abstände – weniger willkürliche `mt-*` Häufung, bessere Scanbarkeit.

Grundprinzipien:
1. Section-Abstand (outer): gesteuert ausschließlich über `<Section padding="...">` (none|tight|normal|loose). Keine zusätzlichen `pt-* / pb-*` direkt auf `<Section>`-Instanzen außer Sonderfällen (Hero Overlap, Sticky Bars).
2. Intra-Section Flow: Verwende semantische Flow-Utilities statt Einzel-Margins. (Geplant: `.flow-sm` (space-y-4), `.flow` (space-y-6), `.flow-lg` (space-y-8)). Bis Implementierung: maximal zwei aufeinanderfolgende `mt-*` vermeiden.
3. Heading Cluster: Pattern `Heading` → (optional Eyebrow/Badge) → Lead/Text → Primär CTA hat folgende Spacing-Regel: 0 / 1.25rem / 1.75rem. Größere Lücken nur wenn ein Layout-Block (Grid, Media) folgt.
4. KPI Blöcke: Ein einziger `gap-*` Container (Grid oder Flex); keine individuellen Margins an den KPI Cards (Reduktion redundanter Whitespaces).
5. Verschachtelte Container: Keine zusätzliche `max-w-* mx-auto` innerhalb von Komponenten, wenn das äußere `<Section>` bereits `contain` aktiv hat. Stattdessen `size="wide"|"narrow"` nutzen.

Tokenisierte Abstände (Mapping Vorschlag):
| Zweck | Token / Klasse | Abstand |
|-------|----------------|--------|
| Fein (Textgruppen) | flow-sm | 1rem / 1.25rem (sm / md+) |
| Standard Content | flow | 1.5rem / 1.75rem |
| Groß (Hero / CTA Stack) | flow-lg | 2rem / 2.5rem |

Implementierungsschritte (geplant):
1. CSS Utilities `.flow-sm|.flow|.flow-lg` hinzufügen (intern per `& > * + *`).
2. Suchen nach mehrfacher Verwendung von `mt-` in unmittelbar aufeinanderfolgenden Zeilen → refactor zu Flow Container.
3. Ersetzen redundanter `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` Wrapper durch `<Section size="wide" />` oder durch interne `pro-container` wenn nicht vorhanden.
4. Lint-Regel (Optional): Disallow mehr als eine `mt-*` pro DOM-Scope (kann via custom ESLint Rule / regex pre-commit erfolgen).

Status: Dokumentation fertig; Utility Klassen & Refactor folgen (Wave 5 Nacharbeit / Pre Wave 6).

## 9. Komponenten-Katalog (Inventar aktualisiert)
| Kategorie | Komponenten | Hinweise |
|-----------|-------------|----------|
| Navigation | `MegaMenu`, Layout Header | Vereinheitlichung Pills / Hover States |
| Hero | `HeroFunnel` | Enthält Bullets + Persona Toggle (Refactor → SectionHero) |
| Lead Capture | `LeadForm`, `LeadMagnetLadder` | Multi-Step / Ladder konsolidieren |
| Vertrauen/Proof | `TestimonialsSlider`, `Differentiation`, `UVPGuarantee`, `Team`, `SectionBeweis` | Zusammenführen in modulare TrustWall Slots |
| Problem/Lösung | `SectionProblem`, `SectionVersprechen`, `SectionMission`, `SectionComparison`, `SectionEconomicImpact` | Neustrukturierung entlang Funnel-Blöcken |
| Prozess | `SectionAblauf` | Steps extrahieren als generische `ProcessSteps` |
| Einwände/FAQ | `SectionEinwaende`, `FaqAccordionSection` | Vereinheitlichen, Schema.org FAQ |
| Offer/CTA | `SectionAngebot`, CTA Final Block (in `Home.jsx`) | Standard CTA Panel Komponente |
| Form UI | `input`, `checkbox`, `select`, `textarea`, `button`, `label`, `pill`, `badge`, `card` | Tokens auf Padding/Radius anwenden |
| Consent/Tracking | `ConsentManager`, `PopupBanners` | Consent Gate für GTM/Pixel |
| SEO | `DeferredJsonLd`, `ReviewsJsonLd` | Zusammenführen in SEO Helper Layer |
| Glossar | `glossary-tooltip`, `autoGlossary` | Option für Inline-Lexikon |

Section Library v2 aktualisiert (Minimal): `Hero`, `PainIntro`, `CostInaction`, `SolutionArchitecture`, `Differentiators` (refactored), `SavingsCalculatorTeaser`, `TrustWall` (refactored), `ProcessSteps`, `LeadMagnetStack`, `ObjectionsFAQ` (refactored), `PricingTeaser` (refactored), `CTA` (refactored), Tech Sektionen (`TechArchitecture`, `TechComponentsGrid`, `TechComparison`, `TechAuthority`, `TechCalculatorCTA`).

### 9.1 UI Components (Aktualisiert v3.3)
| Component | Zweck | Design Prinzipien |
|-----------|-------|-------------------|
| `Card` | Universelle Oberfläche (Content, Metrics, Testimonials, Panels) | Props: `variant (subtle|solid|outline)`, `elevation (0|sm|md|lg)`, konsistentes Padding, Fokus: minimaler Shadow |
| `Metric` | KPI / Kennzahl | Tabular Numbers, semantische Beschriftung, kein inline Farb-Overuse |
| `TestimonialCard` | Kundenstimme | Nutzt intern `<Card variant="subtle">`; neutrale Typografie, kein Hover-Scale |
| `ProcessStep` (intern) | Journey Schritt | Rhythmus konsistent, Step Nummerierung über pseudo, reduzierte Farbe |
| `InlineHighlight` | Mikro Emphase | Leicht getöntes Neutral (#eef2f4), runde Ecken, keine Schatten |
| `Badge` Varianten | Meta / Status | Soft / Outline / Invert; überarbeiteten Farb-Tokens folgen |
| `Field` | Form Field Wrapper | Label, optional hint, error mapping; ARIA-Attribut Prop Weitergabe |

Entfernt: `ValueCard` Pattern → durch generische `Card` ersetzt.

Verwendung: Micro-Komponenten bevorzugen über individuelle Inline-Stile; sorgt für geringere visuelle Drift und schnellere Iterationen.

### 9.2 Section Patterns (Aktualisiert)
| Pattern | Kernstruktur | Visuelle Leitplanken |
|---------|--------------|----------------------|
| Hero (v4) | Eyebrow Badge · Display Claim · Lead · CTA Cluster · Proof Chips | Max 2 CTA Buttons, neutrale Social Proof Box |
| Problem/Lösung | Grid 2xN (Pain) + Transition + Grid 2xN (Solution) | Keine roten Warnflächen; neutrale Border-Linien + Emerald Benefit Chips |
| Testimonials | KPI Trio + Testimonial Grid | Keine Hover-Vergrößerung, Vertrauen durch Ruhe |
| Team | Stats Grid + Member Cards | Einheitliche Headline Größe, Avatare vollflächig, reduzierte Schatten |
| Bundles | 3 Säulen, optional empfohlen Badge | Kein Preis-Glow, Klarheit Preis + Einsparung |
| Impact | 4 Kennzahlen + Impact Panel | Tone Farben sehr dezent; Fokus auf Zahlen |
| Journey | 5 Steps linear | Verbindungslinien nur neutral, keine verspielte Icon-Farbe |
| Final CTA | Headline + Value Bullets + Dual CTA | Kein Alarm-Banner; Risiko-Umkehr als ruhiger Subtext |

Legacy Hinweis: Alle `text-solar-*` und `bg-solar-*` Klassen sind deprecated und werden sukzessive entfernt. Neue Sektionen dürfen ausschließlich neutrale / tone-basierten Tokens nutzen.

## 10. Accessibility Prinzipien
| Thema | Umsetzung Stand |
|-------|-----------------|
| Landmarks | banner, main, navigation, contentinfo gesetzt |
| Skip Navigation | Skip-Link vor erstem Inhalt vorhanden |
| Fokus Sichtbarkeit | Standard Tailwind Ring; weitere visuelle Optimierung geplant (TBD) |
| Reduced Motion | Respektiert via `prefers-reduced-motion` + Data Attribute |
| Farbkontrast | Primäre Buttons > 4.5:1 auf Weiß; Sekundäre Badges prüfen nach finaler Palette |
| ARIA Labels | Schnellaktionen & Social Links mit `aria-label` |

## 11. Fokus & Interaktion (verfeinert)
| Element | Fokus-Stil (Soll) | Anmerkung |
|---------|-------------------|-----------|
| Buttons Primary | Dual Glow: 0 0 0 3px + 0 0 0 6px (rgba Green) | Implementiert via box-shadow statt ring stacking |
| Links im Text | Unterstreichung nur bei Hover, Fokus: Outline 2px Accent | Konsistent in globalem Link-Reset definieren |
| Inputs | 2px Ring Accent + sanfte Box-Shadow (Token) | Already partly via tailwind |

## 12. Motion Richtlinien
| Motion Typ | Dauer | Ease | Hinweise |
|------------|-------|------|----------|
| Kleine UI-Transitions | var(--duration-fast) | var(--ease-standard) | Hover/Focus |
| Overlays / Drawer | var(--duration-base) | var(--ease-standard) | Opacity + Translate 8px |
| Accordion | 200ms | ease-out | Schon vorhanden (accordion-* Keyframes) |
| Reduced Motion | deaktiviert | n/a | Bereits implementiert |

Utilities (Tokens → Klassen): `.anim-fast` (150ms), `.anim-base` (220ms), `.anim-slow` (320ms), `.ease-standard`, `.ease-emphasized`. Ziel: Entfernen beliebiger `duration-200/300/500` Varianten zugunsten semantischer Dauer. Keine Hover-Transitions > 400ms; Macro Motion (Drawer/Modal) <= 350ms.

## 13. Persuasive Design Patterns (Minimal)
| Pattern | Zweck | Wirkung (Minimal) |
|---------|------|--------------------|
| Cost Inaction Panel | Verlust transparent machen | Verlustgröße nüchtern → hohe Glaubwürdigkeit |
| Comparison Grid | Kontrast Standard vs. Optimiert | Reduzierte Farbe fokussiert Zahlen |
| Lead Magnet Stack | Progressives Engagement | Flache Karten, kein Overdesign |
| Proof Badges (Hero) | Sofortiger Proof | Punkte / knappe Badges minimal |
| Process Steps | Klarheit & Planbarkeit | Gleichmäßiger Rhythmus |
| Calculator Teaser | Sofortige Teilhabe | Ein CTA, kein visueller Lärm |

Ziel: Sequenz folgt Pain → Loss → Lösung → Differenzierung → Proof → Prozess → Engagement → Objections → Preisanker → Final CTA.

## 14. Token Usage Beispiele (v3.3)
Buttons: `.btn-primary { background:#0d2a33; box-shadow:0 2px 4px rgba(0,0,0,.06); }`
Badge Soft: `.badge-soft { background: var(--color-brand-green-soft); border:1px solid var(--color-brand-green-pale); }`
Card Surface (Subtle Variant): `.card-subtle { background:#fff; border:1px solid #e2e7ea; }`
Card Outline: `.card-outline { background:transparent; border:1px solid var(--neutral-200); }`
Card Solid: `.card-solid { background:var(--neutral-50); border:1px solid var(--neutral-150); }`
Elevations über Token: `[data-elev="md"] { box-shadow: var(--shadow-md); }`

## 15. Variant B – Radikal Typografisch (Experiment)

Aktivierung: `<html data-theme="type">`

Ziele:
- Streng monochrom (dunkles Navy als einziger Primärton)
- Keine farbigen Gradients, kein Grün → Fokus komplett auf Inhalt & Zahlen
- Mehr Weißraum (Sektionen ggf. `section-tight` ersetzen, wo Sequenz folgt)

Unterschiede:
- Accent Tokens ohne Farbflächen.
- Buttons ohne farbige Fokus-Glows.
- KPI-Karten ohne Shadow.

Einsatz / Testhypothese: Vertrauenssteigerung bei technisch/finanziell dominanter Persona.
Tracking: `variant_type_sessions`, `variant_type_primary_cta_click`, `variant_type_lead_submit`.

Rollback-Kriterium: < Basis-Conversion nach 1k Sessions.

## 16. Naming-Konventionen

## 17. Navigation (Header) Guidelines
Ziele: Sofortige Klarheit, reduzierte kognitive Last, schnelles Auffinden von Kernpfaden.
- Header Zustand A (Above Hero): semi-transparente weiße Kapsel mit Blur, schwebend → Fokus auf Hero Claim.
- Zustand B (Nach Scroll / Sticky): flache weiße Fläche, Border + leichter Shadow für Layer-Trennung.
- Elemente Reihenfolge: Logo → Haupt-Navigation (Mega + Pills) → Such/Command (⌘K) → Sprache → Rechner → Telefon.
- Nav-Pills: max 1 Zeile, keine Wrappes; bei Overflow Priorisierung: Preise, Projekte, Ratgeber.
- Fokus: 2px brand-accent ring (rgba) – visuell ruhig, eindeutig sichtbar.

Command Bar (⌘/Ctrl K): Intent-Routing (Kontakt, Preise, Projekt, Förderung, Service, sonst Rechner). Speichert letzte 5 Queries (localStorage) – Suggestion Layer nutzt neutrales Muster (kein Overdesign).

FAB System: Einheitliche runde Buttons (Chat, Call, Memory) – dunkel (#0d2a33) für starke Auffindbarkeit, ruhige Micro-Bewegung (-2px Hover Lift).

## 18. Footer Architektur
Layout: 5-Spalten Grid (2 + 1 + 1 + 1) ab md.
- Spalte 1: Brand, Nutzenclaim (Value Proposition), KPI Microchips (Payback, Termintreue, Festpreis), Social Icons.
- Spalten 2–4: Produkt / Ressourcen / Unternehmen Linklisten, alphabetisch innerhalb Kategorie gruppiert (Ausnahme: Rechner immer oben Produkt, Warum ZOE oben Unternehmen).
- Bottom Bar: Legal Links, Copyright, Disclaimer, sekundärer CTA + Telefon.
- Social Icons: neutrale Outline, Füllung nur auf Hover.

Copy Richtlinien Footer:
- Kein Marketing-Hype: Zahlen stets konservativ, keine Superlative.
- Chips <= 3–4 Items zur Vermeidung von kognitivem Overload.

## 19. Card System Feinjustierung (v3.3)
Card Primitive ersetzt alle früheren `value-card` Varianten. Struktur:
```
<Card variant="subtle" elevation="sm"> ... </Card>
```
Guidelines:
- Subtle: Weißer Hintergrund, neutrale Border (100–150), minimaler Hover Lift (translate-y-[-1px] + shadow-sm) optional.
- Outline: Transparenter Hintergrund, klare Border für visuelle Trennung ohne Fläche.
- Solid: Leicht getönte Fläche (Neutral 50) für Sekundär-Panels.
- Elevation strikt über Prop (kein Inline Shadow). Kombination Variant + Elevation = kontrollierte Tiefenskala.

KPI / Metrics: Nutzen `<Metric>` (stellt Tabular Numbers, Sizing & Subline sicher). Keine direkte Anwendung von Farbklassen außer Success/Info States.

Testimonials & Process Steps intern auf Card umgestellt; Cinematic Spezialeffekte nur noch im Hero (`.hero-shell.cinematic`). Globale Körnung (film-grain) optional und hardware-bewusst.

Legacy Note: `.value-card`, `.value-card.cinematic` nicht mehr verfügbar – Codebasis gereinigt (grep liefert 0 Treffer außerhalb dieser Dokumentation).
Solar Deprecation aus v3.1 / v3.2 bleibt gültig (keine `solar-*` Klassen zulässig).

## 20. Microcopy / Tone of Voice (freundlicher, menschlicher)
Grundsätze:
- Vertrauensvoll, warm, kompetent. Kurze Sätze, aktiv. Keine exzessiven Superlative – Begeisterung durch Klarheit + visuelles Crafting, nicht durch Ausrufzeichen.
- Risiko-Umkehr subtil im Subtext ("Festpreis schriftlich zugesichert"), nicht in Klickflächen.
- Buttons: Verb + konkreter Nutzen (max. 3 Wörter): "Analyse starten", "Kosten prüfen", "Projekt ansehen".
- Inline-Emphase: `.inline-highlight` für positive Chancen, `.inline-soft` für neutrale Modularität.
- Vermeide leere Claims wie "Innovativ" ohne Kontext → ersetze durch konkrete, messbare Aussage.

## 21. Variant B Header/Footer Unterschiede
Aktiviert durch `<html data-theme="type">`. Unterschiede:
- Entfernt Blur (Header stets vollflächig, Border #e2e7ea), FAB Hintergrund identisch (#0d2a33) → Einheit.
- Footer Chips ohne Border (nur Text) – noch nüchterner.
- Option: Banner vollständig ausgeblendet (Test Hypothese: Weniger Ablenkung steigert Scroll-Tiefe).

Tracking Zusätze (Variant B): `variant_type_nav_click`, `variant_type_footer_cta_click`.

## 22. Cinematic Warm Layer (Neu)
Erweiterungen (optional aktiv):
- Film Grain Overlay (`.film-grain`) – nur auf High-Performance Geräten aktivieren (Runtime Heuristik möglich: FPS Test oder `prefers-reduced-motion`).
- Hero Cinematic (`.hero-shell.cinematic`) – doppelter radialer Lichtfächer + Soft Fade Bottom.
- Section Warm Backdrops (`.section-warm`) – dezente farbliche Wärme statt flächiger Fills.
Design Ziel: Emotionalität & Wärme ohne Conversion-Distraktion. Kein Geräusch: Layer sind immer < 12% Farbsättigung.

Performance Guard: Grain Layer ist reine CSS-Repeating-Radial + Animation; kann bei schwacher GPU via `data-reduce-motion` oder Abfrage deaktiviert werden.

Tracking Empfehlung: Zusatz-Event `visual_layer_active` (payload: { grain:bool, cinematicHero:bool }) für Korrelation Engagement.

## 23. Offene Erweiterungen (v3+)
- Global Active-State indiziert (Unterstreichung oder Punkt) für aktuelle Seite.
- Sticky Sub-Navigation für lange Content Seiten (Blog Artikel).
- Quick Theme Switch (Minimal ↔ Typo) UI Toggle (derzeit via Data Attribute Dev Tools).
| Bereich | Konvention |
|---------|------------|
| CSS Custom Properties | `--color-*`, `--radius-*`, `--shadow-*`, `--font-size-*` |
| React Komponenten | PascalCase (Sections: `SectionX` → künftig generisch `XSection` oder unter `/sections/X.jsx`) |
| Utility Klassen (custom) | kebab-case, präfixfrei, semantisch (`.trust-wall`, `.process-steps`) |
| Events (Tracking) | `scope_action_detail` (z.B. `lead_form_submit`, `cta_click_hero`) |

## 24. Offene Style-Themen (Backlog v2)
- Konsistenter Link-Stil & Inline Icon Abstände
- Print Styles für Angebots-/Rechner-Ausdruck
- High Contrast Mode Toggle (optional)
- Theming Hooks für zukünftige White-Label Variante
 - Disabled State Tokens für Buttons
 - KPI Card Variation (Dark on Light)
 - Animated Value Increment (Performance Kennzahlen)
 - Focus Visible globaler Normalizer

## 25. Roadmap Design-Elevation (Auszug)
| Item | Status | Beschreibung |
|------|--------|--------------|
| Fluid Type Scale | done | Clamp-basierte Größen eingeführt |
| Hero Rework | done | Display Headline + Proof Micro Anchors |
| Depth System | done | Elevation Levels 0–4 definiert |
| Value Cards Pattern | done | Einheitliche Nutzen/Pain Karten |
| Refactor Legacy Amber | done | Alle solar-* Klassen entfernt (Audit grep 'solar-' = nur in Copy/Text Vorkommen) |
| Global Link Style | open | Einheitliches Hover/Fokus Verhalten |
| Disabled States | open | Einheitliche Opacity/Shadow-Entfernung |
| Dark Mode Removal | done | Fokus auf Performance & Klarheit |
| Tech Sections Premium | done | Neue Technologie-Komponenten integriert |


## 26. Migration Completion (Audit Log v3.3)
Datum: 2025-08-31
Scope: Entfernung aller Legacy Oberflächen-Klassen (`value-card*`, Heading Klassen) zugunsten von React Primitives (`Card`, `Heading`, `Metric`, `Field`). Solar Utility Klassen weiterhin entfernt.

Verifikation:
1. Code Search `grep -R "value-card" src/` -> 0 Treffer.
2. Code Search `grep -R "heading-1\|heading-2" src/` -> 0 Treffer.
3. Build erfolgreich, keine Purge-Warnings zu entfernten Klassen.
4. CSS: Entfernte Block-Definition `.value-card.cinematic` reduziert Bundle leicht; Hero Cinematic Styles verbleiben.

Richtlinie ab jetzt:
- Layout / Oberfläche ausschließlich über `<Card>` und definierte Variants + Elevation.
- Keine Ad-hoc Shadows, Borders oder Inline Hex-Werte außerhalb Token-Definitionen.
- Headings immer `<Heading>` für Skalierung & responsive Typografie.
- KPI Zahlen über `<Metric>` für konsistente Typo & Tabular Figures.

Tracking Umsetzung:
- Event `design_migration_complete` einmalig (Meta: { version:'v3.3', timestamp: Date.now() }).
- Ergänzend prüfen: `variant_type_sessions`, `variant_type_primary_cta_click` falls Variant B aktiv.

Nächste Mikro-Iterationen (Low-Risk):
- Globaler Link-Stil finalisieren.
- Disabled State Tokens.
- KPI Animated Increment (progressive Enhancement, respektiert `prefers-reduced-motion`).
- Fokus Normalizer global.

End of Migration Log v3.3.

## 27. New Component System (Phase 5 - Design Harmonization Complete)

### 27.1 A/B Testing Infrastructure
Location: `src/utils/ab-testing.js`

**Purpose:** Foundation for systematic conversion optimization with persistent variant assignment and analytics integration.

```javascript
import { useABTest, trackConversion } from '@/utils/ab-testing';

// In component:
const { variant, trackConversion } = useABTest('HERO_HEADLINE');
const headline = VARIANTS.HERO_HEADLINES[variant];

// Track conversion:
<Button onClick={() => trackConversion('cta_click')}>
  {VARIANTS.CTA_TEXTS[variant]}
</Button>
```

**Configuration:** Tests are centrally managed in `AB_TESTS` object with weights, active flags, and variant definitions.

### 27.2 Unified Navigation System
Location: `src/config/navigation.js`

**Purpose:** Centralized navigation structure eliminating inconsistencies across header, mobile menu, and footer.

```javascript
import { useNavigation } from '@/config/navigation';

const { primary, secondary, footer } = useNavigation();
```

**Features:**
- Primary navigation with dropdowns
- Secondary CTA buttons (Calculator, Contact)
- Footer navigation sections
- Breadcrumb generation
- Active state detection utilities

### 27.3 Toast/Feedback System
Location: `src/components/ui/toast.jsx`

**Purpose:** Unified user feedback with queue management, auto-dismiss, and consistent styling.

```javascript
import { useToast } from '@/components/ui/toast';

const { success, error, warning, info } = useToast();

// Usage:
success('Anfrage erfolgreich gesendet!');
error('Fehler beim Senden', { duration: 7000 });
```

**Features:**
- Auto-dismissing toasts with configurable duration
- Queue management (multiple toasts)
- Semantic color coding and icons
- Action buttons support
- Accessibility compliant (role="alert")

### 27.4 Promotion Strip Component
Location: `src/components/ui/promotion-strip.jsx`

**Purpose:** Standardized promotional banners replacing ad-hoc banner implementations.

```javascript
import { PromotionStrip, usePromotionStrip } from '@/components/ui/promotion-strip';

const { dismissed, dismiss } = usePromotionStrip('countdown_offer');

<PromotionStrip
  variant="urgent"
  title="40% Förderung endet bald"
  countdown={timeLeft}
  cta={{ text: 'Jetzt sichern', onClick: handleCTA }}
  dismissible
  onDismiss={dismiss}
/>
```

**Variants:**
- `primary` - Standard promotional content
- `urgent` - Time-sensitive offers with countdown
- `success` - Achievement/savings highlights
- `info` - General announcements
- `warning` - Important notices

### 27.5 Enhanced Testimonial Component
Location: `src/components/ui/testimonial.jsx`

**Purpose:** Standardized testimonials with star ratings, verification badges, and consistent avatar handling.

```javascript
import { Testimonial } from '@/components/ui/testimonial';

<Testimonial
  name="Maria Schmidt"
  location="Berlin"
  text="Perfekte Beratung und Installation..."
  rating={5}
  verified={true}
  source="Trustpilot"
  savings="€2.400/Jahr"
  date="März 2024"
/>
```

**Features:**
- Automatic avatar generation with initials fallback
- Star rating display (1-5 stars)
- Verification badges
- Savings highlighting with tabular numbers
- Multiple size variants (compact, default, featured)

### 27.6 Overlay System (Modal/Drawer)
Location: `src/components/ui/overlay.jsx`

**Purpose:** Unified overlay layer with scroll lock, focus management, and consistent behavior patterns.

```javascript
import { Modal, Drawer, useOverlay } from '@/components/ui/overlay';

const { isOpen, open, close } = useOverlay();

// Modal usage:
<Modal 
  isOpen={isOpen} 
  onClose={close}
  title="Beratung buchen"
  size="lg"
>
  <ContactForm />
</Modal>

// Drawer usage:
<Drawer
  isOpen={isOpen}
  onClose={close}
  position="right"
  title="Anfrage Details"
>
  <LeadForm />
</Drawer>
```

**Features:**
- Automatic scroll lock with layout shift prevention
- Focus trap management
- Escape key and backdrop close handling
- Portal-based rendering
- Responsive sizing options
- Animation support with `animate.css` classes

### 27.7 Success Criteria Achievement

**✅ Central Button Component:** All buttons route through `<Button>` with variants
**✅ Badge Consolidation:** Three main variants (soft, outline, invert) implemented
**✅ Navigation Extraction:** JSON-based navigation structure established
**✅ Testimonial Standardization:** Enhanced with ratings and consistent layout
**✅ Focus Styling:** Consistent focus-visible styles across all interactive elements
**✅ Accessibility:** Skip links, ARIA labels, keyboard navigation support
**✅ A/B Testing Ready:** Infrastructure for systematic optimization testing

### 27.8 Governance Guidelines

**Component Creation Rules:**
1. New components must extend existing variants, not replace them
2. All interactive elements must support focus-visible styling
3. Props should follow established naming patterns (`variant`, `size`, `className`)
4. Components must be responsive by default
5. Accessibility considerations are mandatory, not optional

**Token Usage:**
- Use CSS custom properties for colors: `var(--color-brand-navy)`
- Spacing follows the established scale: `--space-*`
- Typography uses clamp-based scaling: `--font-size-*`
- Animations use semantic durations: `--duration-fast/base/slow`

**Quality Gates:**
- Components must build without TypeScript errors
- All interactive states must be defined (hover, focus, active, disabled)
- Mobile-first responsive design required
- Test coverage for user interactions encouraged

### 27.9 Migration Completion Status

**Phase 5 - Design Consistency & UI Harmonization: COMPLETE**

✅ Button harmonization (FAQ accordion migrated)
✅ Navigation system extracted and centralized  
✅ Toast/feedback system implemented
✅ Promotion strip component created
✅ Enhanced testimonial component with ratings
✅ Overlay system with scroll lock and focus management
✅ A/B testing infrastructure established
✅ Documentation updated with governance guidelines
✅ Success criteria met for unified component system

**Next Phase Recommendations:**
- Wave 6: Integrate remaining edge components (Chat, SmartPlanner)
- Wave 7: Visual regression testing setup
- Performance audit and optimization
- Advanced accessibility testing and compliance verification

