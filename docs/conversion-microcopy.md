# Conversion Micro Copy System (T2.8)

Ziel: Konsistente, klare, handlungsorientierte Micro-Texte (Buttons, Form, States, Helper) zur Reduktion kognitiver Reibung und Steigerung der Completion Rate.

---
## 1. Prinzipien
- Klar > Clever: Verben + konkreter Nutzen
- Kürze: Primäre Button Labels ≤ 24 Zeichen
- Einheitliche Groß-/Kleinschreibung (Satzanfang groß, Rest klein)
- Keine Doppel-CTAs mit identischem Ziel im gleichen Sichtbereich
- Fehler = Handlung + Ursache ("Bitte gültige PLZ eingeben")
- Positive Framing statt Drohungen

---
## 2. Button & CTA Token Matrix

| Kontext | Primär (`cta.primary.*`) | Sekundär (`cta.secondary.*`) | Tertiär/Text (`cta.text.*`) |
|---------|--------------------------|------------------------------|-----------------------------|
| Analyse Start | `cta.primary.analysis_start` = Analyse starten | `cta.secondary.analysis_learn` = Mehr erfahren | `cta.text.analysis_how` = Wie funktioniert das? |
| Lead Form Step | `cta.primary.next_step` = Weiter | `cta.secondary.prev_step` = Zurück | `cta.text.skip_optional` = Überspringen |
| Guide Download | `cta.primary.guide_download` = PDF herunterladen | `cta.secondary.guide_overview` = Inhalt ansehen | `cta.text.privacy_note` = Datenschutz |
| Beratung | `cta.primary.consult_request` = Termin anfragen | `cta.secondary.consult_process` = Ablauf ansehen | `cta.text.consult_alt` = Schriftlich anfragen |
| Speicher Check | `cta.primary.storage_check` = Speicher prüfen | `cta.secondary.storage_learn` = Mehr zum Speicher | `cta.text.storage_skip` = Später |
| Payback Szenario | `cta.primary.payback_calc` = Payback berechnen | `cta.secondary.payback_inputs` = Eingaben ändern | `cta.text.payback_method` = Methodik |
| CTA Final | `cta.primary.final_submit` = Individuelle Analyse anfordern | `cta.secondary.final_contact` = Kontakt aufnehmen | `cta.text.final_terms` = Konditionen |

---
## 3. Formular Feld Tokens

| Feld | Label (`form.label.*`) | Placeholder (`form.placeholder.*`) | Helper (`form.helper.*`) |
|------|------------------------|------------------------------------|---------------------------|
| Postleitzahl | `form.label.zip` = Postleitzahl | `form.placeholder.zip` = z.B. 12345 | `form.helper.zip` = Für regionale Einstrahlung |
| Jahresstromverbrauch kWh | `form.label.consumption` = Jahresstromverbrauch | `form.placeholder.consumption` = z.B. 4500 | `form.helper.consumption` = Schätzung reicht aus |
| Dachtyp | `form.label.roof_type` = Dachtyp | `form.placeholder.roof_type` = auswählen | `form.helper.roof_type` = Beeinflusst Montage |
| Neigung (°) | `form.label.roof_pitch` = Dachneigung (°) | `form.placeholder.roof_pitch` = z.B. 35 | `form.helper.roof_pitch` = Schätzung ok |
| E-Mail | `form.label.email` = E-Mail | `form.placeholder.email` = name@domain.de | `form.helper.email` = Ergebnis-Zusendung |
| Telefon | `form.label.phone` = Telefon (optional) | `form.placeholder.phone` = z.B. 0151 234567 | `form.helper.phone` = Für Rückfragen (optional) |
| Name | `form.label.name` = Name | `form.placeholder.name` = Max Mustermann | `form.helper.name` = Persönliche Ansprache |

---
## 4. Validierungs- & Fehlertexte

| Fehlerklasse | Token | Text |
|--------------|-------|------|
| Pflichtfeld leer | `form.error.required` | Bitte ausfüllen |
| E-Mail ungültig | `form.error.email` | Bitte gültige E-Mail eingeben |
| Zahl ungültig | `form.error.number` | Bitte Zahl eingeben |
| Postleitzahl ungültig | `form.error.zip` | Bitte gültige PLZ eingeben |
| Bereich zu klein | `form.error.min_value` | Wert zu niedrig |
| Bereich zu groß | `form.error.max_value` | Wert zu hoch |
| Unbekannter Fehler | `form.error.generic` | Unerwarteter Fehler – später erneut versuchen |

Inline Fehler-Platzierung: Direkt unter Feld, gleiche Zeilenhöhe vermeiden; Rolle `aria-live="polite"`.

---
## 5. Fortschritt & Status

| Use Case | Token | Text |
|----------|-------|------|
| Schritt X/Y | `form.progress.step` | Schritt {current} von {total} |
| Laden | `status.loading` | Wird geladen… |
| Speichern | `status.saving` | Speichert… |
| Erfolg (Analyse Anfrage) | `status.success.analysis` | Anfrage erhalten – wir bereiten Ihre Analyse vor. |
| Erfolg (Guide Download) | `status.success.guide` | Download gestartet. |
| Fehlgeschlagen Submit | `status.fail.submit` | Senden fehlgeschlagen – bitte erneut versuchen. |

---
## 6. Helper / Tooltip Muster

Pattern: (i)-Icon mit `aria-label` + `data-tooltip` Text, Fallback reine Text-Hilfe unter Feld.

| Kontext | Token | Text |
|---------|-------|------|
| Verbrauch | `tooltip.consumption` | Abschätzung reicht – genaue Zahl später möglich |
| Dachneigung | `tooltip.roof_pitch` | 30–40° typisch – Schätzung genügt |
| Speicher | `tooltip.storage` | Speicher optional – Entscheidung nach Analyse |
| Telefon | `tooltip.phone` | Hilft bei Rückfragen zur Präzisierung |

---
## 7. Inline Motivations-Snippets

Leichte Conversion Nudges zwischen Schritten.

| Position | Token | Text |
|----------|-------|------|
| Nach Schritt 1 | `nudge.after_step1` | 40% geschafft – gleich sehen Sie Ihr Potenzial. |
| Nach Schritt 2 | `nudge.after_step2` | Nur noch wenige Angaben für Ihre Prognose. |
| Vor Submit | `nudge.before_submit` | Letzter Schritt – dann erhalten Sie die Analyse. |

---
## 8. Barrierefreiheit & UX Regeln
- Ein Fokus-Style für alle interaktiven Elemente (bereits Tokens definiert)
- `aria-describedby` koppelt Felder mit Helper & Fehler IDs
- Nie ausschließlich Farbe zur Fehler-Kennzeichnung – Icon + Text
- Loading States verhindern Doppel-Submit (Button disabled + Spinner ARIA Label)

---
## 9. Internationalisierung
- Platzhalter & Fehlertexte sprachneutral tokenisiert
- Numerische Placeholder an lokale Formatierung anpassen (Intl)
- Variablen: `{current}`, `{total}`, `{value}` strikt geklammert

---
## 10. Implementierung To-Do (Phase 3/4)
1. Datei `src/copy/form.json` + `copy/cta.json` + `copy/status.json`
2. Utility `getCopy(key)` mit Fallback & Warnung bei fehlendem Key
3. Form Komponenten erhalten Prop `messages?` für Override
4. Validation Layer mappt interne Fehlercodes → Tokens

---
## 11. Qualitätskriterien T2.8
- [x] CTA/Buttons abgedeckt
- [x] Form Labels & Placeholder
- [x] Fehler- & Statusmeldungen
- [x] Nudges / Helper / Tooltips
- [x] I18n & A11y Regeln

Status: Fertig.

---
## 12. Nächste Schritte (Übergang Phase 3)
Start Section Library (T3.1) – technische Skeletons + Copy Injection über Props.
