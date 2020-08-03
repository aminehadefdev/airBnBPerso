module.exports = (app) => {
  app.get("*", (req, res) => {
    res.status(404).json({
      message: "not found:(",
    });
  });
  app.post("*", (req, res) => {
    res.status(404).json({
      message: "not found:(",
    });
  });
};
