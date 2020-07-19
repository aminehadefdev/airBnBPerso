* 1 lancer : npm install
* 2 créer un fichier .env a la racine
* 3 mettre deux variable dans le .env
    * JWT_SIGN_SECRET = "une super phrase super secrete"
    * PORT = 8000
* 4 modifier le fichier qui se trouve dans /config/config.json
* 5 créer la base de donner (sans aucune table)
* 6 lancer :
    * npx sequelize-cli db:migrate
    * npx sequelize-cli db:seed:all
* 7 pour demarer le server lancer : 
    * node ou nodemon /serverApi.js
