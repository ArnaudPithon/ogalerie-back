/**
 * @summary classe d'erreur pour l'API
 */
export default class APIError extends Error {
  code: number;            // HTTP status ou code interne
  cause?: Error;           // l'erreur originale si besoin
  expose: boolean;         // montrer le message au client ?

  constructor(message: string, code: number, cause?: Error, expose = false) {
    super(message);
    this.code = code;
    this.cause = cause;
    this.expose = expose;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
