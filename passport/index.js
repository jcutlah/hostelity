const passport = require('passport');
const db = require('../models/index');
const strategy = require('./localStrategy');

passport.serializeUser(function(user, cb) {
    console.log(user);
    console.log('user logged in meep schmeep');
    cb(null, user._id);
});
    
passport.deserializeUser(function(user, cb) {
    console.log(`deserializing user:`);
    console.log(user);
    db.User.findById(user, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

passport.use(strategy);
module.exports = passport;