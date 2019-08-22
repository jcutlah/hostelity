import React from 'react'
import axios from "axios";
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            Marker(results[i]);
        }
    }
}
const google = window.google
let Marker = ({ text, lat, lng }) => <div lat={lat} lng={lng}>{text}</div>;
const MapFunctions = {
    handleTripSearch: async (start, end) => {
        console.log("Fuego")

        try {
            var CORSerror = 'https://cors-anywhere.herokuapp.com/'
            const response = await axios.get(CORSerror + 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + start + end + '&key=AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ', { headers: { 'access-control-allow-origin': true } })

            console.log(response)
            var lat = response.data.lat
            var lng = response.data.lng
            var request = {
                location: new google.maps.LatLng(lat, lng),
                radius: '50',
                type: ['lodging']
            };
            console.log(google.maps.places)
            var service = new google.maps.places.PlacesService(google.map);
            return service.nearbySearch(request, callback);


        } catch (error) {
            console.log(error)
        }
        console.log(start, end)
    },
    calculateAndDisplayRoute: (start, end, directionsService, directionsDisplay) => {
        var directionsService = new google.maps.DirectionsService()
        var directionsDisplay = new google.maps.DirectionsRenderer()
        directionsDisplay.setMap()
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

        var waypts = [];
        console.log(start, end)
        var checkboxArray = { options: [start, end] };
        for (var i = 0; i < checkboxArray.length; i++) {
            if (checkboxArray.options[i].selected) {
                waypts.push({
                    location: checkboxArray[i].value,
                    stopover: true
                });
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
                    var start = route.legs[i].start_address
                    var end = route.legs[i].end_address
                    summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                        '</b><br>';
                    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                    MapFunctions.handleTripSearch(start, end)
                }

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