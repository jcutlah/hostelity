import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import CardActions from '@material-ui/core/CardActions';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid'
import "../../css/style.css";
import Box from '@material-ui/core/Box'

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
        textDecoration: 'none',
        fontFamily: 'Amatic SC, cursive',
        fontWeight: 'bold',
        fontSize: '15'
    }

}));
var thisUrl;


const Hostels = (props) => {
    // console.log(props);
    const [lastDeleted, setLastDeleted] = React.useState("");

    const deleteHostel = (event) => {
        event.preventDefault();
        console.log(event);
        let hostel = event.target;
        let hostelId = event.target.getAttribute('data-id');
        Axios.delete(`/api/waypoints/hostel/${hostelId}`)
            .then(response => {
                console.log(response);
                console.log(hostel.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove());
                if (response.status === 200 ){
                    // hostel.parentNode
                    hostel.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="tripList section">
            {props.hostels.map((hostel, i) => {
                var thisAddressSearch = 'http://www.google.com/maps?q=' + hostel.address
                var thisHostelSearch = 'https://www.google.com/search?q=' + hostel.title.replace(' ', '+')
                const classes = useStyles()
                // console.log(hostel)
                return (
                    <div key={`hostel-${i}`} className="hostel-wrapper">


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
                                    <Typography>
                                        <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'} fontSize={'h6.fontSize'}>
                                            <Button><a target='_blank' href={thisAddressSearch} className="hostelLink" align="center">Get Directions</a></Button>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} align='right'>
                                    <Typography>
                                        <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'} fontSize={'h6.fontSize'}>

                                            <Button className={classes.removeHostel} align='right' size="small"><a align='right' className="hostelLink" href={'#'} data-id={hostel._id} onClick={deleteHostel}>Remove From Trip</a></Button>
                                        </Box>
                                    </Typography>
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