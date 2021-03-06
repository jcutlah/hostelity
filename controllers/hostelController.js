const db = require('../models/index');


const orm = {
    addHostel: function(hostel, callback){
        console.log('running addHostel()');
        console.log(hostel);
        // console.log(waypointId);
        db.Hostel.create(hostel)
        .then(function(result) {
            console.log(result);
            console.log('hostel meep');
            // return db.Waypoint.findOneAndUpdate({
            //     _id: waypointId
            // }, {$push: {hostels:result._id}});
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
    getHostel: function(id, callback){
        console.log(`getting hostel with id ${id}`);
        db.Hostel.findOne({_id:id})
        .then(function(hostel){
            callback(hostel);
        })
        .catch(function(err){
            console.log(err);
        });
    },
    associateHostelToWaypoint: function(waypointId, hostelId, callback) {
        console.log(`associating hostel w/ id ${hostelId} to waypoint w/ id ${waypointId}`);
        db.Waypoint.findOneAndUpdate({
            _id: waypointId
        }, {$push: {hostels:hostelId}})
        .then(function(waypoint){
            callback(waypoint);
        })
        .catch(err => {
            console.log(err);
        })
    },
    removeOneHostel: function(hostelId, callback) {
        console.log(`removing hostel with id ${hostelId}`);
        db.Hostel.deleteOne({ _id: hostelId })
        .then(function(deletedHostel){
            callback(deletedHostel);
        })
        .catch(err => {
            callback(err);
        });
    }
};

module.exports = orm;