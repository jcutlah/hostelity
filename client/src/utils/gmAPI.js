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
    handleApiLoaded: (map, maps, LatLng) => {
        // use map and maps objects


    },
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
                radius: '5',
                type: ['lodging']
            };
            console.log(google.maps.places)
            var service = new google.maps.places.PlacesService(google.map);
            return service.nearbySearch(request, callback);


        } catch (error) {
            console.log(error)
        }
        console.log(start, end)
    }
}

export default MapFunctions