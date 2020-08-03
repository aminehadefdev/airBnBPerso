const serviceJWT = require('../services/serviceJWT')
const cityCtrl = require('../controlers/City')
module.exports = (app) => {
    app.get('/api/cities', (req, res)=>{
        cityCtrl.findAllCities(req, res)
    })
};