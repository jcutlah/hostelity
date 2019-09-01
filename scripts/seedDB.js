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

const hostelSeed = [
    {
        title: "North Yellowstone Lodge & Hostel",
        location: {
            type: "Point",
            coordinates: [-110.82,45.15]
        },
        address: "1083 US-89, Gardiner, MT 59030",
        placeId: "asd98f7asd98f7as0d9f7d",
        imageUrl: "https://media-cdn.tripadvisor.com/media/photo-p/05/cb/3d/d3/north-yellowstone-lodge.jpg"
    },
    {
        title: "Cafe Soleíl",
        location: {
            type: "Point",
            coordinates: [-113.289886,37.175026]
        },
        address: "205 Zion Park Blvd, Springdale, UT 84767",
        placeId: "asd98f7asd98f7as0d9f7d",
        imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/08/8f/99/ad/cafe-soleil.jpg"
    },
    {
        title: "Monterey Hostel",
        location: {
            type: "Point",
            coordinates: [-113.0263,37.2982]
        },
        address: "778 Hawthorne St, Monterey, CA 93940",
        placeId: "asd98f7asd98f7as0d9f7d",
        imageUrl: "https://media-cdn.tripadvisor.com/media/photo-p/05/cb/3d/d3/north-yellowstone-lodge.jpg"
    }
];
const waypointSeed = [
    {
        name: "Yellowstone, NP, USA",
        tripIndex: 0,
        location: {
            type: "Point",
            coordinates: [-111.104187,44.662251]
        },
        distanceToWaypoint: 357,
        imageUrl: 'https://media.deseretdigital.com/file/985f0f3546?crop%3Dtop%3A0%7Cleft%3A0%7Cwidth%3A640%7Cheight%3A420%26resize%3Dwidth%3A640%26order%3Dresize%2Ccrop%26c%3D14%26a%3D1dc0fe20',
    },
    {
        name: "Springdale, UT, USA",
        location: {
            type: "Point",
            coordinates: [-112.998596,37.188900],
        }, 
        tripIndex: 0,
        distanceToWaypoint: 432,
        imageUrl: 'https://media.deseretdigital.com/file/985f0f3546?crop%3Dtop%3A0%7Cleft%3A0%7Cwidth%3A640%7Cheight%3A420%26resize%3Dwidth%3A640%26order%3Dresize%2Ccrop%26c%3D14%26a%3D1dc0fe20',
    },
    {
        name: "Big Sur, CA",
        tripIndex: 2,
        location: {
            type: "Point",
            coordinates: [-121.894676,36.600239],
        },
        distanceToWaypoint: 186,
        imageUrl: 'https://media.deseretdigital.com/file/985f0f3546?crop%3Dtop%3A0%7Cleft%3A0%7Cwidth%3A640%7Cheight%3A420%26resize%3Dwidth%3A640%26order%3Dresize%2Ccrop%26c%3D14%26a%3D1dc0fe20',
    }
]
const tripSeed = [
    {
        name: "The Trip That I'll Really Want To Forget, But Will Never Forget",
        start: "Yellowstone, NP, USA",
        end: "Big Sur, CA, USA",
        totalMileage: 789
    }
    // {
    //     name: "My Spiritual Journey Trip",
    //     startDest: {
    //         location: [-113.0263,37.2982], 
    //         name: 'Kings Canyon, NP'
    //     },
    //     endDest: {
    //         location: [-118.5551,36.8879],
    //         name: 'Zion, NP'
    //     }
    // },
    // {
    //     name: "My Fun But Cliche Trip",
    //     startDest: {
    //         location: [-113.0263,37.2982], 
    //         name: 'Kings Canyon, NP'
    //     },
    //     endDest: {
    //         location: [-118.5551,36.8879],
    //         name: 'Zion, NP'
    //     },
    //     wayPoints: [
    //         {
    //             location: [-118.5551,36.8879],
    //             name: 'Zion, NP'
    //         },
    //         {
    //             location: [-118.5551,36.8879],
    //             name: 'Zion, NP'
    //         }
    //     ]
    // }
];
const seedData = [
    {
        user: {
            firstName: "James",
            lastName: "Cutler",
            email: "Jamescutler1111@gmail.com",
            password: "jcut",
            avatar: '/assets/images/hockeyJersey.jpg'
        },
        hostels: [hostelSeed[0], hostelSeed[1], hostelSeed[2]],
        trips: [tripSeed[0]],
        waypoints: [waypointSeed[0],waypointSeed[1],waypointSeed[2]]
    },
    {
        user: {
            firstName: "James",
            lastName: "Morrison",
            email: "totesmcgotes@gmail.com",
            password: "insecure",
            avatar: "https://placebeard.it/300x180"
        },
        hostels: [hostelSeed[1]],
        trips: [tripSeed[0]],
        waypoints: [waypointSeed[0],waypointSeed[1],waypointSeed[2]]
    },
    {
        user: {
            firstName: "Ryan",
            lastName: "Creveling",
            email: "yupyeahguy@gmail.com",
            password: "hackthisaccount",
            avatar: "https://placebeard.it/300x180"
        },
        hostels: [hostelSeed[2]],
        trips: [tripSeed[0]],
        waypoints: [waypointSeed[0],waypointSeed[1],waypointSeed[2]]
    }
];

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
                            console.log('users removed')
                            seedData.forEach(seed => {
                                userController.addUser(seed.user, function(err, response){
                                    if (err) throw err;
                                    console.log(response);
                                    console.log('meep');
                                    seed.trips.forEach(trip => {
                                        tripController.addTrip(trip, function(res){
                                            console.log('derp');
                                            console.log(res);
                                            tripController.associateTripToUser(response._id, res._id, function(user){
                                                console.log('trip associated: ');
                                                console.log(user);
                                                seed.waypoints.forEach((waypoint, i) => {
                                                    WaypointController.addWaypoint(waypoint, function(newWaypoint){
                                                        console.log(newWaypoint);
                                                        WaypointController.associateWaypointToTrip(res._id, newWaypoint._id, function(trip){
                                                            console.log('waypoint associated: ');
                                                            console.log(trip);
                                                            hostelController.addHostel(seed.hostels[i], function(newHostel){
                                                                console.log(newHostel);
                                                                hostelController.associateHostelToWaypoint(newWaypoint._id, newHostel._id, function(waypoint){
                                                                    console.log(waypoint);
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                }) 
                            });
                        })
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        
    })
    .catch(err => {
        console.error(err);
    });

