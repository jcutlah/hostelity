import React from 'react'
const infoWindow = (props) => {
    return (<div>
        <div>{props.title}</div>
        {props.img ? <img src={props.img}></img> : <div>No image provided </div>}
        <div>{props.rating}</div>
        <button onClick={() => console.log(props.place_id)} value={props.place_id}>Add to your trip!</button>
    </div>)
}

export default infoWindow