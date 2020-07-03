module.exports = (app) => {
  require("./registerHost")(app);
  require("./404")(app); //TOUJOUR A LA FIN
};
