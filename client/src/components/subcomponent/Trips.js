import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Waypoints from './Waypoints';
import Axios from 'axios'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import "../../css/style.css";
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
    root: {

        padding: 'none',
        fontFamily: 'Amatic SC, cursive',
        margin: '0',
        width: '100%',
        borderTop: '4px ridge rgb(20,100,50)'

    },
    fontSet: {
        fontFamily: 'Amatic SC, cursive',
    },
    card: {
        minWidth: 275,
        paddingTop: '30px',
        marginBottom: '20px',
        boxShadow: '3px 10px 30px black',
        background: 'url(/assets/images/cork.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'stretch',
        backgroundRepeat: 'repeat',
        fontFamily: 'Amatic SC, cursive',
        borderRadius: '0',
    },
    cardContent: {
        borderBox: 'content',
        height: 'fit-content !important',
        padding: '0 !important'
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
    },
    cardContainer: {
        borderRadius: '0 !important',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center !important'
    },
    createTrip: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
        background: 'linear-gradient(90deg, rgb(164, 197, 160), rgb(64, 105, 71));'
    },
    treatYoSelfArrow: {
        maxWidth: '65px',
        transform: "rotate(45deg)",
        marginTop: "20px"
    }
}));

const Trips = (props) => {
    const classes = useStyles();

    const deleteTrip = (event) => {
        event.preventDefault();
        // console.log(event.target);
        // console.log(event.currentTarget);
        let tripId = event.currentTarget.getAttribute('data-id');

        Axios.delete(`/api/trips/${tripId}`)
            .then(res => {
                // console.log(res);
                props.delTripCallback(tripId);
            })
            .catch(err => console.log(err))
    }
    if (props.trips.length === 0) {
            return (
                <div className={`trip-prompt ${props.hasInfo ? "no-trips" : "unchecked"}`} style={{ textAlign: "center", fontSize: "30px" }}>
                    Need a vacation??<br></br>
                    Treat yo self!!!
                    <br></br>
                    <div className="map-arrow-wrapper">
                        <img alt="map-arrow" className={classes.treatYoSelfArrow} src="/assets/images/DottedLine.png" />
                    </div>
                    <Button variant="contained" className={classes.createTrip} href="/map" align='right' size="medium">Create a Trip</Button>
                </div>
            )
    }


    return (
        <div>
            {props.trips.map((trip, i) => {
                // console.log(trip)

                return (
                    <Paper key={i} className={classes.root}>
                        <Grid className={classes.cardContainer} container spacing={3}>
                            <Grid item xs={12} align='center'>
                                <Card key={i} className={classes.card}>
                                    <div key={trip._id} className='high-order-card'>
                                        <CardContent className={classes.cardContent}>
                                            <Grid item xs={12}>
                                                <Typography variant="h5" component="h3" align="center">
                                                    <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'} className="shadowedText" fontSize={80}>

                                                        {trip.name}
                                                    </Box>
                                                    <br />
                                                </Typography>
                                                {/* <hr></hr> */}
                                            </Grid>

                                            <Grid align="center" item xs={12}>
                                                <Typography align="center" className="startEnd" variant="h6" gutterBottom>
                                                    <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'} className='startEndText' fontSize={'h5.fontSize'}>

                                                        {trip.waypoints[0].name}
                                                        <br />
                                                        <img alt="map-arrow" className={classes.travelArrow} src={"/assets/images/DottedLine.png"}></img>
                                                        <span className={classes.pos}></span>
                                                        <br />
                                                        {trip.waypoints[trip.waypoints.length - 1].name}
                                                    </Box>
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <br></br>
                                                <Waypoints
                                                    waypoints={trip.waypoints}
                                                />
                                            </Grid>


                                        </CardContent>
                                        <CardActions className={classes.buttonContainer}>
                                            <hr></hr>
                                            <Grid container>
                                                <Grid item xs={6} align="left">
                                                    {/* <Typography> */}
                                                        <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'}>
                                                            <a className={classes.editTrip} href={`/map/${trip._id}`}> <Button className={classes.editTrip} size="small">Edit this Trip</Button></a>
                                                        </Box>
                                                    {/* </Typography> */}
                                                </Grid>
                                                <Grid item xs={6} align="right">
                                                    {/* <Typography> */}
                                                        <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'}>
                                                            <Button className={classes.removeTrip} size="small"
                                                                data-id={trip._id}
                                                                onClick={deleteTrip}>{'Delete this Trip'}</Button>
                                                        </Box>
                                                    {/* </Typography> */}
                                                </Grid>
                                            </Grid>

                                        </CardActions>

                                    </div>
                                </Card>

                            </Grid>
                        </Grid>
                        <br />
                        <br />
                    </Paper>

                )
            })}
        </div>
    )
}


export default Trips;
