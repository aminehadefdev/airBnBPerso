const serviceJWT = require('../services/serviceJWT')
const user = require('../models').User
const PropertyModels = require('../models').Property
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
                const newProperty = await PropertyModels.create({ idUser: userFinder.dataValues.id, idCity: 3, nbRoom: req.body.nbRoom, price: req.body.price })
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
}

module.exports = Property