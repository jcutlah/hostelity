import React from 'react';
import Typography from '@material-ui/core/Typography';
import Hostels from './Hostels';

const wpIndex = ["Starting point:", "Waypoint:", "Ending point:"]

const Waypoints = (props) => {
    // console.log(props.waypoints);
    return (
        <div className="tripList section">
            {props.waypoints.map((waypoint, i) => {
                console.log(waypoint);
                return (
                    <div key={waypoint._id} className="tripSummary">

                        <Typography align="center" variant="h6" gutterBottom>
                            {wpIndex[i]}
                        </Typography>

                        <Typography align="center" component="p">
                            {waypoint.name}
                            <br />
                            {waypoint.location.coordinates[0]}, {waypoint.location.coordinates[1]}
                            <br />
                        </Typography>
                        <hr></hr>

                        <Hostels hostels={waypoint.hostels} />


                    </div>
                )
            })}
        </div>
    )
}

export default Waypoints;