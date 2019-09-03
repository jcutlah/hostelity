import React from 'react';
import Typography from '@material-ui/core/Typography';
import Hostels from './Hostels';
import Grid from '@material-ui/core/Grid'
const wpIndex = ["Starting point:", "Waypoint:", "Ending point:"]
var wptLatLng = []
var calculateDistanceInMiles = (i) => {

    if (wptLatLng.length > 1 && i < wptLatLng.length - 1) {
        var x = wptLatLng[i + 1].thisLat
        var y = wptLatLng[i + 1].thisLng
        var x1 = wptLatLng[i].thisLat
        var y1 = wptLatLng[i].thisLng
        var lat = ((x1 - x) * 69)
        var lng = ((y1 - y) * 69)
        var first = Math.pow(lat, 2)
        var second = Math.pow(lng, 2)
        var answer = (Math.sqrt((first - second))) * .87
        return (answer.toString().substring(0, 7));
    } else if (wptLatLng.length === 0) {
        return null;
    }
}
const Waypoints = (props) => {
    // console.log(props.waypoints);



    return (
        <div className="tripList section">
            {props.waypoints.map((waypoint, i) => {
                console.log(waypoint.distanceToWaypoint);
                var str = waypoint.location.coordinates[0]
                var str1 = waypoint.location.coordinates[1]
                var newStr = str.toString().substring(0, 5)
                var newStr1 = str1.toString().substring(0, 5)
                var thisLat = parseFloat(newStr)
                var thisLng = parseFloat(newStr1)
                console.log(waypoint)
                return (
                    <Grid key={`waypoint-${i}`} container spacing={3}>

                        <Grid item xs={6}>
                            <div key={waypoint._id} className="tripSummary">
                                <hr></hr>
                                <Typography align="left" variant="h6" gutterBottom>
                                    {wpIndex[i]}
                                </Typography>
                                <Typography align="left" component="p">
                                    {waypoint.name}
                                    <br />
                                    <span className="distanceData">{waypoint.distanceToWaypoint ? waypoint.distanceToWaypoint + ' miles' : ' '} </span>
                                    <br />
                                    <span className='locationData'>{newStr}, {newStr1}</span>
                                    <br />

                                </Typography>

                            </div>
                        </Grid>
                        <Grid item xs={6}>

                            <span align="center"><Hostels hostels={waypoint.hostels} /></span>
                        </Grid>
                    </Grid>
                )
            })}
        </div>
    )
}

export default Waypoints;