// import React from 'react'
var globalMarkers = []
var routeMarkers = []
var globalArray = []
var legData = []
var infoWindows = []
let defaultImage = '/assets/images/clicheHostel.jpg';

const MapFunctions = {
    checkLegs: () => {
        return (legData.length) ? legData : 'No waypoints'
    },
    handleTripSearch: (map, hostelIds, waypoints, markerCallback) => {
        //console.log(waypoints);
        const google = window.google
        try {
            //USING REQUESTS DEFINED BELOW: 
            const useRequests = (requests) => {
                //console.log(requests)
                var markers = []
                var service = new google.maps.places.PlacesService(map);

                const makeMarkerHTML = (markerData, saved) => {
                    // console.log(markerData)
                    let defaultImage = 'https://q-cf.bstatic.com/images/hotel/max1024x768/103/103907246.jpg?'
                    let contentString =
                    `<div class="infowindow-wrapper">` + 
                        `<div class="hostel-title">` + 
                            `<a target='_blank' className="hostelLink" href="https://www.google.com/search?q=${markerData.title}%20${markerData.address}">${markerData.title}</a>` + 
                        `</div>` +
                        `<br>` +
                        `<div class="image-wrapper">` +
                            `<a target='_blank' className="hostelLink" href="https://www.google.com/search?q=${markerData.title}%20${markerData.address}">` + 
                                `<img src=${markerData.photoUrl ? markerData.photoUrl : defaultImage }/>` +
                            `</a>` +
                            `<div class="address">${markerData.address}</div>` +
                        `</div>` +
                        `<br>` +
                        `<div class="hostel-rating">${markerData.rating} out of 5</div>` +
                        `<div class="buttonWrapper">` + 
                            `<button type="button" class="hostelButton" ${saved ? "style='display: none;'" : "style"}
                                data-title="${markerData.title}"
                                data-location="${[markerData.position.lat(), markerData.position.lng()]}"
                                data-address="${markerData.address}"
                                data-imageUrl="${markerData.bigPhotoUrl ? markerData.bigPhotoUrl : ''}"
                                id=${markerData.place_id}>
                                Add to Trip` + 
                            `</button>
                            <button disabled type="button" class="disabledButton">${'Added'}</button>
                        </div>` + 
                    `</div>`;
                    return contentString;
                }
                // Defining Calback function; what to do with data: 
                var placesCallback = (results, status) => {
                    //console.log(results)

                    //After results are checked on line 76:
                    var logData = (res) => {
                        // //console.log(res)
                        // Organizing the data for hostel markers:
                        const distanceFormula = (x1, y1, x2, y2) => {
                            let sq1 = Math.pow((x1 - y1), 2);
                            let sq2 = Math.pow((x2 - y2), 2);
                            return Math.sqrt(sq1 + sq2);
                        }
                        for (var i = 0; i < res.length; i++) {
                            // console.log(res[i])
                            let result = res[i];
                            let tooFar = true;
                            const resultLatLng = [result.geometry.location.lat(), result.geometry.location.lng()];
                            // console.log('looping over waypoints...')
                            waypoints.forEach(pnt => {
                                // //console.log(pnt.location);
                                // //console.log(resultLatLng);
                                if (tooFar) {
                                    let degrees = distanceFormula(pnt.location[0], resultLatLng[0], pnt.location[1], resultLatLng[1])
                                    // console.log(degrees);
                                    degrees > .5 && tooFar ? tooFar = true : tooFar = false
                                }
                                // //console.log("should be number of degrees, since those are the decimal units of lat/long.")
                            })
                            if (tooFar) {
                                // console.log(result)
                                continue
                            }
                            var bigPic;
                            //Checking if theres a photo for each res:
                            var checkPhotos = () => {
                                if (res[i].photos) {
                                    // //console.log(res[i].photos[0])
                                    var thisImg = (res[i].photos[0].getUrl({ maxWidth: 200, maxHeight: 'auto' }))
                                    bigPic = (res[i].photos[0].getUrl({ maxWidth: 2000, maxHeight: 'auto' }))
                                    return thisImg
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
                                photoUrl: checkPhotos(),
                                bigPhotoUrl: bigPic
                            }
                            // //console.log(res[i].name)
                            //Sending marker data from response to array of marker data for further processing:
                            // console.log(data)
                            markers.push(data)
                        }
                        //Looping through markers[] to collect/apply Information Window Content:
                        let isSaved = false;
                        markers.forEach(function (markerData) {
                            // //console.log(markerData);
                            // var databaseHostel = '2'
                            isSaved = false;
                            //Checking if marker exists in database (pseudocoded rn):
                            if (hostelIds.indexOf(markerData.id) !== -1) {
                                //console.log(markerData);
                                // //console.log(hostelIds);
                                isSaved = true;
                            }
                            //SPECIAL MARKER


                            //Add content to information window for each marker:
                            var infowindow = new google.maps.InfoWindow({
                                // content: contentString
                                content: makeMarkerHTML(markerData, isSaved)
                            });
                            infoWindows.push(infowindow);
                            // //console.log(isSaved);
                            //Create marker with all data
                            var marker = new google.maps.Marker({
                                position: markerData.position,
                                map: markerData.map,
                                title: markerData.title,
                                icon: isSaved ? "/assets/images/hostelIconBlack.png" : "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png"
                            });
                            if (isSaved) {
                                //console.log(marker);
                            }

                            // Adding marker to global array of finished markers:
                            globalMarkers.push(marker)

                            return marker.addListener('click', function () {
                                infoWindows.forEach(win => {
                                    win.close()
                                })
                                infowindow.open(map, marker);
                                markerCallback(true)
                                console.log(marker.position)
                                map.setCenter(marker.position)
                                console.log(map.getZoom())
                                map.setZoom(12)
                            });



                        })
                    }
                    //Checking status of response
                    if (google.maps.places.PlacesServiceStatus.OK) {
                        //console.log(results);
                    }

                    return (status === google.maps.places.PlacesServiceStatus.OK) ? logData(results) : console.log(status);
                }
                // REQUESTS LOOP: 


                requests.forEach((req, i) => {
                    var lat = req.location.lat()
                    var lng = req.location.lng()
                    var sw = (lat - 5, lng - 5)
                    var ne = (lat + 5, lng + 5)
                    var bounds = new google.maps.LatLngBounds()
                    bounds.extend(req.location)
                    //console.log(bounds)
                    var latLng = req.location
                    let newLocation = [req.location.lat(), req.location.lng()]
                    //console.log(latLng);
                    var rad = req.radius
                    var request = {
                        location: latLng,
                        radius: '2000',
                        query: 'hotel hostel lodging',
                        fields: ['geometry', 'name', 'url', 'website', 'price_level']
                    }
                    // service.findPlaceFromQuery(request, placesCallback)
                    // globalArray.push(service.textSearch(request, placesCallback))
                    // //console.log(globalArray)
                    // let newRequest = {...request, location: newLocation}
                    // Axios.post(`/api/google/text-search`, newRequest)
                    // .then(response => {
                    //     //console.log(response);
                    // })
                    // .catch(err => {
                    //     //console.log(err);
                    // })
                    return service.textSearch(request, placesCallback);
                })
            }

            // CREATE REQUESTS FOR ALL POINTS:





            const createRequest = () => {
                //console.log(legData);
                var requestsForPoints = []
                var startLatLng = new google.maps.LatLng(legData[0].location[0], legData[0].location[1])
                var endLatLng = new google.maps.LatLng(legData[legData.length - 1].location[0], legData[legData.length - 1].location[1])
                requestsForPoints.push({
                    location: startLatLng,
                })
                requestsForPoints.push({
                    location: endLatLng
                })
                for (var i = 1; i < legData.length - 1; i++) {
                    var thisLatLng = new google.maps.LatLng(legData[i].location[0], legData[i].location[1])
                    requestsForPoints.push({
                        location: thisLatLng,
                    })
                }
                //console.log(requestsForPoints)
                requestsForPoints.forEach(point => {
                    //console.log(point.location.lat())
                    //console.log(point.location.lng())
                })
                return useRequests(requestsForPoints)
            }
            createRequest()

        } catch (error) {
            //console.log('meep start error');
            //console.log(error)
        }
        // //console.log(start, end)
        //console.log("done")
    },

    //Make and display Routes//
    calculateAndDisplayRoute: async (map, start, end, waypointsKnown, stops, hostelIds, callback, markerCallback) => {
        const google = window.google
        var directionsService = new google.maps.DirectionsService()
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: false,
            map: map
        })

        console.log(map)
        var wps = [];

        if (!waypointsKnown) {
            wps = stops.map(stop => {
                for (let key in stop) {
                    if (parseInt(key) > 0) {
                        return {
                            location: stop[`${parseInt(key)}waypoint`],
                            stopover: true
                        }
                    }
                }
            });
        } else {
            wps = stops
        }
        //console.log('display route meep');
        // //console.log(wps);



        // Actual Route/Directions Service Rendering: //
        let dirOptions = {
            origin: start,
            destination: end,
            waypoints: wps,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }
        //console.log(dirOptions);
        directionsService.route(dirOptions, await function (response, status) {
            // Checking Status of response //
            //console.log('directions service routing')

            if (status === 'OK') {
                for (var i = 0; i < response.geocoded_waypoints.length; i++) {
                    routeMarkers.push(response.geocoded_waypoints[i])
                }
                var route = response.routes[0];
                //Grab waypoint data and save to state:

                // console.log(route);
                // Format Leg Data: 
                for (var i = 0; i < route.legs.length; i++) {

                    var startPoint;
                    var endPoint;

                    if (i === 0) {
                        // beginning of route legs. 
                        // add the leg's start and endpoint to leg data
                        var name1 = route.legs[i].start_address
                        var lat1 = route.legs[i].start_location.lat()
                        var lng1 = route.legs[i].start_location.lng()
                        var time1 = route.legs[i].duration.text;
                        var distance1 = parseFloat(route.legs[i].distance.value / 1609);
                        startPoint = {
                            name: name1,
                            location: [lat1, lng1],
                            time: i === 0 ? "0 hours" : time1,
                            distance: i === 0 ? 0 : distance1
                        }
                        //console.log(startPoint);
                        legData.push(startPoint);
                        var name = route.legs[i].end_address
                        var lat = route.legs[i].end_location.lat()
                        var lng = route.legs[i].end_location.lng()
                        var time = route.legs[i].duration.value;
                        var distance = parseFloat(route.legs[i].distance.value / 1609);
                        endPoint = {
                            name: name,
                            location: [lat, lng],
                            time: time,
                            distance: distance,
                        }
                        legData.push(endPoint)
                    } else {
                        var name = route.legs[i].end_address
                        var lat = route.legs[i].end_location.lat()
                        var lng = route.legs[i].end_location.lng()
                        var time = route.legs[i].duration.value;
                        var distance = parseFloat(route.legs[i].distance.value / 1609);
                        endPoint = {
                            name: name,
                            location: [lat, lng],
                            time: time,
                            distance: distance,
                        }
                        legData.push(endPoint)
                        // i is not at the beginning, nor middle, so must be the end of the leg data.
                        // add only leg's endpoint to leg data
                    }


                }

                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);

                // console.log(legData)
                MapFunctions.handleTripSearch(map, hostelIds, legData, function () {
                    markerCallback(true);
                })
                callback(legData, route.legs[0].start_address, route.legs[route.legs.length - 1].end_address, map)
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    },
    handleApiLoaded: (map, maps, LatLng) => {
        // use map and maps objects


        return //console.log("API Loaded")
    },
    loadATrip: () => {

    }

}

export default MapFunctions