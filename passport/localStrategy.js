const userController = require('../controllers/userController');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const localStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        console.log(`local strategy happening for ${username} with password ${password}`);
      userController.getUserByEmail(username, function(err, user) {
        if (err) { 
            console.log('error happened');
            return done(err); 
        }
        if (!user) {
            console.log(`${username} not a user`)
            return done(null, false, { message: "Not a user"}); 
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                console.log("authenticated");
                return done(null, user);
            } else {
                // password is incorrect <<<<< WHAT TO DO
                return done(null, false, { message: "Incorrect password"});
            };
        });
        // return done(null, user);
      });
    });

module.exports = localStrategy;