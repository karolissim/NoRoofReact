import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './ImageSlider.css'
import ImageContainer from '../ImageContainer/ImageContainer'
import ImageZoom from '../ImageZoom/ImageZoom'
import { PREV, NEXT, SERVER_URL } from '../../Constants/Constants'

const ImageSlider = (props) => {
    const [position, setPosition] = useState(1)
    const [imageWidth, setImageWidth] = useState(0)
    const [navDotState, setNavDotState] = useState([])
    const [zoomXPosition, setZoomXPosition] = useState(0)
    const [zoomYPosition, setZoomYPosition] = useState(0)
    const [zoomContainerState, setZoomContainerState] = useState(false)
    const photoIds = props.photoIds
    var imageSliderElementRef, imageSliderElement

    const translateValue = 'translateX(' + (-imageWidth * position) + 'px)'
    const zoom = ' ' + zoomXPosition + '%' + zoomYPosition + '%'
    const photoUrl = 'url(' + SERVER_URL + '/images/' + props.itemId + '/' + props.colorId + '/' + position + '.jpg)'

    useEffect(() => {
        imageSliderElement = ReactDOM.findDOMNode(imageSliderElementRef)
        setImageWidth(imageSliderElement.clientWidth)

        function handleScreenResize() {
            setImageWidth(imageSliderElement.clientWidth)
        }

        window.addEventListener('resize', handleScreenResize)

        var dotState = []
        dotState.push(true)
        for (var i = 0; i < photoIds.length - 1; i++) {
            dotState.push(false)
        }
        setNavDotState(dotState)
        setPosition(1)
    }, [props.itemId, props.colorId, props.photoIds])

    function animateSliderTransition() {
        ReactDOM.findDOMNode(imageSliderElementRef).style.transition = "transform 0.4s ease-in-out"
    }

    function handleOnTransitionEnd() {
        if (position === photoIds.length + 1) {
            ReactDOM.findDOMNode(imageSliderElementRef).style.transition = "none"
            setPosition(photoIds.length - photoIds.length + 1)
        }

        if (position === 0) {
            ReactDOM.findDOMNode(imageSliderElementRef).style.transition = "none"
            setPosition(photoIds.length)
        }
    }

    function incrementPosition() {
        if (position > photoIds.length) return
        setPosition(position + 1)
    }

    function decrementPosition() {
        if (position <= 0) return
        setPosition(position - 1)
    }

    function changeNavDotState(value) {
        if (value === NEXT) {
            if (position === photoIds.length) {
                navDotState[0] = true
                navDotState[navDotState.length - 1] = false
            } else if(position === photoIds.length + 1){
                navDotState[0] = true
                navDotState[navDotState.length - 2] = false
            }else {
                navDotState[position] = true
                navDotState[position - 1] = false
            }
        } else if (value === PREV) {
            if (position === 1) {
                navDotState[0] = false
                navDotState[navDotState.length - 1] = true
            } else {
                navDotState[position - 2] = true
                navDotState[position - 1] = false
            }
        } else {
            for (var i = 0; i < navDotState.length; i++) {
                navDotState[i] = false
            }
            navDotState[value] = true
        }
        setNavDotState(navDotState)
    }

    function zoomImage(event) {
        var containerWidth = ReactDOM.findDOMNode(imageSliderElementRef).clientWidth
        var containerHeight = ReactDOM.findDOMNode(imageSliderElementRef).clientHeight

        var currentWidth = event.nativeEvent.layerX
        var currentHeight = event.nativeEvent.layerY

        setZoomXPosition(currentWidth / containerWidth * 100)
        setZoomYPosition(currentHeight / containerHeight * 100)
    }

    function changeZoomContainerState() {
        setZoomContainerState(!zoomContainerState)
    }

    return (
        <React.Fragment>
            <div className="image-slider">
                <div className="carousel-container">
                    <div
                        className="carousel-slide"
                        style={{ transform: translateValue }}
                        ref={(slider) => imageSliderElementRef = slider}
                        onTransitionEnd={() => handleOnTransitionEnd()}
                        onMouseMove={(event) => zoomImage(event)}
                        onMouseOver={() => changeZoomContainerState()}
                        onMouseOut={() => changeZoomContainerState()}>
                        <ImageContainer
                            itemId={props.itemId}
                            colorId={props.colorId}
                            photoIds={props.photoIds}
                            imageSliderElement={imageSliderElementRef} />
                    </div>
                </div>
                <div>
                    <a
                        className="prev"
                        onClick={() => {
                            decrementPosition()
                            animateSliderTransition()
                            changeNavDotState(PREV)
                        }}>&#10094;</a>
                    <a
                        className="next"
                        onClick={() => {
                            incrementPosition()
                            animateSliderTransition()
                            changeNavDotState(NEXT)
                        }}>&#10095;</a>
                </div>
                <div className="slider-nav">
                    {photoIds.map((_photoId, key) => {
                        return (
                            <a
                                className={navDotState[key] ? "slider-nav__dot slider-nav__dot-filled" : "slider-nav__dot"}
                                key={key}
                                onClick={() => {
                                    setPosition(key + 1)
                                    animateSliderTransition()
                                    changeNavDotState(key)
                                }}></a>
                        )
                    })}
                </div>
            </div>
            <ImageZoom
                backgroundImage={photoUrl}
                backgroundPosition={zoom}
                isDisplayed={zoomContainerState} />
        </React.Fragment>
    )
}

export default ImageSlider
