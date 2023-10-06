# Changelog

## ven. 06 oct. 2023 09:54:27 CEST



## jeu. 05 oct. 2023 17:03:48 CEST

- Meilleure modularité dans la gestion des authorisations;
- Implémentation des routes artworks complètes;
- passage en release 0.4.0

## mar. 03 oct. 2023 18:40:11 CEST

### Réécriture de l'identification par token

On a maintenant deux middlewares. Un pour savoir si
l'utilisateur est connecté et un pour savoir si le
profil/œuvre/… auquel il accède lui appartient.

Les routes qui les utilisent actuellement :
- `GET /users/:id` - profil public ou privé suivant le cas
- `PATCH /users/:id` - autorisation de modification du profil
- `DELETE /users/:id` - autorisation de suppression du profil
- `POST /users/:id/collections` - autorisation de création d'une collection
- `POST /users/:id/artworks` - autorisation de création d'une œuvre

### Ajout du champ biographie à la base de données et modification des requêtes liées

### Ajout d'informations remontées à l'affichage d'un profil public et privé :

- nombre de like _donnés_ par l'utilisateur
- nombre de like _reçus_ par les œuvres de l'utilisateur
