const userCTRL = require("../controlers/User");
module.exports = (app) => {
  app.post("/api/login/user", (req, res) => {
    userCTRL.loginHost(req, res);
  });
  app.post("/api/register/user", (req, res) => {
    userCTRL.registerHost(req, res);
  });
};
