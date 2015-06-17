# Récupérer le projet github en local
`git clone git@github.com:firehist/angular-training.git`

# Installation du projet
`npm install && bower install`

# Lancement du server HTTP
Le `http-server` est à lancer depuis le dossier ROOT du projet.
`cd angular-traning && http-server`

# Mettre à jour
**/!\ Attention : Le git reset efface TOUTES vos modifications locales**
`git reset --hard HEAD && git pull --rebase`

Mettre à jour sans perdre les données:
`git stash && git pull --rebase && git stash pop`
