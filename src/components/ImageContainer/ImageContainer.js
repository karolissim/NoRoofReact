import React from 'react'

const ImageContainer = (props) => {
    return (
        <React.Fragment>
            <img src={"http://localhost:3030/images/" + props.itemId + "/" + props.colorId + "/" + props.photoIds[props.photoIds.length - 1] + ".jpg"}
                alt=""></img>
            {props.photoIds.map((photoId) => {
                return (
                    <img src={"http://localhost:3030/images/" + props.itemId + "/" + props.colorId + "/" + photoId + ".jpg"} alt="" key={photoId}></img>
                )
            })}
            <img src={"http://localhost:3030/images/" + props.itemId + "/" + props.colorId + "/" + props.photoIds[0] + ".jpg"} alt=""></img>
        </React.Fragment>
    )
}

export default ImageContainer