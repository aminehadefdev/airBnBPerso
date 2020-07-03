const userCTRL = require("../controlers/User");
module.exports = (app) => {
  app.get("/api/register/user", (req, res) => {
    res.status(200).json({
      message: "route a appeler en post!!!!",
    });
  });
  app.post("/api/register/host/user", (req, res) => {
    userCTRL.registerHost(req, res);
  });
};
