module.exports = (app) => {
  require("./registerHost")(app);
  require("./loginHost")(app);
  require('./registerProperty')(app)
  require('./host')(app)
  require("./404")(app); //TOUJOUR A LA FIN
};
