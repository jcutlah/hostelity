import React, { useState } from 'react';
import Trips from './subcomponent/Trips';
import Axios from 'axios';
import Profile from './subcomponent/Profile';
import Grid from '@material-ui/core/Grid';

const Home = (props) => {
    const [user, setUser] = useState(null);
    const [tripUpdated, setTripUpdated] = useState(0)
    // console.log(`Home component w/ user id ${props.userId}`);
    const delTripInc = (num) => {
        setTripUpdated(tripUpdated + 1);
        let newTrips = user.trips.filter(trip => trip._id !== num)
        setUser({
            ...user,
            trips: newTrips
        })
    }
    const getUserData = () => {
        if (!user) {
            Axios.get(`/api/trips`)
                .then(userInfo => {
                    // // console.log(userInfo.data);
                    setUser(userInfo.data);
                })
                .catch(err => {
                    // console.log(err);
                })
        }
    }
    if (props.userId) {
        // console.log('user id present, getting trips for this user...');
        getUserData(props.userId);
    };
    // // console.log(user);
    return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={5}>
            <Grid item xs={12} align='center'>
                <Profile
                    user={user ? user : {}}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <div className="tripz container">

                    <Trips
                        trips={user ? user.trips : []}
                        hasInfo={user ? true : false }
                        delTripCallback={delTripInc}
                    />

                </div>
            </Grid>

        </Grid>
    )
}

export default Home;

