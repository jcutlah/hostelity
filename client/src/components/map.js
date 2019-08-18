import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import { mergeClasses } from '@material-ui/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField'
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import SearchBox from './subcomponent/mapsSearch'
import handleApiLoaded from '../utils/gmAPI'
require("dotenv").config()
// const google = window.google;

const GMAPKEY = process.env.GMAPS_KEY
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    mapContainer: {
        float: 'left !important'
    },
    searchDiv: {
        position: 'absolute',
        top: '5vh !important',
        right: '5vh !important',
        width: '20vw !important',
        float: 'right !important'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
      },
      darkDivider: {
          backgroundColor: 'rgba(0,0,0,0.5)'
      }
}));
function Map(props) {
    const defaultview = {
        center: {
            lat: 37,
            lng: -90
        },
        zoom: 4.5
    };

    const classes = useStyles()
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: true,
    });
    /* TxtField*/
    const [values, setValues] = React.useState({
      name: 'Cat in the Hat',
      age: '',
      multiline: 'Controlled',
      currency: 'EUR',
    });
  
    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };
    
    return (
        // Important! Always set the container height explicitly
        <>
        <Container fixed className={classes.mapContainer}>

            <div style={{ height: '95vh', width: '100%', marginTop: '3vh', marginBottom: '2vh', float: 'left' }}>
                <GoogleMapReact
                    bootstrapURLKeys='AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ'
                    defaultCenter={defaultview.center}
                    defaultZoom={defaultview.zoom}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}

                >
                    <AnyReactComponent
                        lat={69.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
            
        </Container>
        <div className={classes.searchDiv}>
                <FormControl component="fieldset">
                    <FormLabel component="legend" align='center'>Plan Your Trip</FormLabel>
                    <Divider variant="middle" className={classes.darkDivider}/>

                    <FormGroup>

                        <TextField
                            id="outlined-start"
                            label="Starting Point"
                            className={classes.textField}
                            value={values.start}
                            onChange={handleChange('name')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-end"
                            label="Final Destination"
                            className={classes.textField}
                            value={values.end}
                            onChange={handleChange('name')}
                            margin="normal"
                            variant="outlined"
                        />
                            <FormHelperText>Find your Path!</FormHelperText>

                        <br/>
                       <Fab variant="extended" aria-label="delete" className={classes.fab}>
        <NavigationIcon className={classes.extendedIcon} />
        Begin
      </Fab>
                    </FormGroup>
                </FormControl>
            </div>
            <SearchBox></SearchBox>
            </>
    );
}

export default Map
