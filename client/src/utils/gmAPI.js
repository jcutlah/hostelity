import React from 'react'
import axios from "axios";

const google = window.google
let Marker = ({ text, lat, lng }) => <div lat={lat} lng={lng}>{text}</div>;
const MapFunctions = {



    handleTripSearch: async (map, startString, endString, start, end) => {
        // console.log("Fuego")
        try {
            // var CORSerror = `https://cors-anywhere.herokuapp.com/`
            // const response = await axios.get(CORSerror + `https://maps.googleapis.com/maps/api/place/textsearch/json?query=origin=${startString}&destination=${endString}&key=AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ`, { headers: { 'access-control-allow-origin': true } })
            // const response2 = await axios.get(CORSerror + `https://maps.googleapis.com/maps/api/place/autocomplete/json?locationbias=circle:2000@`+start.lat()+`,${start.lng()}&radius=500&key=AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ`, { headers: { 'access-control-allow-origin': true } })
            const response = await axios.get(`/api/maps/textsearch/${startString}/${endString}`);
            const response2 = await axios.get(`/api/maps/autocomplete/${start.lat()}/${start.lng()}`);

            var places = []

            console.log(response, response2)
            for (var i = 0; i < response.data.results.length; i++) {
                places.push(response.data.results[i])

            }
            console.log(places, start.lat)

        } catch (error) {
            console.log('meep start error');
            console.log(error)
        }
        // console.log(start, end)
    },








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