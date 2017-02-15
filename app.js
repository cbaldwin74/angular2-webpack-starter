'use strict';
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const co = Promise.coroutine;
const cluster = require('cluster');

// const adapt = require('koa-adapter'); // adapt pre Koa 2.0 middle ware to be compatible with Koa 2.0.
const adapt = require('koa-adapter-bluebird'); // uses bluebird-co for performance
const helmet = require('koa-helmet');

const Koa = require('koa');
const app = module.exports = new Koa();

const html = require('html-template-tag');
const convert = require('koa-convert');
const session = require('koa-generic-session');

if (process.env.REDISCLOUD_URL) {
  var redisConfig = {
    url: process.env.REDISCLOUD_URL
  };
} else {
  var redisConfig = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    post: process.env.REDIS_PORT || '6379'
  };
}

const redisStore = require('koa-redis')(redisConfig);
const passport = require('koa-passport');

app.use(require('koa-response-time')());
app.use(require('koa-favicon')(require.resolve('./dist/assets/icon/favicon.ico')));
app.use(require('koa-conditional-get')());
app.use(require('koa-etag')());

// create a write stream (in append mode)
// const accessLogStream = fs.createWriteStream(__dirname + '/server/log/access.log',
//                                              { flags: 'a' });
const accessLogStream = process.stdout;
app.use(require('koa-morgan')('combined', { stream: accessLogStream }));

app.use(require('koa-compress')({
    flush: require('zlib').Z_SYNC_FLUSH
}));
app.keys = ['some secret hurr'];

// app.use(adapt(require('koa-session')({
//     maxAge: 24 * 60 * 60 * 1000 // One Day
// }, app)));
app.use(convert(session({
    store: redisStore,
    maxAge: 24 * 60 * 60 * 1000 // One Day
}, app)));

app.use(require('koa-bodyparser')({
    // BodyParser options here
}));

require('./server/db/db.js');

require('./server/auth/auth');
app.use(passport.initialize());
// app.use(passport.session());

class NullOrUndefinedError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
        if (!this.message) {
            this.message = 'Null or undefined error';
        }
    }
}

(function () {
  // Example error handler to JSON stringify errors

  let errorCount = 0; // closure to keep this variable private

  app.use( (ctx, next) => {
      return co(function *() {
          try {
              yield next();
          } catch (err) {
              if (err === null) {
                  err = new NullOrUndefinedError();
              }
              // some errors will have .status
              // however this is not a guarantee
              ctx.status = err.status || 500;
              ctx.type = 'application/json';
              ctx.body = JSON.stringify({
                  errors: [{
                    id: errorCount++,
                    status: ctx.status,
                    title: err.message,
                    detail: err.stack
                  }]
              });

              // since we handled this manually we'll
              // want to delegate to the regular app
              // level error handling as well so that
              // centralized still functions correctly.
              ctx.app.emit('error', err, this);
          }
      })();
  });
})();

const router = require('koa-router')();

// Get our API routes
const api = require('./server/routes/api');

// Get our auth routes
const auth = require('./server/routes/auth');

// Catch all other routes and return the index file
// router.get('*', function(ctx, next) {
//     console.log(ctx);
//     serve(path.join(__dirname, 'dist/index.html'));
// });
// router.get('*', (req, res) => {
//     console.log('catch all');
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// const mount = require('koa-mount');

app.use(router.routes());
app.use(router.allowedMethods());

app.use(api.routes());
app.use(api.allowedMethods());

app.use(auth.routes());
app.use(auth.allowedMethods());

// app.use(mount(path.join(__dirname, 'dist'), require('koa-static')('dist')));
app.use(require('koa-static')(path.join(__dirname, 'dist')));
