import React from 'react';

const Trips = (props) => {
    return (

        <div className="trip-list section">
            {props.trips.map(trip => {
                return (
                    <div key={trip._id} className="trip-summary">
                        <div className="trip grey-text-darken-3">
                            <p className="tripTitle">{trip.name}</p>
                            <div class="divider"></div>
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