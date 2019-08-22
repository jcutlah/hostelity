import React from 'react';

const Profile = (props) => {
    return (
        <div className="Profile">
            <div className="container">
                <div className="row">
                    <div className="col 1">
                        <p className="userName white-text"> {props.user.firstName} {props.user.lastName} </p>
                    </div>
                    <div className="col 6">
                        <img src={props.user.avatar} alt="userPic" className="BioPic" />
                    </div>
                    <div className="col 1">
                        <p className="memberSince white-text"> Member since: </p>
                        <p className="memberTenure white-text"> 
                            {props.user.dateAdded} 
                         </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// const Profile = (props) => {
//     console.log(props);
//     return (
//         <div className="users section">
//             {props.users.map(users => {
//                 return (
//                     <div key={users._id} className="users">
//                         <div className="card grey-text-darken-3">
//                             <p className="card-title">{users.firstName}</p>
//                             <p className="card-title">{users.lastName}</p>   
//                             <p> Hello </p>
//                         </div>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

export default Profile;