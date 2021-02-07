import React from 'react'
import './ErrorPage.css'

const ErrorPage = (props) => {
    const { message } = props
    return (
        <div className="error-page__wrapper">
            <div className="error-page">
                <img className="error-page__image" src={require('../../images/404-error.svg').default}></img>
                <h1 className="error-page__header">Page does not exist</h1>
                <p className="error-page__message">{message}</p>
            </div>
        </div>

    )
}

export default ErrorPage