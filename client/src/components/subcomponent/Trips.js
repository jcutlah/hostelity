import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Waypoints from './Waypoints';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

const deepLoop = (iterable) => {
    iterable.map(item => {
        console.log(item.waypoints);
        item.waypoints.map(waypoint => {
            console.log(waypoint);
            waypoint.hostels.map(hostel => {
                console.log(hostel);
            })
        })
    }) 
    
}

const Trips = (props) => {
    const classes = useStyles();
    props.trips ? deepLoop(props.trips) : console.log('meep');
    return (
        <Paper className={classes.root}>
            {console.log(typeof props.trips)}
            {props.trips.map(trip => {

                return (
                    <div key={trip._id} className="tripSummary">
                        <Typography variant="h5" component="h3" align="center">
                            {trip.name}
                        </Typography>
                        <hr></hr>

                        <Typography className="stat" variant="h6" gutterBottom>
                            Start:
                         </Typography>
                        <Typography className="stat" component="p">
                            {trip.start}
                        </Typography>
                        <Typography className="stat" variant="h6" gutterBottom>
                            End:
                        </Typography>
                        <Typography className="stat" component="p">
                            {trip.end}
                        </Typography>
                        <Waypoints
                            waypoints={trip.waypoints}
                        />
                    </div>

                )
            })}
        </Paper>
    )
}

export default Trips;
