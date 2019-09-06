import React from 'react';

const returnDate = (date) => {
    console.log(typeof date);
    const dateAdded = new Date(parseInt(date));
    console.log(dateAdded);
    const month = dateAdded.getMonth() + 1;
    const day = dateAdded.getDate();
    const year = dateAdded.getFullYear();
    return `${month}/${day}/${year}`;
}

const Profile = (props) => {
    // console.log(props.user);
    return (
        <div className="profile">
            <div className="profileContainer">
                <img src={props.user.avatar} alt="userPic" className="BioPic" />
                <div className="userName"> {props.user.firstName} {props.user.lastName} </div>
                <div className="memberSince white-text"> Member since: {props.user.dateAdded ? returnDate(props.user.dateAdded) : ""} </div>
            </div>
        </div>
    )
}

export default Profile;