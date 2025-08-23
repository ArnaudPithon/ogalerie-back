/**
 * @summary Vérification d'une assertion
  * @param value Valeur à vérifier
  * @param message Message d'erreur si l'assertion échoue
  * @throws Error si l'assertion échoue
  * @returns void si l'assertion réussit
  */
export function assert(value: unknown, message?: string): asserts value {
  if (!value) {
    throw new Error(message ?? 'value is falsy');
  }
}
