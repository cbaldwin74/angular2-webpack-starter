const router = require('koa-router')();
const http = require('http');
const https = require('https');
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

// Events

router.post('/event', co.wrap(function*(ctx, next) {
  // console.log('received', ctx.request.body);
  yield sendRequest('POST', '/api/event', ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.put('/event', co.wrap(function*(ctx, next) {
  // console.log('received', ctx.request.body);
  yield sendRequest('PUT', '/api/event', ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/events', co.wrap(function*(ctx, next) {
  yield sendRequest('GET', '/api/events', null).then(function(result) {
    console.log(result);

    ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/events/:ownerId', co.wrap(function*(ctx, next) {
  yield sendRequest('GET', '/api/events/' + ctx.params.ownerId, null)
  .then((result) => ctx.body = result)
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/event/:id', co.wrap(function*(ctx, next) {
  yield sendRequest("GET", '/api/event/' + ctx.params.id, null)
  .then((result) => ctx.body = result)
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.post('/event/search', co.wrap(function*(ctx, next) {
  // console.log('received', ctx.request.body);
  yield sendRequest('POST', '/api/event/search', ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

// Stage

router.post('/stage', co.wrap(function*(ctx, next) {
  // console.log('received', ctx.request.body);
  yield sendRequest('POST', '/api/stage', ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.put('/stage', co.wrap(function*(ctx, next) {
  // console.log('received', ctx.request.body);
  yield sendRequest('PUT', '/api/stage', ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/stages', co.wrap(function*(ctx, next) {
  yield sendRequest('GET', '/api/stages', null).then(function(result) {
    console.log(result);

    ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/stages/:ownerId', co.wrap(function*(ctx, next) {
  yield sendRequest('GET', '/api/stages/' + ctx.params.ownerId, null)
  .then((result) => ctx.body = result)
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/stage/:id', co.wrap(function*(ctx, next) {
  yield sendRequest('GET', '/api/stage/' + ctx.params.id, null)
  .then((result) => ctx.body = result)
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

// Achievement

router.post('/achievement', co.wrap(function*(ctx, next) {
  // console.log('received', ctx.request.body);
  yield sendRequest('POST', '/api/achievement', ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.put('/achievement', co.wrap(function*(ctx, next) {
  // console.log('received', ctx.request.body);
  yield sendRequest('PUT', '/api/achievement', ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/achievements', co.wrap(function*(ctx, next) {
  yield sendRequest('GET', '/api/achievements', null).then(function(result) {
    console.log(result);

    ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/achievements/:eventId', co.wrap(function*(ctx, next) {
  yield sendRequest('GET', '/api/achievements/' + ctx.params.eventId, null)
  .then((result) => ctx.body = result)
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/achievement/:id', co.wrap(function*(ctx, next) {
  yield sendRequest('GET', '/api/achievement/' + ctx.params.id, null)
  .then((result) => ctx.body = result)
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

function sendRequest(method, path, data) {
  // console.log('sending request', options);
  let dataString = null;
  let options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    method: method,
    path: path,
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  if (data) {
    dataString = JSON.stringify(data);
    options.headers['Content-Length'] = Buffer.byteLength(dataString);
  }

  return new Promise(function(resolve, reject) {
    var req = https.request(options, (apiRes) => {
      var result = '';
      var status = apiRes.statusCode;
      console.log(`STATUS: ${apiRes.statusCode}`);

      if ((status >= 200) && (status < 300)) {
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
      } else {
        reject(new Error('Request error: ' + status));
      }
    }).on('error', (e) => {
      console.log(`problem with request: ${e.message}`);

      reject(e);
    });

    if (dataString) {
      req.write(dataString);
    }
    req.end();
  });
}

module.exports = router;
