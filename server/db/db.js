const Sequelize= require('sequelize');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USERNAME= process.env.DB_USERNAME || 'homestead';
const DB_PASSWORD = process.env.DB_PASSWORD || 'secret';
const DB_NAME = process.env.DB_NAME || 'web_runner';

var db = {};

if (db.Sequelize === undefined) {
  db.Sequelize = Sequelize;
}

if (db.sequelize === undefined) {
  var sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  });

  sequelize.authenticate().then(function(err){
    console.log('DB connection established successfully');
  }).catch(function(err) {
    console.log('Unable to establish DB connection', err);
  });

  db.sequelize = sequelize;
}

const User = require('./model/User')(db.sequelize);

db.sequelize.sync();

db.addUser = function(firstname, lastname, email, password) {
  var user = User.build({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password
  });

  return user.save().then(function(result) {
      return this;
  });
};

module.exports = db;
