import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'PediaApp Telemedicina — Pediatra online 24/7 Torino'
  },
  {
    path: 'servizi',
    loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
    title: 'Servizi — PediaApp Telemedicina'
  },
  {
    path: 'come-funziona',
    loadComponent: () => import('./pages/come-funziona/come-funziona.component').then((m) => m.ComeFunzionaComponent),
    title: 'Come funziona — PediaApp Telemedicina'
  },
  {
    path: 'pediatri',
    loadComponent: () => import('./pages/pediatri/pediatri.component').then((m) => m.PediatriComponent),
    title: 'I nostri pediatri — PediaApp Telemedicina'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Contatti — PediaApp Telemedicina'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
