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
    }
};

module.exports = orm;