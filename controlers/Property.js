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
        var isAut = serviceJWT.UserIsAutorised(req.body.token)
        if (isAut != false) {
            var userFinder = await user.findOne({ where: { email: isAut.email } })
            if (userFinder != null) {
                var city = await CityCtl.findCityByName(req.body.city)
                const newProperty = await PropertyModels.create({ idUser: userFinder.dataValues.id, idCity: city.dataValues.id, nbRoom: req.body.nbRoom, price: req.body.price })
                obj.messageSucces = "enregistrement reussi:)"
            } else {
                obj.messageError.push("utilisateur introuvable!!!")
                obj.status = 400
            }
        } else {
            obj.messageError.push("vous n'avez pas l'autorisation d'enregistrer une nouvelle proprieter!!!")
            obj.status = 400
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

        if (req.body.token != null || req.body.token != '' || req.body.token != undefined) {
            var isAut = serviceJWT.UserIsAutorised(req.body.token)
            if (isAut != false) {
                obj.data = await PropertyModels.findAll({
                    where: { idUser: isAut.id },
                    include: [
                        { model: CityModel }
                    ]
                })

            } else {
                obj.messageError.push('token pas cool')
                obj.status = 400
            }
        }

        res.status(obj.status).json(obj)
    }
}

module.exports = Property