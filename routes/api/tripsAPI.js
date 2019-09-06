const router = require("express").Router();
const tripController = require("../../controllers/tripController");
const waypointController = require("../../controllers/waypointController");
const hostelController = require("../../controllers/hostelController");

// Matches with "/api/trips/:id"
router.route("/edit/:id")
    .put(function (req, res) {
        console.log(`put requst made to /api/trips/edit/${req.params.id}`)

        let hostels = req.body;
        let tripId = req.params.id;
        tripController.getTripById(tripId, function(trip){
            hostels.forEach(hostel => {
                console.log(hostel);
                // let coords = hostel.location.split(',');
                // let host = {
                //     title: hostel.title,
                //     location: {
                //         type: "Point",
                //         coordinates: [coords[1],coords[0]]
                //     },
                //     address: hostel.address,
                //     placeId: hostel.placeId,
                //     imageUrl: hostel.imageUrl
                // }
                console.log(hostel.location)
                hostelController.addHostel(hostel, function(newHostel){
                    console.log(newHostel);
                    waypointController.findClosestWaypointToHostel(tripId, hostel.location.coordinates, 50000, function(waypoint){
                        hostelController.associateHostelToWaypoint(waypoint._id, newHostel._id, function(result){
                            console.log(result)
                            res.json({message: 'success'})
                        })
                    })
                })
            })
            
        })
    })
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
    .delete(function (req, res) {
        console.log(`delete request made to /api/trips/${req.params.id}`);
        let response = []
        tripController.getTripById(req.params.id, function(trip){
            console.log(trip);
            trip.waypoints.forEach(waypoint => {
                console.log(waypoint);
                waypoint.hostels.forEach(hostel => {
                    hostelController.removeOneHostel(hostel._id, function(deletedHostelResult) {
                        console.log(deletedHostelResult);
                        response.push(deletedHostelResult);
                    });
                })
                waypointController.removeOneWaypoint(waypoint, function(deletedWPResult){
                    console.log(deletedWPResult);
                    response.push(deletedWPResult);
                });
            })
            tripController.deleteTrip(trip._id, function(deletedTripResult){
                response.push(deletedTripResult);
                res.json(response);

            })
        })
        // tripController.deleteTrip(req.params.id, function(trip){
        //     console.log(trip);
        //     res.json(trip);

        // })
    })

router.route("/")
    .get(function (req, res) {
        console.log('get request made to /api/trips');
        tripController.getTripsForUser(req.user, function (trips) {
            res.json(trips);
        });
    })
    .post(function (req, res) {
        console.log("post request made to /api/trips");
        console.log(req.body);
        let totalDistance = 0;

        const waypoints = req.body.trip.waypoints;
        const trip = req.body.trip;
        const hostels = req.body.hostels;

        waypoints.forEach(point => {
            totalDistance += point.distance;
        })
        // console.log(totalDistance);
        const tripObject = {
            start: trip.start.name,
            end: trip.end.name,
            name: "My Journey",
            totalMileage: totalDistance
        }
        tripController.addTrip(tripObject, function (trip) {
            const tripId = trip._id;
            console.log(tripId);
            waypoints.forEach((point, i) => {
                console.log(point)
                let waypoint = {
                    name: point.name,
                    trip: tripId,
                    tripIndex: i,
                    distanceToWaypoint: parseInt(point.distance),
                    timeToWaypoint: point.time,
                    location: {
                        type: "Point",
                        coordinates: [point.location[1], point.location[0]]
                    }
                }
                waypointController.addWaypoint(waypoint, function (wp) {
                    // console.log(wp);
                    tripController.updateTripWithWaypoint(tripId, wp._id, function (trip) {
                        // console.log(trip);
                    })
                })
                if (i === waypoints.length - 1) {
                    console.log("done adding waypoints. adding hostels...");
                    hostels.forEach(hostel => {
                        console.log(hostel);
                        hostelController.addHostel(hostel, function (result) {
                            console.log('newly added hostel shiz:');
                            console.log(result);
                            waypointController.findClosestWaypointToHostel(tripId, result.location.coordinates, 100000, function (closestWaypoint) {
                                console.log('closest waypoint found?');
                                console.log(closestWaypoint);
                                hostelController.associateHostelToWaypoint(closestWaypoint._id, result._id, function (response) {
                                    console.log('updated waypoint with Hostel: ');
                                    console.log(response);
                                })
                            })
                        })
                    })
                }

            })
            tripController.associateTripToUser(req.user, tripId, function (user) {
                console.log(user);
            })
        })
        res.json({ message: "success" });
        // tripController.addTrip(req.body, function(trip){
        //     tripController.associateTripToUser(req.params.id, trip._id, function(user){
        //         res.json(trip);
        //         });
        //     });
    })

module.exports = router;