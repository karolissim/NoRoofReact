import React, { Component } from 'react'

class Shop extends Component {
    render() {
        return (
            <div id="Shop" class="shop-screen">
                <div class="shop-text">
                    <h1>Welcome to the shop</h1>
                    <h3>FREE SHIPPING ON ALL ORDERS OVER 80€</h3>
                </div>
                <div class="divider"></div>
                <div class="item-list"></div>
                <div id="cart-message"></div>
            </div>
        )
    }
}

export default Shop