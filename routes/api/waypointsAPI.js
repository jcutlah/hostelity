const router = require("express").Router();
const waypointController = require("../../controllers/waypointController");


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

module.exports = router;