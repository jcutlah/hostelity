const userController = require('../controllers/userController');
const Strategy = require('passport-local').Strategy;

const localStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, cb) {
      userController.getUserByEmail(username, function(err, user) {
        if (err) { 
            return cb(err); 
        }
        if (!user) { 
            return cb(null, false); 
        }
        if (user.password != password) { 
            return cb(null, false); 
        }
        return cb(null, user);
      });
    });

module.exports = localStrategy;