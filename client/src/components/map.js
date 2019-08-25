import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField'
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import MapFunctions from '../utils/gmAPI'
import { flexbox, fontSize } from '@material-ui/system';
require("dotenv").config()
// const google = window.google;
// import { makeStyles } from '@material-ui/core/styles';
const Marker = ({ text }) => <div>{text}</div>;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    mapContainer: {
 
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
    }
}));
function Map(props) {

    useEffect(function () {
        return <GoogleMapReact />
    }, [GoogleMapReact])


    const defaultview = {
        center: {
            lat: 37,
            lng: -90
        },
        zoom: 1
    };

    const classes = useStyles()
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: true,
        map: {},
        start: '',
        end: ''
    });
    /* TxtField*/


    const handleChange = event => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

    return (
        // Important! Always set the container height explicitly
        <>
            <Container fixed>
            <div className={classes.searchDiv}>
                <FormControl component="fieldset">
                    <FormLabel component="legend" align='center'>Plan Your Trip</FormLabel>
                    <Divider variant="middle" className={classes.darkDivider} />

                    <FormGroup>

                        <TextField
                            id="outlined-start"
                            label="Starting Point"
                            className={classes.textField}
                            value={state.start}
                            name='start'
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-end"
                            label="Final Destination"
                            className={classes.textField}
                            value={state.end}
                            name='end'
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        {/* <FormHelperText>Find your Path!</FormHelperText> */}

                        <br />
                        <Fab onClick={() => {
                            // MapFunctions.handleTripSearch(state.map, state.start, state.end)

                            MapFunctions.calculateAndDisplayRoute(state.map, state.start, state.end)
                        }

                        }

                            variant="extended" aria-label="delete" className={classes.fab}>
                            <NavigationIcon className={classes.extendedIcon} />
                            Begin
      </Fab>
                    </FormGroup>
                    <div id='directions-panel'></div>
                </FormControl>
            </div>
            </Container>
            <Container className={classes.mapContainer}>
                <div style={{ height: '75vh', width: '100%', marginTop: '5vh', marginBottom:'20vh', border: '1px solid orange', borderRadius: '3px', position: 'relative' }}>
                    <GoogleMapReact
                        bootstrapURLKeys='AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ'
                        defaultCenter={defaultview.center}
                        defaultZoom={defaultview.zoom}
                        yesIWantToUseGoogleMapApiInternals={true}
                        onGoogleApiLoaded={({ map, maps }) => {
                            MapFunctions.handleApiLoaded(map, maps)
                            setState({ ...state, map: map })
                        }}
                        id="myMap"
                    >

                        <Marker
                            lat={69.955413}
                            lng={30.337844}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </div>

            </Container>

        </>
    );
}

export default Map
