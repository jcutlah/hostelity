import React, { useState, useEffect } from 'react';
import Trips from './subcomponent/Trips';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box'
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        },
    container: {
        fontFamily: 'Amatic SC, cursive',
        margin: '5% auto 0 auto !important',
        width: '100%',
        fontSize: '2em',
        overflowX: 'wrap',
        maxWidth: '1299px',
        background: 'url(/assets/images/wall.jpg)',
        boxShadow: '0px 0px 10px black'
    },
    card: {
        width: 'auto',
        margin: '0 auto !important',
        // backgroundColor: 'rgba(220,220,220,0.8)',
        boxShadow: '3px 3px 15px black',
        borderRadius: '3px',
        padding: '10%',
        // color: 'white',
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
    images: {
        borderRadius: '3px 0px 0px 3px',

    },
    imageText: {
        textShadow: '1px 1px white'

    },
    imageCard: {
        width: 'fit-content !important',

    }

}));

const LandingPage = (props) => {
    const classes = useStyles();
    // console.log(user);
    return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={7} className={classes.container}>

            <Grid item xs={12} lg={12} spacing={2} className="landingHeader">
                <Typography style={{ textShadow: '0px 0px 5px rgb(173, 173, 173), 1px 1px white' }} variant align="center">
                    <h1> Welcome to switchBak! </h1>
                </Typography>
                <Card className={classes.card}>
                    <Typography variant>
                        
                            switchBak is THE app for everyone who dreams about traveling the world, but isn’t sure where to start or how to afford it.  switchBak takes the guesswork out of economical travel planning by providing an easy way to find the world’s best hostels and to keep track of trip itineraries.
                        
                    </Typography>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>

                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant>
                            <p>
                                The switchBak app makes it easy to get started quickly by keeping things simple.
                            </p>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6} align='center'>
                <Card className={classes.imageCard}>

                    <img className={classes.images} src='/assets/images/tripPlot.gif' width='100%'></img>
                    <Typography variant="h4" className={classes.imageText}>
                        <Box fontFamily={'Amatic SC, cursive'}>
                            Just enter where you want to go then click begin!
                    </Box>
                    </Typography>


                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant>
                            <p>
                                switchBak incorporates some of the world's most powerful APIs in order to locate the best hostels on the planet just for you.
                            </p>

                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6} align='center'>
                <Card className={classes.imageCard}>
                    <img className={classes.images} src='/assets/images/tripWaypointZoom.gif' width='100%'></img>
                    <Typography variant="h4" className={classes.imageText}>
                        <Box fontFamily={'Amatic SC, cursive'}>

                            Zoom in on a waypoint and click any marker for hostel info.
                    </Box>
                    </Typography>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant>
                            <p>
                                switchBak keeps track of the adventure you've planned and saves the trip to your user profile in My Trips for quick and easy future reference.
                            </p>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6} align='center'>
                <Card className={classes.imageCard}>
                    <img className={classes.images} src='/assets/images/saveTrip.gif' width='100%'></img>

                    <Typography variant="h4">
                        <Box fontFamily={'Amatic SC, cursive'}>
                            Clicking save will add your trip to your My Trips page where you can review, edit and get information on your hostels!
                </Box>
                    </Typography>

                </Card>
                <br />
                <br />
            </Grid>
        </Grid>
    )
}

export default LandingPage;

