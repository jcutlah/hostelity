const passport = require('passport');
const db = require('../models/index');
const strategy = require('./localStrategy');

passport.serializeUser(function(user, cb) {
    console.log(user);
    console.log('user meep schmeep');
    cb(null, user.id);
});
    
passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

passport.use(strategy);
module.exports = passport;