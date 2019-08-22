import React, { useState } from 'react';
import Axios from 'axios';
import Trips from './subcomponent/Trips';

const MyTrips = (props) => {
    console.log(`MyTrips component w/ user id ${props.userId}`);
    const [user, setUser] = useState(null);
    const getUserData = (userId) => {
        if (!user) {
            Axios.get(`/api/trips/${userId}`)
                .then(response => {
                    console.log(response.data);
                    setUser(response.data);

                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    if (props.userId) {
        getUserData(props.userId);
    }

    return (
        <div className="myTrip container">
            <Trips 
                trips={user ? user.trips : []}
            />
            {/* <div className="myTripContent">
                <h5> { JSON.stringify(user) } </h5>
                <br>
                </br>
            </div>
            <div className="row">
            <div className="divider"> </div>
                <div className="col s4">
                    <h6> Location: </h6>
                    <p> Location name w/ link </p>
                </div>
                <div className="col s4">
                    <h6> Date From: </h6>
                    <p> Start date </p>
                </div>
                <div className="col s4">
                    <h6> Date To: </h6>
                    <p> End date </p>
                </div>
            </div> */}
        </div>
    )
}

export default MyTrips;