import React from 'react';
import Hostels from './Hostels';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

const Trips = (props) => {
    console.log(props);
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            {props.trips.map(trip => {
                console.log(trip);
                console.log(trip.hostels);
                return (
                    <div key={trip._id} className="tripSummary">
                        <Typography variant="h5" component="h3" align="center">
                            {trip.name}
                        </Typography>
                        <hr></hr>
                        <Hostels
                            hostels={trip.hostels}
                        />

                        <Typography variant="h6" gutterBottom>
                            Start:
                         </Typography>
                       
                        <Typography component="p">
                            {trip.startDest.name}
                        </Typography>
                      

                        <Typography variant="h6" gutterBottom>
                            End:
                        </Typography>
                        

                        <Typography component="p">
                            {trip.endDest.name}
                        </Typography>
                    </div>

                )
            })}
        </Paper>
    )
}

export default Trips;
