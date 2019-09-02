import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField'
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import MapFunctions from '../utils/gmAPI'
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Axios from 'axios';


function displayTrip(map) {
    const google = window.google
    var directionsService = new google.maps.DirectionsService()
    var directionsDisplay = new google.maps.DirectionsRenderer()

    directionsService.route({
        origin: 'boston',
        destination: 'new york',
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function (response, status) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);
    })
};
const useStyles = makeStyles(theme => ({
    map: {
        marginTop: 'calc(-23vw)'
    },
    root: {
        flexGrow: 1
    },
    mapContainer: {

    },
    link: {
        margin: theme.spacing(1),
    },
    searchDiv: {
        position: 'relative',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '50vw',
        marginTop: '25vw',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    darkDivider: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    button: {
        margin: theme.spacing(1)
    },
    hiddenForm: {
        display: 'none !important'
    },
    showForm: {
        display: 'block'
    }
}));

const LoadMap = (props) => {
    const state = {
        trip: {}
    };
    Axios.get(`/api/trips/${props.match.params.id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    const defaultview = {
        center: {
            lat: 37,
            lng: -90
        },
        zoom: 1
    };

    const classes = useStyles()

    console.log(props)


    return (
        <div>
            <div>TRIP:</div>
            <div></div>
            <div style={{ height: '100vh', width: '100%' }}>
                <br />
                <Container className={classes.mapContainer}>
                    <div style={{ height: '75vh', width: '100%', marginTop: '5vh', marginBottom: '20vh', border: '1px solid orange', borderRadius: '3px', position: 'relative' }}>
                        <GoogleMapReact
                            bootstrapURLKeys='AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ'
                            defaultCenter={defaultview.center}
                            defaultZoom={defaultview.zoom}
                            yesIWantToUseGoogleMapApiInternals={true}
                            onGoogleApiLoaded={({ map, maps }) => {
                                MapFunctions.calculateAndDisplayRoute(map, 'boston', 'los angeles', true, [], function (data, startAddress, endAddress) {
                                    console.log(data, startAddress, endAddress)
                                })
                            }}
                            id="myMap"

                        >

                        </GoogleMapReact>
                    </div>

                </Container>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ' }}
                    defaultCenter={{ lat: 37.44, lng: -90 }}
                    defaultZoom=''
                    onGoogleApiLoaded={({ map, maps }) => {

                    }}
                >
                </GoogleMapReact>

            </div>
        </div>
    )
}
// const LoadMap = (props) => {

//     const getTripInfo = () => {
//         Axios.get(`/api/trips/${props.tripId}`)
//             .then(tripInfo => {
//                 console.log(tripInfo)

//             })

//             .catch(err => {
//                 return console.log(err)

//             })

//     }
//     if (props.match.params.id)
//         var tripStuff = getTripInfo()

//     return (
//         <div>{tripStuff}</div>
//     )

// }


export default LoadMap