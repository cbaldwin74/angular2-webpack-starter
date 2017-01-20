const Sequelize= require('sequelize');

var db = {};

if (db.Sequelize === undefined) {
  db.Sequelize = Sequelize;
}

if (db.sequelize === undefined) {
  var sequelize = new Sequelize('web_runner', 'homestead', 'secret', {
    host: 'localhost',
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
