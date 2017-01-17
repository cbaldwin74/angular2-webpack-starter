const passport = require('koa-passport');

const LocalStrategy = require('passport-local').Strategy;

const fetchUser = (() => {
    const user = { id: 1, username: 'test', password: 'test' };
    return new Promise(function(resolve, reject) {
        resolve(user);
    });
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function*(id, done) {
    yield new Promise(function(resolve, reject) {
        resolve(user);
    }).then(function(result) {
        done(null, result);
    });
});

passport.use(new LocalStrategy(function(username, password, done) {
    fetchUser()
        .then(user => {
            if (username === user.username && password === user.password) {
                console.log('Good User');
                done(null, user);
            } else {
              console.log('Bad User');
                done(null, false);
            }
        })
        .catch(err => done(err));
}));
