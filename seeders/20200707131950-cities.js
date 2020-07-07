'use strict';
const cities = require('./cities.json')
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Cities', cities, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
