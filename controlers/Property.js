const serviceJWT = require('../services/serviceJWT')
const user = require('../models').User
const PropertyModels = require('../models').Property
const CityCtl = require('./City')
const CityModel = require('../models').Cities
class Property {
    static async registerProperty(req, res) {
        var obj = {
            messageError: [],
            messageSucces: '',
            status: 201,
            token: req.body.token
        }
        if(Property.checkIfInfoRensegned(req.body.city, "city", obj) && Property.checkIfInfoRensegned(req.body.nbRoom, "nbRoom", obj) &&Property.checkIfInfoRensegned(req.body.price, "price", obj)){
            var cityId = await CityCtl.findCityByName(req.body.city)
            cityId = cityId.id
            const newProperty = await PropertyModels.create({ idUser: req.decoded.id, idCity: cityId, nbRoom: req.body.nbRoom, price: req.body.price })
            obj.messageSucces = "enregistrement reussi:)"
        }else{
            Property.checkIfInfoRensegned(req.body.city, "city", obj)
            Property.checkIfInfoRensegned(req.body.nbRoom, "nbRoom", obj)
            Property.checkIfInfoRensegned(req.body.price, "price", obj)

            const unique = (value, index, self) => {
                return self.indexOf(value) === index
            }

            obj.messageError = obj.messageError.filter(unique)
        }

        res.status(obj.status).json(obj)
    }

    static async getProperties(req, res) {
        var obj = {
            data: [],
            messageError: [],
            messageSucces: '',
            status: 201,
        }

        res.status(obj.status).json(obj)
    }
    static checkIfInfoRensegned(champ, name, obj) {
        if (champ != null && champ != undefined && champ != "") {
          if (obj.status == 400) {
            return false;
          }
          obj.status = 201;
          return true;
        }
        obj.messageError.push(`le chmap ${name} est obligatoir!`);
        obj.status = 400;
        return false;
    }
}

module.exports = Property