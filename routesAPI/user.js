const userCTRL = require("../controlers/User");
module.exports = (app) => {
  app.post("/api/login/user", (req, res) => {
    userCTRL.login(req, res);
  });
  app.post("/api/register/user", (req, res) => {
    userCTRL.register(req, res);
  });
};
