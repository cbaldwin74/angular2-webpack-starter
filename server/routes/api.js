const express = require('express');
const router = express.Router();
const http = require('http');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/test', (req, res) => {
    var options = {
        hostname: '192.168.10.10',
        // method: 'GET',
        path: '/api/test',
        headers: {
            'X-Authorization': 'bf6b53147f041e3bff9b6207419924854f17d00c'
        }
    };

    var apiReq = http.get(options, (apiRes) => {
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

            res.send(result);
        });
    });

    apiReq.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        res.send(`${e.message}`);
    });

});

module.exports = router;
