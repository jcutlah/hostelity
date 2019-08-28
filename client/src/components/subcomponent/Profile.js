import React from 'react';

const returnDate = (date) => {
    console.log(typeof date);
    const dateAdded = new Date(parseInt(date));
    console.log(dateAdded);
    const month = dateAdded.getMonth() + 1;
    const day = dateAdded.getDay();
    const year = dateAdded.getFullYear();
    return `${month}/${day}/${year}`;
}

const Profile = (props) => {
    // console.log(props.user);
    return (
        <div className="Profile">
            <img src={props.user.avatar} alt="userPic" className="BioPic" />
            <p className="userName"> {props.user.firstName} {props.user.lastName} </p>
            <p className="memberSince white-text"> Member since: {props.user.dateAdded? returnDate(props.user.dateAdded):""} </p>
        </div>
    )
}

export default Profile;