'use strict';
module.exports = (sequelize, DataTypes) => {
  var Job = sequelize.define('Job', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Job.associate = (models) => {
    Job.belongsTo(models.Company, {
      foreignKey: {
        allowNull: false,
      },
    });
    Job.belongsToMany(models.Candidate, {
      through: 'Application',
    })
  };
  return Job;
};