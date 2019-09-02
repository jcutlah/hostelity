const router = require("express").Router();
const tripController = require("../../controllers/tripController");
const waypointController = require("../../controllers/waypointController");

// Matches with "/api/trips/:id"
router.route("/:id")
    .get(function (req, res) {
        console.log(`get request made to /api/trips/:id`)
        //   console.log(res);
        tripController.getTripById(req.params.id, function (trips) {
            res.json(trips);
        });
    })
    .put(function (req, res) {
        console.log("put request made to /api/trips/:id");
        tripController.updateTripWithWaypoint(req.params.id, req.body.wayPointId, function (trip) {
            res.json(trip);
        })
    })

router.route("/")
    .get(function (req, res) {
        console.log('get request made to /api/trips');
        tripController.getTripsForUser(req.user, function (trips) {
            res.json(trips);
        });
    })
      .post(function(req, res){
          console.log("post request made to /api/trips");
          console.log(req.body);
          let totalDistance = 0;
          const waypoints = req.body.trip.waypoints;
          const trip = req.body.trip;
          waypoints.forEach(point => {
              totalDistance += parseInt(point.distance);
          })
          console.log(totalDistance);
          const tripObject = {
              start: trip.start.name,
              end: trip.end.name,
              name: "My Journey",
              totalMileage: totalDistance
          }
          tripController.addTrip(tripObject, function(trip){
              const tripId = trip._id;
              console.log(tripId);
              waypoints.forEach((point, i) => {
                  let waypoint = {
                      name: point.name,
                      trip: tripId,
                      tripIndex: i,
                      distanceToWaypoint: parseInt(point.distance),
                      location: {
                          type: "Point",
                          coordinates: [point.location[1],point.location[0]]
                      }

                    }
                }
                waypointController.addWaypoint(waypoint, function (wp) {
                    console.log(wp);
                    tripController.updateTripWithWaypoint(tripId, wp._id, function (trip) {
                        console.log(trip);
                    })
                })
            })
            tripController.associateTripToUser(req.user, tripId, function (user) {
                console.log(user);
            })
        })
        res.json({ message: "success, boyyyeeeee!!!" });
        // tripController.addTrip(req.body, function(trip){
        //     tripController.associateTripToUser(req.params.id, trip._id, function(user){
        //         res.json(trip);
        //         });
        //     });
    })

module.exports = router;