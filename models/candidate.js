'use strict';
module.exports = (sequelize, DataTypes) => {
  var Candidate = sequelize.define('Candidate', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Candidate.associate = (models) => {
    Candidate.belongsToMany(models.Job, {
      through: 'Application',
    });
  };
  return Candidate;
};