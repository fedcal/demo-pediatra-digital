import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <div class="hero__badge">Pediatra online 24/7</div>
        <h1>Telemedicina pediatrica<br>sempre disponibile</h1>
        <p class="hero-tagline">Chat, videoconsulto e urgenza notturna con pediatri iscritti all'Albo. Per bambini 0-14 anni.</p>
        <div class="hero-actions">
          <a routerLink="/servizi" class="btn btn-primary">Scopri i servizi</a>
          <a routerLink="/come-funziona" class="btn btn-secondary">Come funziona</a>
        </div>
        <p class="hero-disclaimer">
          Il servizio non sostituisce la visita in presenza. Per emergenze chiamare il 118.
        </p>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere PediaApp</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🕐</span>
          <h3>Disponibile 24/7</h3>
          <p>Pediatri in turno ogni ora del giorno e della notte, incluso weekend e festivi.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">👨‍⚕️</span>
          <h3>Medici iscritti all'Albo</h3>
          <p>Tutti i pediatri sono laureati, specializzati e regolarmente iscritti all'Ordine dei Medici.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🔒</span>
          <h3>Privacy GDPR Art.9</h3>
          <p>Dati sanitari dei minori cifrati end-to-end su server EU. Doppio consenso genitoriale.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📋</span>
          <h3>Referto digitale</h3>
          <p>Ogni consulto include un referto scritto firmato digitalmente, condivisibile con il medico di famiglia.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredServizi$ | async as servizi">
      <div class="section-header">
        <h2>Servizi più richiesti</h2>
        <a routerLink="/servizi" class="link-more">Tutti i servizi →</a>
      </div>
      <ul class="servizi-grid">
        <li *ngFor="let s of servizi" class="servizio-card">
          <div class="servizio-card__header">
            <h3>{{ s.nome }}</h3>
            <span class="servizio-card__price">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
          </div>
          <p class="servizio-card__desc">{{ s.descrizione }}</p>
          <div class="servizio-card__meta">
            <span class="badge badge--durata">{{ s.durata }}</span>
            <span *ngIf="s.urgenza" class="badge badge--urgenza">Urgenza</span>
            <span *ngIf="s.disponibile24h" class="badge badge--24h">24/7</span>
          </div>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Inizia la tua prima consulenza</h2>
        <p>Registrazione rapida. Primo consulto chat a soli €25. Nessun abbonamento obbligatorio.</p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Contattaci</a>
          <a routerLink="/pediatri" class="btn btn-secondary-light">Conosci i pediatri</a>
        </div>
        <p class="cta-disclaimer">
          Demo non funzionale. Nessun consulto reale viene erogato.
          Il servizio non sostituisce la visita in presenza. Per emergenze chiamare il 118.
        </p>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #fffbeb 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero__badge {
        display: inline-block;
        background: #fef3c7;
        color: #92400e;
        font-size: 0.8rem;
        font-weight: 700;
        padding: 0.3rem 0.75rem;
        border-radius: 9999px;
        margin-bottom: 1.25rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
        line-height: 1.2;
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
      }
      .hero-disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin: 0;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
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
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
        text-decoration: none;
      }
      .btn-secondary-light {
        background: transparent;
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.4);
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
      }
      .btn-secondary-light:hover {
        background: rgba(255, 255, 255, 0.1);
        text-decoration: none;
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .featured {
        padding: 4rem 1rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .link-more:hover {
        text-decoration: underline;
      }
      .servizi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }
      .servizio-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .servizio-card__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
      }
      .servizio-card__header h3 {
        margin: 0;
        font-size: 1.05rem;
      }
      .servizio-card__price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
        font-size: 1.1rem;
      }
      .servizio-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 0.75rem;
        line-height: 1.5;
      }
      .servizio-card__meta {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .badge {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .badge--durata {
        background: var(--color-bg-subtle);
        color: var(--color-fg-muted);
      }
      .badge--urgenza {
        background: #fee2e2;
        color: var(--color-danger);
      }
      .badge--24h {
        background: #fef3c7;
        color: #92400e;
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
        max-width: 520px;
        margin-left: auto;
        margin-right: auto;
      }
      .cta-disclaimer {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.55) !important;
        font-style: italic;
        margin-top: 1.5rem !important;
        margin-bottom: 0 !important;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredServizi$ = this.mockData.servizi$.pipe(
    map((data) => data.servizi.filter((s) => ['chat-asincrona', 'videoconsulto', 'urgenza-notturna'].includes(s.id)))
  );
}
