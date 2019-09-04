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
var thisUrl;

const Hostels = (props) => {
    // console.log(props);

    return (
        <div className="tripList section">
            {props.hostels.map((hostel, i) => {
                var thisAddressSearch = 'http://www.google.com/maps?q=' + hostel.address
                var thisHostelSearch = 'https://www.google.com/search?q=' + hostel.title.replace(' ', '+')
                const classes = useStyles()
                console.log(hostel)
                return (
                    <div key={`hostel-${i}`}>

                        <hr></hr>
                        <Card>
                            <CardMedia
                                className={classes.media}
                                image={hostel.imageUrl}
                                title={hostel.title}
                            />
                            <div key={hostel._id} className="tripSummary">

                                <Typography align="center" variant="h6" gutterBottom>
                                    <Typography align="center" component="span">
                                        <Button><a target='_blank' href={thisAddressSearch}>{hostel.title}</a></Button>
                                        <br />
                                        <Typography>{hostel.address}</Typography>
                                        <br />
                                        <Button><a target='_blank' href={thisAddressSearch} className="hostelLink" align="right">Get Directions</a></Button>

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