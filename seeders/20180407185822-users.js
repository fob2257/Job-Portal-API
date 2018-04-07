'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      email: 'az@doe.com',
      password: '$2b$10$C4/rloN09BjxniGUwxo12OcTozFlMkwjcurFsYSyXzI2ynDHaXLCq',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      email: 'son@doe.com',
      password: '$2b$10$C4/rloN09BjxniGUwxo12OcTozFlMkwjcurFsYSyXzI2ynDHaXLCq',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      email: 'client@doe.com',
      password: '$2b$10$Nb/U1ldrLoQwqSPeQCUBGeXfIHcZ.zqsF9v0EwaSposWcZHdDgEHa',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
