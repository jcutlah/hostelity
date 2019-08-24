import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <div className="header">
            <Link to='/home' className="brand-logo">
                <img src='/assets/images/switchBakLogo.png' alt="logo" />
            </Link>
        </div>
    )
}

export default Header;