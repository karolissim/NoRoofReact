import React, { useState } from 'react'
import './CheckoutItems.css'
import SingleCheckoutItem from '../SingleCheckoutItem/SingleCheckoutItem'

const CheckoutItems = (props) => {
    const { items, amount } = props
    const [shippingPrice, setShippingPrice] = useState(7.00)

    return (
        <div className="checkout-items-container">
            <div className="section">
                <span>YOUR ORDER</span>
                <div className="checkout-divider--gray"></div>
            </div>
            <div className="checkout-items-container__items">
                {items.map((item) => {
                    return (
                        <SingleCheckoutItem
                            key={`${item.cartItem.itemId}${item.cartItem.itemColorId}${item.cartItem.itemSizeId}`}
                            item={item.cartItem} />
                    )
                })}
            </div>
            <div className="checkout-divider"></div>
            <div className="checkout-items-container__price">
                <div className="price__labels">
                    <p className="price__labels-subtotal">Subtotal</p>
                    <p className="price__labels-shipping">Shipping</p>
                </div>
                <div className="price__amount">
                    <p className="price__labels-subtotal">{amount}€</p>
                    <p className="price__labels-shipping">{shippingPrice}€</p>
                </div>
            </div>
            <div className="checkout-divider"></div>
            <div className="checkout-items-container__total">
                <p className="total__label">Total</p>
                <p className="total__amount">{parseInt(amount) + parseInt(shippingPrice)}€</p>
            </div>
        </div>
    )
}

export default CheckoutItems