const router = require('koa-router')();
const http = require('http');
const co = require('bluebird-co');
// const adapt = require('koa-adapter-bluebird'); // uses bluebird-co for performance
// const co = require('co');

router.prefix('/api');

/* GET api listing. */
router.get('/', (ctx, next) => {
    ctx.body = 'api works';
});

router.get('/test2', co.wrap(function*(ctx, next) {
    yield new Promise(resolve => setTimeout(resolve, 1000));
    ctx.body = 'Web Server Reply';
}));

router.get('/test', co.wrap(function*(ctx, next) {
    var options = {
        hostname: process.env.EVENT_RUNNER_HOST,
        // method: 'GET',
        path: '/api/test',
        headers: {
            'X-Authorization': process.env.EVENT_RUNNER_API_KEY
        }
    };

    yield new Promise(function(resolve, reject) {
        http.get(options, (apiRes) => {
            var result = '';
            console.log(`STATUS: ${apiRes.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(apiRes.headers)}`);
            apiRes.setEncoding('utf8');
            apiRes.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
                result += `${chunk}`;
            });
            apiRes.on('end', () => {
                console.log('No more data in response.');

                resolve(result);
            });
        }).on('error', (e) => {
            console.log(`problem with request: ${e.message}`);

            reject(e);
        });
    }).then(function(result) {
        console.log('then: ' + result);

        ctx.body = result;
    });

    console.log('Done');
}));


router.post('/event', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    port: 80,
    method: 'POST',
    path: '/api/event',
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  // console.log('received', ctx.request.body);
  yield sendRequest(options, ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

function sendRequest(options, data) {
  // console.log('sending request', options);
  return new Promise(function(resolve, reject) {
    var req = http.request(options, (apiRes) => {
      var result = '';
      // console.log(`STATUS: ${apiRes.statusCode}`);
      // console.log(`HEADERS: ${JSON.stringify(apiRes.headers)}`);
      apiRes.setEncoding('utf8');
      apiRes.on('data', (chunk) => {
          // console.log(`BODY: ${chunk}`);
          result += `${chunk}`;
      });
      apiRes.on('end', () => {
          // console.log('No more data in response.');

          resolve(result);
      });
    }).on('error', (e) => {
      console.log(`problem with request: ${e.message}`);

      reject(e);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

module.exports = router;
