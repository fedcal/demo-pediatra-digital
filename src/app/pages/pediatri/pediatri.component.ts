import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-pediatri',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri pediatri</h1>
        <p>5 specialisti in turno 24/7. Tutti iscritti all'Albo dei Medici Chirurghi.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="team$ | async as team">
      <div class="turni-info">
        <h2>Copertura turni</h2>
        <ul class="turni-grid">
          <li class="turno-item">
            <span class="turno-label">Mattino</span>
            <span class="turno-orario">08:00 – 16:00</span>
          </li>
          <li class="turno-item">
            <span class="turno-label">Pomeriggio</span>
            <span class="turno-orario">14:00 – 22:00</span>
          </li>
          <li class="turno-item">
            <span class="turno-label">Sera / Notte</span>
            <span class="turno-orario">22:00 – 08:00</span>
          </li>
        </ul>
      </div>

      <ul class="team-grid">
        <li *ngFor="let p of team.team" class="team-card">
          <div class="team-card__avatar" aria-hidden="true">{{ p.nome.charAt(0) }}</div>
          <h2>{{ p.nome }}</h2>
          <p class="team-card__titolo">{{ p.titolo }}</p>
          <p class="team-card__specializzazione">{{ p.specializzazione }}</p>
          <p class="team-card__turno">
            <span class="turno-badge">{{ p.turno }}</span>
          </p>
          <p class="team-card__bio">{{ p.bio }}</p>
          <p class="team-card__exp">{{ p.anniEsperienza }} anni di esperienza clinica</p>
          <div class="team-card__section">
            <h3>Competenze</h3>
            <ul class="tag-list">
              <li *ngFor="let c of p.competenze">{{ c }}</li>
            </ul>
          </div>
          <div class="team-card__section">
            <h3>Lingue</h3>
            <ul class="tag-list">
              <li *ngFor="let l of p.lingue">{{ l }}</li>
            </ul>
          </div>
          <p class="team-card__iscrizione">{{ p.iscrizione }}</p>
        </li>
      </ul>

      <aside class="disclaimer-block">
        <h3>Verifica dell'iscrizione all'Albo</h3>
        <p>
          Tutti i professionisti sono verificabili sul portale ufficiale FNOMCeO (Federazione Nazionale degli Ordini dei Medici Chirurghi e degli Odontoiatri) tramite il numero di iscrizione indicato nel loro profilo.
          Il numero di iscrizione è reale solo in un sito live reale — i dati mostrati qui sono mock dimostrativi.
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
      .turni-info {
        margin-bottom: 3rem;
      }
      .turni-info h2 {
        margin: 0 0 1rem;
        font-size: 1.2rem;
      }
      .turni-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .turno-item {
        display: flex;
        flex-direction: column;
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 0.75rem 1.25rem;
        min-width: 160px;
      }
      .turno-label {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 0.25rem;
      }
      .turno-orario {
        font-weight: 700;
        color: var(--color-fg-default);
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0 0 3rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background: #ffffff;
      }
      .team-card__avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      .team-card h2 {
        margin: 0 0 0.25rem;
        font-size: 1.1rem;
      }
      .team-card__titolo {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.25rem;
      }
      .team-card__specializzazione {
        font-size: 0.9rem;
        color: var(--color-accent);
        font-weight: 600;
        margin: 0 0 0.75rem;
      }
      .team-card__turno {
        margin: 0 0 0.75rem;
      }
      .turno-badge {
        font-size: 0.75rem;
        background: #fef3c7;
        color: #92400e;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .team-card__bio {
        font-size: 0.875rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.5rem;
        line-height: 1.55;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .team-card__section {
        margin-bottom: 0.75rem;
      }
      .team-card__section h3 {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--color-fg-muted);
        margin: 0 0 0.4rem;
      }
      .tag-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }
      .tag-list li {
        font-size: 0.72rem;
        background: var(--color-bg-subtle);
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
      .team-card__iscrizione {
        font-size: 0.72rem;
        color: var(--color-fg-muted);
        margin: 0.75rem 0 0;
        border-top: 1px solid var(--color-border);
        padding-top: 0.75rem;
      }
      .disclaimer-block {
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: var(--radius-lg);
        padding: 1.5rem;
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
export class PediatriComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
}
