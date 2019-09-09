import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Fab, Grid, Paper } from '@material-ui/core'
import Info from '@material-ui/icons/Info'
import Home from '@material-ui/icons/Home'
import Help from '@material-ui/icons/Help'
// import Grid from '@material-ui/core/Grid'
const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid black',
        boxShadow: theme.shadows[5],
        padding: '0',
    },
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
                    <Paper>
                        <Grid container spacing={3}>
                            <Grid item xs={12} align='center'>
                                <h2 id="transition-modal-title">How to view and add hostels:</h2>
                            </Grid>
                            <Grid item xs={6} align="center">
                                <ol>
                                    <li>Use the map to zoom in around each waypoint to see the available lodging options near that location </li>
                                    <li>Click on any lodging marker to view information about it</li>
                                    <li>Click add to trip on a selected lodging marker to add it to your trip</li>
                                    <li>When you are done adding lodging locations click save your trip!! </li>
                                </ol>
                            </Grid>
                            <Grid item xs={6} align="center">
                                <img src='/assets/images/tripWaypointZoom.gif' width='90%'></img>
                            </Grid>
                        </Grid>
                    </Paper>
                </Fade>
            </Modal>
        </div>
    );
}