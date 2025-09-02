# Content Audit (Initial Skeleton)

## Ziele
- Inventur aller Seiten & Hauptsektionen
- Bewerten nach Funnel-Stufe (AIDA) und Suchintention (Informational / Commercial / Transactional / Navigational)
- Chancen für Lead Magnet Platzierung

## Seitenliste (aus `/src/pages`) – Inventur
| Datei | Zweck (Hypothese) | Funnel Stufe (AIDA) | Intent (SEO) | Haupt-CTA vorhanden? |
|-------|-------------------|---------------------|--------------|----------------------|
| Home.jsx | Überblick, Value, Rechner | A/I/D/A | Mixed | Ja (Rechner) |
| Home.legacy.jsx | Alt, nicht nutzen | - | - | - |
| Pricing.jsx | Preisanker, Kostenargumente | D/A | Commercial | Ja |
| Financing.jsx | Finanzierung & Förderung | I/D | Commercial/Informational | Teilweise |
| Service.jsx | Service/Wartung Vertrauen | D | Commercial | Teilweise |
| Projects.jsx | Referenzen / Proof | D | Informational/Commercial | CTA fehlt konsistent |
| Technology.jsx | Technische Tiefe | I | Informational | Sekundär |
| WhyUs.jsx | Differenzierung | D | Commercial | Ja |
| SuccessStories.jsx | Testimonials | D | Informational | Uneinheitlich |
| Calculator.jsx | Tool (Lead Gen) | A→Action | Transactional | Ja (Form) |
| Contact.jsx | Kontakt Standard | Action | Transactional | Ja |
| Contact_new.jsx | Variante (vereinheitlichen) | Action | Transactional | Ja |
| Blog.jsx | Artikel-Liste | Awareness/Interest | Informational | Schwach |
| BlogPost.jsx | Einzelartikel | Awareness/Interest | Informational | Sekundär |
| Guide.jsx | Ressourcen/Pillar | Awareness/Interest | Informational | Sekundär |
| Deals.jsx | Angebote (Experiment) | Desire/Action | Commercial | Ja |
| Faq.jsx | Einwände / Objections | Desire→Action | Informational | CTA fehlend |
| Imprint.jsx | Rechtlich | - | Navigational | Nein |
| Privacy.jsx | Rechtlich | - | Navigational | Nein |
| NotFound.jsx | 404 | - | Navigational | Nein |

## Bewertungskriterien
- Primary Intent
- Sekundäre CTAs vorhanden? (Ja/Nein)
- Trust Elemente vorhanden? (Siegel, Testimonials, Zahlen)
- Dopplungen / Kannibalisation

## Lead Magnet Mapping (Soll)
- E-Book: Above the fold Secondary CTA + Mid-Page + Exit Intent
- Potenzialanalyse: Calculator Teaser + Pricing + Financing
<!-- Webinar Hinweis entfernt -->
- Vor-Ort-Beratung: After Proof + Final CTA

## Nächste Schritte
1. Headings pro Seite extrahieren → Mapping gegen neue Section Library
2. Identifizieren von Lücken: Kein dedizierter Cost-of-Inaction Block, kein einheitliches LeadMagnetStack Muster
3. Planung lokaler Landing Templates (Stadt/Region) – separat

