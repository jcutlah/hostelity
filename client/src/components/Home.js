import React, { useState } from 'react';
import Trips from './subcomponent/Trips';
import Axios from 'axios';
import Profile from './subcomponent/Profile';
import Grid from '@material-ui/core/Grid';
import CssBaseLine from '@material-ui/core/CssBaseLine';



const Home = (props) => {
    const [user, setUser] = useState(null);
    console.log(`Home component w/ user id ${props.userId}`);
    const getUserData = (userId) => {
        if (!user) {
            Axios.get(`/api/trips/${userId}`)
                .then(userInfo => {
                    console.log(userInfo.data);
                    setUser(userInfo.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    if (props.userId) {
        console.log('user id present, getting trips for this user...');
        getUserData(props.userId);
    };
    console.log(user);
    return (
        <React.Fragment>
            <CssBaseLine />
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={8}>
                    <Profile
                        user={user ? user : {}}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div className="tripz container">
                        <div className="col s12">
                            <Trips
                                trips={user ? user.trips : []}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Home;

