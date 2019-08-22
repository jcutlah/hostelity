import React from 'react';

const myTrips = (props) => {
    return (
        <div class="myTrip container">
            <div class="myTripContent">
                <h5> Name of place </h5>
                <br></br>
            </div>
            <div class="row">
            <div class="divider"> </div>
                <div class="col s4">
                    <h6> Location: </h6>
                    <p> Location name w/ link </p>
                </div>
                <div class="col s4">
                    <h6> Date From: </h6>
                    <p> Start date </p>
                </div>
                <div class="col s4">
                    <h6> Date To: </h6>
                    <p> End date </p>
                </div>
            </div>
        </div>
    )
}

export default myTrips;