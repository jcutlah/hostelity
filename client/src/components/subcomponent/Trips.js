import React from 'react';

const Trips = (props) => {
    console.log(props);
    return (
        <div className="trip-list section">
            {props.trips.map(trip => {
                return (
                    <div key={trip._id} className="trip-summary">
                        <div className="trip grey-text-darken-3">
                            <p className="tripTitle orange-text">{trip.name}</p>
                            <div className="divider"></div>
                            <p> Start: </p>
                            <span className="grey-text"> {trip.startDest} </span>
                            <p> End: </p>
                            <span className="grey-text">{trip.endDest}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Trips;