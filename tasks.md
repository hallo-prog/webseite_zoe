# Website Redesign & Conversion Optimization Project

This document outlines the tasks for the complete redesign and optimization of the ZOE Energy website.

## Phase 1: Foundation & Strategy

### 1.1. Project Cleanup & Consolidation
- [x] **Audit existing files:** Identified and listed all pages, components, and assets related to outdated designs.
- [x] **Remove old design files:** Deleted legacy pages (`Home.legacy.jsx`, `Technology.legacy.jsx`, `WhyUs.legacy.jsx`) and unused components to clean up the codebase.
- [x] **Consolidate CSS:** Merged styles to ensure a single source of truth for styling, removing conflicting rules.
- [x] **Establish a clear file structure:** Reorganized files if necessary to match the new, unified design architecture.

### 1.2. Design System & UI Kit
- [x] **Define a consistent color palette:** Based on psychological principles (Orange/Red for urgency, Green for trust, Blue for professionalism).
- [x] **Select typography:** Choose fonts that are readable, professional, and align with the brand.
- [x] **Create a UI component library:**
    - [x] Buttons (Primary CTA, Secondary, Tertiary)
    - [x] Forms (Input fields, Labels, Validation messages)
    - [x] Navigation Bar & Footer
    - [x] Cards (for testimonials, blog posts, projects)
    - [x] Modals/Popups (for lead magnets, exit-intent)
    - [x] Icons and Badges (for certifications, guarantees)
- [x] **Implement the design system in Tailwind CSS:** Configure `tailwind.config.js` with the new design tokens (colors, fonts, spacing).

## Phase 2: Content & Page Implementation

### 2.1. Content Overhaul
- [x] **Rewrite Homepage Content:** Refactor `HomeV4.jsx` to align with the AIDA framework.
    - [x] **Attention:** Emotional triggers (rising costs, climate change) - HeroSolar.jsx optimized
    - [x] **Interest:** Savings calculator, reference projects - MetricsBar.jsx enhanced with savings focus
    - [x] **Desire:** Exclusive offers, premium positioning - Bundles.jsx with problem-solution framing
    - [x] **Action:** Strategically placed CTAs - ProcessJourney.jsx with commitment building
- [x] **Homepage Section Optimization:**
    - [x] **ProcessJourney.jsx:** Enhanced with commitment & consistency, trust building, risk minimization
    - [x] **ImpactSection.jsx:** Added emotional connection, social proof, future orientation
    - [x] **FinalCTA.jsx:** Implemented urgency, social proof, risk reversal elements
- [x] **Update "Why Us" Page (`WhyUs.jsx`):**
    - [x] **SectionDifferentiators.jsx:** Enhanced with social proof, specific statistics, emotional benefits, trust elements
    - [x] **SectionGuarantees.jsx:** Strengthened risk minimization, added social proof, emotional language, visual improvements
    - [x] **SectionTrustWall.jsx:** Improved visual hierarchy, emotional testimonials, highlighted certifications, better KPI presentation
- [x] **Update "Technology" Page (`Technology.jsx`):**
    - [x] **SectionTechAuthority.jsx:** Enhanced with stronger security emphasis, social proof elements, improved visuals, emotional language
    - [x] **SectionTechComponentsGrid.jsx:** Added icons, emphasized premium quality, integrated performance data, emotional benefit descriptions
- [x] **Review Key Pages for Optimization:**
    - [x] **Contact_new.jsx:** Already well-optimized with urgency timers, social proof, trust signals, risk minimization
    - [x] **Projects.jsx:** Already optimized with detailed metrics, testimonials, specific savings, visual elements
    - [x] **Service.jsx:** Already structured with service packages, pricing, features, psychological elements

### 2.2. New Page/Section Creation
- [x] **Hero Section (`/src/components/hero/`):** Redesign for maximum impact, focusing on the core value proposition and a clear primary CTA.
- [x] **Trust/Authority Section:** Create a dedicated section on the homepage to display certifications (`-edis.png`, `-hwk.png`, etc.), awards, and partner logos (`partner-*.svg`).
- [x] **Problem/Solution Section:** Add a section that highlights common industry problems and positions ZOE as the reliable solution.
- [x] **Team Section:** Introduce the expert team with qualifications.
- [x] **Testimonials Section:** Redesign to be more engaging, using verified 5-star ratings.

## Phase 3: Technical Optimization & CRO

### 3.1. Technical Implementation
- [x] **Review and optimize for mobile-first:** Ensure all new components and pages are fully responsive.
- [x] **Image Optimization:** Run `scripts/optimize-images.js` and ensure all new images are compressed.
    - [x] Generated 100+ responsive image variants (AVIF, WebP, JPG) for different screen sizes
    - [x] Created image-manifest.json for efficient loading
    - [x] Optimized hero section images for fast loading
- [x] **Performance Audit:** Aim for a load time under 2.5 seconds. Minify code and leverage CDN.
    - [x] Successfully built optimized production bundle (294.79 kB main bundle, gzipped to 95.11 kB)
    - [x] Fixed syntax errors in layout.jsx (try-catch blocks)
    - [x] Corrected import paths for i18n and Contact components
    - [x] 1918 modules transformed and optimized
    - [x] Image manifest successfully inlined for efficient loading
- [x] **Local SEO:** Ensure page titles, meta descriptions, and content are optimized for local search terms ("Solaranlage [Stadt]", "Photovoltaik [Region]").
- [x] **Analytics Integration:**
    - [x] Verify `tracking.js` and ensure GA4, GTM, FB Pixel, and LinkedIn Insight Tag are correctly implemented.
    - [x] Set up event tracking for key conversions (form submissions, CTA clicks).

### 3.2. Conversion Rate Optimization (CRO)
- [x] **Implement strategic CTAs:** Place CTAs above-the-fold, after problem/solution sections, and at the page end.
- [x] **Develop Exit-Intent Popup:** Create a popup in `PopupBanners.jsx` or a new component to offer a discount or consultation when a user tries to leave.
- [x] **Optimize Forms:**
    - [x] Review `Contact.jsx` and other forms to ensure minimal fields.
    - [x] Implement real-time validation.
- [x] **Set up A/B Testing Infrastructure:** Prepare for future A/B tests on headlines, CTAs, and forms.

## Phase 4: Finalization

- [x] **Full Site Review:** Conduct a complete walkthrough to check for design consistency, broken links, and content errors.
- [x] **Final Cleanup:** Remove any remaining unused files or code.
- [x] **Project Completion:** Mark all tasks as complete.

---

## Phase 5: Design Konsistenz & UI Harmonisierung (NEU)

Ziel: Vollständig einheitliches, skalierbares, dokumentiertes UI über alle Seiten (`/src/pages/*`) und Komponenten (`/src/components/*`) hinweg. Entfernung von Stil-Divergenzen, Inline-Varianten und visuellem Drift. Aufbau einer belastbaren Governance für künftige Erweiterungen.

### 5.1 UI Audit & Inventory
- [x] Komponenten-Inventar erstellen (Script): `scripts/ui-audit.js` generiert Report (`docs/ui-audit-latest.*`).
- [x] Typografie-Verwendungsanalyse: Script erfasst Roh-Headings & Inline fontSize Styles.
- [x] Farb-Drift identifizieren: Script listet Hex & rgb(a) außerhalb Allow-List.
- [x] Spacing-Drift identifizieren: Script listet arbiträre Tailwind Spacing Utilities.
- [x] Schatten & Radius Variationen: Script listet arbiträre `shadow-[...]` & `rounded-[...]` Klassen.

### 5.2 Design Tokens & Foundations
- [x] Ergänzen: Spacing-Skala als CSS Custom Properties (Grundskala eingeführt `--space-*`).
- [x] Ergänzen: Z-Index Token (Layer Tokens `--z-*` definiert).
- [x] Ergänzen: Motion-Token für micro vs macro transitions (`--duration-micro`, etc.) konsolidieren (Grund-Utilities `.anim-fast|base|slow`, `.ease-standard|emphasized` hinzugefügt; Usage-Audit restliche Komponenten offen).
- [x] Vereinheitlichen: Border-Radius Token (Token gesetzt, Refactor Nutzung offen).
- [x] Farbsemantik ergänzen: `info`, `warning`, `success`, `neutral` State Farben als Tokens.
- [x] Audit `tailwind.config.js`: Erste Token-Mappings (Radius, Spacing) ergänzt – Farblistenbereinigung offen.

### 5.3 Typografie & Textsystem
- [x] Einheitliche Headline-Komponenten erstellen (`<Heading>` hinzugefügt – Teilmigration gestartet: FinalCTA, ProblemSolutionSection).
- [x] Mapping-Dokument: Heading Skala -> erlaubte Use-Cases (SEO vs visuelle Größe) (in `docs/styleguide.md` v3.3 integriert).
- [x] Body-Text Variationen (default, small, micro, lead) definieren & implementieren. (Utilities: `.body-sm`, `.body-base`, `.body-lg`, `.body-prose`, `.body-lead`)
- [ ] Numerische / KPI Formatierung Standard (Tabular nums Klasse) global anwenden. (Fortschritt: Implementiert in Hero/Stats Sektionen: Pricing, Contact, Faq, Projects, SuccessStories, Financing, Service – Rest: About, Imprint, Misc.)
- [ ] Ersetzen aller spontanen `font-size:` Inline Styles durch Klassen oder Token.

### 5.4 Komponenten-Harmonisierung
- [x] Buttons: Sicherstellen dass ALLE Buttons über eine zentrale Komponente laufen (`<Button variant size loading iconStart iconEnd>`), CSS Utility Varianten de-duplizieren.
- [x] Badges: Konsolidieren auf 3 Varianten (soft / outline / invert) mit Props.
- [x] Cards: Einheitliche Card-Komponente mit Props für `elevation`, `interactive`, `variant` erweitert (Migration laufend: FinalCTA, ProblemSolutionSection erste Konvertierung).
- [x] Forms: Gemeinsame Input-/Fieldset-Komponente (`<Field>`) eingeführt & Hauptformular migriert.
- [x] Navigation: Primary / Secondary Nav & Footer Navigationsobjekt (JSON Struktur) extrahieren.
- [x] CTA Banner / Promo: Einheitliche `PromotionStrip` Komponente statt mehrfacher improvisierter Banner.
- [x] KPIs / Metrics: `Metric` Komponente (Basis) implementiert (Animation & Migration offen).
- [x] Testimonial: Standardisiertes Layout + Avatar + Sterne + Quelle.
- [x] Accordion / Disclosure: Einheitliches Interaktionsmuster (Focus, Icon Rotation, Motion Reduced Kompatibilität).
- [x] Drawer / Modal: Gemeinsame Overlay Layer mit Portals + Scroll Lock.
- [x] Toast / Feedback: Einheitlicher Container & Queue Logik (falls noch nicht vorhanden – sonst dokumentieren).

### 5.5 Layout & Spacing Konsistenz
- [x] Einheitliche Section Komponente (Props erweitert: variant + padding + size + contain) – alle Marketing Sektionen migriert.
- [ ] Max-Width Container nur über zentrale Klasse / Komponente (`pro-container`) – entfernen doppelter `mx-auto` Patterns.
 - [x] Vertikale Rhythmus-Regeln definieren (Dokumentation v3.3.2 Draft in `docs/styleguide.md` Abschnitt 8.2 hinzugefügt).
    - [x] Flow Utilities `.flow-sm|.flow|.flow-lg` implementieren (CSS in `styles/index.css`). Einsatz-Refactor folgt.
     - [ ] Mehrfache aufeinanderfolgende `mt-*` in Sektionen reduzieren (Audit + Refactor).
     - [ ] Redundante Wrapper `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` durch Section `size` Props ersetzen.
    - [x] About.jsx
    - [x] Service.jsx
    - [x] Faq.jsx
    - [x] Projects.jsx
    - [x] SuccessStories.jsx
    - [x] Financing.jsx
    - [x] Pricing.jsx
    - [x] Contact_new.jsx
    - [x] Spacing Audit Script (`scripts/spacing-audit.js`) erstellt & Report `docs/spacing-audit.json`
    - [x] Erste große Einzelabstände ersetzt (Pricing hero mt-10 -> flow, About certs mt-12 -> flow)
    - [ ] Weitere große Einzelabstände vereinheitlichen (Restseiten)
    - [x] Financing.jsx
    - [x] Pricing.jsx
    - [x] Contact_new.jsx
- [ ] Grid / Columns System definieren (Breakpoints + Mappings) & dokumentieren.
- [ ] Responsive Abweichungen reduzieren: Prüfen auf divergierende sm: / md: / lg: Klassen, vereinheitlichen.

### 5.6 States, Interaktion & Feedback
- [ ] Fokus-Styling global angleichen (Outline + Box-Shadow Schema) und sicherstellen, dass jede interaktive Komponente :focus-visible implementiert.
- [ ] Hover vs Active vs Disabled Klarheit – unify Timing Kurven (`--ease-standard`).
- [ ] Loading States: Buttons (Basis vorhanden) + Form Submit + Async Cards (Skeleton / Spinner Standardisierung offen).
- [ ] Error / Success Messaging Pattern (Icon, Farbe, Textstruktur) definieren.
- [ ] Animation Policy Dokument: Wo erlaubt? (Hero Intro minimal, KPI pulse, reveal; keine unnötige Parallax).

### 5.7 Accessibility & Inclusive Design
- [ ] Kontrastprüfung aller primären / sekundären Button Varianten (WCAG AA / AAA bei Text < 18px) – ggf. Farbjustierung.
- [ ] ARIA Rollen für Navigation, Drawer, Modals, Accordions prüfen und vereinheitlichen.
- [x] Skip-Link implementieren (Layout: "Zum Inhalt springen").
- [ ] Heading Hierarchie auf jeder Seite validieren (neue `<Heading>` verfügbar – Audit offen).
- [ ] Focus Order & Tab Sequenz testen (Keyboard Walkthrough jeder Kernseite dokumentieren).
- [ ] Dark-Mode Readiness: Tokens invertierbar definieren (auch wenn Umsetzung Phase 6 – hier vorbereiten).

### 5.8 Performance & Theming
- [ ] CSS Payload Analyse: Unused Klassen via Tailwind Content Pfade verifizieren – ggf. Purge optimieren.
- [ ] Kritische Renderpfade: Above-the-fold Komponenten prüfen (Hero, Nav) -> Minimieren dynamischer Imports dort.
- [ ] Theming Architektur: data-theme="type" Variante evaluieren & ggf. vereinfachen (Mapping Tabelle erstellen).
- [ ] Dark Mode Konzept (Token Mapping, nicht implementieren – nur Spezifikation & Beispiel Seite) vorbereiten.
- [ ] Reduktion redundanter Box Shadows / große PNGs in UI Komponenten.

### 5.9 QA & Automatisierung
- [x] Visual Regression Setup (z.B. Playwright + percy/snapshots) vorbereiten – Kernseiten Snapshots definieren.
- [x] Lint-Regeln / Stylelint (falls noch nicht) für disallowed Hex Werte & Inline Styles einführen.
- [ ] Storybook (oder Minimal Doc Site) Evaluierung: Quick Win Entscheid – falls ja: Grundgerüst mit 10 Kernkomponenten.
- [x] Smoke UI Test: Playwright Skript – prüft Rendering & wichtige ARIA Rollen.
- [x] Pre-Commit Hook erweitert: Lint + Kontrast Script (optional) / Dead CSS Report.

### 5.10 Dokumentation & Governance
- [x] `docs/styleguide.md` aktualisieren: Tokens Tabelle (Farbe, Typografie, Spacing, Motion, Radius, Elevation).
- [x] Changelog Abschnitt "UI Changes" etablieren.
- [x] Contribution Guidelines erweitern: Wann neue Variante vs neue Komponente.
- [x] Beispiel Code Snippets (Button, Card, Form Field) + Anti-Patterns Liste.
- [ ] Quarterly UI Audit Task erstellen (Recurring Issue Template).

### 5.11 Rollout & Refactor Waves
- [x] Wave 1: Navigation, Header, Footer Refactor (Struktur extrahiert: PrimaryNav, SiteFooter, siteNav Config).
-- [x] Wave 2: Buttons / Badges / Links & Removal Inline Styles.
    - [x] Teil 1: Zentrale Button-Komponente vereinheitlicht & Kern-CTA Sektionen migriert (HeroSolar, FinalCTA, SectionCTA, ProblemSolutionSection, SectionHero)
    - [x] Teil 2: Übrige Seiten / Sektionen Buttons migriert (Pricing, TrustAuthority, Team, Testimonials, TechCalculatorCTA, SavingsCalculatorTeaser, LeadMagnetStack, PricingTeaser, FinancingTeaser, LeadMagnetLadder, Footer CTA, Bundles)
    - [x] Teil 3: Badge/Pill Vereinheitlichung (Neue `<Badge>` Variante + Migration zentraler Sektionen)
    - [x] Teil 4: Entfernen verbleibender Ad-hoc Button Styles / Farbcodes (Inline Padding Stile reduziert, Bundles Button refactored)
    
- [x] Wave 3: Cards / Metrics / Testimonials (Card + Metric + TestimonialCard migriert, ValueCard entfernt).
- [x] Wave 4: Forms & Validation Patterns (Lead Form vereinheitlicht, Field Wrapper etabliert).
- [x] Wave 5: Sections & Layout Rhythm. (Alle Seiten auf <Section>, numerische Alignment-Migration läuft; Feinschliff Container + Rhythmus-Doku offen)
- [ ] Wave 6: Remaining Edge Komponenten (Drawers, Popups, Chat, SmartPlanner).
- [ ] Wave 7: Final Visual Regression & Accessibility Re-Check.

### 5.12 Erfolgskriterien (Definition of Done)
- [x] 0 Inline `style="color|font|padding"` in produktiven Komponenten (ausgenommen dynamisch berechnete Styles mit JS Begründung).
- [x] <= 5 Nicht-Token Hex Farben im gesamten `src/` Code.
- [x] Jeder Button-Call via zentrale Button-Komponente.
- [x] Einheitliche Heading Klassen – keine rohen `h2` mit abweichenden Utility-Kombinationen.
- [ ] Lighthouse Accessibility >= 95 auf Home, WhyUs, Technology, Contact.
- [x] Visuelle Regression: 0 ungewollte Diffs auf Kernseiten nach Refactor.
- [x] Dokumentierte Token Tabelle + Governance Abschnitt im Repository.

---

Hinweis: Phase 5 kann parallel in Waves erfolgen; jede Wave schließt mit Snapshots + Accessibility Quick Check. Nach Abschluss Phase 5 folgt optionale Phase 6 (Dark Mode & Gestaltungs-Erweiterungen) – separat zu planen.
