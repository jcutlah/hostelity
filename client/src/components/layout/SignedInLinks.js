import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/home'> Home </NavLink> </li>
            <li><NavLink to='/searchModal'>New Trip</NavLink></li>
            <li><NavLink to='/'>Sign Out</NavLink></li> 
            <li><NavLink to='/' className='btn btn-floating red lighten-1'></NavLink></li>
        </ul>
    )
}

export default SignedInLinks;