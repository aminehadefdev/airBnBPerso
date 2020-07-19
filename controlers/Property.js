const userModel = require('../models').User
const PropertyModels = require('../models').Property
const CityModel = require('../models').Cities
const bookingModel = require('../models/').Bookings

const cityController = require('./City')

class Property {
    static async registerProperty(req, res) {
        var obj = {
            messageError: [],
            messageSucces: '',
            status: 201,
            token: req.body.token
        }
        if(Property.checkIfInfoRensegned(req.body.city, "city", obj) && Property.checkIfInfoRensegned(req.body.nbRoom, "nbRoom", obj) && Property.checkIfInfoRensegned(req.body.price, "price", obj)){
            var cityId = await cityController.findCityByName(req.body.city)
            cityId = cityId.id
            const newProperty = await PropertyModels.create({ idUser: req.decoded.id, idCity: cityId, nbRoom: req.body.nbRoom, price: req.body.price })
            if(req.body.bookings){
                var bookings = req.body.bookings.split(',')
                for(let i = 0; i < bookings.length; i++){
                    var registerBooking = await bookingModel.create({
                        availability : bookings[i],
                        idProperty : newProperty.id,
                        isBook : false,
                    })
                }
            }
            obj.messageSucces = "enregistrement reussi:)"
        }else{
            Property.checkIfInfoRensegned(req.body.city, "city", obj)
            Property.checkIfInfoRensegned(req.body.nbRoom, "nbRoom", obj)
            Property.checkIfInfoRensegned(req.body.price, "price", obj)

            const unique = (value, index, self) => {
                return self.indexOf(value) === index
            }
            
            obj.status = 400
            obj.messageError = obj.messageError.filter(unique)
        }

        res.status(obj.status).json(obj)
    }

    static async getProperties(req, res) {
        var obj = {
            data : [],
            messageError: [],
            messageSucces: '',
            status: 201,
        }
        obj.data = await PropertyModels.findAll({
            attributes : ['nbRoom', 'price'],
            include: [
                {model : CityModel, attributes : ['name']},
                {model : userModel, attributes : ['firstName', 'lastName', 'email', 'city', "description", ]}
            ],
            
        })
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