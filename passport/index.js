const passport = require('passport');
const db = require('../models/index');
const strategy = require('./localStrategy');

passport.serializeUser(function(user, cb) {
    console.log(user);
    console.log('user logged in meep schmeep');
    cb(null, {
        id: user._id,
        loggedIn: true
    });
});
    
passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

passport.use(strategy);
module.exports = passport;