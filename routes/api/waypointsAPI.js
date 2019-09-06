const router = require("express").Router();
const waypointController = require("../../controllers/waypointController");
const hostelController = require('../../controllers/hostelController');


// Matches with "/api/waypoints/:tripId"
router.route("/:tripId")
  .get(function(req, res){
      console.log(`get request made to /api/waypoints/:tripId`)
    //   console.log(res);
    waypointController.getAllWaypointsInTrip(req.params.tripId, function(waypoints){
        console.log(waypoints);
        res.json(waypoints);
    });
  });

router.route('/hostel/:id')
  .delete(function(req, res){
    console.log('delete request made to /api/waypoints/hostel/:id')
    hostelController.removeOneHostel(req.params.id, function(response){
        console.log(response);
        res.json(response);
    })
  })

module.exports = router;