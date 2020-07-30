const property = require('../controlers/Property')
const serviceJWT = require('../services/serviceJWT')
module.exports = (app) => {
    app.post("/api/register/property", serviceJWT.UserIsAutorised ,(req, res) => {
        property.registerProperty(req, res)
    });

    app.get("/api/properties", (req, res) => {
        property.getProperties(req, res)
    });

    app.get('/api/find/properties/by/city', (req, res)=>{
        property.findPropertyByCity(req, res)
    })

    app.get('/api/find/properties/by/query/params', (req, res)=>{
        property.findPropertyByQueryParams(req, res)
    })

    app.get('/api/find/properties/:id', (req, res)=>{
        property.findPropertyById(req, res)
    })
};
