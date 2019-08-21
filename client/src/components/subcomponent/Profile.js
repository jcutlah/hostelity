import React from 'react';
import background from "../../css/bench.jpg";

const Profile = (props) => {
    return (
        <div className="Profile">
            <div class="container">
                <div className="row">
                    <div class="col 1">
                        <p className="userName white-text"> Insert user's Name </p>
                    </div>
                    <div class="col 6">
                        <img src="https://placebeard.it/300x180" alt="userPic" className="BioPic" />
                    </div>
                    <div class="col 1">
                        <p className="memberSince white-text"> Member since: </p>
                        <p className="memberTenure white-text"> Insert date </p>
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