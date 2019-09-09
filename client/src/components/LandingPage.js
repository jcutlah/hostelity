import React, { useState, useEffect } from 'react';
import Trips from './subcomponent/Trips';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    container: {
        fontFamily: 'Amatic SC, cursive',
        margin: '10% auto 0 auto !important',
        width: '100%',
        fontSize: '2em',
        overflowX: 'wrap',
        maxWidth: '1299px'

    }
}));

const LandingPage = (props) => {
    const classes = useStyles();
    // console.log(user);
    return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={5} className={classes.container}>

            <Grid item xs={12} align="center">
                <div className="landingText">
                    switchBak is THE app for everyone who dreams about traveling the world, but isn’t sure where to start or how to afford it.  switchBak takes the guesswork out of economical travel planning by providing an easy way to find the world’s best hostels and to keep track of trip itineraries.
                </div>
            </Grid>

            <Grid item xs={12} md={6} lg={6} align='center'><h2> Simply enter where you want to go then click begin!</h2></Grid>
            <Grid item xs={12} md={6} lg={6} align='center'><img src='/assets/images/tripPlot.gif' width='90%'></img></Grid>

            <br />


            <Grid item xs={12} md={6} lg={6} align='center'><h2> Clicking on a waypoint will show you the best hostels in that area... </h2></Grid>
            <Grid item xs={12} md={6} lg={6} align='center'><img src='/assets/images/tripWaypointZoom.gif' width='90%'></img></Grid>

            <hr />


            <Grid item xs={12} align='center' className="landingText">
                <h2> Clicking save will add your trip to your My Trips page where you can review and edit it. </h2>
                <img src='/assets/images/saveTrip.gif' width='500px'></img>
            </Grid>

        </Grid>
    )
}

export default LandingPage;

