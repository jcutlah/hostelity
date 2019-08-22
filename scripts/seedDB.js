const mongoose = require("mongoose");
const db = require("../models");
const userController = require('../controllers/userController');
const tripController = require('../controllers/tripController');
const hostelController = require('../controllers/hostelController');

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/switchbak"
);
mongoose.set(
    'useFindAndModify', false
);

const hostelSeed = [
    {
        title: "Zion",
        location: {
            type: "Point",
            coordinates: [-113.0263,37.2982]
        }
    },
    {
        title: "Meeps",
        location: {
            type: "Point",
            coordinates: [-114.0263,37.2982]
        }
    },
    {
        title: "Smeep",
        location: {
            type: "Point",
            coordinates: [-110.0263,37.2982]
        }
    },
    
];
const tripSeed = [
    {
        name: "My Lame Ass Trip",
        startDest: [-113.0263,37.2982], 
        endDest: [-118.5551,36.8879]
    },
    {
        name: "My Stupid Trip",
        startDest: [-113.0263,37.2982], 
        endDest: [-118.5551,36.8879]
    },
    {
        name: "My Cliche Trip",
        startDest: [-113.0263,37.2982], 
        endDest: [-118.5551,36.8879]
    }
];
const seedData = [
    {
        user: {
            firstName: "James",
            lastName: "Cutler",
            email: "jamescutler1111@gmail.com",
            password: "bingbongbing",
            avatar: '/assets/images/hockeyJersey.jpg'
        },
        hostels: hostelSeed[0],
        trip: tripSeed[0]
    },
    {
        user: {
            firstName: "James",
            lastName: "Morrison",
            email: "totesmcgotes@gmail.com",
            password: "insecure",
            avatar: "https://placebeard.it/300x180"
        },
        hostels: hostelSeed[1],
        trip: tripSeed[1]
    },
    {
        user: {
            firstName: "Ryan",
            lastName: "Creveling",
            email: "yupyeahguy@gmail.com",
            password: "hackthisaccount",
            avatar: "https://placebeard.it/300x180"
        },
        hostels: hostelSeed[2],
        trip: tripSeed[2]
    }
];

db.Hostel
    .remove({})
    .then(() => {
        console.log('hostels removed')
        db.Trip
            .remove({})
            .then(() => {
                console.log('trips removed')
                db.User
                    .remove({})
                    .then(() => {
                        console.log('users removed')
                        seedData.forEach(seed => {
                            userController.addUser(seed.user, function(err, response){
                                if (err) throw err;
                                console.log(response);
                                console.log('meep');
                                tripController.addTrip(response._id, seed.trip, function(res){
                                    console.log('derp');
                                    console.log(res);
                                    tripController.associateTripToUser(response._id, res._id, function(user){
                                        console.log('trip associated: ');
                                        console.log(user);
                                        hostelController.addHostel(res._id, seed.hostels, function(newHostel){
                                            console.log(newHostel);
                                            hostelController.associateHostelToTrip(res._id, newHostel._id, function(trip){
                                                console.log(trip);
                                            })
                                            
                                        })
                                    })
                                })
                            }) 
                        });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        
    })
    .catch(err => {
        console.error(err);
    });

