'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: { 
        isEmail: true,
        isUnique: function(value, next) {
          User.findOne({
            where: { email: value},
            attributes: ['id']
          }).then(function(res){
            if(res){
              return next("Email already exist");
            }else{
              return next();
            }
          }).catch(
            (error) => {
              return next();
            }
          )
        }},
      allowNull: false,
      
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};