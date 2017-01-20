const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secret4';

module.exports = {
  create: function(payload) {
    return new Promise(function(resolve, reject) {
      jwt.sign(payload, SECRET, {}, function(err, token) {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  },

  verify: function(token) {
    return new Promise(function(resolve, reject) {
      jwt.verify(token, SECRET, {}, function(err, payload) {
        if (err) {
          reject(err);
        } else {
          resolve(payload);
        }
      });
    });
  }
};
