import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

interface OnboardingStep {
  readonly numero: number;
  readonly titolo: string;
  readonly descrizione: string;
  readonly dettaglio: string;
  readonly icon: string;
}

const ONBOARDING_STEPS: readonly OnboardingStep[] = [
  {
    numero: 1,
    titolo: 'Registrazione e consenso',
    descrizione: 'Crea il profilo del bambino e fornisci il doppio consenso genitoriale per il trattamento dei dati sanitari del minore.',
    dettaglio: 'La registrazione richiede nome, data di nascita del bambino e i dati di entrambi i genitori o del genitore unico titolare della responsabilità genitoriale. Il consenso al trattamento dei dati sensibili ai sensi dell\'Art. 9 GDPR è obbligatorio. I dati sono cifrati end-to-end su server EU.',
    icon: '📝'
  },
  {
    numero: 2,
    titolo: 'Scegli il tipo di consulto',
    descrizione: 'Seleziona il servizio più adatto: chat asincrona, videoconsulto, urgenza notturna o secondo parere.',
    dettaglio: 'Per sintomi non urgenti usa la chat (risposta entro 2h, €25). Per valutazione visiva e colloquio in tempo reale usa il videoconsulto (€40). Dalle 21:00 alle 08:00 è disponibile l\'urgenza notturna (€40, risposta entro 15 min). Per la revisione di diagnosi precedenti usa il secondo parere (€35, entro 24h).',
    icon: '🩺'
  },
  {
    numero: 3,
    titolo: 'Consulto con il pediatra',
    descrizione: 'Il pediatra di turno valuta i sintomi, risponde alle tue domande e fornisce indicazioni terapeutiche personalizzate.',
    dettaglio: 'Tutti i pediatri sono iscritti all\'Albo e con specializzazione in Pediatria. Durante il consulto puoi allegare foto, video o documenti. La videocall avviene su canale cifrato CE-certificato. Il pediatra può prescrivere farmaci da banco se clinicamente indicato.',
    icon: '👨‍⚕️'
  },
  {
    numero: 4,
    titolo: 'Referto e follow-up',
    descrizione: 'Ricevi il referto digitale firmato, scaricabile e condivisibile con il tuo pediatra di famiglia o specialista.',
    dettaglio: 'Il referto include anamnesi, valutazione clinica, indicazioni terapeutiche e raccomandazioni di follow-up. È firmato digitalmente dal pediatra PediaApp e ha valore documentale. Per condizioni che richiedono visita in presenza il pediatra lo indica esplicitamente nel referto.',
    icon: '📋'
  }
] as const;

@Component({
  selector: 'app-come-funziona',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Come funziona PediaApp</h1>
        <p>Quattro semplici passi per consultare un pediatra online in pochi minuti.</p>
      </div>
    </section>

    <article class="demo-container content">
      <ol class="steps-list" aria-label="Passaggi onboarding">
        <li *ngFor="let step of steps" class="step-card">
          <div class="step-card__number" aria-hidden="true">{{ step.numero }}</div>
          <div class="step-card__body">
            <div class="step-card__icon" aria-hidden="true">{{ step.icon }}</div>
            <h2>{{ step.titolo }}</h2>
            <p class="step-card__desc">{{ step.descrizione }}</p>
            <p class="step-card__detail">{{ step.dettaglio }}</p>
          </div>
        </li>
      </ol>

      <aside class="info-block">
        <h3>Prima di iniziare: emergenze</h3>
        <div class="emergency-box">
          <p>
            <strong>In caso di emergenza medica non usare PediaApp.</strong><br>
            Chiama il <strong>118</strong> o vai al Pronto Soccorso pediatrico più vicino in presenza di:
          </p>
          <ul>
            <li>Difficoltà respiratoria grave o cianosi (labbra blu)</li>
            <li>Perdita di coscienza o stato confusionale</li>
            <li>Convulsioni prolungate (oltre 5 minuti)</li>
            <li>Sospetto avvelenamento o ingestione di corpo estraneo</li>
            <li>Trauma cranico con perdita di coscienza</li>
            <li>Emorragie non controllabili</li>
          </ul>
        </div>
      </aside>

      <section class="faq-preview">
        <h2>Domande frequenti</h2>
        <dl class="faq-list">
          <div class="faq-item">
            <dt>Il servizio è attivo anche nel weekend e nei festivi?</dt>
            <dd>Sì. Il servizio è operativo 24 ore su 24, 7 giorni su 7, inclusi weekend e festivi. Il numero di pediatri disponibili può variare ma è sempre garantito almeno un medico in turno.</dd>
          </div>
          <div class="faq-item">
            <dt>Posso accedere da smartphone?</dt>
            <dd>Sì. Il sito è ottimizzato per dispositivi mobili. Le videochiamate funzionano da browser moderno (Chrome, Safari, Firefox) senza necessità di installare app dedicate.</dd>
          </div>
          <div class="faq-item">
            <dt>Il referto è riconosciuto dal SSN?</dt>
            <dd>Il referto PediaApp ha valore documentale come qualsiasi referto di consulto specialistico privato. Non sostituisce le visite incluse nel LEA del SSN. Può essere condiviso con il pediatra di famiglia per la continuità delle cure.</dd>
          </div>
        </dl>
      </section>

      <div class="cta-block">
        <h2>Pronto a iniziare?</h2>
        <p>Registrazione gratuita. Prima consulenza chat da €25.</p>
        <a routerLink="/contatti" class="btn btn-primary">Contattaci</a>
        <p class="disclaimer">Demo non funzionale. Nessun consulto reale viene erogato. Il servizio non sostituisce la visita in presenza.</p>
      </div>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
      }
      .steps-list {
        list-style: none;
        padding: 0;
        margin: 0 0 4rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        counter-reset: none;
      }
      .step-card {
        display: grid;
        grid-template-columns: 56px 1fr;
        gap: 1.5rem;
        align-items: flex-start;
        padding: 1.5rem;
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
      }
      .step-card__number {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 700;
        flex-shrink: 0;
      }
      .step-card__icon {
        font-size: 1.75rem;
        margin-bottom: 0.5rem;
      }
      .step-card__body h2 {
        margin: 0 0 0.5rem;
        font-size: 1.2rem;
      }
      .step-card__desc {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: var(--color-fg-default);
        font-weight: 500;
      }
      .step-card__detail {
        margin: 0;
        font-size: 0.875rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
      .info-block {
        margin-bottom: 4rem;
      }
      .info-block h3 {
        font-size: 1.2rem;
        margin: 0 0 1rem;
      }
      .emergency-box {
        background: #fee2e2;
        border: 1px solid #fca5a5;
        border-radius: var(--radius-md);
        padding: 1.25rem 1.5rem;
        color: #7f1d1d;
      }
      .emergency-box p {
        margin: 0 0 0.75rem;
        line-height: 1.6;
      }
      .emergency-box ul {
        margin: 0;
        padding-left: 1.25rem;
      }
      .emergency-box li {
        margin-bottom: 0.35rem;
        font-size: 0.9rem;
      }
      .faq-preview {
        margin-bottom: 4rem;
      }
      .faq-preview h2 {
        margin: 0 0 1.5rem;
      }
      .faq-list {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .faq-item {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1rem 1.25rem;
      }
      .faq-item dt {
        font-weight: 600;
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
      .faq-item dd {
        margin: 0;
        font-size: 0.875rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
      .cta-block {
        text-align: center;
        padding: 3rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
      }
      .cta-block h2 {
        margin: 0 0 0.5rem;
      }
      .cta-block p {
        color: var(--color-fg-muted);
        margin: 0 0 1.5rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.75rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: var(--color-accent-hover);
        text-decoration: none;
      }
      .disclaimer {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 1rem !important;
      }
      @media (max-width: 520px) {
        .step-card {
          grid-template-columns: 1fr;
        }
        .step-card__number {
          margin: 0 auto;
        }
        .step-card__body {
          text-align: center;
        }
        .step-card__detail {
          text-align: left;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComeFunzionaComponent {
  readonly steps = ONBOARDING_STEPS;
}
