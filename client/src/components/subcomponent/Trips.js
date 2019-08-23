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
                            <div className="divider"></div>
                            <h5> Start: </h5>
                            <span className="grey-text"> {trip.startDest} </span>
                            <h5> End: </h5>
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