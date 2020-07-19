const cityModel = require('../models').Cities

class City {
    static async findCityByName(name) {
        return await cityModel.findOne({ where: { name: name }, attributes: { exclude: ['idCity'] } })
    }
    static async findCityById(id) {
        return await cityModel.findOne({ where: { id: id } })
    }
}

module.exports = City