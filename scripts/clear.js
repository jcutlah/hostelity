const mongoose = require("mongoose");
const db = require("../models");
const userController = require('../controllers/userController');
const tripController = require('../controllers/tripController');
const hostelController = require('../controllers/hostelController');
const WaypointController = require("../controllers/waypointController");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/switchbak"
);
mongoose.set(
    'useFindAndModify', false
);

const seedData = [
    {
        user: {
            firstName: "James",
            lastName: "Cutler",
            email: "Jamescutler1111@gmail.com",
            password: "jcut",
            avatar: '/assets/images/hockeyJersey.jpg'
        }
    },
    {
        user: {
            firstName: "James",
            lastName: "Morrison",
            email: "totesmcgotes@gmail.com",
            password: "insecure",
            avatar: "https://placebeard.it/300x180"
        }
    },
    {
        user: {
            firstName: "Ryan",
            lastName: "Creveling",
            email: "yupyeahguy@gmail.com",
            password: "hackthisaccount",
            avatar: "https://placebeard.it/300x180"
        }
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
                db.Waypoint
                    .remove({})
                    .then(() => {
                        console.log('waypoints removed')
                        db.User
                        .remove({})
                        .then(() => {
                            seedData.forEach(seed => {
                                userController.addUser(seed.user, function(err, response){
                                    if (err) throw err;
                                    console.log(response);
                                });
                            });
                        });
                    });
                });
            });
      