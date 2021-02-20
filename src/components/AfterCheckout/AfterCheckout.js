import React from 'react'
import './AfterCheckout.css'
import { SERVER_URL } from '../../Constants/Constants'

const AfterCheckout = () => {
    return(
        <div className="root">
        <div className="main">
          <div className="payment-summary completed-view">
            <h1>Payment was successful</h1>
            <h3>Thank you for your purchase</h3>
            <button onClick={() => console.log('On click')}>Go back to shop</button>
          </div>
        </div>
        <div className="content">
          <div className="image-stack">
            <img src={`${SERVER_URL}/images/checkout/1.jpg`} width="140" height="160"/>
            <img src={`${SERVER_URL}/images/checkout/2.jpg`} width="140" height="160"/>
            <img src={`${SERVER_URL}/images/checkout/3.jpg`} width="140" height="160"/>
          </div>
        </div>
      </div>
    )
}

export default AfterCheckout