import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { Servizio } from '../../data/types';

interface ServiziView {
  base: Servizio[];
  avanzato: Servizio[];
  urgenza: Servizio[];
}

@Component({
  selector: 'app-servizi',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, NgClass],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Servizi di telemedicina pediatrica</h1>
        <p>Consulti online con pediatri iscritti all'Albo. Da €25. Non sostituisce la visita in presenza.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="view$ | async as view">
      <section class="servizi-section">
        <h2 class="section-title">
          <span class="section-title__icon" aria-hidden="true">💬</span>
          Consulti base
        </h2>
        <ul class="servizi-grid">
          <li *ngFor="let s of view.base" class="servizio-card">
            <div class="servizio-card__header">
              <h3>{{ s.nome }}</h3>
              <span class="servizio-card__price">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
            </div>
            <p class="servizio-card__desc">{{ s.descrizione }}</p>
            <p class="servizio-card__detail">{{ s.dettaglio }}</p>
            <div class="servizio-card__meta">
              <span class="badge badge--durata">{{ s.durata }}</span>
              <span *ngIf="s.disponibile24h" class="badge badge--24h">Disponibile 24/7</span>
            </div>
          </li>
        </ul>
      </section>

      <section class="servizi-section">
        <h2 class="section-title">
          <span class="section-title__icon" aria-hidden="true">🩺</span>
          Consulti avanzati
        </h2>
        <ul class="servizi-grid">
          <li *ngFor="let s of view.avanzato" class="servizio-card">
            <div class="servizio-card__header">
              <h3>{{ s.nome }}</h3>
              <span class="servizio-card__price">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
            </div>
            <p class="servizio-card__desc">{{ s.descrizione }}</p>
            <p class="servizio-card__detail">{{ s.dettaglio }}</p>
            <div class="servizio-card__meta">
              <span class="badge badge--durata">{{ s.durata }}</span>
              <span *ngIf="s.disponibile24h" class="badge badge--24h">Disponibile 24/7</span>
            </div>
          </li>
        </ul>
      </section>

      <section class="servizi-section urgenza-section">
        <h2 class="section-title section-title--urgenza">
          <span class="section-title__icon" aria-hidden="true">🚨</span>
          Urgenza notturna
        </h2>
        <div class="urgenza-banner">
          <strong>Per emergenze gravi (difficoltà respiratoria grave, convulsioni, perdita di coscienza) chiamare sempre il 118.</strong>
          Il servizio urgenza è per situazioni che richiedono un consulto rapido nelle ore notturne ma non l'accesso immediato al pronto soccorso.
        </div>
        <ul class="servizi-grid">
          <li *ngFor="let s of view.urgenza" class="servizio-card servizio-card--urgenza">
            <div class="servizio-card__header">
              <h3>{{ s.nome }}</h3>
              <span class="servizio-card__price">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
            </div>
            <p class="servizio-card__desc">{{ s.descrizione }}</p>
            <p class="servizio-card__detail">{{ s.dettaglio }}</p>
            <div class="servizio-card__meta">
              <span class="badge badge--durata">{{ s.durata }}</span>
              <span class="badge badge--urgenza">Urgenza notturna</span>
            </div>
          </li>
        </ul>
      </section>

      <aside class="disclaimer-block">
        <h3>Informazione importante</h3>
        <p>
          PediaApp non è un servizio di emergenza. Nessun consulto online sostituisce la visita medica in presenza.
          In caso di dubbio sulla gravità delle condizioni del bambino, recarsi sempre al Pronto Soccorso o chiamare il 118.
          I referti prodotti sono informativi e non costituiscono diagnosi definitiva.
        </p>
      </aside>
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
      .servizi-section {
        margin-bottom: 3.5rem;
      }
      .section-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.35rem;
        margin: 0 0 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
      }
      .section-title--urgenza {
        border-bottom-color: var(--color-danger);
      }
      .section-title__icon {
        font-size: 1.5rem;
      }
      .urgenza-banner {
        background: #fee2e2;
        border: 1px solid #fca5a5;
        border-radius: var(--radius-md);
        padding: 1rem 1.25rem;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
        color: #7f1d1d;
        line-height: 1.6;
      }
      .urgenza-banner strong {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
      .servizi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.25rem;
      }
      .servizio-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .servizio-card--urgenza {
        border-color: #fca5a5;
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
        color: var(--color-fg-default);
        font-size: 0.95rem;
        margin: 0 0 0.5rem;
        font-weight: 500;
      }
      .servizio-card__detail {
        color: var(--color-fg-muted);
        font-size: 0.875rem;
        margin: 0 0 0.75rem;
        line-height: 1.55;
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
      .badge--24h {
        background: #fef3c7;
        color: #92400e;
      }
      .badge--urgenza {
        background: #fee2e2;
        color: var(--color-danger);
      }
      .disclaimer-block {
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: var(--radius-lg);
        padding: 1.5rem;
        margin-top: 2rem;
      }
      .disclaimer-block h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: #0c4a6e;
      }
      .disclaimer-block p {
        margin: 0;
        font-size: 0.875rem;
        color: #0369a1;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiziComponent {
  private readonly mockData = inject(MockDataService);

  readonly view$ = this.mockData.servizi$.pipe(
    map((data): ServiziView => ({
      base: data.servizi.filter((s) => s.categoria === 'base'),
      avanzato: data.servizi.filter((s) => s.categoria === 'avanzato'),
      urgenza: data.servizi.filter((s) => s.categoria === 'urgenza')
    }))
  );
}
