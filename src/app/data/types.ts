// Tipi TypeScript per i dati mock di PediaApp Telemedicina

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface DisponibilitaServizio {
  chatAsincrona: boolean;
  videoconsulto: boolean;
  urgenzaNotturna: boolean;
  secondoParere: boolean;
  ricettaDigitale: boolean;
  lingue: string[];
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  alboMedici: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  disponibilita: DisponibilitaServizio;
  metaSeo: MetaSeo;
}

export interface Servizio {
  id: string;
  nome: string;
  descrizione: string;
  dettaglio: string;
  prezzo: number;
  durata: string;
  disponibile24h: boolean;
  urgenza: boolean;
  categoria: 'base' | 'avanzato' | 'urgenza';
}

export interface ServiziData {
  servizi: Servizio[];
}

export interface Pediatra {
  id: number;
  nome: string;
  titolo: string;
  specializzazione: string;
  turno: string;
  bio: string;
  anniEsperienza: number;
  lingue: string[];
  competenze: string[];
  iscrizione: string;
}

export interface TeamData {
  team: Pediatra[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
  categoria: 'servizio' | 'tecnica' | 'privacy' | 'sicurezza';
}

export interface FaqData {
  faq: FaqItem[];
}
