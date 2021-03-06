import React, { useState, useEffect, useRef } from 'react'
import './ImageSlider.css'
import ImageContainer from '../ImageContainer/ImageContainer'
import ImageZoom from '../ImageZoom/ImageZoom'
import { PREV, NEXT, SERVER_URL, COLORS } from '../../Constants/Constants'

const ImageSlider = (props) => {
    const { photoIds, itemId, colorId } = props
    const [position, setPosition] = useState(1)
    const [imageWidth, setImageWidth] = useState(0)
    const [navDotState, setNavDotState] = useState([])
    const [zoomXPosition, setZoomXPosition] = useState(0)
    const [zoomYPosition, setZoomYPosition] = useState(0)
    const [zoomContainerState, setZoomContainerState] = useState(false)
    const imageSliderRef = useRef()

    const translateValue = 'translateX(' + (-imageWidth * position) + 'px)'
    const zoom = ' ' + zoomXPosition + '%' + zoomYPosition + '%'
    const photoUrl = 'url(' + SERVER_URL + '/images/' + itemId + '/' + colorId + '/' + position + '.jpg)'

    useEffect(() => {
        setImageWidth(imageSliderRef.current.clientWidth)

        function handleScreenResize() {
            setImageWidth(imageSliderRef.current.clientWidth)
        }

        window.addEventListener('resize', handleScreenResize)

        return (() => {
            window.removeEventListener('resize', handleScreenResize)
        })
    }, [])

    useEffect(() => {
        var dotState = []

        dotState.push(true)
        for (var i = 0; i < photoIds.length - 1; i++) {
            dotState.push(false)
        }

        setNavDotState(dotState)
        setPosition(1)
    }, [itemId, colorId, photoIds.length])

    function animateSliderTransition() {
        imageSliderRef.current.style.transition = "transform 0.4s ease-in-out"
    }

    function handleOnTransitionEnd() {
        if (position === photoIds.length + 1) {
            imageSliderRef.current.style.transition = "none"
            setPosition(photoIds.length - photoIds.length + 1)
        }

        if (position === 0) {
            imageSliderRef.current.style.transition = "none"
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
            } else if (position === photoIds.length + 1) {
                navDotState[0] = true
                navDotState[navDotState.length - 2] = false
            } else {
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
        var containerWidth = imageSliderRef.current.clientWidth
        var containerHeight = imageSliderRef.current.clientHeight

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
                        ref={imageSliderRef}
                        onTransitionEnd={() => handleOnTransitionEnd()}
                        onMouseMove={(event) => zoomImage(event)}
                        onMouseOver={() => changeZoomContainerState()}
                        onMouseOut={() => changeZoomContainerState()}>
                        <ImageContainer
                            itemId={itemId}
                            colorId={colorId}
                            photoIds={photoIds}
                        />
                    </div>
                </div>
                <div>
                    <div
                        className="prev"
                        onClick={() => {
                            decrementPosition()
                            animateSliderTransition()
                            changeNavDotState(PREV)
                        }}>&#10094;</div>
                    <div
                        className="next"
                        onClick={() => {
                            incrementPosition()
                            animateSliderTransition()
                            changeNavDotState(NEXT)
                        }}>&#10095;</div>
                </div>
                <div className="slider-nav">
                    {photoIds.map((_photoId, key) => {
                        return (
                            <div
                                className="slider-nav__dot"
                                style={navDotState[key] ? { border: "1px solid rgb(" + COLORS[key] + ")", borderWidth: '1px', backgroundColor: "rgb(" + COLORS[key] + ")" } : { border: '1px solid', borderColor: "rgb(" + COLORS[key] + ")" }}
                                key={key}
                                onClick={() => {
                                    setPosition(key + 1)
                                    animateSliderTransition()
                                    changeNavDotState(key)
                                }}></div>
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
