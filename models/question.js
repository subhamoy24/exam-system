'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.QuestionCategory);
      this.hasMany(models.Option);
      this.hasOne(models.Answer);
      this.belongsToMany(models.Test, {through: 'TestQuestion', foreignKey: 'questionId'})
    }
  }
  Question.init({
    description: DataTypes.STRING,
    questionCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};