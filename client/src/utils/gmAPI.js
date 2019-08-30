import React from 'react'
import axios from "axios";
var globalMarkers = []
var routeMarkers = []
var globalArray = []
var legData = []
// const infoWindow = (props)=>{
//     return (<div>
//         <div>{props.title}</div>
//        {props.img ?  <img src={props.img}></img> : <div>No image provided </div>}
//        <div>{props.rating}</div>
//        <button onClick={() =>  console.log(markerData.place_id) }} value={props.place_id}>Add to your trip!</button>
//     id: props.place_id,
//     position: res[i].geometry.location,
//     map: map,
//     title: res[i].name,
//     rating: res[i].rating,
//     place_id: res[i].place_id,
//     photoUrl: checkPhotos()
//     </div>)
// }
const MapFunctions = {
    handleTripSearch: (map) => {
        const google = window.google
        try {
            //USING REQUESTS DEFINED BELOW: 
            const useRequests = (requests) => {
                console.log(requests)
                var markers = []
                var service = new google.maps.places.PlacesService(map);

                // Defining Calback function; what to do with data: 
                var placesCallback = (results, status) => {
                    console.log(results)
                    //After results are checked on line 76:
                    var logData = (res) => {
                        console.log(res)
                        // Organizing the data for hostel markers:
                        for (var i = 0; i < res.length; i++) {
                            //Checking if theres a photo for each res:
                            var checkPhotos = () => {
                                if (res[i].photos) {
                                    return (res[i].photos[0].getUrl({ maxWidth: 50, maxHeight: 50 }))
                                } else {
                                    return null
                                }
                            }
                            //Preparing the data as an object to be passed to a local array defined on line 14 (markers): 
                            var data = {
                                id: res[i].place_id,
                                position: res[i].geometry.location,
                                map: map,
                                address: res[i].formatted_address,
                                title: (res[i].name),
                                rating: res[i].rating,
                                place_id: res[i].place_id,
                                photoUrl: checkPhotos()
                            }
                            // console.log(res[i].name)
                            //Sending marker data from response to array of marker data for further processing:
                            markers.push(data)
                        }
                        //Looping through markers[] to collect/apply Information Window Content:
                        markers.forEach(function (markerData) {
                            var databaseHostel = '2'
                            //Checking if marker exists in database (pseudocoded rn):
                            if (markerData.id === databaseHostel) {
                                //SPECIAL MARKER
                            } else {
                                //If marker is not in database, make sure there's a photo in the marker's object of data:
                                var checkPhotoAgain = () => {
                                    if (markerData.photoUrl) {
                                        return markerData.photoUrl
                                    } else {
                                        return ' '
                                    }
                                }

                                console.log(markerData)
                                var contentString =
                                    `<div>${markerData.title}</div>` +
                                    `<br>` +
                                    `<img src=${checkPhotoAgain()}/>` +
                                    `<div>${markerData.rating}</div>` +
                                    `<button type="buttton" className="hostelButton" 
                                        data-title='${markerData.title}'
                                        data-location='${[markerData.position.lat(), markerData.position.lng()]}'
                                        data-address='${markerData.address}'
                                        data-imageUrl='${markerData.photoUrl}'
                                        id=${markerData.place_id}>Add to Trip</button>`;

                                //Add content to information window for each marker:
                                var infowindow = new google.maps.InfoWindow({
                                    content: contentString
                                });

                                //Create marker with all data
                                var marker = new google.maps.Marker({
                                    position: markerData.position,
                                    map: markerData.map,
                                    title: markerData.title
                                });
                                // Adding marker to global array of finished markers:
                                globalMarkers.push(marker)

                                return marker.addListener('click', function () {
                                    infowindow.open(map, marker);
                                });
                            }


                        })
                    }
                    //Checking status of response
                    return (status === google.maps.places.PlacesServiceStatus.OK) ? logData(results) : console.log(status);
                }
                // REQUESTS LOOP: 
                requests.forEach((req, i) => {
                    console.log(req)
                    var latLng = req.location
                    var rad = req.radius
                    var request = {
                        location: latLng,
                        radius: '2000',
                        query: 'hotel hostel lodging',
                        fields: ['geometry', 'name']
                    }
                    // service.findPlaceFromQuery(request, placesCallback)
                    // globalArray.push(service.textSearch(request, placesCallback))
                    // console.log(globalArray)

                    return service.textSearch(request, placesCallback);
                })
            }
            // CREATE REQUESTS FOR ALL POINTS:
            const createRequest = () => {
                var requestsForPoints = []
                var startLatLng = new google.maps.LatLng(legData[0].location[0](), legData[0].location[1]())
                var endLatLng = new google.maps.LatLng(legData[legData.length - 1].location[0](), legData[legData.length - 1].location[1]())
                console.log(legData[0].location[0](), legData[0].location[1]())
                requestsForPoints.push({
                    location: startLatLng,
                })
                requestsForPoints.push({
                    location: endLatLng
                })
                for (var i = 1; i < legData.length - 1; i++) {
                    var thisLatLng = new google.maps.LatLng(legData[i].location[0](), legData[i].location[1]())
                    requestsForPoints.push({
                        location: thisLatLng,
                    })
                }
                return useRequests(requestsForPoints)
            }
            createRequest()

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
        var directionsService = new google.maps.DirectionsService()
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: false,
            map: map
        })

        if (globalMarkers.length > 1) {
            console.log(globalMarkers, routeMarkers)
            globalMarkers.forEach(function (marker) {
                marker.setMap(null)
            })
            routeMarkers.forEach(function (marker) {
                marker.setMap(null)
            })
            directionsDisplay.setMap(null)

        }



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



        // Actual Route/Directions Service Rendering: //

        directionsService.route({
            origin: start,
            destination: end,
            waypoints: wps,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, await function (response, status) {
            // Checking Status of response //
            for (var i = 0; i < response.geocoded_waypoints.length; i++) {
                routeMarkers.push(response.geocoded_waypoints[i])
            }
            if (status === 'OK') {
                //Create variables to check if map needs to be updated

                // Setting map's directions to response values //
                // Choosing the first route to display: //
                var route = response.routes[0];
                // Format Leg Data: 
                console.log(route.legs)
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
                        distance: distance,
                    })
                    // ADD IMAGE GRAB - RC
                }

                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
                console.log(legData)
                MapFunctions.handleTripSearch(map)
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