import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

const Navbar = (props) => {
    const logOut = event => {
        event.preventDefault();
        console.log('logging out');
        Axios.get('/auth/users/logout')
            .then(function (res) {
                console.log(res);
                // setLoggedIn(false);
                props.loginCallback({
                    isLoggedIn: false,
                    id: null
                })
                window.location = "/login";
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    return (
        <>
            <AppBar position="fixed">
                <div className="AppBar">
                    <div className="brandLogo">
                        <Link to='/home'>
                            <img src='/assets/images/switchBakLogo.png' alt="logo" />
                        </Link>
                    </div>

                    <div className="navLinks">
                        {props.userId
                            ? <ul>
                                <Button variant="outlined"><li key="my-trips"><Link to='/my-trips'>My Trips</Link></li></Button>
                                <Button variant="outlined"><li key="newTrip"><Link to='/map'>Plan trip</Link></li></Button>
                                <Button variant="outlined"><li key="logOut"><Link to='javascript:;' onClick={logOut}>Log out</Link></li></Button>
                            </ul>

                            : <ul className="loggedOutLinks">
                                {/* <li key="signIn"><Link to='/login'>Log In</Link> </li> */}
                            </ul>
                        }
                    </div>
                </div>

            </AppBar>
            <div className="clearNav"></div>
        </>
      
    )
}

export default Navbar;