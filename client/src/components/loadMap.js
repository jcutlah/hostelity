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


// const google = window.google;
// import { makeStyles } from '@material-ui/core/styles';
const Marker = ({ text }) => <div>{text}</div>;

const useStyles = makeStyles(theme => ({
    map: {
        marginTop: 'none'
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
        position: 'static',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '50vw',
        marginTop: '2vw',
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

function LoadMap(props) {

    // useEffect(function () {
    //     return <GoogleMapReact />
    // }, [GoogleMapReact])
    const setHostels = (hostel) => {
        let hostels = [...state.hostels, hostel];
        // console.log(hostels);
        setState({
            ...state, hostels
        })
    }

    useEffect(function () {

        return () => {
            document.addEventListener('click', function (event) {
                let buttonClass = event.target.getAttribute('classname');
                if ( buttonClass === "hostelButton" || buttonClass === "removeHostel") {
                    let data = {
                        title: event.target.getAttribute('data-title'),
                        location: event.target.getAttribute('data-location'),
                        address: event.target.getAttribute('data-address'),
                        placeId: event.target.id,
                        imageUrl: event.target.getAttribute('data-imageUrl')
                    }
                    // console.log(data)
                    setHostels(data);
                    event.target.setAttribute('style', 'display: none');
                }
            });
        }
    })
    const defaultview = {
        center: {
            lat: 37,
            lng: -90
        },
        zoom: 1
    };

    const classes = useStyles()
    const [state, setState] = React.useState({
        map: {},
        trip: {},
        start: '',
        end: '',
        stops: [],
        hostels: [],
        inputId: 0
    });

    var trip = {}

    const getTripData = (map) => {
        Axios.get(`/api/trips/${props.match.params.id}`)
            .then(res => {
                var data = res.data
                console.log(res.data);
                const hostelIds = [];
                trip = {
                    start: data.waypoints[0].name,
                    end: data.waypoints[data.waypoints.length - 1].name,
                    stops: []
                }
                res.data.waypoints.forEach((wp, i) => {
                    if (i !== 0 && i !== res.data.waypoints.length -1){
                        trip.stops.push({
                            location: wp.name,
                            stopover: true
                        })
                    }
                    wp.hostels.forEach(hostel => {
                        hostelIds.push(hostel.placeId);
                    })
                })
                console.log(trip)
                MapFunctions.calculateAndDisplayRoute(map, trip.start, trip.end, true, trip.stops, hostelIds, function (data, startAddress, endAddress) {
                    console.log(data, startAddress, endAddress)
                })
            })
            .catch(err => console.log(err))
    }
    return (
        // Important! Always set the container height explicitly
        <div className="loadmap-container">
            <Paper className={classes.root}>
                <Container className={classes.mapContainer}>
                    <div style={{ height: '75vh', width: '100%', marginTop: '5vh', marginBottom: '20vh', border: '1px solid orange', borderRadius: '3px', position: 'relative' }}>
                        <GoogleMapReact
                            bootstrapURLKeys='AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ'
                            defaultCenter={defaultview.center}
                            defaultZoom={defaultview.zoom}
                            yesIWantToUseGoogleMapApiInternals={true}
                            onGoogleApiLoaded={({ map, maps }) => {
                                getTripData(map)
                            }}
                            id="myMap"
                        >
                        </GoogleMapReact>

                    </div>

                </Container>

            </Paper>
        </div>
    );

}

export default LoadMap
