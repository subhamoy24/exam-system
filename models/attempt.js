'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attempt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.Question);
      this.belongsTo(models.TestAttempt);
    }
  }
  Attempt.init({
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    testAttemptId: DataTypes.INTEGER,
    response: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attempt',
  });
  return Attempt;
};