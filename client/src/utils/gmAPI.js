import React from 'react'
import axios from "axios";

const google = window.google
let Marker = ({ text, lat, lng }) => <div lat={lat} lng={lng}>{text}</div>;
const MapFunctions = {



    handleTripSearch: async (map, startString, endString, start, end) => {
        // console.log("Fuego")
        try {
            var service = new google.maps.places.PlacesService(map);
            var north
            var south
            var east
            var west
            var service;
            var CORSerror = `https://cors-anywhere.herokuapp.com/`

            function setBounds() {
                console.log(start.lat())
                if (start.lat() > end.lat()) {
                    north = start.lat()
                    south = end.lat()
                } else {
                    north = end.lng()
                    south = start.lng()
                }
                if (start.lng() > end.lng()) {
                    east = start.lng()
                    west = end.lng()
                } else {
                    east = end.lng()
                    west = start.lng()
                }
                return (north, south, east, west)
            }
            setBounds()
            var request = {
                bounds: { north: north, south: south, east: east, west: west },
                type: ['lodging']

            };
            console.log(request)

            function callback(results, status) {
                console.log(results)
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var service = new google.maps.places.PlacesService(map);
                    for (var i = 0; i < results.length; i++) {
                        var request = {
                            placeId: results[i].place_id
                        }
                        service.getDetails(request)

                    }
                } else console.log("nearbySearch:" + status);
            }

            var searchBitch = () => {
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
            }
            var places = []

            // for (var i = 0; i < response.data.results.length; i++) {
            //     places.push(response.data.results[i])

            // }
        } catch (error) {
            console.log(error)
        }
        // console.log(start, end)
        searchBitch()
    },

    //Make and display Routes//
    calculateAndDisplayRoute: (map, start, end, directionsService, directionsDisplay) => {
        var directionsService = new google.maps.DirectionsService()
        var directionsDisplay = new google.maps.DirectionsRenderer()
        // directionsDisplay.setMap()
        directionsService.route({
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response)
            } else {
                console.log('Directions request failed due to ' + status)
            }
        })
        // Load Waypoints //
        var waypts = [];
        var checkboxArray = { options: [start, end] };
        for (var i = 0; i < checkboxArray.length; i++) {
            if (checkboxArray.options[i].selected) {
                waypts.push({
                    location: checkboxArray[i].value,
                    stopover: true
                });
                console.log(checkboxArray[i])

            }
        }

        directionsService.route({
            origin: start,
            destination: end,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                var route = response.routes[0];
                var summaryPanel = document.getElementById('directions-panel');
                summaryPanel.innerHTML = '';
                // For each route, display summary information.
                for (var i = 0; i < route.legs.length; i++) {
                    var routeSegment = i + 1;
                    console.log(route.legs[i])
                    var startString = route.legs[i].start_address
                    var endString = route.legs[i].end_address
                    var start = route.legs[i].start_location
                    var end = route.legs[i].end_location
                    summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                        '</b><br>';
                    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';

                    MapFunctions.handleTripSearch(map, startString, endString, start, end)
                }
                directionsDisplay.setMap(map);

            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    },
    handleApiLoaded: (map, maps, LatLng) => {
        // use map and maps objects
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer(
            {
                map: map
            });

        return (directionsService, directionsDisplay)
    }

}

export default MapFunctions