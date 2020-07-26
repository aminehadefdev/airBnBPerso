const userModel = require('../models').User
const PropertyModels = require('../models').Property
const CityModel = require('../models').Cities
const bookingModel = require('../models/').Bookings

const cityController = require('./City')

const { Op } = require("sequelize");

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
            attributes : ['nbRoom', 'price', 'id'],
            include: [
                {model : CityModel, attributes : ['name']},
                {model : userModel, attributes : ['firstName', 'lastName', 'email', 'city', "description", "id"]},
                {model : bookingModel, attributes : ["availability"]}
            ],
            
        })
        res.status(obj.status).json(obj)
    }
    static async findPropertyByCity(req, res){
        var obj = {
            data : [],
            messageError: [],
            messageSucces: '',
            status: 201,
        }
        
        var idCity = await cityController.findCityByName(req.body.name)
        idCity = idCity.id

        obj.data = await PropertyModels.findAll({
            where : {
                idCity : idCity
            },
            attributes : ['nbRoom', 'price', 'id'],
            include: [
                {model : CityModel, attributes : ['name']},
                {model : userModel, attributes : ['firstName', 'lastName', 'email', 'city', "description", "id"]},
                {model : bookingModel, attributes : ["availability"]}
            ],
            
        })

        res.status(obj.status).json(obj)
    }
    static async findPropertyByQueryParams(req, res){
        var obj = {
            data : [],
            messageError: [],
            messageSucces: '',
            status: 201,
        }

        var nameCity = null
        var availability = null

        if(req.query.city){
            nameCity = {
                name : {
                    [Op.eq] : req.query.city
                }
            }
        }

        if(req.query.dateMin || req.query.dateMax){
            if(req.query.dateMin){
                availability = {
                    availability : {
                        [Op.gte]: req.query.dateMin
                    }
                }
            }
            if(req.query.dateMax){
                availability = {
                    availability : {
                        [Op.lte]: req.query.dateMax
                    }
                }
            }
            if(req.query.dateMin && req.query.dateMax){
                availability = {
                    availability : {
                        [Op.gte]: req.query.dateMin,
                        [Op.lte]: req.query.dateMax
                    }
                }
            }
        }
        
        obj.data = await PropertyModels.findAll({
            include: [
                {model : CityModel, attributes : ['name'], where : nameCity},
                {model : userModel, attributes : ['firstName', 'lastName', 'email', 'city', "description", "id"]},
                {model : bookingModel, attributes : ["availability"], where : availability}
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