const cityModel = require('../models').Cities

class City {
    static async findCityByName(name) {
        return await cityModel.findOne({ where: { name: name }, attributes: { exclude: ['idCity'] } })
    }
    static async findCityById(id) {
        return await cityModel.findOne({ where: { id: id } })
    }
    static async findAllCities(req, res){
        var cities = await cityModel.findAll()
        res.status(201).json(cities)
    }
}

module.exports = City