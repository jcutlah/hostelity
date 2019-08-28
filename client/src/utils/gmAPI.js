import React from 'react'
import axios from "axios";

const MapFunctions = {
    handleTripSearch: async (map, start, end, stops, s, e) => {
        const google = window.google
        try {

            //USING REQUESTS DEFINED BELOW: 
            const useRequests = async (requests) => {
                console.log(requests)
                var service = new google.maps.places.PlacesService(map);
                var markers = []
                // Defining Calback function; what to do with data: 
                var placesCallback = (results, status) => {
                    console.log(results)
                    var logData = (res) => {
                        // console.log(res)
                        for (var i = 0; i < res.length; i++) {
                            var checkPhotos = () => {
                                if (res[i].photos) {
                                    return (res[i].photos[0].getUrl({ maxWidth: 50, maxHeight: 50 }))
                                } else {
                                    return null
                                }
                            }
                            var data = {
                                id: res[i].place_id,
                                position: res[i].geometry.location,
                                map: map,
                                title: res[i].name,
                                rating: res[i].rating,
                                photoUrl: checkPhotos()
                            }

                            markers.push(data)
                        }
                        markers.forEach(function (markerData) {
                            var databaseHostel = '2'
                            if (markerData.id === databaseHostel) {
                                //SPECIAL MARKER
                            } else {
                                var checkPhotoAgain = () => {
                                    if (markerData.photoUrl) {
                                        return markerData.photoUrl
                                    } else {
                                        return ' '
                                    }
                                }

                                var infowindow = new google.maps.InfoWindow({
                                    content: `<div>${markerData.title}</div>` + `<br>` + `<img src=${checkPhotoAgain()}/>` +
                                        `<div>${markerData.rating}</div>`
                                });

                                var marker = new google.maps.Marker({
                                    position: markerData.position,
                                    map: markerData.map,
                                    title: markerData.title
                                });

                                return marker.addListener('click', function () {
                                    infowindow.open(map, marker);
                                });
                            }


                        })
                    }
                    //Checking status of response
                    return (status === google.maps.places.PlacesServiceStatus.OK) ? logData(results) : console.log(status);
                }
                requests.forEach((req) => {
                    console.log(req.location)
                    var request = {
                        query: 'hotel hostel lodging ' + req.location,
                        fields: ['geometry', 'name']
                    }
                    // service.findPlaceFromQuery(request, placesCallback)
                    return service.textSearch(request, placesCallback);
                })
            }
            // CREATE REQUESTS FOR ALL POINTS:
            const createRequest = (s, start, stops, end, e) => {
                var requestsForPoints = []
                requestsForPoints.push({
                    location: s,
                    type: ['lodging'],
                    keywords: ['hostel', 'hotel']
                })
                requestsForPoints.push({
                    location: e,
                    type: ['lodging'],
                    keywords: ['hostel', 'hotel']
                })
                for (var i = 0; i < stops.length; i++) {
                    requestsForPoints.push({
                        location: stops[i].location,
                        type: ['lodging'],
                        keywords: ['hostel', 'hotel']
                    })
                }
                return useRequests(requestsForPoints)
            }

            createRequest(s, start, stops, end, e)

            // function callback(results, status) {
            //     console.log(results)
            //     if (status === google.maps.places.PlacesServiceStatus.OK) {
            //         var service = new google.maps.places.PlacesService(map);
            //         console.log('getting place data for random-ass, fucking places along route')
            //         for (var i = 0; i < results.length; i++) {
            //             var request = {
            //                 placeId: results[i].place_id
            //             }

            //             // console.log(request);
            //             // COMMENTED THIS OUT TO BE SAFE - THE CHROME DEV CONSOLE WAS GIVING US WARNINGS "OVER_QUERY_LIMIT" - ...DIDN'T WANT US TO OVERWHELM OUR API LIMITS...
            //             // service.getDetails(request, function(place, status){
            //             //     console.log(status);
            //             //     console.log(place);
            //             // }
            //         }
            //         service.getDetails(request)

            //     } else console.log("nearbySearch:" + status);
            // }
            // console.log("Running nearbySearch Method")
            // service.nearbySearch(request, callback)
            // service.nearbySearch(request, function (results, status) {
            //     if (status === google.maps.places.PlacesServiceStatus.OK) {
            //         return console.log(results)
            //     }
            //     else {
            //         console.log("error" + status)
            //     }
            // })

            // var places = []

            // for (var i = 0; i < response.data.results.length; i++) {
            //     places.push(response.data.results[i])

            // }
        } catch (error) {
            console.log('meep start error');
            console.log(error)
        }
        // console.log(start, end)
        console.log("done")
    },

    //Make and display Routes//
    calculateAndDisplayRoute: async (map, start, end, stops) => {
        const google = window.google
        console.log(stops);
        console.log(start);
        const wps = stops.map(stop => {
            for (let key in stop) {
                if (parseInt(key) > 0) {
                    return {
                        location: stop[`${parseInt(key)}waypoint`],
                        stopover: true
                    }
                }
            }
        });
        console.log('display route meep');
        console.log(wps);
        var directionsService = new google.maps.DirectionsService()
        var directionsDisplay = new google.maps.DirectionsRenderer()
        // directionsDisplay.setMap()
        // directionsService.route({
        //     origin: start,
        //     destination: end,
        //     waypoints: wps,
        //     optimizeWaypoints: true,
        //     travelMode: 'DRIVING'
        // }, await function (response, status) {
        //     if (status === 'OK') {
        //         directionsDisplay.setDirections(response)
        //     } else {
        //         console.log('Directions request failed due to ' + status)
        //     }
        // })

        // Actual Route/Directions Service Rendering: //

        directionsService.route({
            origin: start,
            destination: end,
            waypoints: wps,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, await function (response, status) {
            // Checking Status of response //
            if (status === 'OK') {
                //Create variables to check if map needs to be updated
                var isMapped = false
                var legData = []
                // Setting map's directions to response values //
                // Choosing the first route to display: //
                var route = response.routes[0];
                // For each route, display summary information.
                var start = route.legs[0].start_location;
                var end = route.legs[route.legs.length - 1].end_location;
                var s = route.legs[0].start_address
                var e = route.legs[route.legs.length - 1].end_address
                // Format Leg Data: 
                for (var i = 0; i < route.legs.length; i++) {
                    console.log(route.legs[i])
                    if (i === (route.legs.length - 1)) {
                        var name1 = route.legs[i].start_address
                        var lat1 = route.legs[i].start_location.lat
                        var lng1 = route.legs[i].start_location.lng
                        var time1 = route.legs[i].duration.text;
                        var distance1 = route.legs[i].distance.text;
                        legData.push({
                            name: name1,
                            location: [lat1, lng1],
                            time: time1,
                            distance: distance1
                        })
                        var name = route.legs[i].end_address
                        var lat = route.legs[i].end_location.lat
                        var lng = route.legs[i].end_location.lng
                        var time = route.legs[i].duration.text;
                        var distance = route.legs[i].distance.text;

                    } else {
                        var name = route.legs[i].start_address
                        var lat = route.legs[i].start_location.lat
                        var lng = route.legs[i].start_location.lng
                        var time = route.legs[i].duration.text;
                        var distance = route.legs[i].distance.text;
                    }
                    // Push data to legData array:
                    legData.push({
                        name: name,
                        location: [lat, lng],
                        time: time,
                        distance: distance
                    })
                    // ADD IMAGE GRAB - RC
                }
                if (!isMapped) {
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap(map);
                    isMapped = true;
                } else if (isMapped) {
                    directionsDisplay.setMap(map)
                    directionsDisplay.setDirections(response)
                    window.setState({
                        ...this.state, map: map
                    })
                    console.log(route.legs)
                }
                console.log(legData)
                MapFunctions.handleTripSearch(map, start, end, wps, s, e)
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    },
    handleApiLoaded: (map, maps, LatLng) => {
        // use map and maps objects


        return console.log("API Loaded")
    }

}

export default MapFunctions