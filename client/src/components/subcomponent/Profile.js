import React from 'react';

const Profile = () => {
    return (
        <div className="Profile">
            <div className="z-depth-0">
                <div className="content grey-text-darken-3">
                    <img src="https://placebeard.it/220x220" alt="userPic" className="BioPic circle"/>
                    <br></br><br></br>
                    <span className="card-title teal-text">User Name </span>
                    <span className="card-title"> | </span>
                    <span className="card-text"> Member since  </span>
                    <span> <hr></hr> </span>
                </div>
            </div>
        </div>
    )
}

export default Profile;