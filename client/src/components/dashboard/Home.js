import React, { Component } from 'react';
import Notifications from './Notifications';
import Trips from './Trips';

class Home extends React.Component {
    render() {
        return (
           <div className="dashboard container">
               <div className="row">
                   <div className="col s12 m6">
                        <Trips />
                       <div className="col s12 m5.offset-m1">
                            <Notifications />
                       </div>
                   </div>
               </div>
           </div>

        );
    }
}

export default Home;
