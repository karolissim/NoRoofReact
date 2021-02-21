import React, { useState } from 'react'
import './Checkout.css'
import CheckoutForm from '../CheckoutForm/CheckoutForm'
import CheckoutItems from '../CheckoutItems/CheckoutItems'
import { usePrompt } from '../../utils/usePrompt'

const Checkout = () => {
    const { cartItems, totalPrice } = JSON.parse(window.localStorage.getItem('checkoutItems'))
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [shippingPrice, setShippingPrice] = useState(0.00)

    const arrowClass = isDropdownOpen ? "arrow up" : "arrow down"

    usePrompt(true)

    return (
        <div className="checkout">
            <header className="checkout__header">
                <h1>[LOGO]</h1>
            </header>
            <div className="item-dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className="item-dropdown__info">
                    <div className="item-dropdwon__info-order">
                        <img src={require('../../images/shopping-cart.svg').default} className="cart-logo" alt=""></img>
                        <p>Show order items</p>
                        <i className={arrowClass}></i>
                    </div>
                    <div className="item-dropdown__info-price">
                        <p>€{parseInt(totalPrice) + parseInt(shippingPrice)}</p>
                    </div>        
                </div>
            </div>
            <div className="checkout__container">
                <CheckoutForm
                    amount={totalPrice}/>
                <CheckoutItems
                    amount={totalPrice}
                    items={cartItems} 
                    isDropdownOpen={isDropdownOpen}
                    shippingPrice={shippingPrice}
                    setShippingPrice={setShippingPrice}/>
            </div>
        </div>
    )
}

export default Checkout