const mongoose = require("mongoose");
const db = require("../models");
const userController = require('../controllers/userController');
const tripController = require('../controllers/tripController');
const hostelController = require('../controllers/hostelController');

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/switchbak"
  );
  mongoose.set(
      'useFindAndModify', false
  );

// get user by id
userController.getUser("5d57ea23f3d50274d42a3cde", function(err, user){
    console.log('getting user');
    if (err) {
        console.log(err)
    } else {
        console.log(user);
    }
})

// hostelController.getHostel('')

// get all users and find the trips associated with each
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

