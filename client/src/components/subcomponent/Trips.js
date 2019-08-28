import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Waypoints from './Waypoints';
import Axios from 'axios';



const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));


const Trips = (props) => {
    console.log(typeof props.trips);
    props.trips.length ? 
        console.log(typeof props.trips) :
        console.log('meep meep');
    
    const classes = useStyles();
    

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
