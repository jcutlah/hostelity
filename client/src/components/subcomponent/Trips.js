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
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    card: {
        minWidth: 275,
        boxShadow: '0px 1px 3px rgb(20,20,20), inset 0px 0px 2px black',
        paddingTop: '30px',
        marginBottom: '20px'
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
        fontSize: 14,

    },
    editLink: {
        textDecoration: 'none',
        border: '1px black'
    }
}));

const Trips = (props) => {
    const classes = useStyles();

    const getTripData = async (id) => {
        console.log(id)
        await Axios.get(`/api/trips/${id}`)
            .then(res => {
                var data = res.data
                var trip = {
                    name: data.name,
                    start: data.waypoints[0].name,
                    end: data.waypoints[data.waypoints.length - 1].name,
                    stops: []
                }
                console.log(trip)
                return (trip)
            })
            .catch(err => console.log(err))
    }

    return (
        <Paper className={classes.root}>
            {/* {console.log(typeof props.trips)} */}
            {props.trips.map(trip => {
                console.log(trip)
                return (
                    <div key={trip._id} className="tripSummary">
                        <Card className={classes.card}>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" component="h3" align="center">
                                            {trip.name}
                                            <br />
                                        </Typography>
                                        <hr></hr>
                                    </Grid>

                                    <Grid align="center" item xs={12}>
                                        <Typography align="center" className="stat" variant="h6" gutterBottom>

                                            {trip.waypoints[0].name}
                                            <br />
                                            <span className={classes.pos}>...</span>
                                            <br />
                                            {trip.waypoints[trip.waypoints.length - 1].name}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography align="right" variant="h6">
                                            Your Lodging Situation...
                        </Typography>
                                        <Waypoints
                                            waypoints={trip.waypoints}
                                        />

                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <a className={classes.editLink} href={`/map/${trip._id}`}> <Button size="small">Edit this Trip</Button></a>
                            </CardActions>

                        </Card>

                    </div>

                )
            })}
        </Paper>
    )
}

export default Trips;
