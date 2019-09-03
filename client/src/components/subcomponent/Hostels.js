import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

var useStyles = makeStyles(theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));
const Hostels = (props) => {
    // console.log(props);
    const classes = useStyles()
    return (
        <div className="tripList section">
            {props.hostels.map((hostel, i) => {
                var thisAddressSearch = 'http://www.google.com/maps?q=' + hostel.address
                console.log(hostel)
                return (
                    <div key={`hostel-${i}`}>

                        <hr></hr>
                        <Card>
                            <CardMedia
                                className={classes.media}
                                image={hostel.imageUrl}
                                title="Paella dish"
                            />
                            <div key={hostel._id} className="tripSummary">

                                <Typography align="center" variant="h6" gutterBottom>
                                    <Typography align="center" component="p">
                                        {hostel.title}
                                        <br />
                                        <Button><a target='_blank' href={thisAddressSearch} className="hostelLink" align="right">{hostel.address}</a></Button>

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