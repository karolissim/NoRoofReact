import React from 'react'
import './AfterCheckout.css'
import { SERVER_URL } from '../../Constants/Constants'
import { useHistory } from 'react-router-dom'

const AfterCheckout = () => {
    const history = useHistory()
    return (
        <div className="container">
            <div className="main">
                <div className="payment-summary completed-view">
                    <h1 className="title">Payment was successful</h1>
                    <h3 className="message">Thank you for your purchase</h3>
                    <button className="button" onClick={() => history.replace('/')}>Go back to shop</button>
                </div>
            </div>
            <div className="content">
                <div className="image-stack">
                    <img src={`${SERVER_URL}/images/checkout/1.jpg`} width="140" height="160" alt="" />
                    <img src={`${SERVER_URL}/images/checkout/2.jpg`} width="140" height="160" alt="" />
                    <img src={`${SERVER_URL}/images/checkout/3.jpg`} width="140" height="160" alt="" />
                </div>
            </div>
        </div>
    )
}

export default AfterCheckout