import React from 'react';
import Typography from '@material-ui/core/Typography';
import Hostels from './Hostels';
import Grid from '@material-ui/core/Grid'
const wpIndex = ["Starting point:", "Waypoint:", "Ending point:"]

const Waypoints = (props) => {
    // console.log(props.waypoints);
    return (
        <div className="tripList section">
            {props.waypoints.map((waypoint, i) => {
                console.log(waypoint);
                return (
                    <Grid key={`waypoint-${i}`} container spacing={3}>

                        <Grid item xs={8}>
                            <div key={waypoint._id} className="tripSummary">
                                <hr></hr>
                                <Typography align="left" variant="h6" gutterBottom>
                                    {wpIndex[i]}
                                </Typography>
                                <Typography align="left" component="p">
                                    {waypoint.name}
                                    <br />
                                    {waypoint.location.coordinates[0]}, {waypoint.location.coordinates[1]}
                                    <br />

                                </Typography>

                            </div>
                        </Grid>
                        <Grid item xs={4}>

                            <span align="center"><Hostels hostels={waypoint.hostels} /></span>
                        </Grid>
                    </Grid>
                )
            })}
        </div>
    )
}

export default Waypoints;