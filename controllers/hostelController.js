const db = require('../models/index');


const orm = {
    addHostel: function(tripId, hostel, callback){
        console.log('running addHostel()');
        console.log(hostel);
        // console.log(tripId);
        db.Hostel.create(hostel)
        .then(function(result) {
            console.log(result._id);
            console.log('hostel meep');
            // return db.Trip.findOneAndUpdate({
            //     _id: tripId
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
    associateHostelToTrip: function(tripId, hostelId, callback) {
        console.log(`associating hostel w/ id ${hostelId} to trip w/ id ${tripId}`);
        db.Trip.findOneAndUpdate({
            _id: tripId
        }, {$push: {hostels:hostelId}})
        .then(function(trip){
            callback(trip);
        })
    }
};

module.exports = orm;