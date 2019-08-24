import React from 'react';
import Hostels from './Hostels';

const Trips = (props) => {
    console.log(props);
    return (
        <div className="tripList section">
            {props.trips.map(trip => {
                console.log(trip);
                console.log(trip.hostels);
                return (
                    <div key={trip._id} className="tripSummary">
                        <div className="trip grey-text-darken-3">
                            <h4 className="tripTitle orange-text">{trip.name}</h4>
                            {/* <div className="divider"></div> */}
                            <h6> Start: </h6>
                            <span className="grey-text"> {trip.startDest} </span>
                            <h6> End: </h6>
                            <span className="grey-text">{trip.endDest}</span>
                            <Hostels 
                                hostels={trip.hostels}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Trips;