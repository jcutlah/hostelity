import React from 'react';
import Typography from '@material-ui/core/Typography';
import Hostels from './Hostels';
import Grid from '@material-ui/core/Grid'
import "../../css/style.css";
import Box from '@material-ui/core/Box'
// const wpIndex = ["Starting point:", "Waypoint:", "Ending point:"]
// var wptLatLng = []
// var calculateDistanceInMiles = (i) => {

//     if (wptLatLng.length > 1 && i < wptLatLng.length - 1) {
//         var x = wptLatLng[i + 1].thisLat
//         var y = wptLatLng[i + 1].thisLng
//         var x1 = wptLatLng[i].thisLat
//         var y1 = wptLatLng[i].thisLng
//         var lat = ((x1 - x) * 69)
//         var lng = ((y1 - y) * 69)
//         var first = Math.pow(lat, 2)
//         var second = Math.pow(lng, 2)
//         var answer = (Math.sqrt((first - second))) * .87
//         return (answer.toString().substring(0, 7));
//     } else if (wptLatLng.length === 0) {
//         return null;
//     }
// }


const Waypoints = (props) => {
    // // console.log(props.waypoints);
    return (
        <div className="tripList section">
            {props.waypoints.map((waypoint, i) => {
                // // console.log(waypoint.distanceToWaypoint);
                let wpIndex = "";
                let wpLength = props.waypoints.length;
                if (i === 0) {
                    wpIndex = "Starting Point";
                } else if (wpLength > 2 && i !== wpLength - 1) {
                    wpIndex = "Waypoint"
                } else {
                    wpIndex = "Destination"
                }
                // console.log(waypoint)
                return (
                    <Grid key={`waypoint-${i}`} container spacing={2}>
                        <Grid item xs={8} >
                            <div key={waypoint._id} className='tripSummary'>

                                <Typography align="center" variant="h6" gutterBottom>
                                    <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'} fontSize={'h3.fontSize'} className='shadowedText'>
                                        {wpIndex}
                                    </Box>
                                </Typography>
                                {/* <Typography align="center" component="p" > */}
                                    <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'} fontSize={'h4.fontSize'} className='shadowedTextBox'>
                                        <span className="waypointName">{waypoint.name}</span>
                                        <br />
                                        {waypoint.distanceToWaypoint ? (<span className="distanceData">{waypoint.distanceToWaypoint ? waypoint.distanceToWaypoint + ' miles' : ' '} <br /></span>) : ''}
                                        {waypoint.timeToWaypoint ? <span className='distanceData'>{waypoint.timeToWaypoint === "0 hours" ? ' ' : 'Travel Time = ' + parseInt(waypoint.timeToWaypoint / 3600) + ' hours'} <br /></span>
                                            : ' '}

                                    </Box>
                                {/* </Typography> */}
                                <Grid item xs={12} align="right">
                                    {/* <Typography>
                                        <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'} fontSize={'h6.fontSize'}>
                                            <a ><Button className={classes.removeWaypoint}>Delete Waypoint</Button></a>
                                        </Box>
                                    </Typography> */}
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <span align="center"><Hostels hostels={waypoint.hostels} /></span>
                                </Grid>
                            </div>

                        </Grid>

                    </Grid>
                )
            })}
        </div>
    )
}

export default Waypoints;