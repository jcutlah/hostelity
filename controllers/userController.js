const db = require('../models/index');
const bcrypt = require('bcrypt');

const orm = {
    addUser: function(userInfo, callback){
        console.log('running addUser()');
        console.log(userInfo);
        this.getUserByEmail(userInfo.email, function(err, result){
            console.log(err);
            console.log(result);
            if (!result){
                console.log('User not found. Creating user...');
                console.log(userInfo);
                let newUser = {...userInfo, email: userInfo.email.toLowerCase()}
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(userInfo.password, salt, function(err, hash) {
                        let newUser = {
                            ...userInfo, 
                            email: userInfo.email.toLowerCase(),
                            password: hash
                        }
                        db.User.create(newUser, function(err, response){
        
                            callback(err, response);
                        });
                    });
                });
            } else {
                if (err){
                    console.log(err);
                } else {
                    console.log('User found...');
                    callback(err, {
                        userExists: true
                    });
                }
            }
        })
    },
    getUserByEmail: function(email, callback){
        console.log(`getting user with email ${email}`);
        db.User.findOne({email:email.toLowerCase()}, function(err, user){
            console.log(err);
            console.log(`error: ${user}`);
            callback(err, user);
        })
    },
    getUser: function(id, callback){
        console.log(`getting user with id ${id}`);
        db.User.findOne({_id:id}, '-password', function(err, user){
            callback(err, user);
        });
    },
    getAllUsers: function(callback){
        console.log(`getAllUsers()`);
        db.User.find({}, '-password')
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