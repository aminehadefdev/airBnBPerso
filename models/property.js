'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Property.belongsTo(models.Cities, {
        foreignKey: 'idCity',
      });

      Property.belongsTo(models.User, {
        foreignKey : 'idUser'
      })

      Property.hasMany(models.Bookings, {
        foreignKey: "idProperty"
      })
    }
  };
  Property.init({
    idUser: DataTypes.INTEGER,
    idCity: DataTypes.INTEGER,
    nbRoom: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};