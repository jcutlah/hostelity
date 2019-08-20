import React from 'react'
import axios from "axios";

const google = window.google
export default
    function handleApiLoaded(map, maps, LatLng) {
    // use map and maps objects

    axios.get('https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ'
    ).then()
    let Marker = ({ text, lat, lng }) => <div lat={lat} lng={lng}>{text}</div>;
    console.log(maps)
    function placeMarkers() {
        return (<Marker
        />)

    }
    return placeMarkers();
}