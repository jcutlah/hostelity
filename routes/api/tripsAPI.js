const router = require("express").Router();
const tripController = require("../../controllers/tripController");
const waypointController = require("../../controllers/waypointController");
const hostelController = require("../../controllers/hostelController");

// Matches with "/api/trips/:id"
router.route("/:id")
    .get(function(req, res){
        console.log(`get request made to /api/trips/:id`)
        //   console.log(res);
        tripController.getTripById(req.params.id, function(trips){
            res.json(trips);
        });
    })
    .put(function(req, res){
        console.log("put request made to /api/trips/:id");
        tripController.updateTripWithWaypoint(req.params.id, req.body.wayPointId, function(trip){
            res.json(trip);
        })
    })
    
    router.route("/")
        .get(function(req, res){
            console.log('get request made to /api/trips');
            tripController.getTripsForUser(req.user, function(trips){
                res.json(trips);
            });
        })
        .post(function(req, res){
            console.log("post request made to /api/trips");
            // console.log(req.body);
            let totalDistance = 0;
            const waypoints = req.body.trip.waypoints;
            const trip = req.body.trip;
            const hostels = req.body.hostels;
            waypoints.forEach(point => {
                totalDistance += parseInt(point.distance);
            })
            // console.log(totalDistance);
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
                    waypointController.addWaypoint(waypoint, function(wp){
                        // console.log(wp);
                        tripController.updateTripWithWaypoint(tripId, wp._id, function(trip){
                            // console.log(trip);
                        })
                    })
                    if (i === waypoints.length -1){
                        console.log("done adding waypoints. adding hostels...");
                        hostels.forEach(hostel => {
                            console.log(hostel);
                            hostelController.addHostel(hostel, function(result){
                                console.log('newly added hostel shiz:');
                                console.log(result);
                                waypointController.findClosestWaypointToHostel(tripId, result.location.coordinates, 10000, function(closestWaypoint){
                                    console.log('closest waypoint found?');
                                    console.log(closestWaypoint);
                                    hostelController.associateHostelToWaypoint(closestWaypoint._id, result._id, function(response){
                                        console.log('updated waypoint with Hostel: ');
                                        console.log(response);
                                    })
                                })
                            })
                        })
                    }
                })
                tripController.associateTripToUser(req.user, tripId, function(user){
                    console.log(user);
                })
                // loop through hostels, find the closest waypoint, add and associate hostel to that waypoint.
                hostels.forEach(hostel => {
                    console.log('newly added hostel shiz');
                    console.log(hostel);

                })
            })
            res.json({message: "success, boyyyeeeee!!!"});
            // tripController.addTrip(req.body, function(trip){
            //     tripController.associateTripToUser(req.params.id, trip._id, function(user){
            //         res.json(trip);
            //         });
            //     });
        })

module.exports = router;