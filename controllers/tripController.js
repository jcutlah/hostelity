const db = require('../models/index');


const orm = {
    addTrip: function(userId, trip, callback){
        console.log('running trip()');
        console.log(trip);
        db.Trip.create(trip)
        .then(function(result) {
            console.log(result);
            callback(result);
        })
        .catch(err => {
            if (err) console.error(err);
        })
    },
    associateTripToUser: function(userId, tripId, callback) {
        console.log(`associating trip w/ id ${tripId} to user w/ id ${userId}`);
        db.User.findOneAndUpdate({
            _id: userId
        }, {$push: {trips:tripId}})
        .then(function(user){
            callback(user);
        })
    },
    getAllTrips: function(callback){
        console.log(`getAllTrips()`);
        db.User.find({})
        .then(function(users){
            console.log('found users');
            callback(users)
        })
        .catch(function(err){
            console.log(err);
        });
    },
    getTrips: function(userId, callback) {
        console.log(`getTrips() for userId ${userId}`);
        db.User.findOne({_id: userId})
        .populate('trips')
        .then(function(user){
            // console.log(user);
            callback(user)
        })
        .catch(function(err){
            console.log(err);
        });
    }
}


module.exports = orm;