import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Contatti</h1>
        <p>Registrazione gratuita. Prima consulenza chat da €25. Attivi 24/7.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="emergency-alert" role="alert" aria-live="polite">
        <strong>Per emergenze chiamare il 118</strong>
        In caso di pericolo di vita, difficoltà respiratoria grave, convulsioni, trauma grave o perdita di coscienza non compilare questo form: chiama il 118 o recati al Pronto Soccorso più vicino.
      </div>

      <div class="contact-grid">
        <section class="info-block">
          <h2>Informazioni</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a [href]="whatsAppLink(info.contatti.whatsapp)" target="_blank" rel="noopener">{{ info.contatti.whatsapp }}</a>
            </li>
          </ul>

          <h2>Disponibilità</h2>
          <p class="disponibilita-info">Servizio attivo <strong>24 ore su 24, 7 giorni su 7</strong>, incluso weekend e festivi.</p>
          <ul class="disponibilita-list">
            <li *ngFor="let l of info.disponibilita.lingue">
              <span class="dot" aria-hidden="true"></span>
              Lingua {{ l }}
            </li>
          </ul>

          <h2>Sede operativa</h2>
          <p>
            {{ info.indirizzo.via }}<br>
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br>
            {{ info.indirizzo.regione }}
          </p>

          <div class="legal-note">
            <h3>Iscrizione Albo</h3>
            <p>{{ info.alboMedici }}</p>
          </div>
        </section>

        <section class="form-block">
          <h2>Richiedi informazioni</h2>
          <p class="form-intro">
            Compila il form per ricevere informazioni sul servizio. Indica i dati di entrambi i genitori se si tratta di un minore.
          </p>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <fieldset class="fieldset">
              <legend>Dati genitore / tutore</legend>
              <div class="field">
                <label for="nome">Nome e cognome</label>
                <input id="nome" type="text" formControlName="nome" required autocomplete="name" />
              </div>
              <div class="field">
                <label for="email">Email</label>
                <input id="email" type="email" formControlName="email" required autocomplete="email" />
              </div>
              <div class="field">
                <label for="telefono">Telefono</label>
                <input id="telefono" type="tel" formControlName="telefono" required autocomplete="tel" />
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend>Dati del bambino</legend>
              <div class="field">
                <label for="nomeBambino">Nome del bambino</label>
                <input id="nomeBambino" type="text" formControlName="nomeBambino" required />
              </div>
              <div class="field">
                <label for="etaBambino">Età del bambino (anni)</label>
                <input id="etaBambino" type="number" formControlName="etaBambino" min="0" max="14" required />
                <span class="field-hint">Il servizio è dedicato a bambini 0-14 anni.</span>
              </div>
            </fieldset>

            <div class="field">
              <label for="messaggio">Motivo della richiesta</label>
              <textarea id="messaggio" formControlName="messaggio" rows="3" placeholder="Descrivi brevemente il motivo per cui sei interessato al servizio..."></textarea>
            </div>

            <fieldset class="fieldset fieldset--consent">
              <legend>Consensi obbligatori</legend>

              <div class="field field--checkbox">
                <input id="consensoPrivacy" type="checkbox" formControlName="consensoPrivacy" required />
                <label for="consensoPrivacy">
                  <strong>Consenso privacy (GDPR Art.13)</strong> — Accetto il trattamento dei dati personali per la gestione della richiesta, ai sensi del Regolamento (UE) 2016/679. *
                </label>
              </div>

              <div class="field field--checkbox">
                <input id="consensoMinore" type="checkbox" formControlName="consensoMinore" required />
                <label for="consensoMinore">
                  <strong>Consenso trattamento dati sanitari del minore (GDPR Art.9)</strong> — Dichiaro di essere titolare della responsabilità genitoriale e di acconsentire al trattamento dei dati sanitari del minore per l'erogazione del servizio di telemedicina. In caso di responsabilità genitoriale condivisa, confermo che entrambi i genitori sono stati informati e acconsentono. *
                </label>
              </div>

              <div class="field field--checkbox">
                <input id="accettazioneDisclaimer" type="checkbox" formControlName="accettazioneDisclaimer" required />
                <label for="accettazioneDisclaimer">
                  Ho letto e compreso che il servizio <strong>non sostituisce la visita medica in presenza</strong> e che in caso di emergenza devo chiamare il 118 o recarmi al Pronto Soccorso. *
                </label>
              </div>
            </fieldset>

            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
              Invia richiesta
            </button>

            <p class="form-disclaimer">
              Demo non funzionale: nessuna richiesta è realmente inviata. In un sito reale riceveresti email di conferma. I campi contrassegnati con * sono obbligatori.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <div class="thankyou__icon" aria-hidden="true">✅</div>
              <h3>Richiesta inviata, {{ form.value.nome }}!</h3>
              <p>
                Abbiamo ricevuto la tua richiesta per informazioni sul servizio per
                <strong>{{ form.value.nomeBambino }}</strong> ({{ form.value.etaBambino }} anni).
              </p>
              <p>
                In un sito reale riceveresti un'email di conferma a <strong>{{ form.value.email }}</strong> entro pochi minuti.
              </p>
              <div class="reminder-box">
                Ricorda: per emergenze chiama sempre il <strong>118</strong>.
                Questo servizio non è un sostituto del Pronto Soccorso.
              </div>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>
      </div>

      <section class="faq-section" *ngIf="faq$ | async as faqData">
        <h2>Domande frequenti</h2>
        <dl class="faq-list">
          <div *ngFor="let item of faqData.faq" class="faq-item">
            <dt>{{ item.domanda }}</dt>
            <dd>{{ item.risposta }}</dd>
          </div>
        </dl>
      </section>
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
      .emergency-alert {
        background: #fee2e2;
        border: 2px solid #ef4444;
        border-radius: var(--radius-md);
        padding: 1rem 1.25rem;
        margin-bottom: 2.5rem;
        font-size: 0.9rem;
        color: #7f1d1d;
        line-height: 1.6;
      }
      .emergency-alert strong {
        display: block;
        font-size: 1rem;
        margin-bottom: 0.35rem;
        color: #991b1b;
      }
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
        margin-bottom: 4rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.1rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
      .disponibilita-info {
        font-size: 0.9rem;
        margin: 0 0 0.5rem;
      }
      .disponibilita-list {
        list-style: none;
        padding: 0;
        margin: 0 0 0;
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .disponibilita-list li {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        display: flex;
        align-items: center;
        gap: 0.35rem;
      }
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--color-success);
        flex-shrink: 0;
      }
      .legal-note {
        margin-top: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        padding: 0.75rem 1rem;
      }
      .legal-note h3 {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--color-fg-muted);
        margin: 0 0 0.35rem;
      }
      .legal-note p {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        margin: 0;
        line-height: 1.5;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 0.5rem;
      }
      .form-intro {
        font-size: 0.875rem;
        color: var(--color-fg-muted);
        margin: 0 0 1.5rem;
      }
      .fieldset {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1rem 1.25rem;
        margin: 0 0 1rem;
      }
      .fieldset legend {
        font-weight: 600;
        font-size: 0.85rem;
        padding: 0 0.4rem;
        color: var(--color-fg-default);
      }
      .fieldset--consent {
        background: #fffbeb;
        border-color: #fde68a;
      }
      .fieldset--consent legend {
        color: #92400e;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field:last-child {
        margin-bottom: 0;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field-hint {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        margin-top: 0.25rem;
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      .field--checkbox input[type="checkbox"] {
        margin-top: 0.2rem;
        flex-shrink: 0;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.82rem;
        color: var(--color-fg-default);
        line-height: 1.5;
      }
      .field--checkbox label strong {
        display: block;
        margin-bottom: 0.2rem;
        font-size: 0.85rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: background 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: var(--color-accent-hover);
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
      }
      .thankyou {
        text-align: center;
      }
      .thankyou__icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      .thankyou h3 {
        color: var(--color-success);
        margin-bottom: 0.75rem;
      }
      .thankyou p {
        font-size: 0.9rem;
        margin-bottom: 0.75rem;
        color: var(--color-fg-muted);
      }
      .reminder-box {
        background: #fee2e2;
        border-radius: var(--radius-md);
        padding: 0.75rem 1rem;
        font-size: 0.85rem;
        color: #7f1d1d;
        margin: 1rem 0 1.5rem;
        line-height: 1.5;
      }
      .faq-section {
        margin-top: 2rem;
      }
      .faq-section h2 {
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly faq$ = this.mockData.faq$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    nomeBambino: ['', [Validators.required, Validators.minLength(2)]],
    etaBambino: [null as number | null, [Validators.required, Validators.min(0), Validators.max(14)]],
    messaggio: [''],
    consensoPrivacy: [false, Validators.requiredTrue],
    consensoMinore: [false, Validators.requiredTrue],
    accettazioneDisclaimer: [false, Validators.requiredTrue]
  });

  whatsAppLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({
      etaBambino: null,
      consensoPrivacy: false,
      consensoMinore: false,
      accettazioneDisclaimer: false
    });
    this.submitted.set(false);
  }
}
