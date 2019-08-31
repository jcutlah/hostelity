const mongoose = require("mongoose");
const db = require("../models");
const userController = require('../controllers/userController');
const tripController = require('../controllers/tripController');
const hostelController = require('../controllers/hostelController');
const waypointController = require('../controllers/waypointController');

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/switchbak"
  );
  mongoose.set(
      'useFindAndModify', false
  );

// get user by id
const getUserById = () => {
    userController.getUser("5d57ea23f3d50274d42a3cde", function(err, user){
        console.log('getting user');
        if (err) {
            console.log(err)
        } else {
            console.log(user);
        }
    })
}

// hostelController.getHostel('')

// get all users and find the trips associated with each
const getUsersAssociatedTrips = () => {
    userController.getAllUsers(function(users){
        // console.log(users);
    
        users.map(user => {
            console.log(user._id);
            tripController.getTripsForUser(user._id, function(tripInfo){
                console.log(tripInfo);
            });
            // process.exit(0);
        })
    });
}
// db.Waypoint.ensureIndex({ location: '2dsphere' })

const findClosestWaypointToHostel = () => {
    waypointController.findClosestWaypointToHostel("5d6868602c3d0db16cf7ecff", [-110.82,45.15], 200000, function(response){
        // console.log(response)
    })
}
findClosestWaypointToHostel();
