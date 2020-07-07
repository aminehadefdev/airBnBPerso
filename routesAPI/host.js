const property = require('../controlers/Property')
module.exports = (app) => {
    app.get("/api/properties", (req, res) => {
        property.getProperties(req, res)
    });
};
