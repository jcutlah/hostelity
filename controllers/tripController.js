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
    getTripsForUser: function(userId, callback) {
        console.log(`getTrips() for userId ${userId}`);
        db.User.findOne({_id: userId})
        .populate({
            path: 'trips',
            model: 'Trip',
            populate: {
                path: 'hostels',
                model: 'Hostel'
            }
        })
        // .populate('trips')
        .then(function(user){
            // console.log(user);
            callback(user.trips)
        })
        .catch(function(err){
            console.log(err);
        });
    }
}


module.exports = orm;