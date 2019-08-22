import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    const logOut = event => {
        event.preventDefault();
        console.log('logging out');
        Axios.get('/api/users/logout')
        .then(function(res){
            console.log(res);
            // setLoggedIn(false);
            props.loginCallback({
                isLoggedIn: false,
                id: null
            })
            window.location = "/login";
        })
        .catch(function(err){
            console.log(err);
        })
    }
    return (
        <nav className="nav wrapper blue-grey darken-2">
            <div className="container">
                <Link to='/home' className="left brand-logo">
                    <img src='/assets/images/switchBakLogo.png' alt="logo" />
                </Link>
                { props.userId 
                    ?<ul className="right">
                        <li key="home"><NavLink to='/home'> Home </NavLink> </li>
                        <li key="newTrip"><NavLink to='/search'>New Trip</NavLink></li>
                        <li key="my-trips"><NavLink to='/my-trips'>My Trips</NavLink></li>
                        <li key="logOut"><NavLink to='#' onClick={logOut}>Log Out</NavLink></li> 
                    </ul>
                
                    :<ul className="right">
                        <li key="signIn"><NavLink to='/login'> Sign in </NavLink> </li>
                    </ul>
                }
            </div>
        </nav>
    )
}

export default Navbar;