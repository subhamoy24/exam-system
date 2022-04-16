'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Question)
    }
  }
  Option.init({
    value: DataTypes.TEXT,
    correct: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Option',
  });
  return Option;
};