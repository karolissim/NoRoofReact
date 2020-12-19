import React, { Component } from 'react'

class Shop extends Component {
    render() {
        return (
            <div id="Shop" className="shop-screen">
                <div className="shop-text">
                    <h1>Welcome to the shop</h1>
                    <h3>FREE SHIPPING ON ALL ORDERS OVER 80€</h3>
                </div>
                <div className="divider"></div>
                <div className="item-list"></div>
                <div id="cart-message"></div>
            </div>
        )
    }
}

export default Shop