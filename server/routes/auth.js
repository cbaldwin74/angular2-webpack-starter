const router = require('koa-router')();
const co = require('bluebird-co');
const passport = require('koa-passport');
const db = require('../db/db');
const jwt = require('../auth/jwt');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

router.prefix('/auth');

router.post('/login',
  passport.authenticate('local'),
  co.wrap(function*(ctx, next) {
    try {
      var token = yield jwt.create({ sub: ctx.req.user.id});
      ctx.body = { token: token };
    } catch (err) {
      console.log(err);
      return next(err);
    }
  })
);

router.post('/signup',
  co.wrap(function*(ctx, next) {
    var userInfo = ctx.request.body;
    let encrypted = yield bcrypt.hash(userInfo.password, saltRounds);
    var user = yield db.addUser(userInfo.firstname, userInfo.lastname, userInfo.email.toLowerCase(), encrypted);
    ctx.login(user, co.wrap(function*(err) {
      if (err) {
        return next(err);
      }

      var token = yield jwt.create({ sub: ctx.req.user.id});
      ctx.body = { token: token };
    }));
  })
);


router.post('/logout', (ctx, next) => ctx.logout());

module.exports = router;
