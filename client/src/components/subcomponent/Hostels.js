import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
const Hostels = (props) => {
    // console.log(props);
    return (
        <div className="tripList section">
            {props.hostels.map((hostel, i) => {
                console.log(hostel)
                return (
                    <div key={`hostel-${i}`}>

                        <hr></hr>
                        <Card>
                            <div key={hostel._id} className="tripSummary">

                                <Typography align="center" variant="h6" gutterBottom>
                                    <Typography align="center" component="p">
                                        {hostel.title}
                                        <br />
                                        <span align="right">{hostel.address}</span>
                                    </Typography>
                                </Typography>



                            </div>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default Hostels;