import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Waypoints from './Waypoints';
import Axios from 'axios'
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

const Trips = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            {/* {console.log(typeof props.trips)} */}
            {props.trips.map(trip => {

                return (
                    <div key={trip._id} className="tripSummary">
                        <Typography variant="h5" component="h3" align="center">
                            {trip.name}
                            <br />

                            <span><a href={`/map/${trip._id}`}>Edit this Trip</a></span>
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
