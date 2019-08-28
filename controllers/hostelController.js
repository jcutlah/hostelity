const db = require('../models/index');


const orm = {
    addHostel: function(hostel, callback){
        console.log('running addHostel()');
        console.log(hostel);
        // console.log(waypointId);
        db.Hostel.create(hostel)
        .then(function(result) {
            console.log(result._id);
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
    }
};

module.exports = orm;