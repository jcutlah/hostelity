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
    }
};

module.exports = orm;

// addNote: function(message,callback){
//     console.log('running addNote()');
//     db.Note.create({comment:message.message.message}).then(function(result){
//         return db.Article.findOneAndUpdate({ _id: message.id }, {$push:{ notes: result._id }});

//     }).then(function(result){
//         callback(result);
//     }).catch(err => {
//         callback(err);
//     });
// },