import React from 'react';

const Hostels = (props) => {
    console.log(props);
    return (
        <div className="tripList section">
            {props.hostels.map(hostel => {
                return (
                    <div key={hostel._id} className="tripSummary">
                            <h6>Place:</h6>
                            <span className="tripTitle grey-text">{hostel.title}</span>
                            <h6> Location: </h6>
                            <span className="grey-text"> 
                            <p>
                                { hostel.location[0] }
                            </p>
                            <p>
                                { hostel.location[1] }
                            </p>
                            </span>
                        </div>
                )
            })}
        </div>
    )
}

export default Hostels;