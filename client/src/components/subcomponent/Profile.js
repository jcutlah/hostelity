import React from 'react';

const Profile = (props) => {
    return (
        <div className="Profile">
            <img src={props.user.avatar} alt="userPic" className="BioPic" />
            <p className="userName"> {props.user.firstName} {props.user.lastName} </p>
            <p className="memberSince white-text"> Member since: {props.user.dateAdded} </p>
        </div>

    )
}

export default Profile;