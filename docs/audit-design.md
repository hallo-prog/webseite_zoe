# Design Audit (Initial Skeleton)

## Ziele
- Alle bestehenden Farb-, Typografie- und Komponentenabweichungen identifizieren
- Basis für konsolidiertes Token-System

## Vorgehen (Geplant)
1. Farbextraktion aus `index.css`, Inline-Styles, Tailwind Klassen-Muster
2. Typografie: Headings, Paragraph, Lead, Button Textgrößen / Line Heights
3. Komponenten-Landschaft: Navigation, Hero, Buttons, Badges, Cards, Formulare, Testimonials, CTA Panels
4. Inkonsistenzen markieren (Farbtöne, Border Radius, Schatten, Abstände)
5. Ableitung vereinheitlichter Design Tokens

## Erste Beobachtungen (aktualisiert)
- Doppelte / überschreibende Amber-Klassen → Übergangs-Mapping auf Green/Navy (`.text-amber-*` wird gebrandet)
- Farbsystem aktuell Hybrid:
	- HSL Design Tokens: `--primary`, `--secondary`, semantic (`--accent`, `--muted` ...)
	- Brand Vars: `--brand-bg`, `--brand-accent`, `--brand-green`, `--brand-navy` etc.
	- Hardcoded HEX in Gradients (#0f1f33, #0f3d5c, #0fa5b3, #12b3c7, #18b364, #128a4d, #0d2a33)
- Buttons: Utilities vs. `.btn-primary`, `.btn-outline-primary` (uneinheitliche Padding/Radius)
- Radii uneinheitlich: `rounded-full`, `rounded-2xl`, `rounded-xl`, `rounded-lg`
- Shadows: Mischung aus Tailwind (`shadow-sm`, `shadow-lg`) + custom `box-shadow` (Lift Effekt)
- Typografie: zusätzliche ad-hoc Größen `text-[10px]`, `text-[11px]`, `text-[12px]`, Tracking-Werte variieren
- Mehrere Badge-Stile (`badge-soft`, dynamische Inline-Varianten im Hero)

## Gesammelte Farbcodes (erste Extraktion)
`#0f1f33`, `#0f3d5c`, `#0fa5b3`, `#12b3c7`, `#18b364`, `#128a4d`, `#0d2a33`, plus semantische abgeleitete Töne (`--brand-green-soft`, `--brand-green-pale`)

## Typografie Ad-hoc Größen
`text-[10px]`, `text-[11px]`, `text-[12px]` (Badge/Testimonial/Chips) → sollen in Scale Tokens überführt werden (z.B. `--font-size-xs`, `--font-size-2xs`)

## Radius / Shadow Patterns (Auszug)
- Radii: full / 2xl / xl / lg / default
- Shadows: `shadow-sm`, `shadow-lg`, individuelle Hover-Lift (translate & box-shadow)

## Nächste Schritte
1. Token Tabelle entwerfen (T1.1/T1.2) – Konsolidierung auf ein Set (Brand, Semantic, Neutral, State)
2. Ersetzen Hardcoded HEX → referenzierte CSS Vars
3. Utility-Klassen für Buttons/Badges standardisieren (`.btn-primary`, `.btn-secondary`, `.badge` Varianten)
4. Entfernen Amber-Mapping sobald alle Komponenten migriert
5. Typo-Skala definieren & Inline `text-[..]` reduzieren

