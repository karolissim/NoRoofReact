import React from 'react'
import './ErrorPage.css'

const ErrorPage = () => {
    return (
        <div className="error-page__wrapper">
            <div className="error-page">
                <img className="error-page__image" src={require('../../images/404-error.svg').default}></img>
                <h1 className="error-page__header">Page does not exist</h1>
                <p className="error-page__message">We are sorry but this page does not seem to exist. Want to go back and try something else?</p>
            </div>
        </div>

    )
}

export default ErrorPage