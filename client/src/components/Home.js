import React, { useState } from 'react';
import Trips from './subcomponent/Trips';
import Axios from 'axios';
import Profile from './subcomponent/Profile';

const Home = (props) => {
    const [user, setUser] = useState(null);
    console.log(`Home component w/ user id ${props.userId}`);
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
    if(props.userId){
        console.log('user id present, getting trips for this user...');
        getUserData(props.userId);
    };
    console.log(user);
    return (
        <div className="dashboard container">
            <div className="row">
                <div className="col s12 m12">
                    <Profile 
                        user={user ? user : {}} 
                    />
                    <Trips
                        trips={user ? user.trips : []}
                    />
                    <div className="col s12 m5.offset-m1">
                    </div>
                </div>
            </div>
        </div>
    )

    }

    export default Home;

