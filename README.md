# O'Gallerie API

## Technologies utilisées

- Javascript dans l'environement NodeJS pour le langage
- Express pour le serveur
- Postgres pour la base de données
- Make et le shell pour l'automatisation

## Installation

### Dépendances

- Postgres
- Node
    - pnpm / npm / yarn
    - pg
    - Express
    - joi
    - bcrypt
- GNU/Make

Le Makefile utilise __pnpm__ comme gestionnaire de
package. Si vous voulez utiliser une alternative,
il faudra taper vous même les commandes dans le
répertoire _src/_.

### Utilisation

```sh
# Installation de l'environement NodeJS
make build

# Mise en place de la base de données
make database

# Lancer le serveur en mode verbeux
make dev
```

Si vous souhaitez vous contenter de mettre à jour les
fonctions SQL, parceque vous avez déjà un système
fonctionnel, un appel à `make functions` fera l'affaire.

Pensez à créer le fichier _.env_ d'après le modèle fournit !

## Documentation

- Les MCD, dictionnaire de données et autres MPD peuvent être trouvés dans
le repo de la partie front du projet :
[O'Galerie](https://github.com/O-clock-Yost/projet-06-o-galerie-front)

- [Changelog](./Changelog.md)
