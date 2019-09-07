import React, { useState, useEffect } from 'react';
import Trips from './subcomponent/Trips';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    container: {

        marginTop: '8.5%',
        fontFamily: 'Amatic SC, cursive',
        margin: '0',
        width: '100%',
        fontSize: '2em',
        overflowX: 'wrap'


    }
}));

const LandingPage = (props) => {
    const classes = useStyles();
    // console.log(user);
    return (
        <Grid container direction="column" justify="center" alignItems="center" spacing={5} className={classes.container}>

            <Grid item xs={12} align="right">
                <div className="landingText">
                    switchBak is THE app for everyone who dreams about traveling the world, but isn’t sure where to start or how to afford it.  switchBak takes the guesswork out of economical travel planning by providing an easy way to find the world’s best hostels and to keep track of trip itineraries.
                </div>
            </Grid>
            <Grid item xs={12} align='left'>
                <h2> Simply enter where you want to go then click begin!</h2>
                <img src='/assets/images/tripPlot.gif' width='500px'></img>
            </Grid>
            <br />

            <Grid item align='right'>
                <h2> Clicking on a waypoint will show you best hostels in that area. </h2>
                <img src='/assets/images/tripWaypointZoom.gif' width='500px'></img>
            </Grid>
            <Grid item align="left">
                <div className="landingText">
                <h2> Clicking save will add your trip to your My Trips page where you can review and edit it. </h2>
                <img src='/assets/images/saveTrip.gif' width='500px'></img>
                </div>
            </Grid>
        </Grid>
    )
}

export default LandingPage;

