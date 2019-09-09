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
import Grid from '@material-ui/core/Grid'
import HostelModal from './subcomponent/infoModals/HostelModal'
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
        let hostelz = state.hostels;
        console.log(hostelz)
        let alreadyAdded = false;
        hostelz.forEach(hst => {
            if (hst.placeId === hostel.placeId) {
                alreadyAdded = true;
            }
        })
        if (!alreadyAdded) {
            hostelz.push(hostel);
        }
        console.log(hostelz);
        setState({
            ...state, hostels: hostelz
        })
    }

    const saveTrip = (event) => {
        event.preventDefault();
        Axios.put(`/api/trips/edit/${props.match.url.split('/')[2]}`, state.hostels)
            .then(function (res) {
                //console.log(res)
                res.data.message === "success" ? window.location = "/my-trips" : alert('An error occurred')
            })
            .catch(err => {
                //console.log(err);
            })
    }

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

    const addHostelHandler = (event) => {
        let hostelData = event.target.dataset;
        let coords = hostelData.location.split(',');
        let data = {
            title: hostelData.title,
            location: {
                type: "Point",
                coordinates: [parseFloat(coords[1]), parseFloat(coords[0])]
            },
            address: hostelData.address,
            placeId: event.target.id,
            imageUrl: hostelData.imageurl
        }
        //console.log(data)
        // let hostelz = hostels;
        // hostelz.push(data)
        // let tripz = state.trip;
        setHostels(data)
        event.target.setAttribute('style', 'display: none');
        event.target.setAttribute('data-clicked', 'true');
        var children = event.target.parentNode.childNodes
        children.forEach(child => {
            //console.log(child.nodeName);
            if (child.nodeName === "BUTTON") {
                if (child.getAttribute('class') === "disabledButton") {
                    child.setAttribute('style', 'display: inline-block !important');
                }
            }
        })
    }

    const infoWindowListener = (zoom) => {
        let timeout;
        console.log(zoom)
        if (zoom < 6) {
            console.log('less than 6')
            timeout = 1500;
        } else {
            console.log('not less than 6');
            timeout = 750;
        } 
        setTimeout(() => {
            let infoWindowButtons = document.querySelectorAll('.hostelButton');
            console.log(infoWindowButtons);
            infoWindowButtons.forEach(butt => {
                console.log(butt.dataset);
                if (butt.dataset.clicked !== "true") {
                    butt.addEventListener("click", addHostelHandler, false);
                }
            })

        }, timeout)
    }

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
                    if (i !== 0 && i !== res.data.waypoints.length - 1) {
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
                }, infoWindowListener)
            })
            .catch(err => console.log(err))
    }
    return (
        // Important! Always set the container height explicitly
        <div className="load-map-wrapper">

            <div className="loadmap-container">
                <Paper className={classes.root}>
                    <Container className={classes.mapContainer}>
                        <div className='mapView'>
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
                        <Grid container>
                            <Grid item xs={6} align="left">
                                <HostelModal style={{ height: 'fit-content !important' }}></HostelModal>
                            </Grid>
                            <Grid item xs={6} align='right'>

                                <div id="save-link">
                                    <Link
                                        href={""}
                                        onClick={saveTrip}
                                    // className={state.trip.waypoints ? classes.showForm : classes.hiddenForm}
                                    >
                                        <Fab
                                            variant="extended" aria-label="delete" className={classes.fab}>Save your Trip!
                            </Fab>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>

                    </Container>
                </Paper>
            </div>
        </div>
    );

}

export default LoadMap
