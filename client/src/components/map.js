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
import Link from '@material-ui/core/Link';
import Axios from 'axios';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
// const google = window.google;
// import { makeStyles } from '@material-ui/core/styles';
const Marker = ({ text }) => <div>{text}</div>;

const useStyles = makeStyles(theme => ({
    map: {
        marginTop: 'calc(-23vw)'
    },
    root: {
        flexGrow: 1
    },
    mapContainer: {
        paddingTop: '2%'
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
    },
    fabAfter: {
        marginTop: '1%',
        fontSize: '.75em',
        paddingLeft: '1vw',
        paddingRight: '1vw',
        textAlign: 'center'
    }
}));


function Map(props) {

    useEffect(function () {
        return () => {
            window.scrollTo(0, 0);

            // document.addEventListener('click', function (event) {
            //     if (event.target.getAttribute('class') === "hostelButton") {
            //         let coords = event.target.getAttribute('data-location').split(',');

            //         let data = {
            //             title: event.target.getAttribute('data-title'),
            //             location: {
            //                 type: "Point",
            //                 coordinates: [parseFloat(coords[1]), parseFloat(coords[0])]
            //             },
            //             address: event.target.getAttribute('data-address'),
            //             placeId: event.target.id,
            //             imageUrl: event.target.getAttribute('data-imageUrl')
            //         }
            //         //console.log(data)
            //         setHostels([...hostels, data]);
            //         event.target.setAttribute('style', 'display: none');
            //         //console.log(event.target.parentNode.childNodes)
            //         var children = event.target.parentNode.childNodes
            //         //console.log(children);
            //         children.forEach(child => {
            //             //console.log(child.nodeName);
            //             if (child.nodeName === "BUTTON") {
            //                 if (child.getAttribute('class') === "disabledButton") {
            //                     child.setAttribute('style', 'display: block !important');
            //                 }
            //             }
            //         })
            //     }
            // });
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
        inputId: 0,
        hostels: []
    });
    const [hostels, setHostels] = React.useState([])

    // const setHostels = (hostel) => {
    //     let hostelz = state.hostels;
    //     console.log(hostelz)
    //     let alreadyAdded = false;
    //     hostelz.push(hostel);
    //     console.log(hostelz);
    //     setState({
    //         ...state, hostels: hostelz
    //     })
    // }

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
        let hostelz = hostels;
        hostelz.push(data)
        let tripz = state.trip;
        setHostels(hostelz)
        event.target.setAttribute('style', 'display: none');
        event.target.setAttribute('data-clicked', 'true');
        var children = event.target.parentNode.childNodes
        children.forEach(child => {
            //console.log(child.nodeName);
            if (child.nodeName === "BUTTON") {
                if (child.getAttribute('class') === "disabledButton") {
                    child.setAttribute('style', 'display: block !important');
                }
            }
        })
    }
    const infoWindowListener = () => {
        setTimeout(() => {
            let infoWindowButtons = document.querySelectorAll('.hostelButton');
            console.log(infoWindowButtons);
            infoWindowButtons.forEach(butt => {
                console.log(butt.dataset);
                if (butt.dataset.clicked !== "true") {
                    butt.addEventListener("click", addHostelHandler, false);
                }
            })

        }, 500)
    }

    const handleChange = event => {
        // //console.log(state);
        const { name, value } = event.target;
        var usedThisStop = false;
        var oldStops = state.stops;
        var newStops;
        var thisStop = {
            [name]: value,

        }
        if (name === "start" || name === "end" || name === "name") {
            setState({ ...state, [name]: value });
            return;
        }
        if (state.stops.length) {
            oldStops.forEach((stop, i) => {
                if (stop[name]) {
                    oldStops[i] = thisStop;
                    usedThisStop = true;
                }
            });
            if (!usedThisStop) {
                newStops = [...oldStops, thisStop];
                setState({ ...state, stops: newStops });
            } else {
                setState({ ...state, stops: oldStops });
            }
        } else {
            newStops = [thisStop];
            setState({ ...state, stops: newStops });
        }
    }
    const addInput = () => {
        // //console.log(state);
        // //console.log("addInput running");
        var newId = state.inputId + 1;
        setState({ ...state, inputId: newId });

    }
    // function infoWindowOpen(event) {
    //     if (!event.target.closest('.hostelButton')) {
    //         // //console.log(state.waypoints)
    //         var data = {
    //             title: event.target.getAttribute('data-title'),
    //             location: event.target.getAttribute('data-location'),
    //             address: event.target.getAttribute('data-address'),
    //             placeId: event.target.id,
    //             imageUrl: event.target.getAttribute('data-imageUrl')
    //         }

    //         // return //console.log(data)
    //     } else {
    //         return //console.log("nah dude")
    //     }

    // }

    // document.addEventListener('click', function (event) {
    //     infoWindowOpen(event)
    // })
    const centerMap = (map, loc) => {
        map.setCenter(loc)
    }
    const saveTrip = (event) => {
        event.preventDefault();
        Axios.post('/api/trips', { trip: state.trip, hostels: hostels, tripName: state.name })
            .then(function (res) {
                //console.log(res)
                res.data.message === "success" ? window.location = "/my-trips" : alert('An error occurred')
            })
            .catch(err => {
                //console.log(err);
            })
        // var waypoints = state.trip.waypoints
        // //console.log(waypoints)
        // var saveData = {
        //     waypoints: waypoints,
        //     start: state.start,
        //     end: state.end,
        //     name: 'My *Super FUCKING* Trip!'
        // }
        // //console.log(saveData)
    }
    // //console.log(state);
    return (
        // Important! Always set the container height explicitly
        <div className="map-container">
            <Paper className={classes.root}>
                <Container fixed>
                    <div className={classes.searchDiv}>
                        <div id="form-top">
                            {/* <Grid container>
                                <Grid item xs={6} align="left">
                                    <Link
                                        href={""}
                                        className={classes.link}
                                    >
                                        <Fab
                                            variant="extended" aria-label="delete" className={classes.fabAfter}>
                                            New Search
                                </Fab>
                                    </Link>
                                </Grid>
                                <Grid item xs={6} align="right">

                                    <Link
                                        href={""} onClick={saveTrip} className={state.trip.waypoints ? classes.showForm : classes.hiddenForm}
                                    >
                                        <Fab
                                            variant="extended" aria-label="delete" className={classes.fabAfter}>Save your Trip!
                                </Fab>


                                    </Link>
                                </Grid>
                            </Grid> */}

                        </div>
                        <form
                            className={state.trip.waypoints ? classes.hiddenForm : classes.showForm}
                            onSubmit={(e) => { e.preventDefault() }} >
                            <FormControl fullWidth={true} component="fieldset">
                                <FormLabel component="legend" align='center'>Plan Your Trip</FormLabel>
                                <Divider variant="middle" className={classes.darkDivider} />

                                <FormGroup>
                                    <div className="form-inputs">
                                        <TextField
                                            id="outlined-start"
                                            label="Trip Name"
                                            className={classes.textField}
                                            name='name'
                                            onChange={handleChange}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        <TextField
                                            id="outlined-start"
                                            label="Starting Point"
                                            className={classes.textField}
                                            // value={state.start}
                                            name='start'
                                            onChange={handleChange}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        {state.inputId >= 1 ?
                                            <TextField
                                                className={classes.textField}
                                                label="Waypoint"
                                                name={`1waypoint`}
                                                margin="normal"
                                                variant="outlined"
                                                onChange={handleChange}
                                            /> :
                                            <div></div>
                                        }
                                        {state.inputId >= 2 ?
                                            <TextField
                                                className={classes.textField}
                                                label="Waypoint"
                                                name={`2waypoint`}
                                                margin="normal"
                                                variant="outlined"
                                                onChange={handleChange}
                                            /> :
                                            <div></div>
                                        }
                                        {state.inputId >= 3 ?
                                            <TextField
                                                className={classes.textField}
                                                label="Waypoint"
                                                name={`3waypoint`}
                                                margin="normal"
                                                variant="outlined"
                                                onChange={handleChange}
                                            /> :
                                            <div></div>
                                        }
                                        {state.inputId >= 4 ?
                                            <TextField
                                                className={classes.textField}
                                                label="Waypoint"
                                                name={`4waypoint`}
                                                margin="normal"
                                                variant="outlined"
                                                onChange={handleChange}
                                            /> :
                                            <div></div>
                                        }
                                        {state.inputId >= 5 ?
                                            <TextField
                                                className={classes.textField}
                                                label="Waypoint"
                                                name={`5waypoint`}
                                                margin="normal"
                                                variant="outlined"
                                                onChange={handleChange}
                                            /> :
                                            <div></div>
                                        }
                                        {state.inputId >= 6 ?
                                            <TextField
                                                className={classes.textField}
                                                label="Waypoint"
                                                name={`6waypoint`}
                                                margin="normal"
                                                variant="outlined"
                                                onChange={handleChange}
                                            /> :
                                            <div></div>
                                        }
                                        {state.inputId >= 7 ?
                                            <TextField
                                                className={classes.textField}
                                                label="Waypoint"
                                                name={`7waypoint`}
                                                margin="normal"
                                                variant="outlined"
                                                onChange={handleChange}
                                            /> :
                                            <div></div>
                                        }
                                        {state.inputId >= 8 ?
                                            <TextField
                                                className={classes.textField}
                                                label="Waypoint"
                                                name={`8waypoint`}
                                                margin="normal"
                                                variant="outlined"
                                                onChange={handleChange}
                                            /> :
                                            <div></div>
                                        }
                                        <TextField
                                            id="outlined-end"
                                            label="Final Destination"
                                            className={classes.textField}
                                            // value={state.end}
                                            name='end'
                                            onChange={handleChange}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        <Button
                                            className={classes.button}
                                            onClick={addInput}>
                                            Add Waypoint
                            </Button>

                                        <Fab
                                            type="submit"
                                            onClick={async () => {
                                                const google = window.google
                                                document.querySelector('#form-top').setAttribute('style', 'display:block');
                                                await MapFunctions.calculateAndDisplayRoute(state.map, state.start, state.end, false, state.stops, [], function (routeLegs, start, end, map) {
                                                    //console.log(routeLegs);
                                                    var newTrip = {
                                                        waypoints: routeLegs,
                                                        start: start,
                                                        end: end,
                                                        name: 'My Super Trip!'
                                                    }
                                                    var center = {
                                                        lat: routeLegs[0].location[0],
                                                        lng: routeLegs[0].location[1]
                                                    }
                                                    console.log(center)
                                                    var loc = new google.maps.LatLng(center.lat, center.lng)
                                                    ///loop through leg data, use logic to add waypoints to state.waypoints, and add leg data to state.trip
                                                    //ADDING WAYPOINT INFO TO STATE.WAYPOINTS
                                                    setState({ ...state, trip: newTrip })
                                                    // //console.log(state.waypoints)
                                                    return centerMap(map, loc)
                                                }, infoWindowListener)

                                            }

                                            }
                                            type="submit"
                                            variant="extended" aria-label="delete" className={classes.fab}>
                                            <NavigationIcon className={classes.extendedIcon} />
                                            Begin
                        </Fab>

                                    </div>
                                </FormGroup>

                                <div id='directions-panel'></div>
                            </FormControl>
                        </form>
                    </div>
                </Container>
                <Container className={classes.mapContainer}>
                    <div className="mapView">
                        <GoogleMapReact

                            bootstrapURLKeys='AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ'
                            defaultCenter={defaultview.center}
                            defaultZoom={defaultview.zoom}
                            yesIWantToUseGoogleMapApiInternals={true}
                            // onGoogleApiLoaded={({ map, maps }) => {
                            onGoogleApiLoaded={(mapper) => {
                                console.log(mapper);
                                MapFunctions.handleApiLoaded(mapper.map, mapper.maps)
                                setState({ ...state, map: mapper.map })
                            }}
                            onChange={console.log('change')}
                            id="myMap"

                        >

                            <Marker
                                lat={69.955413}
                                lng={30.337844}
                                text="My Marker"
                            />
                        </GoogleMapReact>
                        <br />
                        <Grid container>
                            <Grid item xs={6} align="left">
                                <Link
                                    href={""}
                                    className={classes.link}
                                >
                                    <Fab
                                        variant="extended" aria-label="delete" className={classes.fabAfter}>
                                        New Search
                                </Fab>
                                </Link>
                            </Grid>
                            <Grid item xs={6} align="right">

                                <Link
                                    href={""} onClick={saveTrip} className={state.trip.waypoints ? classes.showForm : classes.hiddenForm}
                                >
                                    <Fab
                                        variant="extended" aria-label="delete" className={classes.fabAfter}>Save your Trip!
                                </Fab>


                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </Container>

            </Paper>
        </div >
    );

}

export default Map