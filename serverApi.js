const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const env = require("dotenv").config().parsed;

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

require("./routesAPI/index")(app);

app.listen(env.PORT, (err) => {
  if (err) console.error(err);
  else console.log("Serveur démarré au port " + env.PORT);
});
