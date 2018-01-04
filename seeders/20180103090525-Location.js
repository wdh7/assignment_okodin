const models = require('../models');
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    const locationsData = [
      {city: 'City A', distance: 0},
      {city: 'City B', distance: 10},
      {city: 'City C', distance: 20},
      {city: 'City D', distance: 20},
      {city: 'City E', distance: 30}
    ];

    return queryInterface.bulkInsert('Locations', locationsData);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    return queryInterface.bulkDelete('Locations', null, {}, models.Location);
  }
};
