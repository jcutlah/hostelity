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
                        db.Waypoint
                        .remove({})
                        .then(() => {
                            console.log('waypoints removed')
                            console.log('users removed');
                            process.exit(0);
                        });
                    });
                });
            });

