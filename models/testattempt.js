'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TestAttempt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TestAttempt.init({
    userId: DataTypes.INTEGER,
    testId: DataTypes.INTEGER,
    timeRemaining: DataTypes.INTEGER,
    submitted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TestAttempt',
  });
  return TestAttempt;
};