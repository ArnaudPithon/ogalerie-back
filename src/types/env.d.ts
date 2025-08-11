import type { CipherKey } from 'crypto';

declare namespace NodeJS {
  interface ProcessEnv {
    PORT_HTTP?: string;
    PORT_HTTPS?: string;
    SESSION_SECRET?: CipherKey;
  }
}
