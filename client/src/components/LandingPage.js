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
                <h2> Simply enter where you want to go</h2>
                <img src='/assets/images/tripInput.png' width='500px'></img>
                <h2> then click begin to get started on your next adventure</h2>
                <img src='/assets/images/tripInputMap.png' width='500px'></img>
            </Grid>
            <br />

            <Grid item align='right'>
                <h2> Click on a waypoint see the best hostels in that area </h2>
                <img src='/assets/images/tripWaypointZoomed.png' width='500px'></img>
            </Grid>
            <Grid item align="left">
                <div className="landingText">
                    I once knew a man from a town they called Began, And He tried to throw a fit
                    he did it, he did, but lost the liquid - that runs through his veins and flows red
                </div>
            </Grid>
            <br />
            <Grid item align='left'>
                <img src='/assets/images/switchBakLogo.png'></img>
            </Grid>
            <Grid item align="right">
                <div className="landingText">
                    I once knew a man from a town they called Began, And He tried to throw a fit
                    he did it, he did, but lost the liquid - that runs through his veins and flows red
                </div>
            </Grid>
        </Grid>
    )
}

export default LandingPage;

