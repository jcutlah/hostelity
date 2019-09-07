import React from 'react';
import Grid from '@material-ui/core/Grid'
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
        <Grid container>
            <div className="Profile">
                <div className="ProfileContent">
                    <img src={props.user.avatar} alt="userPic" className="BioPic" />
                    <p className="userName"> {props.user.firstName} {props.user.lastName} </p>
                    <p className="memberSince white-text"> Member since: {props.user.dateAdded ? returnDate(props.user.dateAdded) : ""} </p>
                </div>
            </div>
        </Grid>
    )
}

export default Profile;