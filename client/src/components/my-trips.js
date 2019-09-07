import React, { useState } from 'react';
import Axios from 'axios';
import Trips from './subcomponent/Trips';
import Grid from '@material-ui/core/Grid';
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
        <Grid container>
            <Grid item xs={12} className="myTrip container">
                <Trips
                    trips={user ? user.trips : []}
                />
            </Grid>

            <Grid item xs={12} className="myTrip container">
                <Trips
                    trips={user ? user.trips : []}
                />
            </Grid>
        </Grid>
    )
}

export default MyTrips;