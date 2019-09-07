import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const Header = (props) => {
    return (
        <Grid container>
            <div className="header">
                <Link to='/my-trips' className="brand-logo">
                    <img src='/assets/images/switchBakLogo.png' alt="logo" />
                </Link>
            </div>
        </Grid>
    )
}

export default Header;