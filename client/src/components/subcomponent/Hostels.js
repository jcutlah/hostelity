import React from 'react';

const Hostels = (props) => {
    console.log(props);
    return (
        <div className="tripList section">
            {props.hostels.map(hostel => {
                return (
                    <div key={hostel._id} className="tripSummary">
                        <div className="trip grey-text-darken-3">
                            <h4 className="tripTitle orange-text">{hostel.title}</h4>
                            <h5> Location: </h5>
                            <span className="grey-text"> 
                            <p>
                                { hostel.location[0] }
                            </p>
                            <p>
                                { hostel.location[1] }
                            </p>
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Hostels;