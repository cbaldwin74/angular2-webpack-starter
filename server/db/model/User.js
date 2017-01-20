const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('user', {
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING, 
      allowNull: false
    }
  });
};
