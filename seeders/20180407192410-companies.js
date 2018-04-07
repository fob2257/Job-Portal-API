'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Companies', [
    {
      name: 'AZ-Ops',
      city: 'Tucson',
      address: 'Inez 43050',
      UserId: 1,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      name: 'SON-Ops',
      city: 'Hermosillo',
      address: 'Ranchito 83050',
      UserId: 2,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Companies', null, {}),
};
