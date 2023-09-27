# O'Gallerie Back

## Technologies utilisées

- Javascript dans l'environement NodeJS pour le langage
- Express pour le serveur
- Postgres pour la base de données
- Make et le shell pour l'automatisation

## Installation

### Dépendances

- Postgres
- Node
    - npm / pnpm / yarn
    - pg
    - Express
- GNU/Make

### Préparatifs

```sh
# Création du répertoire d'écriture des logs
mkdir log &&

# Installation de l'environement NodeJS
cd src &&
npm install

# Mise en place de la base de données
make -C data
```

Penser à créer le fichier _.env_ d'après le modèle fournit !

## Documentation

Les MCD, dictionnaire de données et autres MPD peuvent être trouvés dans
le repo de la partie front du projet :
[O'Galerie](https://github.com/O-clock-Yost/projet-06-o-galerie-front)
