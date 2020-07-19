const property = require('../controlers/Property')
const serviceJWT = require('../services/serviceJWT')
module.exports = (app) => {
    app.post("/api/register/property", serviceJWT.UserIsAutorised ,(req, res) => {
        property.registerProperty(req, res)
    });

    app.get("/api/properties", (req, res) => {
        property.getProperties(req, res)
    });
};
