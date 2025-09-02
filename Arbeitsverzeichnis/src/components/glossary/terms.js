// Zentrale Glossarbegriffe – kann später aus CMS kommen
export const GLOSSARY_TERMS = [
  { term: 'kWp', pattern: /\bkWp\b/g, description: 'Kilowatt peak – maximale Leistungsabgabe des PV-Systems unter Standard-Test-Bedingungen.' },
  { term: 'Eigenverbrauch', pattern: /Eigenverbrauch/g, description: 'Direkte Nutzung des erzeugten Solarstroms im eigenen Objekt statt Einspeisung.' },
  { term: 'Autarkie', pattern: /Autarkie/g, description: 'Prozentualer Anteil Ihres Strombedarfs, den Sie selbst decken.' },
  { term: 'ROI', pattern: /ROI/g, description: 'Return on Investment – Zeit bis sich die Investition durch Einsparungen amortisiert.' },
  { term: 'Amortisation', pattern: /Amortisation\w*/g, description: 'Zeitspanne bis die Kosten durch Einsparungen gedeckt sind.' },
  { term: 'Förder', pattern: /Förder\w*/g, description: 'Öffentliche finanzielle Unterstützung (Zuschüsse, Kredite) zur Reduktion der Investitionskosten.' }
];
