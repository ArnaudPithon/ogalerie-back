---
title: Architecture de l’application
created: 2025-08-04
tags: [projet:ogalerie, documentation]
---

Ce document décrit la structure de l'application, ses principes
d'organisation internes, et les conventions de nommage adoptées pour
assurer lisibilité, évolutivité, et cohérence.

## Structure générale

L’application suit une architecture **modulaire par domaine métier**,
inspirée des principes DDD (Domain-Driven Design) et de l’architecture
"feature-first".

```text
src/
  ├── modules/     # Dossiers métiers (users, artworks, comments…)
  ├── shared/      # Code réutilisable et transversal
  ├── config/      # Configuration technique (DB, sécurité, env)
  ├── middlewares/ # Middlewares Express globaux
  ├── db/          # SQL, fonctions PostgreSQL, migrations, seeds
  ├── tests/       # Tests unitaires et d’intégration
  ├── app.js       # Point d’entrée logique
  └── server.js    # Démarrage HTTP
```

---

## 📦 `modules/` – Domaines métier

Chaque **fonctionnalité métier** est organisée dans son propre dossier,
contenant ses éléments nécessaires au traitement métier.

### Exemple

```text
modules/
└── users/
  ├── controller.js # Gère les requêtes HTTP
  ├── model.js      # Requêtes SQL / accès DB
  ├── service.js    # Logique métier métier
  ├── validator.js  # Validation des données d’entrée
  └── routes.js     # Routes Express du domaine
```

- Ce dossier contient uniquement ce qui concerne une entité
  fonctionnelle.
- Le découpage doit refléter **ce que l’application fait**, pas
  **comment elle le fait**.

---

## 🛠️ `shared/` – Outils transverses

Le dossier `shared/` contient du code **réutilisable** entre plusieurs
modules mais **non spécifique** à un domaine.

- `APIError.js` – Gestion centralisée des erreurs HTTP
- `validation.js` – Fonctions génériques de validation
- `hash.js` – Encapsulation des opérations de hash (bcrypt, etc.)
- `jwt.js` – Fonctions pour gérer les tokens JWT
- `dateUtils.js` – Utilitaires de formatage de date

**Si une fonction ou un outil ne relève pas d’un domaine métier, il va
dans `shared/`.**

---

## 🔧 `config/` – Configuration technique

Contient tous les fichiers de configuration de l’environnement, de la
base de données, ou de la sécurité.

- `pgClient.js` – Connexion à PostgreSQL
- `security.js` – Gestion de headers, CSP, etc.

---

## 🧱 `db/` – SQL & structure des données

Organisation des scripts SQL :

```text
db/
  ├── create_tables.pgsql
  ├── seeding.pgsql
  ├── seedOgalerie.pgsql
  ├── update/
  │  └── patch-01.pgsql, etc.
  └── functions/
     ├── artworks.pgsql
     ├── tags.pgsql
     └── ...
```

Organisation inspirée des pratiques DevOps : patchs, seeds, fonctions
réutilisables, Makefiles.

---

## 🧩 `middlewares/` – Express middlewares

Middlewares globaux (ex : gestion d’erreurs, sécurité HTTP).

---

## 🎯 Convention importante

- ✅ Les services métiers **restent dans les modules**
  Ex : `modules/users/service.js`
- ✅ Les outils réutilisables vont dans **`shared/`**
- ❌ Le dossier `services/` **n’est pas utilisé**
  Il a été écarté pour éviter l’ambiguïté entre "service technique" et
  "service métier".

---

## 🔁 Export d’un module (optionnel)

Chaque module peut exposer ses composants via un `index.js` :

```js
// modules/comments/index.js
import * as controller from "./controller.js";
import router from "./router.js";

export { controller, router };
```

Cela permet d’importer un module facilement dans app.js :

```js
import { router as commentsRouter } from "./modules/comments/index.js";
app.use("/comments", commentsRouter);
```

## Pourquoi cette architecture

- 🔍 Lisibilité métier immédiate
- ⚖️ Meilleure séparation des responsabilités
- 🚀 Évolutivité plus naturelle
- 🧪 Facilite les tests et la couverture modulaire
- 🧠 Modèle réplicable pour tous les projets futurs

> ✨ Ce projet sert de base de référence (blueprint) pour toutes
> futures API Node.js / Express maintenables et idiomatiques.

---

## Tags

:architecture:conventions:organisation:DDD:feature-first:
