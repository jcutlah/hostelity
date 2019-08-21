import React from 'react';

const Trips = (props) => {
    return (

        <div className="trip-list section">
            {props.trips.map(trip => {
                return (
                    <div key={trip._id} className="trip-summary">
                        <div className="card grey-text-darken-3">
                            <p className="card-title">{trip.name}</p>
                            <span className="grey-text"> {trip.startDest} </span>
                            <span className="grey-text">{trip.endDest}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Trips;