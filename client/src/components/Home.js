import React, { useState } from 'react';
import Trips from './subcomponent/Trips';
import Axios from 'axios';
import Profile from './subcomponent/Profile';

const Home = (props) => {
    // const [users, setUser] = useState([]);
    const [trips, setTrips] = useState([]);
    console.log(`Home component w/ user id ${props.userId}`);
    const getTrips = (userId) => {
        if (!trips.length) {
            Axios.get(`/api/trips/${userId}`)
                .then(response => {
                    console.log(response.data);
                    setTrips(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    // const getUser = (userId) => {
    //     Axios.get(`/api/users/${userId}`)
    //         .then(response => {
    //             console.log(response.data);
    //             setUser(response.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }
    // getUser(props.users);
    getTrips(props.userId);
    return (
        <div className="dashboard container">
            <div className="row">
                <div className="col s12 m12">
                    <Profile />
                    <Trips
                        trips={trips}
                    />
                    <div className="col s12 m5.offset-m1">
                    </div>
                </div>
            </div>
        </div>
    )

    }

    export default Home;

