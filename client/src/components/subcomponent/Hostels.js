import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid'
var useStyles = makeStyles(theme => ({
    media: {
        height: 0,
        paddingTop: '30%', // 16:9
    },
    cardContainer: {

        overflowY: 'hidden',
        maxHeight: '45%'
    },
    removeHostel: {
        backgroundColor: 'red !important',
        color: 'white !important',
        textDecoration: 'none'
    }

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
                // console.log(hostel)
                return (
                    <div key={`hostel-${i}`}>


                        <Card className={classes.cardContainer}>
                            <CardContent>
                                <CardMedia
                                    className={classes.media}
                                    image={hostel.imageUrl}
                                    title={hostel.title}
                                />

                                <div key={hostel._id} className="tripSummary">

                                    <Typography align="center" variant="h6" gutterBottom>
                                        <Typography align="center" component="span">
                                            <Button><a target='_blank' className="hostelLink" href={thisHostelSearch}>{hostel.title}</a></Button>
                                            <br />
                                            <Typography>{hostel.address}</Typography>
                                            <br />

                                        </Typography>
                                    </Typography>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Grid item xs={6} align='left'>
                                    <Button><a target='_blank' href={thisAddressSearch} className="hostelLink" align="center">Get Directions</a></Button>
                                </Grid>
                                <Grid item xs={6} align='right'>
                                    <Button className={classes.removeHostel} align='right' size="small"><a align='right' className="hostelLink" href={'https://www.google.com/search?q=How+to+remove+this+shit+from+the+API'}>Remove From Trip</a></Button>
                                </Grid>
                            </CardActions>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default Hostels;