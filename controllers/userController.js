const db = require('../models/index');

const orm = {
    addUser: function(user, callback){
        console.log('running addUser()');
        // console.log(user);
        db.User.create(user, function(err, result){
            callback(err, result);
        });
    },
    getUser: function(id, callback){
        console.log(`getting user with id ${id}`);
        db.User.findOne({_id:id}, function(err, user){
            callback(err, user);
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