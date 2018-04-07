'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Jobs', [
    {
      title: 'Nodejs Backend',
      CompanyId: 1,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      title: 'Fullstack',
      CompanyId: 2,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Jobs', null, {}),
};
