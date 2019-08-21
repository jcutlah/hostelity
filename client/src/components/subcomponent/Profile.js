import React from 'react';

const Profile = (props) => {
    return (
        <div className="Profile">
            <div className="profileHeader">
                <br></br>
                <img src="https://placebeard.it/200x180" alt="userPic" className="BioPic" />
                <br></br><br></br>
                <span className="card-title teal-text">User Name </span>
                <span className="card-title"> | </span>
                <span className="card-text"> Member since  </span>
                <hr></hr>
                <div className="card">
                    
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