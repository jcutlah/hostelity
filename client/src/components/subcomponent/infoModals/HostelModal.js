import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Fab, Grid, Paper } from '@material-ui/core'
import Info from '@material-ui/icons/Info'
import Home from '@material-ui/icons/Home'
import Help from '@material-ui/icons/Help'
// import Grid from '@material-ui/core/Grid'
const useStyles = makeStyles(theme => ({
    modal: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '50vh !important',
        margin: '0 auto'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        maxHeight: 'calc(100vh - 210px)',
        overflowY: 'auto',
        marginTop: '5%',
        marginBottom: '5%',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll'
    },
    text: {
        fontSize: '1.25em !important'
    },
    instructions: {
        width: '90%',
        textAlign: "left",
        lineHeight: '5vh'
    }
}));

export default function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <Fab size='small' type="button" onClick={handleOpen}>
                <Help />
            </Fab>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={3} className={classes.text}>
                            <div className="modal-inner-wrapper">
                                <Grid item xs={12} align='center'>
                                    <h2 id="transition-modal-title">How to view and add hostels:</h2>
                                </Grid>
                                <Grid item xs={12} md={6} align="center">
                                    <h2>Instructions:</h2>
                                    <ol>
                                        <li className={classes.instructions}>Use the map to zoom in around each waypoint to see the available lodging options near that location </li>
                                        <li className={classes.instructions}>Click on any lodging marker to view information about it</li>
                                        <li className={classes.instructions}>Click add to trip on a selected lodging marker to add it to your trip</li>
                                        <li className={classes.instructions}>When you are done adding lodging locations click save your trip!! </li>
                                    </ol>
                                </Grid>
                                <Grid item xs={12} md={6} align="center">
                                    <img src='/assets/images/tripWaypointZoom.gif' width='100%' height='90%'></img>
                                </Grid>
                                <div onClick={handleClose} className='modal-close'>X</div>
                            </div>
                        </Grid>
                    </Paper>
                </Fade>
            </Modal>
        </div>
    );
}