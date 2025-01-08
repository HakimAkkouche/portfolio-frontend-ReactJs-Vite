## Portfolio Frontend ReactJs Vite

Ce projet est le frontend de mon portfolio personnel, construit avec **React.js** et **Vite**. Il présente mes projets, compétences, et informations personnelles.

## Technologies utilisées

- **React.js** : Bibliothèque JavaScript pour construire des interfaces utilisateurs interactives.
- **Vite** : Outil de build moderne pour le développement rapide de projets frontend.
- **CSS** : Pour le style et la mise en page.
- **React Router** : Pour la navigation entre les différentes pages de l'application.
- **Axios** : Pour la gestion des appels API.

## Fonctionnalités

- **Page d'accueil** : Présentation générale avec un aperçu de mes compétences et projets.
- **Page des projets** : Liste de mes projets avec des détails et des liens vers leur présentation.
- **Page des informations personnelles** : Affiche mes informations professionnelles et de contact.
- **Page des menytions légales** : Mentions légales du site.

## Prérequis

- Node.js (version 14 ou supérieure).
- npm ou yarn pour la gestion des dépendances.

## Installation

1. Clonez ce répertoire sur votre machine locale :

   ```bash
   git clone https://github.com/ton-compte/portfolio-frontend.git
   cd portfolio-frontend

2. Installez les dépendances :

    Avec npm :
        npm install

    Ou avec yarn :
        yarn install

3. Lancez le serveur de développement :

    Avec npm :
        npm run dev

    Ou avec yarn :
        yarn dev

    Une fois l'application lancée, ouvrez votre navigateur à l'adresse http://localhost:3000.

## Structure du projet

Voici l'arborescence des fichiers principaux du projet :

/src
  /assets      # Contient les images et autres ressources statiques.
  /components  # Composants React réutilisables.
  /pages       # Pages principales du portfolio (Accueil, Projets, Contact, etc.).
  /styles      # Fichiers CSS.
  /services    # Fonctions utilitaires (API, helpers, etc.).
/public         # Fichiers statiques accessibles publiquement (index.html, etc.).
vite.config.js   # Configuration de Vite.
package.json     # Fichier de gestion des dépendances et des scripts.

## Déploiement

1. Pour construire le projet en production :

    Avec npm :
        npm run build

    Ou avec yarn :
        yarn build

2. Le dossier dist/ contiendra les fichiers optimisés pour la production. Vous pouvez maintenant déployer votre application sur votre serveur ou service de votre choix (par exemple, Netlify, Vercel, ou un serveur traditionnel avec Nginx).

## Contribution

Si vous souhaitez contribuer à ce projet, vous pouvez :

    1. Forker ce projet.
    2. Créer une branche (git checkout -b feature/nom-de-la-feature).
    3. Effectuer vos modifications.
    4. Soumettre une pull request.

## License

    Ce projet est sous la licence MIT. Consultez le fichier LICENSE pour plus de détails.

## Auteur

    Nom de l'auteur : Hakim AKKOUCHE.
    Contact : [LinkedIn](https://www.linkedin.com/in/hakim-akkouche/)