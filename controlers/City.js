const CityModel = require('../models').Cities

class City {
    static async findCityByName(name) {
        return await CityModel.findOne({ where: { name: name }, attributes: { exclude: ['idCity'] } })
    }
    static async findCityById(id) {
        return await CityModel.findOne({ where: { id: id } })
    }
}

module.exports = City