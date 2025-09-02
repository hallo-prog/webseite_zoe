# Technisches Audit (Initial Skeleton)

## Ziele
- Performance Basislinie erfassen
- Unnötigen Code / Duplicate Bundles identifizieren
- Potenziale für Tree Shaking / Code Splitting

## Beobachtungen (aktualisiert)
- `React.lazy` für Support/Service Drawer vorhanden – weitere Seitenmodule können nachgezogen werden
- Hero Assets mehrfach in Varianten (jpg/webp/avif) – prüfen, ob alle Breakpoints sinnvoll; evtl. Duplikate entfernen
- Tailwind Config `content` deckt `./src/**/*.{js,jsx}` ab – Purge okay
- Keine Webfont Blocking Ressourcen (Systemstack) → Performance Vorteil
- Icons: `lucide-react` Einzelimporte (okay), aber Menge prüfen für Bundle Größe

## ToDo Sammlung
- Bundle Size messen (vite build --analyze) – optional Plugin
- LCP Kandidaten Bild definieren & Preload Tag
- Fonts: aktuell System-Stack → gut (keine Blocking Webfont)
- Prüfen: Werden schwere Icons-Bundles importiert? (lucide-react viel einzeln?)

## Potenzielle Quick Wins
1. Bildset konsolidieren: Primär AVIF + WebP Fallback, JPEG nur bei Qualitätsgewinn
2. Hero LCP Bild preloaded + fest definierte Dimensionen
3. Weitere Sections via `React.lazy` & `viewport` trigger laden (Objections, Testimonials, FAQ)
4. Unkritische Gradients optional via CSS Paint Delay / reduziert
5. Dedizierter `analytics.ts` Loader nach Consent (Defer)

