const db = require('../models/index');


const orm = {
    addWaypoint: function(waypoint, callback){
        console.log('running addWaypoint()');
        console.log(waypoint);
        // console.log(tripId);
        db.Waypoint.create(waypoint)
        .then(function(result) {
            console.log(result);
            console.log('waypoint meep');
            // return db.Trip.findOneAndUpdate({
            //     _id: tripId
            // }, {$push: {waypoints:result._id}});
            callback(result);
        })
        // .then(function(result){
        //     console.log(result);
        //     callback(result);
        // })
        .catch(err => {
            if (err) console.error(err);
        })
    },
    getWaypoint: function(id, callback){
        console.log(`getting waypoint with id ${id}`);
        db.Waypoint.findOne({_id:id})
        .then(function(waypoint){
            callback(waypoint);
        })
        .catch(function(err){
            console.log(err);
        });
    },
    getAllWaypointsInTrip: function(tripId, callback){
        console.log(`Getting all waypoints for trip with id ${tripId}`);
        db.Trip.findOne({_id: tripId})
        .populate({
            path: 'waypoints',
            model: 'Waypoint'
        })
        .then(function(trip){
            console.log(trip.waypoints);
            callback(trip.waypoints)
        })
        .catch(function(err){
            console.log(err);
        })
    },
    associateWaypointToTrip: function(tripId, waypointId, callback) {
        console.log(`associating waypoint w/ id ${waypointId} to trip w/ id ${tripId}`);
        db.Trip.findOneAndUpdate({
            _id: tripId
        }, {$push: {waypoints:waypointId}})
        .then(function(trip){
            callback(trip);
        })
    }
};

module.exports = orm;