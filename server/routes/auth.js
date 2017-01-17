const router = require('koa-router')();
const co = require('bluebird-co');
const passport = require('koa-passport');

router.prefix('/auth');

router.post('/login',
  passport.authenticate('local'),
  (ctx, next) => {
    ctx.body = 'success';
  }
);

module.exports = router;
