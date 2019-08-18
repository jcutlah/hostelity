const db = require('../models/index');


const orm = {
    addTrip: function(userId, trip, callback){
        console.log('running trip()');
        console.log(trip);
        db.Trip.create(trip)
        .then(function(result) {
            console.log(result);
            return db.User.findOneAndUpdate({
                _id: userId
            }, {$push: {trips:result._id}});
        })
        .then(function(result){
            callback(result);
        })
        .catch(err => {
            if (err) console.error(err);
        })
    }
};

module.exports = orm;