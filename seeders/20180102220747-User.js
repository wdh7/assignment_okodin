const models = require('./../models');

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
    const usersData = [];

    for (let i = 1; i <= 10; i++) {
      usersData.push({
        username: `foobar${i}`,
        email: `foobar${i}@email.com`
      });
    }

    return queryInterface.bulkInsert('Users', usersData);

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    return queryInterface.bulkDelete('Users', null, {}, models.User);
  }
};
