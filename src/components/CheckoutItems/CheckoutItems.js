import React from 'react'
import './CheckoutItems.css'

const CheckoutItems = (props) => {
    console.log(props.items)
    return (
        <div className="checkout-items-container">
            <div className="checkout-items-container__items">
                <div className="single-item">
                    <img className="single-item__image" src={require('../../images/logo_reduce.jpg').default}></img>
                    <div className="single-item__information">
                        <h3>BLOCK HOUSE HOODIE</h3>
                        <p>Purple / M</p>
                    </div>
                    <div className="single-item__price">
                        <p>50.00€</p>
                    </div>
                    <div className="single-item__count">
                        <span>2</span>
                    </div>
                </div>
                <div className="single-item">
                    <img className="single-item__image" src={require('../../images/logo_reduce.jpg').default}></img>
                    <div className="single-item__information">
                        <h3>BLOCK HOUSE HOODIE</h3>
                        <p>Purple / M</p>
                    </div>
                    <div className="single-item__price">
                        <p>50.00€</p>
                    </div>
                    <div className="single-item__count">
                        <span>2</span>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="checkout-items-container__price">
                <div className="price__labels">
                    <p className="price__labels-subtotal">Subtotal</p>
                    <p className="price__labels-shipping">Shipping</p>
                </div>
                <div className="price__amount">
                    <p className="price__labels-subtotal">50.00€</p>
                    <p className="price__labels-shipping">7.00€</p>
                </div>
            </div>
            <div className="divider"></div>
            <div className="checkout-items-container__total">
                <p className="total__label">Total</p>
                <p className="total__amount">57.00€</p>
            </div>
        </div>
    )
}

export default CheckoutItems