'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TestQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
     */
    static associate(models) {
      //this.belongsTo(models.Question);
      //this.belongsTo(models.Test);
    }
  }
  TestQuestion.init({
    questionId: DataTypes.INTEGER,
    testId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TestQuestion',
  });
  return TestQuestion;
};