const userController = require('../controllers/userController');
const Strategy = require('passport-local').Strategy;

const localStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, cb) {
        console.log('local strategy happening!');
      userController.getUserByEmail(username, function(err, user) {
        if (err) { 
            return cb(err); 
        }
        if (!user) { 
            return cb(null, false); 
        }
        if (user.password != password) { 
            console.log(`password don't match`);
            return cb(null, false); 
        }
        return cb(null, user);
      });
    });

module.exports = localStrategy;