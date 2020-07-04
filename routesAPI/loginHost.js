const userCTRL = require("../controlers/User");
module.exports = (app) => {
  app.get("/api/login/user", (req, res) => {
    res.status(200).json({
      message: "route a appeler en post!!!!",
    });
  });
  app.post("/api/login/host/user", (req, res) => {
    userCTRL.loginHost(req, res);
  });
};
