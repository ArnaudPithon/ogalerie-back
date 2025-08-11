import type { CipherKey } from 'crypto';

/*
 * ProcessEnv existe dans l'espace de nom de NodeJS
 * On le surcharge pour ajouter les variables d'environnement
 */
declare namespace NodeJS {
  interface ProcessEnv {
    PORT_HTTP?: string;
    PORT_HTTPS?: string;
    SESSION_SECRET?: CipherKey;
  }
}
