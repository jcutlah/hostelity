const db = require('../models/index');


const orm = {
    deleteTrip: function(tripId, callback){
        console.log(`deleting trip with id ${tripId}`);
        db.Trip.deleteOne({_id: tripId})
            .then(result => {
                console.log(result);
                callback(result);
            })
            .catch(err => {
                console.log(err)
                callback(err);
            })
    },
    addTrip: function(trip, callback){
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
    getTripById: function(tripId, callback) {
        db.Trip.findOne({_id: tripId})
        .populate({
            path: 'waypoints',
            model: 'Waypoint',
            options: {
                sort: {
                    'tripIndex': 1
                }
            },
            populate: {
                path: 'hostels',
                model: 'Hostel',
                select: 'placeId'
            }
        })
        .then(function(trip){
            callback(trip);
        })
        .catch(function(err){
            console.log(err);
            callback(err);
        })
    },
    getTripsForUser: function(userId, callback) {
        if (userId !== "null"){
            console.log(`getTrips() for userId ${userId}`);
            db.User.findOne({_id: userId}, "-password")
            .populate({
                path: 'trips',
                model: 'Trip',
                populate: {
                    path: 'waypoints',
                    model: 'Waypoint',
                    options: {
                        sort: {
                            'tripIndex': 1
                        }
                    },
                    populate: {
                        path: 'hostels',
                        model: 'Hostel'
                    }
                }
            })
            // .populate('trips')
            .then(function(user){
                // console.log(user);
                callback(user)
            })
            .catch(function(err){
                console.log(err);
            });
        } else {
            callback({errorMessage: "user id not present"});
        }
    },
    updateTripWithWaypoint: function(tripId, waypointId, callback){
        db.Trip.findOneAndUpdate({
            _id: tripId
        }, {$push: {waypoints:waypointId}})
            .then(function(trip){
                callback(trip);
            })
    }
};

module.exports = orm;