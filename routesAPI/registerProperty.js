const property = require('../controlers/Property')
module.exports = (app) => {
    app.get("/api/register/property", (req, res) => {
        res.status(200).json({
            message: "route a appeler en post!!!!",
        });
    });
    app.post("/api/register/property", (req, res) => {
        property.registerProperty(req, res)
    });
};
