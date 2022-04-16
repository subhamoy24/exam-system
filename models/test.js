'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      this.belongsToMany(models.Question, {through: 'TestQuestion', foreignKey: 'testId'});
    }
  }
  Test.init({
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Test',
  });
  return Test;
};