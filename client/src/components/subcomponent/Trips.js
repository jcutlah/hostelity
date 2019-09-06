import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Waypoints from './Waypoints';
import Axios from 'axios'
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import "../../css/style.css";
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        fontFamily: 'Amatic SC, cursive',
        margin: '0 auto 30px auto',

    },
    fontSet: {
        fontFamily: 'Amatic SC, cursive',
    },
    card: {
        minWidth: 275,
        boxShadow: '0px 1px 3px rgb(20,20,20), inset 0px 0px 2px black',
        paddingTop: '30px',
        marginBottom: '20px',
        fontFamily: 'Amatic SC, cursive',


    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
        fontFamily: 'Amatic SC, cursive',


    },
    title: {
        fontSize: 14,
        fontFamily: 'Amatic SC, cursive',


    },
    pos: {
        marginBottom: 12,
        fontSize: 14,
        fontFamily: 'Amatic SC, cursive',



    },

    travelArrow: {
        height: '4vh !important',
        width: 'auto',
        fontFamily: 'Amatic SC, cursive',

    },
    card: {
        background: 'url(/assets/images/paper-background.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        fontFamily: 'Amatic SC, cursive',
    },
    removeTrip: {
        borderRadius: '5px',
        textAlign: 'center',
        backgroundColor: 'red !important',
        color: 'white !important',
        textDecoration: 'none',
        fontFamily: 'Amatic SC, cursive',
        fontWeight: 'bold',
        fontSize: '1em'

    },
    editTrip: {
        borderRadius: '5px',
        textAlign: 'center',
        backgroundColor: 'white !important',
        textDecoration: 'none',
        border: '1px black',
        fontFamily: 'Amatic SC, cursive',
        fontWeight: 'bold',
        fontSize: '1em'

    },
    buttonContainer: {
        backgroundColor: 'rgba(200,200,200,0.8)'
    }
}));

const Trips = (props) => {
    const classes = useStyles();

    const deleteTrip = (event) => {
        event.preventDefault();
        console.log(event.target);
        console.log(event.currentTarget);
        let tripId = event.currentTarget.getAttribute('data-id');

        Axios.delete(`/api/trips/${tripId}`)
            .then(res => {
                console.log(res);
                props.delTripCallback(tripId);
            })
            .catch(err => console.log(err))
    }
    if (props.trips.length === 0) {
        return (
            <div style={{ textAlign: "center", fontSize: "30px" }}>
                No trips. What the fuck do you do, anyway?
            </div>
        )
    }


    return (
        <div>
            {props.trips.map((trip, i) => {
                console.log(trip)

                return (
                    <Paper className={classes.root}>
                        <Card key={i} className={classes.card}>
                            <div key={trip._id} className="tripSummary">
                                <CardContent className={classes.cardContent}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="h3" align="center">
                                                <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'}>

                                                    {trip.name}
                                                </Box>
                                                <br />
                                            </Typography>
                                            <hr></hr>
                                        </Grid>

                                        <Grid align="center" item xs={12}>
                                            <Typography align="center" className="stat" variant="h6" gutterBottom>
                                                <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'} fontSize={'h5.fontSize'}>

                                                    {trip.waypoints[0].name}
                                                    <br />
                                                    <img className={classes.travelArrow} src={"/assets/images/DottedLine.png"}></img>
                                                    <span className={classes.pos}></span>
                                                    <br />
                                                    {trip.waypoints[trip.waypoints.length - 1].name}
                                                </Box>
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <hr></hr>
                                            <Typography align="right" variant="h6">
                                                <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'}>
                                                    Your Lodging Situation...
                                                </Box>
                                            </Typography>
                                            <Waypoints
                                                waypoints={trip.waypoints}
                                            />
                                        </Grid>

                                    </Grid>
                                </CardContent>
                                <CardActions className={classes.buttonContainer}>
                                    <hr></hr>
                                    <Grid container>
                                        <Grid item xs={6} align="left">
                                            <Typography>
                                                <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'}>
                                                    <a className={classes.editTrip} href={`/map/${trip._id}`}> <Button className={classes.editTrip} size="small">Edit this Trip</Button></a>
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} align="right">
                                            <Typography>
                                                <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'}>
                                                    <a style={{ textDecoration: 'none' }} href="#" > <Button className={classes.removeTrip} size="small"
                                                    data-id={trip._id}
                                                    onClick={deleteTrip}>{'Delete this Trip'}</Button></a>
                                                </Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </CardActions>

                            </div>
                        </Card>


                    </Paper>
                )
            })}
        </div>
    )
}


export default Trips;
