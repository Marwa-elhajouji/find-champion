## Description

`findChampions` est une fonction permettant d'identifier les champions parmi une liste de joueurs, selon les critères suivants :

Un joueur est dit **"champion"** si et seulement si il n'y a personne d'autre dans la liste qui "l'élimine", c'est-à-dire :
- **Personne d'autre n'est à la fois strictement plus fort et plus jeune ou du même âge**
- **Et personne d'autre n'est à la fois strictement plus jeune et plus fort ou avec le même score**

Cette méthode est utile pour des analyses comparatives, par exemple, dans des contextes compétitifs comme les classements de joueurs d'échecs.

---

## Fonctionnalités

- Identification des champions parmi une liste de joueurs
- Gestion des cas limites et validation des données
- Performance optimisée pour les grandes listes de joueurs

---

## Structure du Projet

- **utils** : La logique de la fonction `findChampions` avec des tests robustes.
- **Frontend** : Une interface utilisateur visuelle permettant de manipuler les données des joueurs et de visualiser les champions sur un graphique interactif.

---

## Prérequis

- Node.js installé
- npm ou yarn pour gérer les dépendances

## Installation

Clonez ce dépôt, puis installez les dépendances nécessaires

## Tests

Pour vérifier le bon fonctionnement de la fonction, lancez les tests avec la commande suivante :

```bash
npm test
```

## Bonus: Frontend

Pour démarrer l'interface utilisateur, exécutez la commande suivante :

```bash
npm run dev
```