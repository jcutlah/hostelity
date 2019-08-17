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

tripController.getAllTrips(function(users){
    // console.log(users);

    users.map(user => {
        console.log(user._id);
        tripController.getTrips(user._id, function(userInfo){
            console.log(userInfo);
        });
        process.exit(0);
    })
});

