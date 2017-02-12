const passport = require('koa-passport');

const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const co = require('bluebird-co');

const db = require('../db/db');

const fetchUserByEmail = ((email) => {
  return db.sequelize.models.user.findOne({
    where: {
      email: email
    }
  });
});

const fetchUserById = ((id) => {
  return db.sequelize.models.user.findById(id);
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function*(id, done) {
  var user = yield fetchUserById(id);
  done(null, user);
});

passport.use(new LocalStrategy(co.wrap(function*(email, password, done) {
  let address = email.toLowerCase();
  let user = yield fetchUserByEmail(address);

  if (user) {
    let equal = yield bcrypt.compare(password, user.password);

    if (address === user.email && equal) {
      console.log('Good User');
      done(null, user);
    } else {
      console.log('Bad User');
      done(null, false);
    }
  } else {
    console.log('user not found');
    done(null, false);
  }
})));

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = process.env.JWT_SECRET || 'secret';
opts.issuer = 'www.eventrunner.com';
opts.audience = 'www.eventweb.com';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  fetchUserById(jwt_payload.sub)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      return done(err, false);
    });
}));
