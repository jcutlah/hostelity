import React from 'react';
import Typography from '@material-ui/core/Typography';

const Hostels = (props) => {
    console.log(props);
    return (
        <div className="tripList section">
            {props.hostels.map(hostel => {
                return (
                    <div key={hostel._id} className="tripSummary">

                        <Typography align="center" variant="h6" gutterBottom>
                            Place name:
                         </Typography>
                    
                        <Typography align="center" component="p">
                            {hostel.title}
                        </Typography>
                        <hr></hr>
                    </div>
                )
            })}
        </div>
    )
}

export default Hostels;