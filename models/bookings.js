'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  Bookings.init({
    availability: DataTypes.DATE,
    idProperty: DataTypes.INTEGER,
    isBook: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Bookings',
  });
  return Bookings;
};