const db = require('../models/index');


const orm = {
    addUser: function(user, callback){
        console.log('running addUser()');
        console.log(user);
        db.User.create(user)
        .then(function(result) {
            console.log(result);
            callback(result);
        })
        .catch(err => {
            if (err) console.error(err);
        })
    }
};

module.exports = orm;