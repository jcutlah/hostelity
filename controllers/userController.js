const db = require('../models/index');

const orm = {
    addUser: function(user, callback){
        console.log('running addUser()');
        // console.log(user);
        db.User.create(user)
        .then(function(result) {
            // console.log(result);
            callback(result);
        })
        .catch(err => {
            if (err) console.error(err);
        })
    },
    getUser: function(id, callback){
        console.log(`getting user with id ${id}`);
        db.User.findOne({_id:id})
        .then(function(user){
            callback(user);
        })
        .catch(function(err){
            console.log(err);
        });
    },
    getAllUsers: function(callback){
        console.log(`getAllUsers()`);
        db.User.find({})
        .then(function(users){
            console.log('found users');
            callback(users)
        })
        .catch(function(err){
            console.log(err);
        });
    },
};

module.exports = orm;