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
        <div className="profileHeader">
            <Profile
                user={user ? user : {}}
            />
            <div className="row">
                <div className="tripz container">
                    <div className="col s12">
                        <Trips
                            trips={user ? user.trips : []}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home;

