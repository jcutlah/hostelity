import React from 'react';

const Profile = (props) => {
    return (
        <div className="Profile">
            <div className="row">
                <div className="col s12">
                    <img src={props.user.avatar} alt="userPic" className="BioPic" />
                </div>
                <div className="col s12 Bio">
                    <p className="userName"> {props.user.firstName} {props.user.lastName} </p>
                    <p className="memberSince white-text"> Member since: </p>
                    <p className="memberSince">
                        {props.user.dateAdded}
                    </p>
                </div>



            </div>
        </div>
    )
}

export default Profile;