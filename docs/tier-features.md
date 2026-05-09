# Funzionalità per Tier — PediaApp Telemedicina Torino

Tre livelli di template per pediatra digitale, dalla telemedicina base alla crescita tracker AI e vaccinazioni MIUR.

## Tier Base — €500-800 (consegna 2-3 settimane)

**Per chi**: Pediatra che vuole telemedicina pay-per-view senza rischi GDPR.  
**Sforzo stimato**: ~120h.

### Funzionalità incluse

- **Home Hero** con foto studio + CTA "Prenota Visita Pediatra"
- **Profilo Medico**
  - Laurea + specializzazione pediatria + iscrizione FNOMCeO
  - Curriculum + ospedali affiliati
  - Aree expertise (vaccini, allattamento, allergie)
  
- **Booking Telemedicina**
  - Calendario visita realtime
  - Slot 15min selezionabili (brevi consultazioni)
  - Conferma email + SMS genitori
  - €20-60 consulto per fascia oraria
  
- **Genitori Portal Semplice**
  - Login doppio consenso (padre + madre chiavi separate)
  - Cronologia consultazioni
  - E-prescription PDF scaricare
  
- **GDPR Art.8 + Art.9 Rigoroso**
  - Consenso doppio genitori obbligatorio
  - NO recording video (solo audio con consenso)
  - Data retention policy (auto-delete 12 mesi)
  - Minor's data protection notice
  
- **Schema MedicalBusiness JSON-LD** per SEO
- **Mobile-first responsive** (LCP <2.5s)
- **HTTPS + SSL certificate** gratis Let's Encrypt

### Cosa NON è incluso

- Crescita tracker WHO
- Vaccinazioni MIUR
- Foto eruzioni con triage
- Triage AI notturno
- Diario medico voce
- Telemedicina notturna recording

---

## Tier Intermedio — €1.500-2.200 (consegna 4-6 settimane)

**Per chi**: Pediatra consolidato che vuole tracciamento crescita e gestione vaccinazioni.  
**Sforzo stimato**: ~280h.

### Funzionalità incluse (oltre al Base)

- **Crescita Tracker AI**
  - Inserire peso/altezza per visit
  - WHO percentile curves calcolate automatiche (0-18 anni)
  - Alert sottopeso (<10° percentile)
  - Trend visualization crescita
  - Correlazione nutrizione vs growth
  
- **Vaccinazioni MIUR**
  - Calendario ufficiale MIUR per età
  - Inserimento vaccini somministrati
  - Alert prossimo vaccino (sms reminder 2 sett prima)
  - Certificato vaccinazione PDF per scuola
  - Dati sincronizzabili con Anagrafe Vaccinale Nazionale
  
- **Foto Eruzioni Triage Semplice**
  - Genitori caricano foto eruzioni
  - Skin triage semplice: rosso/giallo/verde
  - Yellow/Red alert pediatra review
  - Recommendation "call dermatologo" o "monitorare"
  
- **Diario Medico Genitori**
  - Genitori annotano sintomi (febbre, tosse, eruzioni)
  - Voice-to-text Whisper (note audio rapidissime)
  - Export settimanale per review pediatra
  - Correlazione sintomi vs diagnosi
  
- **E-Prescription QR Code**
  - Firma digitale PKIX pediatra
  - QR code ricetta per farmacia IT
  - Storage protetto + archive
  
- **Parent App Mobile**
  - Download iOS/Android
  - Accesso single-sign-on con browser
  - Push notification reminder vaccini
  
- **Multi-lingua IT/EN/AR** (comunità immigrate)
- **Newsletter opt-in** consigli pediatrici

### Integrazioni disponibili

| Stack | Costo/anno | Note |
|-------|-----------|------|
| Zoom API | €229/anno pro | Telemedicina |
| Stripe | 1.4% + €0.30 per transazione | Payment processor |
| SendGrid Email | Free (100/giorno) | Newsletter |
| Yousign | €15-30/mo | E-prescription PKIX |
| Whisper Ollama | €0 | Voice-to-text |

---

## Tier Avanzato — €4.000-6.000 (consegna 10-12 settimane)

**Per chi**: Pediatra digitale innovativo con alto volume pazienti 2000+ e esigenze AI avanzate.  
**Sforzo stimato**: ~500h.

### Funzionalità incluse (oltre all'Intermedio)

- **Foto Eruzioni LLaVA Triage Avanzato**
  - LLaVA auto-detects eruzioni cutanee
  - Scoring: rosso (urgent) / giallo (follow-up 24h) / verde (monitor)
  - Alert pediatra se rosso per escalation dermatologo
  - Educational label (varicella / morbillo / dermatite)
  - GDPR minori: foto cancellate auto 48h post-review
  
- **Triage AI Notturno MIUR**
  - Ollama prompt con linee guida MIUR ufficiali
  - Genitori inseriscono sintomi (febbre + tosse + eruzioni)
  - AI raccomanda: monitorare / call pediatra / call 112
  - NO diagnosi, solo risk stratification
  - 24/7 disponibile
  
- **Crescita + Nutrizione Tracker**
  - WHO percentile curves
  - BMI ranges per età
  - Nutrizione logging (quantità latte/svezzamento)
  - LLaVA suggerisce alimentazione se risk malnutrizione
  
- **Laboratorio Integrazione**
  - Referral automation per esami ematochimici
  - Risultati sync via API laboratorio
  - Interpretazione AI per pediatra (RBC count, albumina)
  - Trend tracking 6-12 mesi
  
- **Advanced Parent Portal**
  - Video explainer patologie comuni (varicella, otite, gastroenterite)
  - Red flag checklist (quando call 112)
  - Medication reminder (amoxicillina ogni 8h per 7 giorni)
  - Growth milestone tracker (primo sorriso, primo passo)
  
- **Doppio Consenso Enforcement**
  - Sistema firma digitale entrambi genitori (padre + madre)
  - Alert se solo uno genitore accede (notify altro)
  - Segregation dato (padre vede solo sanitario + vaccinazioni)
  - Legal audit trail per GDPR compliance
  
- **Advanced Analytics**
  - Diagnosi frequency (otite €120 vs gastroenterite €80)
  - Vaccination compliance rate per paziente
  - Growth outcome (% pazienti raggiungono target percentile)
  - Churn prediction (pazienti abbandono dopo visita)

### Integrazioni Enterprise

| Stack | Costo/anno | Note |
|-------|-----------|------|
| Ollama AI (on-prem) | €0 | LLaVA eruzioni + Whisper + triage |
| Zoom API | €229/anno | Telemedicina enterprise |
| Yousign | €15-30/mo | E-signature PKIX |
| Lab API Integration | Variable | Risultati ematochimici |
| Stripe | 1.4% + €0.30 | Payment processor |

---

## Confronto Tier

| Funzionalità | Base | Intermedio | Avanzato |
|---|:---:|:---:|:---:|
| Profilo Medico | ✓ | ✓ | ✓ |
| Booking Telemedicina | ✓ | ✓ | ✓ |
| Genitori Portal | ✓ | ✓ | ✓ |
| **Crescita Tracker** | — | ✓ | ✓ |
| **Vaccinazioni MIUR** | — | ✓ | ✓ |
| **Foto Eruzioni** | — | ✓ | ✓ |
| **Diario Medico** | — | ✓ | ✓ |
| **E-Prescription** | — | ✓ | ✓ |
| **Eruzioni LLaVA** | — | — | ✓ |
| **Triage AI 24/7** | — | — | ✓ |
| **Lab Integration** | — | — | ✓ |
| **Doppio Consenso Avanzato** | — | — | ✓ |

---

## Manutenzione Ricorrente

| Piano | €/mese | Incluso |
|-------|---------|---------|
| **Basic** | €50 | Hosting + SSL + backup + email support |
| **Standard** | €100 | Basic + 4h modifiche/mese + monitoring + phone support |
| **Premium** | €200 | Standard + 12h modifiche/mese + CDN + AI model updates + FNOMCeO compliance |

---

## Partnership & Supporto

**Hosting** — Hetzner VPS (EU-based, GDPR compliant)  
**SSL/CDN** — Cloudflare free tier  
**Payment** — Stripe + Pagamenti italiani  
**Support** — Federico Calò, email + Telegram

**Normativa**: GDPR Art.8+Art.9 (minori, dati sensibili, doppio consenso genitori), FNOMCeO telemedicina, Linee Guida MIUR vaccinazioni, detraibilità 19%

---

**Scegli il tier adatto. Contatta Federico per quotazione personalizzata.**
