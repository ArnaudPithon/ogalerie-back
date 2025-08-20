# Guide interne – Organisation des types TypeScript

## Objectifs

Keeps the global namespace cleaner, avoids unnecessary exposure, and
improves maintainability by keeping types in context with their modules.

## Types **internes à un module**

- Les types qui ne servent qu’à un seul module restent **à côté du code**.
- Fichier `types.ts` dans le dossier du module.
- Toujours en `export type …` ou `export interface …`.

**Exemple :**

```sh
modules/artworks/
  controller.ts
  types.ts       # exporte Artwork, ArtworkFilters, etc.
```

```ts
// modules/artworks/types.ts
export type Artwork = {
  id: number;
  title: string;
};
```

---

## Types **transverses / partagés**

- Tout ce qui est réutilisé dans plusieurs modules va dans un dossier
  central `types/`.
- Organisation par thème ou par “couche” (API, DB, Domain).

**Exemple :**

```sh
types/
  api.ts        # types de requêtes/réponses HTTP
  database.ts   # types issus du schéma SQL
  domain.ts     # entités cœur métier
```

---

## `.ts` vs `.d.ts`

- Utiliser **`.ts`** pour 95% des cas → `import/export`.
- Utiliser **`.d.ts`** uniquement pour :
  - étendre des types globaux (`Window`, `NodeJS.ProcessEnv`, etc.),
  - patcher une lib sans types.

**Exemple :**

```ts
// global.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}
```

---

## Import clair

- Toujours importer explicitement les types (pas d’utilisation implicite
  via globals).
- Préfixer les imports uniquement type avec `import type`.

```ts
import type { Artwork } from "./types";
```

---

## Cohérence & maintenance

- Si un type commence à être utilisé dans 2 modules → le déplacer dans
  `types/`.
- Garder les fichiers **courts et lisibles** (éviter un
  `mega-types.ts`).
- Nommer les types en **PascalCase** (`UserProfile`, `ApiResponse<T>`).

---

## TLDR

- **Local** → `modules/x/types.ts`
- **Global** → `types/*.ts`
- **Exception** → `.d.ts` seulement pour patch/extend globals
