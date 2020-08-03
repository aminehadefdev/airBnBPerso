module.exports = (app) => {
  require("./user")(app);
  require('./property')(app)
  require('./booking')(app)
  require('./apps')(app)
  require("./404")(app); //TOUJOUR A LA FIN
};
