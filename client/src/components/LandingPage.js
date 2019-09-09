import React, { useState, useEffect } from 'react';
import Trips from './subcomponent/Trips';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
   
    container: {
        fontFamily: 'Amatic SC, cursive',
        margin: '10% auto 0 auto !important',
        width: '100%',
        fontSize: '2em',
        overflowX: 'wrap',
        maxWidth: '1299px',
        
    },
    card: {
        minWidth: 275,
        backgroundColor: 'rgba(220,220,220,0.8)',
        boxShadow: '3px 3px 3px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

}));

const LandingPage = (props) => {
    const classes = useStyles();
    // console.log(user);
    return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={7} className={classes.container}>

            <Grid item xs={10} spacing={8}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h4">
                            switchBak is THE app for everyone who dreams about traveling the world, but isn’t sure where to start or how to afford it.  switchBak takes the guesswork out of economical travel planning by providing an easy way to find the world’s best hostels and to keep track of trip itineraries.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={6} md={6} lg={6}>

                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5">
                            The switchBak app makes it easy to get started quickly by keeping things simple.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={10} md={6} lg={6} align='center'>
                <img src='/assets/images/tripPlot.gif' width='90%'></img>
                <Typography variant="h6">
                <hr></hr>
                    Just enter where you want to go then click begin!
                    <hr></hr>
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">
                            switchBak incorporates some of the world's most powerful APIs in order to locate the best hostels on the planet just for you.
                         </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6} align='center'>
                <img src='/assets/images/tripWaypointZoom.gif' width='90%'></img>
                <Typography variant="h6">
                    Zoom in on a waypoint and click any marker for hostel info.
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">
                             switchBak keeps track of the adventure you've planned and saves the trip to your user profile in My Trips for quick and easy future reference.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6} align='center'>
                <img src='/assets/images/saveTrip.gif' width='500px'></img>
                <Typography variant="h6">
                    Clicking save will add your trip to your My Trips page where you can review and edit it.
                </Typography>
            </Grid>

        </Grid>
    )
}

export default LandingPage;

