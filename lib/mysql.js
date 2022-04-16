const Sequelize = require('sequelize');

const sequelize = new Sequelize('u867083740_chesta', 'u867083740_subha', 'Subhamoy$24', {
  host: '185.187.241.1',
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000

  }
});

var User = sequelize.define('users', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'

  },
  email: {
    type: Sequelize.STRING,
  }
}) 
export {sequelize};