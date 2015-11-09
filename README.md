Bonjour à tous !

Twitter : [blongearet](twitter.com/blongearet)

Email : [blongearet@gmail.com](mailto:blongearet@gmail.com)

# Récupérer le projet github en local
`git clone https://github.com/firehist/angular-training`

# Installation des dépendences
## NodeJS & NPM
Site web : https://nodejs.org/
Installer NodeJS en cliquant sur "Install".
NodeJS installe automatiquement NPM.
## bower, http-server
`npm install -g bower http-server`

# Installation du projet
`npm install && bower install`

# Lancement du server HTTP
Le `http-server` est à lancer depuis le dossier ROOT du projet.
`cd angular-training && http-server`

# Mettre à jour
**/!\ Attention : Le git reset efface TOUTES vos modifications locales**
`git reset --hard HEAD && git pull --rebase`

Mettre à jour sans perdre les données:
`git stash && git pull --rebase && git stash pop`
