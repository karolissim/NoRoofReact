import React from 'react'
import { SERVER_URL } from '../../constants/Constants'

const ImageContainer = (props) => {
    return (
        <React.Fragment>
            <img src={ SERVER_URL + "/images/" + props.itemId + "/" + props.colorId + "/" + props.photoIds[props.photoIds.length - 1] + ".jpg"}
                alt=""></img>
            {props.photoIds.map((photoId) => {
                return (
                    <img src={ SERVER_URL + "/images/" + props.itemId + "/" + props.colorId + "/" + photoId + ".jpg"} alt="" key={photoId}></img>
                )
            })}
            <img src={ SERVER_URL + "/images/" + props.itemId + "/" + props.colorId + "/" + props.photoIds[0] + ".jpg"} alt=""></img>
        </React.Fragment>
    )
}

export default ImageContainer