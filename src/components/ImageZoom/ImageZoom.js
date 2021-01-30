import React from 'react'
import './ImageZoom.css'

const ImageZoom = (props) => {
    const style = props.isDisplayed ?
        {
            display: 'block',
            backgroundRepeat: 'no-repeat no-repeat',
            backgroundImage: props.backgroundImage,
            backgroundPosition: props.backgroundPosition
        } : {
            display: 'none',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat no-repeat',
        }
        
    return (
        <div
            className="image-zoom-container"
            style={style}>
        </div>
    )
}

export default ImageZoom