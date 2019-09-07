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

            <Grid item xs={12} align='left'>
                <img src='/assets/images/switchBakLogo.png'></img>
            </Grid>
            <Grid item xs={12} align="right">
                <div className="landingText">
                    I once knew a man from a town they called Began, And He tried to throw a fit
                    he did it, he did, but lost the liquid - that runs through his veins and flows red
                </div>
            </Grid>
            <br />

            <Grid item align='right'>
                <img src='/assets/images/switchBakLogo.png'></img>
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

