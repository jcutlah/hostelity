const userController = require('../controllers/userController');
const Strategy = require('passport-local').Strategy;

const localStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        console.log('local strategy happening!');
      userController.getUserByEmail(username, function(err, user) {
        if (err) { 
            console.log('error happened');
            return done(err); 
        }
        if (!user) {
            console.log(`${username} not a user`)
            return done(null, false, { message: "Not a user"}); 
        }
        if (user.password != password) { 
            console.log(`password don't match`);
            return done(null, false, { message: "Incorrect password"}); 
        }
        return done(null, user);
      });
    });

module.exports = localStrategy;