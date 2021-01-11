import React from 'react'
import { SERVER_URL } from '../../constants/Constants'

const ImageContainer = (props) => {
    const { itemId, colorId, photoIds } = props

    return (
        <React.Fragment>
            <img src={SERVER_URL + "/images/" + itemId + "/" + colorId + "/" + photoIds[photoIds.length - 1] + ".jpg"} alt=""></img>
            {photoIds.map((photoId) => {
                return (
                    <img src={SERVER_URL + "/images/" + itemId + "/" + colorId + "/" + photoId + ".jpg"} alt="" key={photoId}></img>
                )
            })}
            <img src={SERVER_URL + "/images/" + itemId + "/" + colorId + "/" + photoIds[0] + ".jpg"} alt=""></img>
        </React.Fragment>
    )

}

export default ImageContainer