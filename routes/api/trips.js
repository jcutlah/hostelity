const router = require("express").Router();
const tripController = require("../../controllers/tripController");


// Matches with "/api/trips/:id"
router.route("/:id")
    .get(function(req, res){
        console.log(`get request made to /api/trips/:id`)
        //   console.log(res);
        tripController.getTripsForUser(req.params.id, function(trips){
            res.json(trips);
        });
    })
    .post(function(req, res){
        console.log("post request made to /api/trips");
        res.json({message: "success, boyyyeeeee!!!"});
        // tripController.addTrip(req.body, function(trip){
        //     tripController.associateTripToUser(req.params.id, trip._id, function(user){
        //         res.json(trip);
        //         });
        //     });
        // })
    .put(function(req, res){
        console.log("put request made to /api/trips/:id");
        tripController.updateTripWithWaypoint(req.params.id, req.body.wayPointId, function(trip){
            res.json(trip);
        })
  })

module.exports = router;