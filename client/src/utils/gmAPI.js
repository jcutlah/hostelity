import React from 'react'
import axios from "axios";

const google = window.google
let Marker = ({ text, lat, lng }) => <div lat={lat} lng={lng}>{text}</div>;
const MapFunctions = {



    handleTripSearch: async (map, startString, endString, start, end, stops) => {
        // console.log("Fuego")
        const google = window.google
        try {
            const response = await axios.get(`/api/maps/textsearch/${startString}/${endString}`);
            const response2 = await axios.get(`/api/maps/autocomplete/${start.lat()}/${start.lng()}`);
            var service = new google.maps.places.PlacesService(map);
            var north
            var south
            var east
            var west
            var request;
            var CORSerror = `https://cors-anywhere.herokuapp.com/`

            for (var i = 0; i < stops.length; i++) {
                console.log(stops[i])
            }
            const useRequests = (requests) => {
                console.log(requests)
                var service = new google.maps.places.PlacesService(map);

                var detailsCallback = (place, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        console.log(place);
                    } else {
                        console.log(status)
                    }
                }

                for (var i = 0; i < requests.length; i++) {

                    // Gets details on locations once the data has been received: //
                    service.getDetails(requests[i], detailsCallback)
                }


            }
            const createRequest = () => {
                var requestsForPoints = []
                for (var i = 0; i < stops.length; i++) {
                    requestsForPoints.push({
                        location: stops[i].location,
                        type: ['lodging'],
                        keywords: ['hostel', 'hotel']
                    })
                }
                return useRequests(requestsForPoints)
            }
            createRequest()

            function callback(results, status) {
                console.log(results)
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var service = new google.maps.places.PlacesService(map);
                    console.log('getting place data for random-ass, fucking places along route')
                    for (var i = 0; i < results.length; i++) {
                        var request = {
                            placeId: results[i].place_id
                        }

                        // console.log(request);
                        // COMMENTED THIS OUT TO BE SAFE - THE CHROME DEV CONSOLE WAS GIVING US WARNINGS "OVER_QUERY_LIMIT" - ...DIDN'T WANT US TO OVERWHELM OUR API LIMITS...
                        // service.getDetails(request, function(place, status){
                        //     console.log(status);
                        //     console.log(place);
                        // }
                    }
                    service.getDetails(request)

                } else console.log("nearbySearch:" + status);
            }
            console.log("Running nearbySearch Method")
            // console.log(service.nearbySearch)
            service.nearbySearch(request, callback)
            // service.nearbySearch(request, function (results, status) {
            //     if (status === google.maps.places.PlacesServiceStatus.OK) {
            //         return console.log(results)
            //     }
            //     else {
            //         console.log("error" + status)
            //     }
            // })

            var places = []

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
        directionsService.route({
            origin: start,
            destination: end,
            waypoints: wps,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, await function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response)
            } else {
                console.log('Directions request failed due to ' + status)
            }
        })

        // Actual Route/Directions Service Rendering: //

        directionsService.route({
            origin: start,
            destination: end,
            waypoints: wps,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, function (response, status) {
            // Checking Status of response //
            if (status === 'OK') {
                // Setting map's directions to response values //
                directionsDisplay.setDirections(response);
                // Choosing the first route to display: //
                var route = response.routes[0];
                // For each route, display summary information.
                for (var i = 0; i < route.legs.length; i++) {
                    console.log(route.legs[i])
                    var startString = route.legs[i].start_address
                    var endString = route.legs[i].end_address
                    var start = route.legs[i].start_location
                    var end = route.legs[i].end_location
                    MapFunctions.handleTripSearch(map, startString, endString, start, end, wps)
                }
                directionsDisplay.setMap(map);

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