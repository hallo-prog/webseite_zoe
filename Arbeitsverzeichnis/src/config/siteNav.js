// Zentrale Navigations- & Footer-Konfiguration
// Übersetzungen: Labels nutzen i18n Keys wo sinnvoll; Fallback plain text.

export const NAV_PRIMARY = [
  {
    type: 'megamenu',
    id: 'why', // t('nav.why')
    leftRail: {
      title: 'Schnelleinstieg',
      items: [
        { label: 'Warum ZOE', desc: 'Unser Versprechen – fair und schriftlich', to: 'WhyUs', badge: 'Neu' },
        { label: 'Technologie', desc: 'Komponenten & Auslegung', to: 'Technology' },
        { label: 'Projekte', desc: 'Referenzen aus der Praxis', to: 'Projects' }
      ]
    },
    items: [
      { kicker: 'Kaufentscheidung', title: 'Festpreis & Fixtermin', desc: 'Was heißt Festpreis bei uns wirklich?', cta: 'Mehr erfahren', to: 'WhyUs' },
      { kicker: 'Technik', title: 'PV + Speicher richtig dimensionieren', desc: 'Konservativ gerechnet statt Schönwetter.', cta: 'Zur Technologie', to: 'Technology' },
      { kicker: 'Service', title: 'Wartung & Monitoring', desc: 'Dokumentierte Übergabe & echter Support.', cta: 'Zum Service', to: 'Service' },
      { kicker: 'Rechner', title: 'Ersparnis/ROI in 30 Sek.', desc: 'Spanne statt Wunschzahl, ohne Pflichtfelder.', cta: 'Rechner öffnen', to: 'Calculator' }
    ],
    highlight: { kicker: 'Start', title: 'In 30 Sek. zur Solarsparzahl', desc: 'Konservativ gerechnet. Ohne Druck.', cta: 'Jetzt prüfen', to: 'Calculator' },
    image: { src: '/homepage/herosection/photovoltaic-8156008_1920.jpg', alt: 'PV-Anlage' }
  },
  { type: 'link', id: 'blog', label: 'Ratgeber', to: 'Blog' },
  { type: 'link', id: 'pricing', label: 'Preise', to: 'Pricing' },
  { type: 'link', id: 'projects', label: 'Projekte', to: 'Projects' }
];

export const FOOTER_COLUMNS = [
  {
    type: 'product',
    title: 'Produkt',
    kpi: 'Ø 9–11 J. Payback',
    links: [
      { label: 'Solarrechner', to: 'Calculator' },
      { label: 'Technologie', to: 'Technology' },
      { label: 'Service & Wartung', to: 'Service' },
      { label: 'Preise', to: 'Pricing' }
    ]
  },
  {
    type: 'resources',
    title: 'Ressourcen',
    links: [
      { label: 'Ratgeber', to: 'Blog' },
      { label: 'Kostenloser Guide', to: 'Guide' },
      { label: 'FAQ', to: 'Faq' },
      { label: 'Projekte', to: 'Projects' }
    ]
  },
  {
    type: 'company',
    title: 'Unternehmen',
    links: [
      { label: 'Warum ZOE', to: 'WhyUs' },
      { label: 'Über Uns', to: 'About' },
      { label: 'Erfolgsgeschichten', to: 'SuccessStories' },
      { label: 'Kontakt', to: 'Contact' }
    ]
  }
];

export const FOOTER_META_LINKS = [
  { label: 'Impressum', to: 'Imprint' },
  { label: 'Datenschutz', to: 'Privacy' }
];
