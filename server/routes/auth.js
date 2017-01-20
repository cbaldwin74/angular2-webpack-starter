const router = require('koa-router')();
const co = require('bluebird-co');
const passport = require('koa-passport');
const db = require('../db/db');
const jwt = require('../auth/jwt');

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
    var user = yield db.addUser(userInfo.firstname, userInfo.lastname, userInfo.email, userInfo.password);
    ctx.login(user, function(err) {
      if (err) {
        return next(err);
      }

      ctx.body = { success: true };
    });
  })
);


router.post('/logout', (ctx, next) => ctx.logout());

module.exports = router;
