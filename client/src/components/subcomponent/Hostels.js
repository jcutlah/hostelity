import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid'
import "../../css/style.css";
import Box from '@material-ui/core/Box'

var useStyles = makeStyles(theme => ({
    media: {
        height: '33vh',
        width: '100%'
        // 16:9
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
        fontSize: '20',
        border: '1px solid black'
    },
    getDirections: {
        backgroundColor: 'white !important',
        color: 'black !important',
        textDecoration: 'none',
        fontFamily: 'Amatic SC, cursive',
        fontWeight: 'bold',
        fontSize: '20',
        border: '1px solid black'

    },
    hostelCard: {

    },
    cardContent: {
        padding: '0 !important'
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
                            <CardMedia
                                // className={classes.media}
                                // image={hostel.imageUrl}
                                title={hostel.title}
                            >
                                <img src={hostel.imageUrl} className={classes.media} />
                            </CardMedia>
                            <CardContent className={classes.cardContent}>

                                <div key={hostel._id} className={classes.hostelCard}>

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
                                            <Button className={classes.getDirections} align='left' size='medium'><a target='_blank' href={thisAddressSearch} className="hostelLink" align="center">Get Directions</a></Button>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} align='right'>
                                    <Typography>
                                        <Box fontFamily={'Amatic SC, cursive'} fontWeight={'fontWeightBold'} fontSize={'h3.fontSize'}>
                                            <Button className={classes.removeHostel} align='right' size="medium"><a align='right' className="hostelLink" href={'https://www.google.com/search?q=How+to+remove+this+shit+from+the+API'}>Remove From Trip</a></Button>
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